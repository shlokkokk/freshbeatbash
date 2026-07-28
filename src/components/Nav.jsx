import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mic2, Phone, X } from 'lucide-react'
import { InstagramIcon } from './Icons'

const links = [
  { href: '#story',      num: '01', label: 'About' },
  { href: '#highlights', num: '02', label: 'Highlights' },
  { href: '#schedule',   num: '03', label: 'Schedule' },
  { href: '#gallery',    num: '04', label: 'Gallery' },
  { href: '#crew',       num: '05', label: 'Team' },
  { href: '#sponsors',   num: '06', label: 'Sponsors' },
]

const REG_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfBXAG7O4bLi1jpkrnA58_n6wIicrXJYnefLV0K75dHK7-jxQ/viewform'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body & document scroll completely when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
      document.body.classList.remove('mobile-menu-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
      document.body.classList.remove('mobile-menu-open')
    }
  }, [open])

  const close = () => setOpen(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, staggerChildren: 0.04, staggerDirection: -1 },
    },
  }

  const itemVariants = {
    hidden:  { y: 40, opacity: 0 },
    visible: { y: 0,  opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit:    { y: -20, opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={close}>
            <img src="/logo.png" alt="Fresh Beats Bash" className="nav-logo-img" width={34} height={34} />
            <span className="nav-logo-text">FRESH BEATS BASH</span>
          </a>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">{l.label}</a>
              </li>
            ))}
            <li>
              <a href={REG_URL} target="_blank" rel="noopener noreferrer" className="nav-link nav-cta">
                <span className="btn-pulse-dot" />
                Register Act <ArrowRight size={13} />
              </a>
            </li>
          </ul>

          <button
            className={`nav-burger ${open ? 'open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle mobile menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-drawer"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Ambient Background Glow Orbs inside menu */}
            <div className="mobile-menu-orb orb-lime" aria-hidden="true" />
            <div className="mobile-menu-orb orb-pink" aria-hidden="true" />

            <div className="mobile-menu-header">
              <div className="mobile-menu-brand">
                <img src="/logo.png" alt="Fresh Beats Bash" width={32} height={32} />
                <span>FRESH BEATS BASH</span>
              </div>
              <button className="mobile-close-btn" onClick={close} aria-label="Close Menu">
                <X size={15} /> CLOSE
              </button>
            </div>

            <motion.ul className="mobile-menu-links">
              {links.map(l => (
                <motion.li key={l.href} variants={itemVariants}>
                  <a href={l.href} className="mobile-menu-link" onClick={close}>
                    <span className="mobile-link-num">{l.num}</span>
                    <span className="mobile-link-text">{l.label}</span>
                  </a>
                </motion.li>
              ))}

              <motion.li variants={itemVariants} className="mobile-menu-cta-wrap">
                <a
                  href={REG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-menu-cta-btn"
                  onClick={close}
                >
                  <span className="btn-pulse-dot" />
                  <Mic2 size={18} /> Register Your Performance
                </a>
              </motion.li>
            </motion.ul>

            <motion.div className="mobile-menu-footer" variants={itemVariants}>
              <a href="https://www.instagram.com/freshbeatsbash" target="_blank" rel="noopener noreferrer" className="mobile-social-link">
                <InstagramIcon size={16} /> @freshbeatsbash
              </a>
              <a href="tel:+917874712871" className="mobile-phone-link">
                <Phone size={14} /> Manav: +91 78747 12871
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
