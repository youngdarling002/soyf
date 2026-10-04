import '../../styles/works.css'

const tracks = [
  {
    number: '01',
    title: 'Riot Sound Event',
    tags: ['Live Mix', '2025'],
    accent: true,
  },
  {
    number: '02',
    title: 'Dee Bright Acoustic',
    tags: ['Acoustic Session', '2025'],
    accent: false,
  },
  {
    number: '03',
    title: 'Studio Session Vol.1',
    tags: ['Recording', '2024'],
    accent: false,
  },
  {
    number: '04',
    title: 'Midnight Demo',
    tags: ['Demo', '2024'],
    accent: true,
  },
]

function TEPanel() {
  return (
    <div className="te-panel">
      <div className="te-row">
        {/* Minus */}
        <div className="te-btn-wrap">
          <button className="te-btn te-btn--minus" aria-label="Minus">
            <svg viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
              <path d="M200-440v-80h560v80H200Z" />
            </svg>
          </button>
        </div>
        {/* Plus */}
        <div className="te-btn-wrap">
          <button className="te-btn te-btn--plus" aria-label="Plus">
            <svg viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="te-row">
        {/* Record */}
        <div className="te-btn-wrap">
          <button className="te-btn te-btn--record" aria-label="Record">
            <span className="te-btn-text">RECORD</span>
          </button>
        </div>
        {/* Play */}
        <div className="te-btn-wrap">
          <button className="te-btn te-btn--play" aria-label="Play">
            <span className="te-btn-text">PLAY</span>
          </button>
        </div>
      </div>
      <div className="te-label">EP-133 K.O. II</div>
    </div>
  )
}

export default function Works() {
  return (
    <section id="works" className="works-section">
      <div className="works-inner">
        <h2 className="works-heading">OUR <span>WORKS</span></h2>
        <div className="works-list">
          {tracks.map((track) => (
            <div className="works-track" key={track.number}>
              <TEPanel />
              <div className="works-track-info">
                <div className="works-track-number">Track {track.number}</div>
                <div className="works-track-title">{track.title}</div>
                <div className="works-track-meta">
                  {track.tags.map((tag, i) => (
                    <span
                      key={tag}
                      className={`works-track-tag${i === 0 && track.accent ? ' works-track-tag--accent' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
