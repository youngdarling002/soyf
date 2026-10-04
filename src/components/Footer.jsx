import '../styles/footer.css'

export default function Footer() {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <footer id="footer" className="footer monads-style">
      <div className="footer-content-grid">
        {/* Left: Navigation */}
        <div className="footer-left">
          <a href="#events" className="footer-link" onClick={scrollTo('events')}>EVENTS</a>
          <a href="#prices" className="footer-link" onClick={scrollTo('prices')}>PRICES</a>
          <a href="#studio" className="footer-link" onClick={scrollTo('studio-photos')}>STUDIO</a>
          <a href="#works" className="footer-link" onClick={scrollTo('works')}>WORKS</a>
        </div>

        {/* Center: Logo */}
        <div className="footer-center">
          <img src="/logo.webp" alt="Логотип" className="footer-logo" />
        </div>

        {/* Right: Contact & Socials */}
        <div className="footer-right">
          <a href="tel:+37127192035" className="footer-phone">+371 27 192 035</a>
          <div className="footer-address-right">
            Krišjāņa Barona iela 32, Centra rajons, Rīga.
          </div>
          <div className="footer-social-right">
            <a href="#" className="social-square" aria-label="LinkedIn">in</a>
            <a href="https://www.instagram.com/1soyfstudio/" className="social-square" aria-label="Instagram">ig</a>
            <a href="#" className="social-square" aria-label="Facebook">fb</a>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="bottom-center">© 2026 SOYF. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  )
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s-7-6.5-7-11a7 7 0 0114 0c0 4.5-7 11-7 11z" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14.5 8H13a2 2 0 00-2 2v2H9v3h2v6h3v-6h2.2l.3-3H14v-1.3c0-.4.3-.7.7-.7h1.8V8z" fill="currentColor"/>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )
}
