import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'
import { Reveal } from './Reveal'

const STATS = [
  { target: 300, plus: '+', label: 'Students Expected' },
  { target: 20,  plus: '+', label: 'Live Performances' },
  { target: 6,   plus: '+', label: 'Hours of Madness'  },
  { target: 1,   plus: '',  label: 'Night to Remember' },
]

function Counter({ target }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, target, {
      duration: 1.6,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.floor(v) },
    })
    return () => ctrl.stop()
  }, [inView, target])

  return <span ref={ref} className="stat-num">0</span>
}

export function Stats() {
  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.09} className="stat-item">
              <div className="stat-numrow">
                <Counter target={s.target} />
                <span className="stat-plus">{s.plus}</span>
              </div>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
