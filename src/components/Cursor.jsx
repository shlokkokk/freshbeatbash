import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export function Cursor() {
  const [hoverState, setHoverState] = useState({ mode: 'default', text: '' })
  const isTouch = useRef(typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches)

  // Fast center dot
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Fluid trailing spring ring
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 25, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 25, mass: 0.5 })

  useEffect(() => {
    if (isTouch.current) return

    const handleMouseMove = e => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = e => {
      const target = e.target.closest('a, button, .btn, .gallery-cell, .hl-card, .crew-card, .perf-item')
      if (!target) {
        setHoverState({ mode: 'default', text: '' })
        return
      }

      if (target.closest('.gallery-cell')) {
        setHoverState({ mode: 'gallery', text: 'VIEW' })
      } else if (target.closest('.hl-card, .hl-track')) {
        setHoverState({ mode: 'drag', text: 'EXPLORE' })
      } else if (target.closest('.crew-card')) {
        setHoverState({ mode: 'crew', text: 'CONTACT' })
      } else if (target.closest('a, button, .btn')) {
        setHoverState({ mode: 'button', text: 'OPEN' })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (isTouch.current) return null

  const isHovered = hoverState.mode !== 'default'

  return (
    <div className="cursor-wrapper">
      {/* 1. Precision Center Core Dot */}
      <motion.div
        className="cursor-core-dot"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 2. Cyber Orbital Ring & Context Badge */}
      <motion.div
        className={`cursor-orbit-ring mode-${hoverState.mode}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovered ? 78 : 42,
          height: isHovered ? 36 : 42,
          borderRadius: isHovered ? 100 : 50,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {/* Animated Conic Neon Gradient Border */}
        <div className="cursor-orbit-border" />

        {/* Dynamic Context Label */}
        <AnimatePresence mode="wait">
          {hoverState.text && (
            <motion.span
              key={hoverState.text}
              className="cursor-badge-text"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              {hoverState.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
