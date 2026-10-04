import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import './index.css'

function setFaviconForBrowser() {
  if (typeof document === 'undefined') return
  const ua = navigator.userAgent || ''
  const isChrome = ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')
  const href = isChrome ? '/logo_chrome.webp' : '/logo.webp'
  const links = Array.from(document.querySelectorAll('link[rel*="icon"]'))
  let icon = links.find(l => l.rel === 'icon') || links[0]
  if (!icon) {
    icon = document.createElement('link')
    icon.rel = 'icon'
    document.head.appendChild(icon)
  }
  icon.type = 'image/webp'
  icon.href = href
  links.slice(1).forEach(l => l.parentElement?.removeChild(l))
}

setFaviconForBrowser()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
