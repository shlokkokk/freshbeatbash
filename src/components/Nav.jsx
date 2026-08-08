import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mic2, X, Calendar, CalendarPlus, Clock, MapPin, ChevronRight, Sparkles, Ticket, Phone } from 'lucide-react'
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
const PASS_WA_URL = 'https://wa.me/918758766111?text=Hey!%20I%20want%20to%20get%20an%20Attendee%20Entry%20Pass%20for%20Fresh%20Beats%20Bash%202026.'

export function Nav({ onOpenIntel }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body, document & Lenis scroll completely when menu is open
  useEffect(() => {
    if (open) {
      window.lenis?.stop()
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      document.body.classList.add('mobile-menu-open')
    } else {
      window.lenis?.start()
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
      document.body.classList.remove('mobile-menu-open')
    }
    return () => {
      window.lenis?.start()
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
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, staggerChildren: 0.03, staggerDirection: -1 },
    },
  }

  const itemVariants = {
    hidden:  { y: 30, opacity: 0 },
    visible: { y: 0,  opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    exit:    { y: -15, opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={close}>
            <img src="/logo.png" alt="Fresh Beats Bash" className="nav-logo-img" width={34} height={34} />
            <span className="nav-logo-text">FRESH BEATS BASH</span>
          </a>

          <div className="nav-hud-chip" onClick={onOpenIntel} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
            <span className="hud-part"><Calendar size={11} /> 22 AUG '26</span>
            <span className="hud-dot">•</span>
            <span className="hud-part"><Clock size={11} /> 4 PM</span>
            <span className="hud-dot">•</span>
            <span className="hud-part hud-venue-text"><MapPin size={11} /> CLOUD3DISCO</span>
          </div>

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

      {/* Fullscreen Cyber Stage Holographic Control Deck */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-drawer"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Ambient Background Spotlights inside menu */}
            <div className="mobile-menu-orb orb-lime" aria-hidden="true" />
            <div className="mobile-menu-orb orb-pink" aria-hidden="true" />

            <div className="mobile-menu-header">
              <div className="mobile-menu-brand">
                <img src="/logo.png" alt="Fresh Beats Bash" width={32} height={32} />
                <span>FRESH BEATS BASH</span>
              </div>
              <button className="mobile-close-btn" onClick={close} aria-label="Close Menu">
                <X size={14} /> Close
              </button>
            </div>

            {/* Embedded Event Intel Quick Banner */}
            <motion.div
              variants={itemVariants}
              className="mobile-intel-banner"
              onClick={onOpenIntel}
            >
              <div className="banner-left">
                <Sparkles size={13} className="text-lime" />
                <span className="banner-date">22 AUG '26</span>
                <span className="banner-sep">•</span>
                <span className="banner-time">4 PM</span>
                <span className="banner-sep">•</span>
                <span className="banner-venue">CLOUD3DISCO</span>
              </div>
              <span className="banner-tag">PASS &amp; INFO ↗</span>
            </motion.div>

            {/* Stage Access Navigation Cards */}
            <motion.ul className="mobile-menu-links">
              {links.map(l => (
                <motion.li key={l.href} variants={itemVariants}>
                  <a href={l.href} className="mobile-menu-link" onClick={close}>
                    <span className="mobile-link-num">{l.num}</span>
                    <span className="mobile-link-text">{l.label}</span>
                    <ChevronRight size={18} className="mobile-link-arrow" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Dual Action CTA Grid & Contact Hub */}
            <div className="mobile-menu-bottom">
              <motion.div variants={itemVariants} className="mobile-menu-cta-grid">
                <a
                  href={PASS_WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-cta-card card-attendee"
                  onClick={close}
                >
                  <Ticket size={15} className="cta-card-icon text-purple" />
                  <span>Attendee Pass ↗</span>
                </a>

                <a
                  href={REG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-cta-card card-performance"
                  onClick={close}
                >
                  <Mic2 size={15} className="cta-card-icon" />
                  <span>Register Act ↗</span>
                </a>
              </motion.div>

              <motion.div className="mobile-menu-footer" variants={itemVariants}>
                <a href="tel:+918758766111" className="mobile-contact-chip">
                  <Phone size={12} /> Shiv
                </a>
                <a
                  href="https://www.instagram.com/freshbeatsbash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-contact-chip"
                >
                  <InstagramIcon size={12} /> @freshbeatsbash
                </a>
                <a href="tel:+916359910536" className="mobile-contact-chip">
                  <Phone size={12} /> Roshan
                </a>
              </motion.div>

              <motion.div className="mobile-menu-credit" variants={itemVariants}>
                <a
                  href="https://wa.me/919512345504"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                >
                  <span>
                    Designed &amp; Built by <strong className="credit-author">Shlok Shah</strong>
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
