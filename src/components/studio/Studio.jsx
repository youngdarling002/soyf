import { useEffect, useState } from 'react'
import { studioPhotos } from '../../data/studioPhotos.js'
import { serviceDescriptions, gearItems } from '../../data/descriptions.js'

export default function Studio() {
  const remainingCount = Math.max(0, studioPhotos.length - 3)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightboxAt = (idx = 0) => {
    const safeIdx = Math.min(Math.max(idx, 0), studioPhotos.length - 1)
    setLightboxIndex(safeIdx)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const nextPhoto = () => setLightboxIndex((i) => (i + 1) % studioPhotos.length)
  const prevPhoto = () => setLightboxIndex((i) => (i - 1 + studioPhotos.length) % studioPhotos.length)

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  const [tooltip, setTooltip] = useState({ visible: false, title: '', text: '', x: 0, y: 0 })
  const showTip = (title, text) => (e) =>
    setTooltip({ visible: true, title, text, x: e.clientX + 12, y: e.clientY + 12 })
  const moveTip = (e) =>
    setTooltip((t) => (t.visible ? { ...t, x: e.clientX + 12, y: e.clientY + 12 } : t))
  const hideTip = () => setTooltip((t) => ({ ...t, visible: false }))

  return (
    <>
      <section id="studio-info" className="studio-layout">
        <div className="studio-left">
          {studioPhotos[0] && (
            <button type="button" className="studio-big" onClick={() => openLightboxAt(0)} aria-label="Open studio photo 1">
              <img src={studioPhotos[0]} alt="Studio photo 1" />
            </button>
          )}

          <div className="studio-thumbs">
            {studioPhotos[1] && (
              <button type="button" className="studio-thumb" onClick={() => openLightboxAt(1)} aria-label="Open studio photo 2">
                <img src={studioPhotos[1]} alt="Studio photo 2" />
              </button>
            )}
            {studioPhotos[2] && (
              <button type="button" className="studio-thumb" onClick={() => openLightboxAt(2)} aria-label="Open studio photo 3">
                <img src={studioPhotos[2]} alt="Studio photo 3" />
              </button>
            )}
            <button
              type="button"
              className="studio-more"
              onClick={() => openLightboxAt(Math.min(3, studioPhotos.length - 1))}
              aria-label={`Open more photos (${remainingCount})`}
            >
              <div className="more-number">+{remainingCount}</div>
              <div className="more-label">more photos</div>
            </button>
          </div>
        </div>

        <div className="studio-right">
          <p className="studio-desc">
            The room is treated for consistent results and comfortable sessions. We focus on capturing
            clean performances and making tasteful decisions at mix, with a streamlined workflow that
            lets ideas turn into finished tracks quickly.
          </p>

          <h3 className="studio-block-title">Equipment</h3>
          <div className="gear-grid">
            {gearItems.map((name) => (
              <button
                key={name}
                type="button"
                className="gear-card"
                onMouseEnter={showTip(name, serviceDescriptions[name])}
                onMouseMove={moveTip}
                onMouseLeave={hideTip}
                aria-label={name}
              >
                <span className="gear-name">{name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">×</button>
            <button className="lightbox-nav prev" onClick={prevPhoto} aria-label="Previous"></button>
            <img className="lightbox-img" src={studioPhotos[lightboxIndex]} alt="Studio photo" />
            <button className="lightbox-nav next" onClick={nextPhoto} aria-label="Next"></button>
          </div>
        </div>
      )}

      {tooltip.visible && (
        <div className="pricing-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="tooltip-title">{tooltip.title}</div>
          <div className="tooltip-text">{tooltip.text}</div>
        </div>
      )}
    </>
  )
}
