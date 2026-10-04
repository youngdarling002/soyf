import React from 'react'
import '../../styles/concert-cta.css'

export default function ConcertCTA() {
  return (
    <section id="contact-tiles" className="concert-cta" aria-label="Get to the show">
      <div className="concert-inner">
        <h2 className="concert-title">LET’S GET YOU TO THE SHOW</h2>
        <p className="concert-subtitle">
          From concerts to festivals, the best nights start here.
          Book your tickets and make it unforgettable.
        </p>
        <div className="concert-cta-row">
          <a
            className="concert-tile"
            href="https://t.me/Dmitrijs_lask"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Telegram"
          >
            <span className="tile-label">tg</span>
          </a>
          <a
            className="concert-tile"
            href="tel:+37127192035"
            aria-label="Call by phone"
          >
            <span className="tile-label">ph</span>
          </a>
          <a
            className="concert-tile"
            href="https://www.instagram.com/1soyfstudio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram"
          >
            <span className="tile-label">ig</span>
          </a>
        </div>
      </div>
    </section>
  )
}