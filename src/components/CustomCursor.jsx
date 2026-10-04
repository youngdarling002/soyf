import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId = null

    // Маленькая точка — мгновенно следует за курсором
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    // Большое кольцо — плавно догоняет с лагом (lerp)
    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(animate)
    }
    animate()

    // Увеличивать кольцо при наведении на кликабельные элементы
    const onEnterClickable = () => ring.classList.add('is-hovering')
    const onLeaveClickable = () => ring.classList.remove('is-hovering')

    const clickables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label, .fab, .gallery-card, .ribbon-item')
    clickables.forEach(el => {
      el.addEventListener('mouseenter', onEnterClickable)
      el.addEventListener('mouseleave', onLeaveClickable)
    })

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onEnterClickable)
        el.removeEventListener('mouseleave', onLeaveClickable)
      })
    }
  }, [])

  return (
    <>
      {/* Маленькая точка — мгновенная */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      {/* Большое кольцо — с лагом */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
