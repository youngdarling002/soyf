import { useCallback, useEffect, useRef, useState } from 'react'
import '../../styles/poster.css'

// image 172 и image 174 — в самом начале, как просил пользователь.
const RIOT_IMAGES = [
  '/riot_sound_event/image 172 (3).png',
  '/riot_sound_event/image 174 (1).png',
  '/riot_sound_event/1 (1).png',
  '/riot_sound_event/2 (3).png',
  '/riot_sound_event/3 (2).png',
  '/riot_sound_event/9 (2).png',
  '/riot_sound_event/10 (1).png',
  '/riot_sound_event/456256761.png',
  '/riot_sound_event/456256769.png',
  '/riot_sound_event/456256772.png',
  '/riot_sound_event/ChatGPT Image 1 мар. 2026 г., 12_44_14 1.png',
  '/riot_sound_event/image 129 (1) 2.png',
  '/riot_sound_event/image 135 2.png',
]
const DEE_IMAGES = [
  '/dee_bright/dee_bright_event (1).png',
  '/dee_bright/IMG_1392.JPG',
  '/dee_bright/IMG_1456.JPG',
  '/dee_bright/IMG_1504.JPG',
  '/dee_bright/IMG_1565.JPG',
  '/dee_bright/IMG_1718.JPG',
  '/dee_bright/IMG_1793.JPG',
]

function baseSize(naturalW, naturalH) {
  if (!naturalW || !naturalH) return null
  const r = naturalW / naturalH
  const h = r < 0.85 ? 160 : r > 1.2 ? 120 : 140
  return { w: Math.max(60, Math.round(h * r)), h }
}

function RibbonRow({ title, images }) {
  const count = images.length
  const sizesRef = useRef(Array(count).fill(null))
  const fitScaleRef = useRef(1)           // scale that makes all items fit the track
  const [sizes, setSizes] = useState(() => Array(count).fill(null))
  const [scales, setScales] = useState(() => Array(count).fill(1))
  const trackRef = useRef(null)

  // Recalculate fitScale whenever sizes update, then apply it to all items.
  // fitScale = trackWidth / sum(naturalWidths)  (capped at 1 so we never upscale)
  const applyFitScale = useCallback(() => {
    const tr = trackRef.current
    if (!tr) return
    const W = tr.clientWidth || window.innerWidth
    if (!W) return
    const S = sizesRef.current.reduce((sum, s) => sum + (s?.w ?? 0), 0)
    if (!S) return
    fitScaleRef.current = Math.min(1, W / S)
    setScales(prev => prev.map(() => fitScaleRef.current))
  }, [])

  // Pick up dimensions for images already in cache (onLoad won't fire for them).
  useEffect(() => {
    const tr = trackRef.current
    if (!tr) return
    const nodes = Array.from(tr.querySelectorAll('img'))
    let changed = false
    const next = sizesRef.current.slice()
    nodes.forEach((img, i) => {
      if (!next[i] && img.naturalWidth && img.naturalHeight) {
        next[i] = baseSize(img.naturalWidth, img.naturalHeight)
        changed = true
      }
    })
    if (changed) {
      sizesRef.current = next
      setSizes(next)
    }
  }, [])

  // Also recalculate on window resize so nothing overflows after resize.
  useEffect(() => {
    const onResize = () => applyFitScale()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [applyFitScale])

  // Reapply fit scale whenever sizes state changes.
  useEffect(() => {
    applyFitScale()
  }, [sizes, applyFitScale])

  const onImgLoad = useCallback((i, e) => {
    const s = baseSize(
      e.target.naturalWidth || e.target.width,
      e.target.naturalHeight || e.target.height,
    )
    if (!s) return
    const next = sizesRef.current.slice()
    next[i] = s
    sizesRef.current = next
    setSizes(next)
  }, [])

  const onEnter = useCallback((i) => {
    const tr = trackRef.current
    if (!tr) return
    const W = tr.clientWidth
    const fit = fitScaleRef.current
    const currentSizes = sizesRef.current

    // Natural (unscaled) width of each item
    const natW = currentSizes.map((s) => s?.w ?? 120)
    const S_nat = natW.reduce((a, b) => a + b, 0)  // sum of natural widths
    const natWi = natW[i]
    if (!natWi || !S_nat || !W) return

    // How much to grow the hovered item (relative to natural width)
    // We want displayed_hover = fit * natWi * HOVER → scale = fit * HOVER
    const HOVER = 1.22
    const MIN_OTHER = 0.65  // minimum factor for others (relative to natural width)

    // Derive otherFactor so that total displayed width stays exactly W:
    // W = natWi * hoverScale + (S_nat - natWi) * otherScale
    // With hoverScale = fit * HOVER and otherScale = fit * otherFactor:
    // otherFactor = (S_nat - natWi * HOVER) / (S_nat - natWi)
    let hoverScale = fit * HOVER
    let otherFactor = (S_nat - natWi * HOVER) / (S_nat - natWi)

    if (!Number.isFinite(otherFactor) || otherFactor > 1) otherFactor = 1

    if (otherFactor < MIN_OTHER) {
      // Others hit their minimum — reduce hover proportionally
      otherFactor = MIN_OTHER
      const maxHover = (S_nat - otherFactor * (S_nat - natWi)) / natWi
      hoverScale = fit * Math.max(1.05, maxHover)
    }

    const otherScale = fit * otherFactor
    setScales(natW.map((_, idx) => (idx === i ? hoverScale : otherScale)))
  }, [count])

  const onLeave = useCallback(() => {
    // Reset to fit scale — no stale closure risk (fitScaleRef is a ref)
    setScales(prev => prev.map(() => fitScaleRef.current))
  }, [])

  return (
    <div className="ribbon-section">
      <div className="ribbon-title">{title}</div>
      <section aria-label={`${title} photos`} className="events-ribbon">
        <div className="ribbon-track" ref={trackRef}>
          {images.map((src, i) => (
            <div
              className="ribbon-item"
              key={`${title}-${i}`}
              style={
                sizes[i]
                  ? { '--wt': sizes[i].w, '--h': `${sizes[i].h}px`, '--scale': scales[i] }
                  : { '--scale': scales[i] }
              }
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={onLeave}
            >
              <img
                src={src}
                alt={`${title} photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                onLoad={(e) => onImgLoad(i, e)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function EventsRibbon() {
  return (
    <div className="ribbon-wrapper">
      <RibbonRow title="RIOT SOUND EVENT" images={RIOT_IMAGES} />
      <RibbonRow title="DEE BRIGHT ACOUSTIC" images={DEE_IMAGES} />
    </div>
  )
}
