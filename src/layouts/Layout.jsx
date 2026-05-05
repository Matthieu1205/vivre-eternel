import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import AnnonceUrgente from '../components/AnnonceUrgente'

export default function Layout({ children }) {
  const [showTop, setShowTop] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400)
      const el = document.documentElement
      const pct = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100
      setProgress(Math.min(pct, 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <>
      <AnnonceUrgente />
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Navbar />
      <div className="page-wrapper">
        {children ?? <Outlet />}
      </div>
      <Newsletter />
      <Footer />

      <a href="https://wa.me/2250546457742?text=Bonjour%2C%20je%20contacte%20le%20minist%C3%A8re%20Vivre%20pour%20l%27%C3%89ternel."
         className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <i className="fab fa-whatsapp" />
        <span className="whatsapp-float-label">05 46 45 77 42</span>
      </a>

      <button className={`scroll-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Haut de page">
        <i className="fas fa-chevron-up" />
      </button>
    </>
  )
}
