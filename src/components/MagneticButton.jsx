import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  id,
  type = 'button',
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 220, damping: 18, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = e => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Pull toward cursor (max 18px offset)
    x.set(distanceX * 0.35)
    y.set(distanceY * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleTouchMove = e => {
    if (!ref.current || !e.touches[0]) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const touch = e.touches[0]
    const distanceX = touch.clientX - centerX
    const distanceY = touch.clientY - centerY

    x.set(distanceX * 0.4)
    y.set(distanceY * 0.4)
  }

  const handleTouchEnd = () => {
    x.set(0)
    y.set(0)
  }

  const Tag = href ? motion.a : motion.button
  const extraProps = href
    ? { href, target, rel, id }
    : { onClick, id, type }

  return (
    <Tag
      ref={ref}
      className={`btn-magnetic-wrap ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      {...extraProps}
    >
      <span className="btn-shimmer-beam" />
      {children}
    </Tag>
  )
}
