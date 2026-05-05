import { useEffect, useRef } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    if (!bar) return
    const onScroll = () => {
      const st = document.documentElement.scrollTop
      const sh = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = (st / sh * 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
