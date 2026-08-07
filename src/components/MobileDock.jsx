import { motion } from 'framer-motion'
import { Ticket, Mic2 } from 'lucide-react'

const REG_URL     = 'https://docs.google.com/forms/d/e/1FAIpQLSfBXAG7O4bLi1jpkrnA58_n6wIicrXJYnefLV0K75dHK7-jxQ/viewform'
const PASS_WA_URL = 'https://wa.me/918758766111?text=Hey!%20I%20want%20to%20get%20an%20Attendee%20Entry%20Pass%20for%20Fresh%20Beats%20Bash%202026.'

export function MobileDock() {
  return (
    <motion.aside
      className="mobile-cyber-dock"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 26 }}
      aria-label="Mobile Navigation Quick Bar"
    >
      <div className="mobile-dock-glass">
        {/* Attendee Pass → WhatsApp */}
        <a
          href={PASS_WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-dock-btn dock-pass"
          aria-label="Get Attendee Pass"
        >
          <Ticket size={16} />
          <span>GET PASS</span>
        </a>

        {/* Register Act → Google Form */}
        <a
          href={REG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-dock-btn dock-primary"
          aria-label="Register Your Act"
        >
          <Mic2 size={16} />
          <span>REGISTER ACT</span>
          <span className="dock-btn-glow" />
        </a>
      </div>
    </motion.aside>
  )
}

