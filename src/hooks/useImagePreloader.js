import { useEffect } from 'react'

// Module-level cache — persists across all renders and component remounts.
// Prevents the same URL from ever being fetched more than once per session.
const loadedCache = new Set()

export const useImagePreloader = (imageUrls) => {
  useEffect(() => {
    if (!imageUrls?.length) return

    // Filter out URLs already loaded or in-flight
    const toLoad = imageUrls.filter((url) => !loadedCache.has(url))
    if (!toLoad.length) return

    // Mark immediately so concurrent effect calls don't double-load
    toLoad.forEach((url) => loadedCache.add(url))

    let cancelled = false

    const load = () => {
      if (cancelled) return
      toLoad.forEach((src) => {
        const img = new Image()
        img.onload = () => {
          if ('decode' in img) img.decode().catch(() => {})
        }
        img.onerror = () => {} // already marked in cache, just swallow
        img.src = src
      })
    }

    let cancelFn
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 2000 })
      cancelFn = () => window.cancelIdleCallback(id)
    } else {
      const id = setTimeout(load, 100)
      cancelFn = () => clearTimeout(id)
    }

    return () => {
      cancelled = true
      cancelFn()
    }
    // Intentionally using JSON.stringify so new array references with the
    // same URLs don't trigger a second fetch round.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imageUrls)])
}
