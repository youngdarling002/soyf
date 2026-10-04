import { useState } from 'react'
import '../../styles/studio.css'
import { heavyImages } from '../../data/preloadAssets'

// Lightbox component (minimalist)
function Lightbox({ images, selectedIndex, onClose, onPrev, onNext, setIndex }) {
  if (selectedIndex < 0) return null
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Main Image Container */}
        <div className="lightbox-main">
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <img src={images[selectedIndex]} alt="Fullscreen" className="lightbox-img" />
          
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Close Button inside Main Container (Top Right) */}
          <button className="lightbox-close" onClick={onClose}>×</button>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="lightbox-thumbnails">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`lightbox-thumb ${i === selectedIndex ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            >
              <img src={img} alt={`Thumb ${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Gear Item component with Tooltip
function GearItem({ name, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false)
  
  return (
    <div 
      className="gear-card"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)} // for mobile tap
    >
      <div className="gear-name">{name}</div>
      {showTooltip && tooltip && (
        <div className="pricing-tooltip" style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px' }}>
          <div className="tooltip-title">{name}</div>
          <div className="tooltip-text">{tooltip}</div>
        </div>
      )}
    </div>
  )
}

export default function StudioLocation() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  // Studio images
  const images = heavyImages

  const closeLightbox = () => setLightboxIndex(-1)
  
  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Equipment list
  const gearList = [
    { name: 'Yamaha HS-5' },
    { name: 'Universal audio Volt 1' },
    { name: 'Focusrite Scarlett 2i2 4th Gen' },
    { name: 'Rode nt-1 5th gen' },
    { name: 'Shure sm-58' },
    { name: 'Shure sm7b' },
    { name: 'Lewitt lct 240 pro' },
    { name: 'Beyerdynamic dt770 pro 32 ohm' },
    { name: 'Arturia minilab mkII' },
    { name: 'Teenage Engeneering PO-14 sub' },
  ]

  // For mobile: limit to 15 items (approx 5 rows x 3 cols) if not expanded
  // Actually CSS max-height handles it visually, but button toggles class?
  // Or render full list and use CSS max-height with "More" button.
  
  return (
    <section id="studio" className="studio-section">
      <div className="studio-container">
<div className="studio-content">
          <div className="studio-grid-layout">
            {/* Left Column: Photo Grid */}
            <div className="studio-col-left">
              <div className="studio-photo-mosaic" id="studio-photos">
                {images.map((img, i) => (
                  <div 
                    key={i} 
                    className={`mosaic-item item-${i}`}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={img} alt={`Studio ${i+1}`} decoding="async" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Info & Gear */}
            <div className="studio-col-right">
              
              {/* Location Card & Address */}
              <div id="studio-map" className="location-block">
                <div className="location-card">
                  <iframe 
                    title="Studio Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2175.926715694776!2d24.119251077189914!3d56.950290873551525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfd377227e7d%3A0x6758414436906233!2sKri%C5%A1j%C4%81%C5%86a%20Barona%20iela%2032%2C%20Centra%20rajons%2C%20R%C4%ABga%2C%20LV-1011!5e0!3m2!1sen!2slv!4v1709405436000!5m2!1sen!2slv" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="location-address">
                  Krišjāņa Barona iela 32, Centra rajons, Rīga.
                </div>
              </div>

              <div className="studio-block-title">Equipment</div>
              
              <div className="gear-grid-compact">
                {gearList.map((item, i) => (
                  <GearItem key={i} name={item.name} tooltip={item.tooltip} />
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <Lightbox 
        images={images} 
        selectedIndex={lightboxIndex} 
        onClose={closeLightbox} 
        onPrev={prevImage} 
        onNext={nextImage}
        setIndex={setLightboxIndex} 
      />
    </section>
  )
}
