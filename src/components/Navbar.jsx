import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiUser, FiTool, FiBook, FiGrid, FiBriefcase, FiMail } from 'react-icons/fi'

const links = [
  { id: 'home', label: 'Home', Icon: FiHome },
  { id: 'about', label: 'About', Icon: FiUser },
  { id: 'skills', label: 'Skills', Icon: FiTool },
  { id: 'education', label: 'Education', Icon: FiBook },
  { id: 'projects', label: 'Projects', Icon: FiGrid },
  { id: 'experience', label: 'Experience', Icon: FiBriefcase },
  { id: 'contact', label: 'Contact', Icon: FiMail },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const navRef = useRef(null)
  const sectionsRef = useRef([])
  const tickingRef = useRef(false)
  const activeRef = useRef('home')
  const [clicked, setClicked] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const collect = () => {
      sectionsRef.current = links
        .map((l) => ({ id: l.id, el: document.getElementById(l.id) }))
        .filter((s) => s.el)
    }
    const measureAndUpdate = () => {
      const navH = navRef.current?.offsetHeight || 0
      const targetLine = navH + window.innerHeight * 0.28 // 28% from top, below the navbar
      let bestId = activeRef.current
      let bestDist = Number.POSITIVE_INFINITY
      for (const s of sectionsRef.current) {
        const rect = s.el.getBoundingClientRect()
        const inBand = rect.top <= targetLine && rect.bottom >= targetLine
        const dist = inBand
          ? 0
          : Math.min(Math.abs(rect.top - targetLine), Math.abs(rect.bottom - targetLine))
        if (dist < bestDist) {
          bestDist = dist
          bestId = s.id
        }
      }
      if (bestId && bestId !== activeRef.current) {
        activeRef.current = bestId
        setActive(bestId)
      }
    }
    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(() => {
          measureAndUpdate()
          tickingRef.current = false
        })
      }
    }
    const onResize = () => {
      collect()
      measureAndUpdate()
    }
    collect()
    measureAndUpdate()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 w-full z-50 px-4 md:px-8`}
    >
  <div ref={navRef} className={`mx-auto max-w-6xl flex justify-between items-center px-5 py-3 md:py-4 rounded-2xl md:rounded-3xl glass ring-1 ring-white/10 shadow-soft ${scrolled ? 'shadow-lg' : ''}`}>
        <a href="#home" className="text-xl md:text-2xl font-semibold text-accent">Streamfolio</a>
        <nav className="hidden md:block">
          <ul className="relative flex items-center gap-1 p-1 rounded-full glass text-neutral">
            {links.map((l) => {
              const Icon = l.Icon
              const isActive = active === l.id
              return (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => {
                      setClicked(l.id)
                      activeRef.current = l.id
                      setActive(l.id)
                      setTimeout(() => setClicked(null), 450)
                    }}
                    className={`group relative z-10 px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                      isActive ? 'text-white' : 'hover:text-accent'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-sky-500 shadow-[0_8px_30px_-12px_rgba(56,132,255,0.7)] ring-1 ring-white/10"
                        transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                      />
                    )}
                    {clicked === l.id && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/30"
                      />
                    )}
                    <Icon className={`text-sm ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />
                    <span className="relative whitespace-nowrap leading-none">{l.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="hidden md:flex items-center gap-2" />
        <button aria-label="Open Menu" className="md:hidden text-neutral" onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="glass mx-4 mt-4 p-4 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-accent font-semibold">Menu</span>
                <button aria-label="Close Menu" className="text-neutral" onClick={() => setOpen(false)}>
                  <FiX size={22} />
                </button>
              </div>
              <ul className="mt-3 flex flex-col divide-y divide-white/20">
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`block py-3 ${active === l.id ? 'text-accent' : 'text-neutral hover:text-accent'}`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-end" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
