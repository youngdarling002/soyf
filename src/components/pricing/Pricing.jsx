import { useState, useEffect } from 'react'
import '../../styles/pricing.css'
import { serviceDescriptions } from '../../data/descriptions.js'

const groups = [
  {
    title: 'Recording & Production',
    items: [
      ['Studio Rental with Engineer', '€15/hour'],
      ['Studio Rental', '€10/hour'],
      ['Mobile Recording', '€20/hour'],
      ['Mixing & Mastering', 'from €25'],
      ['Custom Instrumental', 'from €30'],
      ['Full Album Recording', 'price negotiable'],
    ],
  },
/*
  {
    title: 'Acoustic',
    items: [
      ['Absorption Panels', 'from €25/panel'],
      ['Bass Traps', 'from €40/unit'],
      ['Diffusers', 'from €60/unit'],
      ['Acoustic Treatment Packages', 'price negotiable'],
    ],
  },
*/
  {
    title: 'Lessons',
    items: [
      ['Guitar Lessons', '€20/hour'],
      ['Ableton Live Lessons', '€20/hour'],
    ],
  },
  {
    title: 'Events',
    items: [
      ['Live Event Sound', 'price negotiable'],
    ],
  },
]

export default function Pricing() {
  const [tooltip, setTooltip] = useState({ visible: false, title: '', text: '', x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const showTip = (title, text) => (e) => {
    if (isMobile) return
    setTooltip({ visible: true, title, text, x: e.clientX + 12, y: e.clientY + 12 })
  }
  const moveTip = (e) => {
    if (isMobile) return
    setTooltip((t) => (t.visible ? { ...t, x: e.clientX + 12, y: e.clientY + 12 } : t))
  }
  const hideTip = () => setTooltip((t) => ({ ...t, visible: false }))

  // Helper to render a group
  const renderGroup = (g) => (
    <div className="pricing-group" key={g.title}>
      <h3 className="group-title">{g.title}</h3>
      <ul className="pricing-list">
        {g.items.map(([name, price]) => (
          <li
            key={name}
            onMouseEnter={showTip(name, serviceDescriptions[name])}
            onMouseMove={moveTip}
            onMouseLeave={hideTip}
          >
            <span className="item">{name}</span>
            <span className="price">{price}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  const leftGroups = groups.filter(g => g.title === 'Recording & Production')
  const rightGroups = groups.filter(g => g.title !== 'Recording & Production')

  return (
    <section id="prices" className="pricing">
      <div className="pricing-container">
<div className="pricing-content">
          <div className="pricing-grid-layout">
            <div className="pricing-col-left">
              {leftGroups.map(renderGroup)}
            </div>
            <div className="pricing-col-right">
              {rightGroups.map(renderGroup)}
            </div>
          </div>
        </div>
      </div>

      {tooltip.visible && (
        <div className="pricing-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="tooltip-title">{tooltip.title}</div>
          <div className="tooltip-text" dangerouslySetInnerHTML={{ __html: tooltip.text }} />
        </div>
      )}
    </section>
  )
}
