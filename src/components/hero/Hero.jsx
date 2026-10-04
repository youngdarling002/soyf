import { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar.jsx'
import '../../styles/hero-isolated.css'

const baseImages = [
  '/riot.webp',
  '/prime/IMG_0097.webp',
  '/dee_bright_event.webp',
  '/concert.webp',
  '/prime/IMG_0097.webp',
]

// 7 copies so the user can drag through many cards without ever reaching the edge.
// Middle copy starts at index 3 * N.
const COPIES = 7
const N = baseImages.length
const allImages = Array.from({ length: COPIES }, () => baseImages).flat()
// "Safe zone": keep active index inside [N, (COPIES-1)*N - 1]
// Jump when entering first or last copy.
const JUMP_THRESHOLD_LO = N              // idx < this → jump forward
const JUMP_THRESHOLD_HI = (COPIES - 1) * N  // idx >= this → jump back

export default function Hero() {
  const trackRef = useRef(null)
  const galleryRef = useRef(null)
  const [introDone, setIntroDone] = useState(false)
  const introBoxRef = useRef(null)
  // Store current logical index in a ref so callbacks always see fresh value.
  const activeIdxRef = useRef(3 * N)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const items = Array.from(track.querySelectorAll('.gallery-card'))

    // ------- helpers -------
    const scrollToItem = (idx, behavior = 'auto') => {
      const el = items[idx]
      if (!el) return
      const elRect = el.getBoundingClientRect()
      const trackRect = track.getBoundingClientRect()
      const delta = (elRect.left + elRect.width / 2) - (trackRect.left + trackRect.width / 2)
      track.scrollTo({ left: track.scrollLeft + delta, behavior })
    }

    const updateActive = () => {
      const rect = track.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      let bestIdx = 0, bestDist = Infinity
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - centerX)
        if (d < bestDist) { bestDist = d; bestIdx = i }
      })
      items.forEach(el => el.classList.remove('is-center'))
      items[bestIdx]?.classList.add('is-center')
      activeIdxRef.current = bestIdx
      return bestIdx
    }

    // ------- silent loop reset -------
    // Teleport to equivalent position in a more central copy without the user noticing.
    const ensureCenter = () => {
      const idx = activeIdxRef.current
      if (idx >= JUMP_THRESHOLD_HI) {
        scrollToItem(idx - 2 * N, 'auto')
        updateActive()
        return true
      }
      if (idx < JUMP_THRESHOLD_LO) {
        scrollToItem(idx + 2 * N, 'auto')
        updateActive()
        return true
      }
      return false
    }

    // Initial position: center of middle copy
    scrollToItem(3 * N + Math.floor(N / 2), 'auto')
    updateActive()

    // ------- scroll handler -------
    const onScroll = () => {
      updateActive()
      ensureCenter()
    }
    track.addEventListener('scroll', onScroll, { passive: true })

    // ------- auto-advance -------
    let timer = null
    const startAuto = () => {
      if (timer || !introDone) return
      timer = setInterval(() => {
        ensureCenter()
        scrollToItem(activeIdxRef.current + 1, 'smooth')
      }, 2600)
    }
    const stopAuto = () => { if (timer) { clearInterval(timer); timer = null } }

    startAuto()
    track.addEventListener('mouseenter', stopAuto)
    track.addEventListener('mouseleave', startAuto)

    // ------- drag -------
    let isDown = false, startX = 0, startScrollLeft = 0
    const onMouseDown = (e) => {
      isDown = true
      track.classList.add('is-dragging')
      startX = e.pageX - track.offsetLeft
      startScrollLeft = track.scrollLeft
      stopAuto()
    }
    const onMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      track.scrollLeft = startScrollLeft - (e.pageX - track.offsetLeft - startX) * 1.2
    }
    const endDrag = () => {
      if (!isDown) return
      isDown = false
      track.classList.remove('is-dragging')
      const idx = updateActive()
      scrollToItem(idx, 'smooth')
      startAuto()
    }

    track.addEventListener('mousedown', onMouseDown)
    track.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', endDrag)

    return () => {
      stopAuto()
      track.removeEventListener('scroll', onScroll)
      track.removeEventListener('mouseenter', stopAuto)
      track.removeEventListener('mouseleave', startAuto)
      track.removeEventListener('mousedown', onMouseDown)
      track.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', endDrag)
    }
  }, [introDone])

  // Intro animation
  useEffect(() => {
    const sec = galleryRef.current
    if (!sec) return
    sec.classList.add('intro-active')
    const box = introBoxRef.current
    const holdMs = 1500
    const shrinkMs = 1400
    const toPx = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 320 }
    const startShrink = () => {
      const track = trackRef.current
      if (box && track) {
        const styles = getComputedStyle(sec)
        const size = toPx(styles.getPropertyValue('--intro-size'))
        const r = track.getBoundingClientRect()
        box.style.width = `${size}px`
        box.style.height = `${size}px`
        box.style.top = `${Math.round(r.top + (r.height - size) / 2)}px`
        box.style.left = `${Math.round(r.left + r.width / 2 - size / 2)}px`
        box.style.borderRadius = '18px'
      }
      setTimeout(() => {
        setIntroDone(true)
        sec.classList.remove('intro-active')
      }, shrinkMs + 50)
    }
    const t = setTimeout(startShrink, holdMs)
    return () => clearTimeout(t)
  }, [])

  return (
    <main id="studio" className="hero no-video">
      <section className="hero-gallery" aria-label="Featured works" ref={galleryRef}>
        {!introDone && (
          <div className="intro-cover" aria-hidden="true">
            <div className="intro-box" ref={introBoxRef}>
              <img src={baseImages[0]} alt="" draggable="false" onDragStart={(e) => e.preventDefault()} />
            </div>
          </div>
        )}
        <h2 className="hero-heading">
          <span className="accent">WE CREATE</span> EMOTIONS<br />
          <span className="accent">WORTH</span> SHARING.
        </h2>
        <div className="gallery-track" role="list" ref={trackRef}>
          {allImages.map((src, i) => (
            <div key={i} className="gallery-card" role="listitem">
              <div className="flip">
                <div className="front">
                  <img
                    src={src}
                    alt="Highlight"
                    loading="eager"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <div className="back">
                  <div className="back-kicker">studio</div>
                  <div className="back-title">From ideas to sound</div>
                  <div className="back-sub">We make it real.</div>
                  <a
                    href="http://localhost:5174/luminance"
                    onClick={(e) => {
                      e.preventDefault()
                      const card = e.currentTarget.closest('.gallery-card')
                      const back = card?.querySelector('.back')
                      const rect = card?.getBoundingClientRect()
                      if (rect) {
                        const overlay = document.createElement('div')
                        const bg = back ? getComputedStyle(back).backgroundColor : '#9EC7FF'
                        overlay.style.cssText = `position:fixed;top:${Math.round(rect.top)}px;left:${Math.round(rect.left)}px;width:${Math.round(rect.width)}px;height:${Math.round(rect.height)}px;border-radius:18px;background:${bg};z-index:3000;transition:all 700ms cubic-bezier(0.16,1,0.3,1)`
                        document.body.appendChild(overlay)
                        void overlay.getBoundingClientRect()
                        overlay.style.top = '0'
                        overlay.style.left = '0'
                        overlay.style.width = '100vw'
                        overlay.style.height = '100vh'
                        overlay.style.borderRadius = '0'
                        const navigate = () => { window.location.href = 'http://localhost:5174/luminance' }
                        overlay.addEventListener('transitionend', navigate, { once: true })
                        setTimeout(navigate, 900)
                      } else {
                        window.location.href = 'http://localhost:5174/luminance'
                      }
                    }}
                    className="back-btn"
                    aria-label="Get in touch"
                  >
                    get in touch ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-cta">
          <a
            href="#footer"
            className="gallery-join-btn"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('footer')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            aria-label="Join the band"
          >
            JOIN THE BAND
          </a>
        </div>
      </section>
      <Navbar />
    </main>
  )
}
