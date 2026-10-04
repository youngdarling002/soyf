import React from 'react'

export default function Albums({
  albums = [],
  albums2 = [],
  detailOpen = false,
  selectedAlbum = null,
  openAlbumDetail,
  closeAlbumDetail,
  getTracksForAlbum = () => [],
  playTrack = () => {},
}) {
  return (
    <section id="works" className="albums">
      <div className="albums-inner">
        <div className="albums-grid">
          {[...albums, ...albums2].map((a, idx) => {
            const isSelected = detailOpen && selectedAlbum && selectedAlbum.src === a.src
            const isDim = detailOpen && !isSelected
            return (
              <div
                key={`${a.src}-${idx}`}
                className={`album-card ${isSelected ? 'is-selected' : ''} ${isDim ? 'is-dim' : ''}`}
              >
                <div
                  className={`album-item ${isSelected ? 'selected-cover' : ''}`}
                  onClick={() => (!isSelected ? openAlbumDetail(a) : undefined)}
                  role="button"
                  aria-label={isSelected ? `Selected ${a.title}` : `Open ${a.title}`}
                >
                  <img src={a.src} alt={a.title} />
                  
                  {/* Оверлей с блюром и количеством треков при наведении */}
                  {!isSelected && (
                    <div className="album-hover-overlay">
                      <span className="tracks-count-label">{getTracksForAlbum(a).length} Songs</span>
                    </div>
                  )}
                </div>

                {/* постерная мета для невскрытой карточки */}
                {!isSelected && (
                  <div className="album-poster-meta">
                    <div className="album-caption">{a.caption || ''}</div>
                    <div className="album-desc">{a.title}</div>
                    <div className="album-bottom">
                      <div className="album-number">{String(idx + 1).padStart(2, '0')}</div>
                    </div>
                  </div>
                )}

                {/* раскрытая карточка по центру — без изменений по функционалу */}
                {isSelected && (
                  <div className="album-expanded">
                    <div className="album-expanded-header">
                      <button className="album-back" onClick={closeAlbumDetail} aria-label="Back">← Back</button>
                      <div className="album-expanded-title">{a.title}</div>
                    </div>
                    <ul className="album-tracks">
                      {getTracksForAlbum(a).map((t, i) => (
                        <li key={i} className="track-row">
                          <span className="track-name">{t.title}</span>
                          <button className="track-play" onClick={() => playTrack(t)} aria-label={`Play ${t.title}`}>▶</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
