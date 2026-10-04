import React from 'react'
import '../../styles/running-line.css'

export default function RunningLine() {
  const words = [
    'GET LOUDER', 'CREATE', 'INSPIRE', 'RECORD', 'MIX', 'MASTER', 
    'AMPLIFY', 'SOUND', 'VIBE', 'ENERGY', 'PASSION', 'MUSIC'
  ]

  return (
    <div className="running-line-container">
      <div className="running-track">
        {/* Render sequence twice for seamless loop */}
        <div className="running-content">
          {words.map((word, i) => (
            <span key={i} className="running-item">
              {word} <span className="separator">•</span>
            </span>
          ))}
        </div>
        <div className="running-content" aria-hidden="true">
          {words.map((word, i) => (
            <span key={i} className="running-item">
              {word} <span className="separator">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
