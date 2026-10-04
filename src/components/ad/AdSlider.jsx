import { useEffect, useState } from 'react'
import { ads } from '../../data/ads.js'

export default function AdSlider() {
  const [adIndex, setAdIndex] = useState(0)
  const nextAd = () => setAdIndex((i) => (i + 1) % ads.length)
  const prevAd = () => setAdIndex((i) => (i - 1 + ads.length) % ads.length)
  const goAd = (i) => setAdIndex(i)

  useEffect(() => {
    const id = setInterval(() => setAdIndex((i) => (i + 1) % ads.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="events" className="ad-section">
      <div className="ad-inner">
        <div className="ad-slider" aria-roledescription="carousel">
          {ads.map((ad, idx) => (
            <div
              key={ad.src}
              className={`ad-slide ${idx === adIndex ? 'active' : ''}`}
              aria-hidden={idx !== adIndex}
            >
              <img src={ad.src} alt={ad.title} />
              <div className="ad-caption">{ad.title}</div>
            </div>
          ))}

          <button className="ad-nav prev" onClick={prevAd} aria-label="Previous"></button>
          <button className="ad-nav next" onClick={nextAd} aria-label="Next"></button>

          <div className="ad-dots" role="tablist" aria-label="Slides">
            {ads.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === adIndex ? 'active' : ''}`}
                onClick={() => goAd(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-selected={idx === adIndex}
                role="tab"
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}