import React from 'react'
import '../../styles/layered-gallery.css'

export default function LayeredGallery() {
  return (
    <section id="featured" className="layered-gallery" aria-label="Layered gallery">
      <div className="gallery-inner">
        <h3 className="gallery-title">Featured Moments</h3>

        <div className="gallery-stack" aria-label="Hover to expand into grid">
          <figure className="stack-item">
            <img src="/albums/Component 6 (18).webp" alt="Component 6" />
            <figcaption className="stack-caption">
              <div className="caption-text">Arcade is dedicated<br/>to delivering</div>
              <div className="caption-star">*</div>
            </figcaption>
          </figure>
          <figure className="stack-item">
            <img src="/albums/Component 7 (14).webp" alt="Component 7" />
            <figcaption className="stack-caption">
              <div className="caption-text">Arcade is dedicated<br/>to delivering</div>
              <div className="caption-star">*</div>
            </figcaption>
          </figure>
          <figure className="stack-item">
            <img src="/new_album.webp" alt="New Album" />
            <figcaption className="stack-caption">
              <div className="caption-text">Arcade is dedicated<br/>to delivering</div>
              <div className="caption-star">*</div>
            </figcaption>
          </figure>
          <figure className="stack-item">
            <img src="/studio/studio_big.webp" alt="Studio 102" />
            <figcaption className="stack-caption">
              <div className="caption-text">Arcade is dedicated<br/>to delivering</div>
              <div className="caption-star">*</div>
            </figcaption>
          </figure>
          <figure className="stack-item">
            <img src="/studio/studio_1.webp" alt="Studio 104" />
            <figcaption className="stack-caption">
              <div className="caption-text">Arcade is dedicated<br/>to delivering</div>
              <div className="caption-star">*</div>
            </figcaption>
          </figure>
          <figure className="stack-item">
            <img src="/studio/studio_2.webp" alt="Studio 105" />
            <figcaption className="stack-caption">
              <div className="caption-text">Arcade is dedicated<br/>to delivering</div>
              <div className="caption-star">*</div>
            </figcaption>
          </figure>
        </div>

        {/* убрал подпись-хинт */}
      </div>
    </section>
  )
}
