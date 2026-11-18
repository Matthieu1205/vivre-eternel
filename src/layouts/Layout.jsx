import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import AnnonceUrgente from '../components/AnnonceUrgente'
import { useCoordonnees } from '../lib/content'

export default function Layout({ children }) {
  const [showTop, setShowTop] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()
  const coord = useCoordonnees()

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
    const observeAll = () =>
      document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible)').forEach(el => io.observe(el))
    observeAll()
    // Le contenu chargé depuis la base (ou filtré) arrive après le premier rendu :
    // on observe aussi les éléments ajoutés ensuite, sinon ils resteraient invisibles.
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
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

      <a href={coord.waLink()}
         className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <i className="fab fa-whatsapp" />
        <span className="whatsapp-float-label">{String(coord.tel1 || '').replace(/^\+225\s*/, '')}</span>
      </a>

      <button className={`scroll-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Haut de page">
        <i className="fas fa-chevron-up" />
      </button>
    </>
  )
}
