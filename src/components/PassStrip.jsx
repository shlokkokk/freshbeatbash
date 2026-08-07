import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Ticket } from "lucide-react"

const PASS_WA_URL = "https://wa.me/918758766111?text=Hey!%20I%20want%20to%20get%20an%20Attendee%20Entry%20Pass%20for%20Fresh%20Beats%20Bash%202026."
const EVENT_DATE  = new Date("2026-08-22T16:00:00+05:30")

function useCountdown() {
  const calc = () => {
    const diff = EVENT_DATE - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    const totalS = Math.floor(diff / 1000)
    const d = Math.floor(totalS / 86400)
    const h = Math.floor((totalS % 86400) / 3600)
    const m = Math.floor((totalS % 3600) / 60)
    const s = totalS % 60
    return { d, h, m, s }
  }
  const [ct, setCt] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setCt(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return ct
}

function pad(n) { return String(n).padStart(2, "0") }

export function PassStrip() {
  const { d, h, m, s } = useCountdown()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="vinyl-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={PASS_WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vinyl-tooltip"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Ticket size={20} className="vt-icon" />
            <div className="vt-body">
              <span className="vt-label">ATTENDEE ENTRY</span>
              <span className="vt-cta">Get Your Pass</span>
              <span className="vt-cd">{d}D {pad(h)}:{pad(m)}:{pad(s)}</span>
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      <motion.a
        href={PASS_WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="vinyl-disc-link"
        aria-label="Get Attendee Pass - Fresh Beats Bash 2026"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 280, damping: 22 }}
        whileTap={{ scale: 0.94 }}
      >
        <svg
          viewBox="0 0 100 100"
          className={hovered ? "vinyl-svg vinyl-paused" : "vinyl-svg"}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="vinyl-sheen" cx="35%" cy="30%" r="55%">
              <stop offset="0%" stopColor="white" stopOpacity="0.14"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="vinyl-label-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#d8ff40"/>
              <stop offset="100%" stopColor="#c8ff00"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="49" fill="#0b0b16"/>
          {[46,43,40,37,34,31,28,25,22,19].map((r, i) => (
            <circle key={r} cx="50" cy="50" r={r}
              fill="none"
              stroke={i % 2 === 0 ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.02)"}
              strokeWidth="0.9"/>
          ))}
          <circle cx="50" cy="50" r="49" fill="url(#vinyl-sheen)"/>
          <circle cx="50" cy="50" r="17" fill="url(#vinyl-label-grad)"/>
          <circle cx="50" cy="50" r="15.5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
          <text x="50" y="47.5"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="800"
            fontFamily="'Bebas Neue', sans-serif"
            fill="#05050c"
            letterSpacing="0.06em">FBB</text>
          <text x="50" y="55.5"
            textAnchor="middle"
            fontSize="3.8"
            fontWeight="600"
            fontFamily="'Space Grotesk', sans-serif"
            fill="rgba(5,5,12,0.65)"
            letterSpacing="0.08em">22 AUG</text>
          <circle cx="50" cy="50" r="2.8" fill="#07070f"/>
          <circle cx="50" cy="50" r="1.8" fill="#0e0e1c"/>
        </svg>
        <span className="vinyl-glow-ring" aria-hidden="true"/>
      </motion.a>
    </div>
  )
}