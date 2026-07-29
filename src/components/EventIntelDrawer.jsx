import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Sparkles, X, Ticket, Mic2 } from 'lucide-react'

const REG_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfBXAG7O4bLi1jpkrnA58_n6wIicrXJYnefLV0K75dHK7-jxQ/viewform'

export function EventIntelDrawer({ open, onClose }) {
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="event-side-backdrop" onClick={onClose}>
          <motion.aside
            className="event-side-panel"
            onClick={e => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
          >
            <div className="side-panel-header">
              <div className="side-panel-title">
                <Sparkles size={15} className="text-lime" />
                <span>EVENT INTEL</span>
              </div>
              <button className="side-panel-close" onClick={onClose} aria-label="Close details">
                <X size={15} />
              </button>
            </div>

            <div className="side-panel-body">
              <div className="side-detail-card">
                <Calendar size={17} className="icon-lime" />
                <div className="side-detail-text">
                  <span className="side-label">DATE</span>
                  <strong className="side-val">22 AUG 2026</strong>
                </div>
              </div>

              <div className="side-detail-card">
                <Clock size={17} className="icon-cyan" />
                <div className="side-detail-text">
                  <span className="side-label">TIME</span>
                  <strong className="side-val">5:00 PM ONWARDS</strong>
                </div>
              </div>

              <div className="side-detail-card">
                <MapPin size={17} className="icon-pink" />
                <div className="side-detail-text">
                  <span className="side-label">VENUE</span>
                  <strong className="side-val text-pink">COMING SOON</strong>
                </div>
              </div>

              <a
                href="https://wa.me/918758766111?text=Hey!%20I%20want%20to%20get%20an%20Attendee%20Entry%20Pass%20for%20Fresh%20Beats%20Bash%202026."
                target="_blank"
                rel="noopener noreferrer"
                className="side-detail-card side-pass-action-card"
                onClick={onClose}
              >
                <Ticket size={17} className="icon-purple" />
                <div className="side-detail-text">
                  <span className="side-label">ATTENDEE ENTRY PASS</span>
                  <strong className="side-val text-lime">GET ATTENDEE PASS ↗</strong>
                </div>
              </a>

              <a
                href={REG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="side-detail-card side-act-action-card"
                onClick={onClose}
              >
                <Mic2 size={17} className="icon-cyan" />
                <div className="side-detail-text">
                  <span className="side-label">PERFORMANCE ACT</span>
                  <strong className="side-val text-cyan">REGISTER YOUR ACT ↗</strong>
                </div>
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
