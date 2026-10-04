import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [activeItem, setActiveItem] = useState('home')
  const [hoveredItem, setHoveredItem] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const navListRef = useRef(null)
  const itemRefs = useRef({})
  const [indicatorY, setIndicatorY] = useState(0)
  const indicatorRef = useRef(null)
  const bounceTimerRef = useRef(null)

  const getCenterY = (id) => {
    const ul = navListRef.current
    const li = itemRefs.current[id]
    if (!ul || !li) return null
    return li.offsetTop + (li.offsetHeight - 20) / 2
  }

  const positionIndicator = (id) => {
    const y = getCenterY(id)
    if (y == null) return
    setIndicatorY(y)
  }

  const animateDownTo = (y) => {
    const el = indicatorRef.current
    if (!el) { setIndicatorY(y); return }
    if (bounceTimerRef.current) {
      clearTimeout(bounceTimerRef.current)
      bounceTimerRef.current = null
    }
    el.style.setProperty('--toY', `${y}px`)
    // Restart animation
    el.classList.remove('dir-down')
    // force reflow
    void el.offsetWidth
    el.classList.add('dir-down')
    bounceTimerRef.current = setTimeout(() => {
      setIndicatorY(y)
      el.classList.remove('dir-down')
    }, 920)
  }

  const animateUpTo = (y) => {
    const el = indicatorRef.current
    if (!el) { setIndicatorY(y); return }
    if (bounceTimerRef.current) {
      clearTimeout(bounceTimerRef.current)
      bounceTimerRef.current = null
    }
    el.style.setProperty('--toY', `${y}px`)
    el.classList.remove('dir-up')
    void el.offsetWidth
    el.classList.add('dir-up')
    bounceTimerRef.current = setTimeout(() => {
      setIndicatorY(y)
      el.classList.remove('dir-up')
    }, 900)
  }

  const baseItems = [
    { id: 'events', label: 'Events' },
    { id: 'prices', label: 'Prices' },
    { id: 'studio', label: 'Studio' },
    { id: 'works', label: 'Works' },
  ]

  const handleNavClick = (id) => {
    setActiveItem(id)
    setIsMobileMenuOpen(false)
    const targetId =
      id === 'studio'   ? 'studio-photos' :
      id === 'events'   ? 'events'        :
      id === 'contacts' ? 'footer' :
      id
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    // Ensure scrolling is enabled before attempting to scroll
    document.body.style.overflow = ''
    document.body.classList.remove('mobile-menu-open')
    setIsMobileMenuOpen(false)
    setActiveItem('home')
    // Schedule scroll for next frame to avoid being blocked by state updates
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true)
    } else {
      setIsClosing(true)
      setIsMobileMenuOpen(false)
      setTimeout(() => {
        setIsClosing(false)
      }, 350)
    }
  }

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.classList.add('mobile-menu-open')
    else document.body.classList.remove('mobile-menu-open')
    if (isClosing) document.body.classList.add('menu-closing')
    else document.body.classList.remove('menu-closing')
    return () => {
      document.body.classList.remove('mobile-menu-open')
      document.body.classList.remove('menu-closing')
    }
  }, [isMobileMenuOpen, isClosing])

  // Toggle solid background when scrolled
  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      setIsScrolled(y > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen || isClosing) {
      requestAnimationFrame(() => positionIndicator(activeItem))
    }
  }, [isMobileMenuOpen, isClosing, activeItem])

  useEffect(() => {
    if (hoveredItem == null) {
      requestAnimationFrame(() => {
        setHoveredIndex(null)
        positionIndicator(activeItem)
      })
    }
  }, [hoveredItem, activeItem])

  return (
    <nav className={`navbar ${isScrolled ? 'is-scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''} ${isClosing ? 'menu-closing' : ''}`}>
      <div className={`navbar-inner`}>
        <div className={`navbar-surface ${isScrolled ? 'solid' : ''} desktop-only`}>
          <div className="desktop-topbar">
            <div className="desktop-left">
              <button
                className={`desktop-burger ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Open menu"
              >
                <span></span>
                <span></span>
              </button>
              <span
                className="desktop-burger-label"
                onClick={() => {
                  toggleMobileMenu()
                }}
              >
                {isMobileMenuOpen ? 'CLOSE' : 'HOME'}
              </span>
            </div>
            <a
              href="#studio"
              className="desktop-center-logo"
              onClick={(e) => { e.preventDefault(); scrollToTop() }}
              aria-label="Go to top"
            >
              <img src="/logo.webp" alt="Лого" className="brand-logo" />
            </a>
            <div className="desktop-right">
              <div className="button-borders">
                <a
                  href="#footer"
                  className="desktop-cta"
                  onClick={(e) => { e.preventDefault(); handleNavClick('contacts') }}
                  aria-label="Let's work together"
                >
                  LET'S WORK TOGETHER
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="menu">
          {/* Logo outside the list for mobile header */}
          <a
            href="#studio"
            className="mobile-brand-logo"
            onClick={(e) => { e.preventDefault(); scrollToTop(); }}
            aria-label="Go to top"
          >
            <img src="/logo.webp" alt="Лого" className="brand-logo" />
          </a>

          {/* Mobile Hamburger Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-list full ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Desktop Logo (hidden on mobile via CSS) */}
            <li className="brand-cell desktop-only">
              <a
                href="#studio"
                className="nav-item brand-item"
                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                aria-label="Go to top"
              >
                <img src="/logo.webp" alt="Лого" className="brand-logo" />
              </a>
            </li>

            {baseItems.map((item) => (
              <li key={item.id} className="nav-li">
                <a
                  href="#"
                  className="nav-item"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            
            {/* Contact us */}
            <li className="contact-cell">
              <a
                href="#"
                className="nav-item contacts no-border"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('contacts')
                }}
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
        {(isMobileMenuOpen || isClosing) && (
          <div className="overlay-menu desktop-only">
            <div className="overlay-panel">
              <div className="overlay-inner">
              <div className="overlay-col overlay-left">
                <ul
                  ref={navListRef}
                  className={`overlay-nav ${hoveredItem && hoveredItem !== activeItem ? 'is-hovering-other' : ''}`}
                  onMouseMove={(e) => {
                    const ul = navListRef.current
                    if (!ul) return
                    const rect = ul.getBoundingClientRect()
                    const y = e.clientY - rect.top
                    const order = ['home', ...baseItems.map(i => i.id), 'contacts']
                    let bestId = null
                    let bestDist = Infinity
                    for (const id of order) {
                      const li = itemRefs.current[id]
                      if (!li) continue
                      const cy = li.offsetTop + li.offsetHeight / 2
                      const d = Math.abs(y - cy)
                      if (d < bestDist) { bestDist = d; bestId = id }
                    }
                    if (bestId) {
                      const idx = order.indexOf(bestId)
                      const targetY = getCenterY(bestId)
                      let dir = null
                      if (hoveredIndex != null) dir = idx > hoveredIndex ? 'down' : (idx < hoveredIndex ? 'up' : null)
                      else if (targetY != null) dir = targetY > indicatorY ? 'down' : (targetY < indicatorY ? 'up' : null)
                      setHoveredItem(bestId)
                      setHoveredIndex(idx)
                      if (dir === 'down') animateDownTo(targetY)
                      else if (dir === 'up') animateUpTo(targetY)
                      else if (targetY != null) setIndicatorY(targetY)
                    }
                  }}
                  onMouseLeave={() => { setHoveredItem(null); setHoveredIndex(null); }}
                >
                  <span
                    ref={indicatorRef}
                    className="overlay-indicator"
                    style={{ transform: `translateY(${indicatorY}px)` }}
                  />
                  {/* HOME - default active */}
                  <li
                    ref={(el) => { itemRefs.current['home'] = el }}
                    className={`overlay-home ${activeItem === 'home' ? 'active' : ''} ${hoveredItem === 'home' ? 'hovered' : ''}`}
                  >
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                    >
                      <span
                        className="label"
                        onMouseEnter={() => {
                          const order = ['home', ...baseItems.map(i => i.id), 'contacts']
                          const idx = order.indexOf('home')
                          const targetY = getCenterY('home')
                          let dir = null
                          if (hoveredIndex != null) dir = idx > hoveredIndex ? 'down' : (idx < hoveredIndex ? 'up' : null)
                          else if (targetY != null) dir = targetY > indicatorY ? 'down' : (targetY < indicatorY ? 'up' : null)
                          setHoveredItem('home')
                          setHoveredIndex(idx)
                          if (dir === 'down') animateDownTo(targetY)
                          else if (dir === 'up') animateUpTo(targetY)
                          else if (targetY != null) setIndicatorY(targetY)
                        }}
                      >
                        HOME
                      </span>
                    </a>
                  </li>
                  {baseItems.map((item) => (
                    <li
                      key={`m-${item.id}`}
                      ref={(el) => { itemRefs.current[item.id] = el }}
                      className={`${activeItem === item.id ? 'active' : ''} ${hoveredItem === item.id ? 'hovered' : ''}`}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveItem(item.id)
                          handleNavClick(item.id)
                        }}
                      >
                        <span
                          className="label"
                          onMouseEnter={() => {
                            const order = ['home', ...baseItems.map(it => it.id), 'contacts']
                            const idx = order.indexOf(item.id)
                            const targetY = getCenterY(item.id)
                            let dir = null
                            if (hoveredIndex != null) dir = idx > hoveredIndex ? 'down' : (idx < hoveredIndex ? 'up' : null)
                            else if (targetY != null) dir = targetY > indicatorY ? 'down' : (targetY < indicatorY ? 'up' : null)
                            setHoveredItem(item.id)
                            setHoveredIndex(idx)
                            if (dir === 'down') animateDownTo(targetY)
                            else if (dir === 'up') animateUpTo(targetY)
                            else if (targetY != null) setIndicatorY(targetY)
                          }}
                        >
                          {item.label.toUpperCase()}
                        </span>
                      </a>
                    </li>
                  ))}
                  <li
                    ref={(el) => { itemRefs.current['contacts'] = el }}
                    className={`${activeItem === 'contacts' ? 'active' : ''} ${hoveredItem === 'contacts' ? 'hovered' : ''}`}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveItem('contacts')
                        handleNavClick('contacts')
                      }}
                    >
                      <span
                        className="label"
                        onMouseEnter={() => {
                          const order = ['home', ...baseItems.map(i => i.id), 'contacts']
                          const idx = order.indexOf('contacts')
                          const targetY = getCenterY('contacts')
                          let dir = null
                          if (hoveredIndex != null) dir = idx > hoveredIndex ? 'down' : (idx < hoveredIndex ? 'up' : null)
                          else if (targetY != null) dir = targetY > indicatorY ? 'down' : (targetY < indicatorY ? 'up' : null)
                          setHoveredItem('contacts')
                          setHoveredIndex(idx)
                          if (dir === 'down') animateDownTo(targetY)
                          else if (dir === 'up') animateUpTo(targetY)
                          else if (targetY != null) setIndicatorY(targetY)
                        }}
                      >
                        CONTACT
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="overlay-col overlay-center">
                <div className="overlay-title">CONTACT</div>
                <div className="overlay-contact">
                  <a href="tel:+37127192035">+371 27 192 035</a>
                  <div>Krišjāņa Barona iela 32, Rīga</div>
                  <div className="overlay-title" style={{marginTop: '12px'}}>SOCIAL</div>
                  <div className="overlay-contact">
                    <a href="https://www.instagram.com/good_fella_studio" target="_blank" rel="noreferrer">Instagram: @good_fella_studio</a>
                    <a href="https://www.linkedin.com/company/good-fella-studio" target="_blank" rel="noreferrer">LinkedIn: @good-fella-studio</a>
                    <a href="https://github.com/GoodFellaStudio" target="_blank" rel="noreferrer">Github: @GoodFellaStudio</a>
                  </div>
                </div>
              </div>
              <div className="overlay-col overlay-right">
                <a
                  href="#studio"
                  className="overlay-card"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('studio')
                  }}
                >
                  <img src="/studio/studio_big.webp" alt="About the studio" />
                  <div className="overlay-card-caption">ABOUT THE STUDIO</div>
                </a>
                <a
                  href="#works"
                  className="overlay-card"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('works')
                  }}
                >
                  <img src="/riot.webp" alt="Featured project" />
                  <div className="overlay-card-caption">FEATURED PROJECT</div>
                </a>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
