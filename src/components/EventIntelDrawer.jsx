import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Sparkles, X, Navigation, Copy, Check } from 'lucide-react'

const REG_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfBXAG7O4bLi1jpkrnA58_n6wIicrXJYnefLV0K75dHK7-jxQ/viewform'
const PASS_WA_URL = 'https://wa.me/918758766111?text=Hey!%20I%20want%20to%20get%20an%20Attendee%20Entry%20Pass%20for%20Fresh%20Beats%20Bash%202026.'
const MAPS_URL = 'https://maps.app.goo.gl/6B3TjDQ9ZnuFAiX57'
const FULL_ADDRESS = 'Cloud3Disco, 3rd Floor, PVR, Ved Transcube Plaza, Vadodara'
const EVENT_DATE = new Date('2026-08-22T16:00:00+05:30')

// Cassette reel component — pure CSS animation, no images
function CassetteReel({ color = '#c8ff00', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className="cassette-reel">
      <circle cx="14" cy="14" r="13" stroke={color} strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="9" stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="14" cy="14" r="4" fill={color} fillOpacity="0.18" />
      <circle cx="14" cy="14" r="2" fill={color} fillOpacity="0.7" />
      <circle cx="14" cy="7"  r="1.5" fill={color} fillOpacity="0.5" />
      <circle cx="20" cy="17.5" r="1.5" fill={color} fillOpacity="0.5" />
      <circle cx="8"  cy="17.5" r="1.5" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

function useCountdown() {
  const calc = () => {
    const diff = EVENT_DATE - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return { d, h, m, s }
  }
  const [ct, setCt] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setCt(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return ct
}

function FlipUnit({ value, label }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="flip-unit">
      <div className="flip-num">{str}</div>
      <div className="flip-label">{label}</div>
    </div>
  )
}

export function EventIntelDrawer({ open, onClose }) {
  const [copied, setCopied] = useState(false)
  const ct = useCountdown()
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-80, 80], [6, -6])
  const rotateY = useTransform(mouseX, [-80, 80], [-8, 8])
  const shimmerX = useTransform(mouseX, [-80, 80], [0, 100])
  const shimmerY = useTransform(mouseY, [-80, 80], [0, 100])

  const shimmerBg = useTransform(
    [shimmerX, shimmerY],
    ([x, y]) =>
      `radial-gradient(ellipse 80% 60% at ${x}% ${y}%, rgba(200,255,0,0.18) 0%, rgba(0,229,255,0.12) 35%, rgba(255,0,102,0.1) 60%, transparent 80%)`
  )

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleCopy = (e) => {
    e.stopPropagation()
    const fallback = (text) => {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;top:0;left:-9999px'
      document.body.appendChild(ta)
      ta.focus(); ta.select()
      try { document.execCommand('copy') } catch {}
      document.body.removeChild(ta)
    }
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(FULL_ADDRESS).catch(() => fallback(FULL_ADDRESS))
      } else { fallback(FULL_ADDRESS) }
    } catch { fallback(FULL_ADDRESS) }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  useEffect(() => {
    if (!open) {
      window.lenis?.start()
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
      return
    }
    window.lenis?.stop()
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    const initY = window.scrollY
    const onScroll = () => { if (Math.abs(window.scrollY - initY) > 5) onClose() }
    const onWheel = () => onClose()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.lenis?.start()
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="eid-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* The ticket panel itself */}
          <motion.aside
            className="eid-panel"
            onClick={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
          >
            {/* Ambient noise texture overlay */}
            <div className="eid-noise" aria-hidden="true" />

            {/* Top header strip */}
            <div className="eid-header">
              <div className="eid-header-brand">
                <Sparkles size={13} className="text-lime" />
                <span className="eid-header-text">EVENT INTEL</span>
              </div>
              <button className="eid-close" onClick={onClose} aria-label="Close">
                <X size={14} />
              </button>
            </div>

            {/* ─── TICKET STUB TOP SECTION ─── */}
            {/* Holographic venue card with 3D tilt */}
            <motion.div
              ref={cardRef}
              className="eid-holo-card"
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Holographic shimmer layer */}
              <motion.div
                className="eid-holo-shimmer"
                style={{ background: shimmerBg }}
                aria-hidden="true"
              />

              <div className="eid-card-top-row">
                <span className="eid-venue-badge">VENUE LOCATION</span>
                <span className="eid-city-tag">VADODARA</span>
              </div>

              <h2 className="eid-venue-name">CLOUD<span className="eid-venue-3">3</span>DISCO</h2>
              <p className="eid-venue-addr">3rd Floor, PVR · Ved Transcube Plaza</p>

              <div className="eid-card-actions">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="eid-btn eid-btn-nav">
                  <Navigation size={12} />
                  <span>Directions ↗</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`eid-btn eid-btn-copy${copied ? ' copied' : ''}`}
                >
                  {copied ? <Check size={12} className="text-lime" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy Addr'}</span>
                </button>
              </div>
            </motion.div>

            {/* ─── PERFORATION TEAR LINE ─── */}
            <div className="eid-perforation" aria-hidden="true">
              <div className="eid-perf-circle left" />
              <div className="eid-perf-dots" />
              <div className="eid-perf-circle right" />
            </div>

            {/* ─── TICKET STUB BOTTOM SECTION ─── */}
            <div className="eid-stub">

              {/* Live countdown */}
              <div className="eid-countdown-wrap">
                <div className="eid-countdown-label">
                  <CassetteReel color="#c8ff00" size={20} />
                  <span>DROPS IN</span>
                  <CassetteReel color="#00e5ff" size={20} />
                </div>
                <div className="eid-countdown">
                  <FlipUnit value={ct.d} label="DAYS" />
                  <span className="flip-sep">:</span>
                  <FlipUnit value={ct.h} label="HRS" />
                  <span className="flip-sep">:</span>
                  <FlipUnit value={ct.m} label="MIN" />
                  <span className="flip-sep">:</span>
                  <FlipUnit value={ct.s} label="SEC" />
                </div>
              </div>

              {/* Date + time row */}
              <div className="eid-info-row">
                <div className="eid-info-block">
                  <span className="eid-info-label">DATE</span>
                  <span className="eid-info-val">SAT 22 AUG '26</span>
                </div>
                <div className="eid-info-divider" />
                <div className="eid-info-block">
                  <span className="eid-info-label">DOORS OPEN</span>
                  <span className="eid-info-val eid-val-cyan">4 PM ONWARDS</span>
                </div>
              </div>

              {/* Action strip */}
              <div className="eid-action-strip">
                <a
                  href={PASS_WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eid-action-btn eid-action-pass"
                  onClick={onClose}
                >
                  <span className="eid-action-icon">🎟</span>
                  <div className="eid-action-text">
                    <span className="eid-action-sub">ATTENDEE ENTRY</span>
                    <span className="eid-action-main">Get Your Pass ↗</span>
                  </div>
                </a>

                <a
                  href={REG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eid-action-btn eid-action-act"
                  onClick={onClose}
                >
                  <span className="eid-action-icon">🎙</span>
                  <div className="eid-action-text">
                    <span className="eid-action-sub">PERFORM LIVE</span>
                    <span className="eid-action-main">Register Your Act ↗</span>
                  </div>
                </a>
              </div>

              {/* Barcode strip */}
              <div className="eid-barcode" aria-hidden="true">
                {Array.from({ length: 40 }).map((_, i) => {
                  const widths  = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3]
                  const heights = [28, 20, 28, 16, 28, 28, 16, 28, 20, 28]
                  return (
                    <div
                      key={i}
                      className="eid-bar"
                      style={{
                        width:   widths[i % 10] + 'px',
                        height:  heights[i % 10] + 'px',
                        opacity: 0.3 + (i % 5) * 0.1,
                      }}
                    />
                  )
                })}
                <span className="eid-barcode-text">FBB-2026 · CLOUD3DISCO</span>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
