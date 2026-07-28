import { motion } from 'framer-motion'
import { Ticket, Compass } from 'lucide-react'
import { InstagramIcon } from './Icons'

const REG_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfBXAG7O4bLi1jpkrnA58_n6wIicrXJYnefLV0K75dHK7-jxQ/viewform'
const IG_URL  = 'https://www.instagram.com/freshbeatsbash'

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
        {/* Instagram Link */}
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-dock-btn dock-secondary"
          aria-label="Instagram"
        >
          <InstagramIcon size={18} />
          <span>IG</span>
        </a>

        {/* Explore Anchors */}
        <a href="#highlights" className="mobile-dock-btn dock-secondary" aria-label="Explore Highlights">
          <Compass size={18} />
          <span>VIBES</span>
        </a>

        {/* Primary Registration CTA */}
        <a
          href={REG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-dock-btn dock-primary"
          aria-label="Register Now"
        >
          <Ticket size={18} />
          <span>REGISTER</span>
          <span className="dock-btn-glow" />
        </a>
      </div>
    </motion.aside>
  )
}
