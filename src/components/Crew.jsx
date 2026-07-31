import { useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneCall, ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'

const CREW = [
  { name: 'Roshan Udvadia',    phone: '+91 63599 10536', tel: '916359910536', initials: 'RU', accent: 'ca-purple' },
  { name: 'Deex Udvadia',      phone: '+91 82382 18284', tel: '918238218284', initials: 'DU', accent: 'ca-amber'  },
  { name: 'Shiv Ramavat',      phone: '+91 87587 66111', tel: '918758766111', initials: 'SR', accent: 'ca-cyan'   },
  { name: 'Khushal Prajapati', phone: '+91 81412 88107', tel: '918141288107', initials: 'KP', accent: 'ca-lime'   },
  { name: 'Manav Solanki',     phone: '+91 78747 12871', tel: '917874712871', initials: 'MS', accent: 'ca-pink'   },
  { name: 'Dhairya Manvar',    phone: '+91 95102 02351', tel: '919510202351', initials: 'DM', accent: 'ca-purple' },
]

function CrewCard({ member, delay }) {
  const [rotateX, setRX] = useState(0)
  const [rotateY, setRY] = useState(0)

  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRY(x * 14)
    setRX(-y * 14)
  }
  const onLeave = () => {
    setRX(0)
    setRY(0)
  }

  const onTouchMove = e => {
    if (!e.touches[0]) return
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const x = (touch.clientX - rect.left) / rect.width - 0.5
    const y = (touch.clientY - rect.top) / rect.height - 0.5
    setRY(x * 14)
    setRX(-y * 14)
  }
  const onTouchEnd = () => {
    setRX(0)
    setRY(0)
  }

  return (
    <Reveal delay={delay}>
      <motion.div
        className="crew-card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onTouchStart={onTouchMove}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        style={{ transformPerspective: 900 }}
      >
        <div className="crew-card-glow" aria-hidden="true" />

        {/* Holographic Monogram Avatar Ring */}
        <div className={`crew-avatar-wrap ${member.accent}`}>
          <div className="crew-avatar-ring" aria-hidden="true" />
          <div className="crew-avatar-inner">
            <span className="crew-initials">{member.initials}</span>
          </div>
        </div>

        <div className="crew-info">
          <h3 className="crew-name">{member.name}</h3>

          <a href={`tel:+${member.tel}`} className="crew-phone-btn">
            <PhoneCall size={13} /> {member.phone} <ArrowUpRight size={12} className="phone-arrow" />
          </a>
        </div>

        {/* Cyber Beat Visualizer Spectrum Bars */}
        <div className={`crew-beat-bars ${member.accent}`} aria-hidden="true">
          <span className="cbar cb-1" />
          <span className="cbar cb-2" />
          <span className="cbar cb-3" />
          <span className="cbar cb-4" />
          <span className="cbar cb-5" />
        </div>
      </motion.div>
    </Reveal>
  )
}

export function Crew() {
  return (
    <section id="crew" className="crew-section">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-eyebrow">THE TEAM</span>
          <h2 className="section-title">
            The People <em>Behind The Bash.</em>
          </h2>
          <p className="section-desc">
            Got questions or want to connect? Reach out to any of us directly.
          </p>
        </Reveal>
        <div className="crew-grid">
          {CREW.map((m, i) => (
            <CrewCard key={m.name} member={m} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
