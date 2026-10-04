import { Link } from 'react-router-dom'
import '../styles/not-found.css'
import CustomCursor from '../components/CustomCursor'

export default function NotFound() {
  return (
    <div className="nf-page">
      <CustomCursor />

      <div className="nf-static" aria-hidden="true">
        <div className="nf-static-a" />
        <div className="nf-static-b" />
      </div>

      <div className="nf-content">

        {/* top label */}
        <p className="nf-label">— signal lost —</p>

        {/* main headline */}
        <div className="nf-headline">
          <span className="nf-word nf-word--fill">DEAD</span>
          <span className="nf-word nf-word--outline">FREQUENCY</span>
        </div>

        {/* divider with 404 */}
        <div className="nf-divider">
          <span className="nf-divider-line" />
          <span className="nf-divider-num">404</span>
          <span className="nf-divider-line" />
        </div>

        {/* subtitle */}
        <p className="nf-sub">
          You've tuned into the wrong channel.<br />
          This track doesn't exist.
        </p>

        <div className="nf-back">
          <Link to="/" className="nf-back-btn">
            <span className="nf-back-arrow">↩</span>
            <span className="nf-back-label">Back to Black</span>
          </Link>
        </div>

      </div>
    </div>
  )
}
