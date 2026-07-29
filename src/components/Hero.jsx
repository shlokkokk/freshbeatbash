import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Mic2, ChevronDown, Calendar, Clock, MapPin, Sparkles, X, ChevronRight, Ticket } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

const REG_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfBXAG7O4bLi1jpkrnA58_n6wIicrXJYnefLV0K75dHK7-jxQ/viewform'

// ── Cyber Liquid Waveform Horizon + Sleek Laser Beams + Interactive Constellation ──
function useHeroCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let W = 0, H = 0, rafId = null, frame = 0
    const mouse = { x: -1000, y: -1000, active: false }

    const resize = () => {
      if (!canvas) return
      W = canvas.width  = canvas.offsetWidth  || window.innerWidth  || 1280
      H = canvas.height = canvas.offsetHeight || window.innerHeight || 800
    }
    resize()

    const onMouseMove = e => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onTouchMove = e => {
      if (!e.touches[0]) return
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.touches[0].clientX - rect.left
      mouse.y = e.touches[0].clientY - rect.top
      mouse.active = true
    }
    const onMouseLeave = () => { mouse.active = false }
    const onTouchEnd = () => { mouse.active = false }

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    // 1. Sleek Laser Frequency Beams (Thin, elegant, non-cluttered)
    const BEAM_COUNT = 44
    const beams = Array.from({ length: BEAM_COUNT }, (_, i) => ({
      h:       Math.random() * 0.1 + 0.05,
      targetH: Math.random() * 0.2 + 0.05,
      speed:   Math.random() * 0.06 + 0.03,
      phase:   (i / BEAM_COUNT) * Math.PI * 3,
      tipY:    0,
    }))

    // 2. Cyber Floating Ambient Particles
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    const P_COUNT  = isMobile ? 24 : 50
    const P_COLORS = ['#c8ff00', '#00e5ff', '#ff0066', '#a78bfa']
    const particles = Array.from({ length: P_COUNT }, () => ({
      x:     Math.random() * (W || 1280),
      y:     Math.random() * (H || 800),
      vy:   -(Math.random() * 0.5 + 0.15),
      vx:    (Math.random() - 0.5) * 0.25,
      r:     Math.random() * 1.8 + 0.6,
      color: P_COLORS[Math.floor(Math.random() * P_COLORS.length)],
      alpha: Math.random() * 0.55 + 0.2,
    }))

    let heroVisible = true
    const obs = new IntersectionObserver(e => {
      if (e[0]) heroVisible = e[0].isIntersecting
    }, { threshold: 0 })
    obs.observe(canvas)

    // Helper to draw smooth wave ribbons
    const drawWaveRibbon = (offsetY, ampMult, freqMult, colorStart, colorEnd, opacity) => {
      ctx.beginPath()
      const baseLine = H - offsetY
      ctx.moveTo(0, H)
      ctx.lineTo(0, baseLine)

      const points = 40
      const step = W / points

      for (let i = 0; i <= points; i++) {
        const x = i * step
        // Multi-frequency harmonic wave equation
        const sin1 = Math.sin(frame * 1.4 * freqMult + i * 0.18) * 28 * ampMult
        const sin2 = Math.cos(frame * 2.2 * freqMult - i * 0.12) * 16 * ampMult
        const sin3 = Math.sin(frame * 0.8 + i * 0.25) * 10

        // Mouse displacement ripple
        let mouseDist = 0
        if (mouse.active) {
          const dx = x - mouse.x
          const dy = baseLine - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            mouseDist = (1 - dist / 180) * 35 * Math.sin(frame * 4)
          }
        }

        const y = baseLine + sin1 + sin2 + sin3 + mouseDist
        if (i === 0) ctx.lineTo(x, y)
        else {
          const prevX = (i - 1) * step
          const cx = (prevX + x) / 2
          ctx.quadraticCurveTo(prevX, y, cx, y)
        }
      }

      ctx.lineTo(W, H)
      ctx.closePath()

      const grad = ctx.createLinearGradient(0, H - offsetY - 40, 0, H)
      grad.addColorStop(0, colorStart)
      grad.addColorStop(1, colorEnd)
      ctx.fillStyle = grad
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.globalAlpha = 1.0
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      if (!heroVisible || W <= 0 || H <= 0) return

      try {
        frame += 0.025
        ctx.clearRect(0, 0, W, H)

        // ── 1. BACKGROUND GLOW ORB ──
        const centerGlow = ctx.createRadialGradient(W / 2, H * 0.8, 10, W / 2, H * 0.8, W * 0.45)
        centerGlow.addColorStop(0, 'rgba(200, 255, 0, 0.04)')
        centerGlow.addColorStop(0.5, 'rgba(0, 229, 255, 0.025)')
        centerGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = centerGlow
        ctx.fillRect(0, 0, W, H)

        // ── 2. FLUID LIQUID CYBER WAVE RIBBONS ──
        // Ribbon 1: Deep Cyan / Purple
        drawWaveRibbon(120, 1.2, 0.9, 'rgba(0, 229, 255, 0.25)', 'rgba(124, 58, 237, 0.02)', 0.7)
        // Ribbon 2: Hot Magenta Pink
        drawWaveRibbon(85, 1.0, 1.2, 'rgba(255, 0, 102, 0.35)', 'rgba(255, 0, 102, 0.01)', 0.8)
        // Ribbon 3: Front Electric Lime
        drawWaveRibbon(50, 0.85, 1.5, 'rgba(200, 255, 0, 0.45)', 'rgba(200, 255, 0, 0.01)', 0.9)

        // ── 3. SLEEK LASER FREQUENCY SPECTRUM BEAMS ──
        const beamW = W / BEAM_COUNT
        const maxH  = H * 0.28
        const beat  = Math.pow(Math.sin(frame * 2.5), 6) * 0.3

        for (let i = 0; i < BEAM_COUNT; i++) {
          const b = beams[i]
          const t = i / BEAM_COUNT
          const wave = Math.sin(frame * 2 + b.phase) * 0.12

          b.targetH = Math.max(0.03, Math.min(0.55, 0.08 + wave + beat))
          if (Math.random() < 0.02) b.targetH += Math.random() * 0.3

          b.h += (b.targetH - b.h) * b.speed
          const bh = b.h * maxH
          const x  = i * beamW + beamW / 2
          const y  = H - bh

          // Beam color gradient
          let col = '#c8ff00'
          if (t > 0.3) col = '#00e5ff'
          if (t > 0.65) col = '#ff0066'

          // Laser line (ultra sleek 2px width)
          ctx.strokeStyle = col
          ctx.globalAlpha = 0.4 + b.h * 1.2
          ctx.lineWidth   = 2
          ctx.beginPath()
          ctx.moveTo(x, H)
          ctx.lineTo(x, y)
          ctx.stroke()

          // Laser Tip Glow Dot
          ctx.fillStyle = '#ffffff'
          ctx.globalAlpha = 0.9
          ctx.beginPath()
          ctx.arc(x, y, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1.0

        // ── 4. FLOATING CONSTELLATION PARTICLES + TENDRILLS ──
        ctx.save()
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          p.y += p.vy
          p.x += p.vx + Math.sin(frame * 1.2 + i) * 0.2

          if (p.y < -10) {
            p.y = H + 10
            p.x = Math.random() * W
          }

          // Render particle
          ctx.globalAlpha = p.alpha
          ctx.fillStyle   = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()

          // Connect nearby particles with delicate energy threads
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 90) {
              ctx.strokeStyle = p.color
              ctx.globalAlpha = (1 - dist / 90) * 0.12
              ctx.lineWidth   = 0.75
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
        ctx.restore()
      } catch (err) {
        // Prevent crash
      }
    }

    requestAnimationFrame(tick)

    const onVis = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null
      } else if (!rafId) {
        requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      obs.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [canvasRef])
}

const WORDS = [
  { text: 'FRESH', cls: 'htl-fresh' },
  { text: 'BEATS', cls: 'htl-beats' },
  { text: 'BASH',  cls: 'htl-bash'  },
]

export function Hero({ onOpenIntel }) {
  const canvasRef = useRef(null)
  const heroRef   = useRef(null)
  useHeroCanvas(canvasRef)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentOp = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section id="hero" ref={heroRef} className="hero">
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        aria-hidden="true"
      />

      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      <motion.div className="hero-content" style={{ y: contentY, opacity: contentOp }}>
        {/* Logo */}
        <motion.div
          className="hero-logo-wrap"
          initial={{ scale: .55, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 1, ease: [0.34,1.56,0.64,1] }}
        >
          <div className="hero-logo-ring ring-outer" aria-hidden="true" />
          <div className="hero-logo-ring ring-inner" aria-hidden="true" />
          <img src="/logo.png" alt="Fresh Beats Bash" className="hero-logo" width={155} height={155} />
        </motion.div>

        {/* Title — each word slides up through a mask */}
        <h1 className="hero-title" aria-label="Fresh Beats Bash">
          {WORDS.map((w, wi) => (
            <span key={w.text} className={`htl ${w.cls}`} style={{ display:'block', overflow:'hidden' }}>
              <motion.span
                style={{ display:'block' }}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + wi * 0.14, ease: [0.16,1,0.3,1] }}
              >
                {w.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Holographic Cyber Event Pass Pill (Desktop Full / Mobile Trigger) */}
        <motion.div
          className="hero-event-pass"
          onClick={onOpenIntel}
          role="button"
          tabIndex={0}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: 0.75, ease: [0.16,1,0.3,1] }}
        >
          <div className="desktop-pass-content">
            <div className="pass-pill-segment">
              <Calendar size={13} className="pass-icon pass-icon-lime" />
              <span className="pass-val">22 AUG 2026</span>
            </div>
            <span className="pass-dot-divider" />
            <div className="pass-pill-segment">
              <Clock size={13} className="pass-icon pass-icon-cyan" />
              <span className="pass-val">5:00 PM ONWARDS</span>
            </div>
            <span className="pass-dot-divider" />
            <div className="pass-pill-segment">
              <MapPin size={13} className="pass-icon pass-icon-pink" />
              <span className="pass-val pass-venue-highlight">VENUE ANNOUNCING SOON</span>
            </div>
          </div>

          <div className="mobile-pass-trigger-btn">
            <Sparkles size={13} className="sparkle-icon" />
            <span>EVENT INTEL · 22 AUG '26</span>
            <ChevronRight size={14} className="arrow-icon" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: 0.88, ease: [0.16,1,0.3,1] }}
        >
          Where new stories begin &amp; legends take their final bow
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: 1.0, ease: [0.16,1,0.3,1] }}
        >
          <MagneticButton href={REG_URL} target="_blank" rel="noopener noreferrer" className="btn btn-audio-reactor" id="hero-reg-btn">
            <span className="btn-eq-bars" aria-hidden="true">
              <span className="eq-bar eq-1" />
              <span className="eq-bar eq-2" />
              <span className="eq-bar eq-3" />
              <span className="eq-bar eq-4" />
            </span>
            <Mic2 size={17} /> Register Your Act
          </MagneticButton>
          <MagneticButton href="#story" className="btn btn-ghost">
            Discover the Night <ChevronDown size={17} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
