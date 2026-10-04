import React, { useState, useEffect } from 'react'
import '../../styles/poster.css'

const targetDate = new Date('2026-03-05T19:30:00')

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  })

  return (
    <div className="event-timer">
      <div className="timer-block">
        <span className="timer-val">{String(timeLeft.d || 0).padStart(2, '0')}</span>
        <span className="timer-label">DAYS</span>
      </div>
      <div className="timer-sep">:</div>
      <div className="timer-block">
        <span className="timer-val">{String(timeLeft.h || 0).padStart(2, '0')}</span>
        <span className="timer-label">HRS</span>
      </div>
      <div className="timer-sep">:</div>
      <div className="timer-block">
        <span className="timer-val">{String(timeLeft.m || 0).padStart(2, '0')}</span>
        <span className="timer-label">MIN</span>
      </div>
      <div className="timer-sep">:</div>
      <div className="timer-block">
        <span className="timer-val">{String(timeLeft.s || 0).padStart(2, '0')}</span>
        <span className="timer-label">SEC</span>
      </div>
    </div>
  )
}

export default function PosterSection() {
  return (
    <section id="events" className="events-section" aria-label="Events">
      <div className="events-container">
        

      </div>
    </section>
  );
}
