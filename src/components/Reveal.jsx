import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 44, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
