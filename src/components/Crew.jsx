import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, PhoneCall, Crown, Palette, Zap, Radio } from 'lucide-react'
import { Reveal } from './Reveal'

const CREW = [
  { name:'Manav Solanki',  role:'Lead Organizer',    phone:'+91 78747 12871', tel:'917874712871', Icon: Crown,   accent:'ca-lime',   tag:'LEAD'   },
  { name:'Shiv Ramavat',   role:'Creative Director', phone:'+91 87587 66111', tel:'918758766111', Icon: Palette, accent:'ca-cyan',   tag:'DESIGN' },
  { name:'Dhairya Manvar', role:'Event Coordinator', phone:'+91 95102 02351', tel:'919510202351', Icon: Zap,     accent:'ca-pink',   tag:'EVENTS' },
  { name:'Roshan Udvadia', role:'Operations Lead',   phone:'+91 63599 10536', tel:'916359910536', Icon: Radio,   accent:'ca-purple', tag:'OPS'    },
]

function CrewCard({ member, delay }) {
  const [rotateX, setRX] = useState(0)
  const [rotateY, setRY] = useState(0)

  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - .5
    const y = (e.clientY - rect.top)  / rect.height - .5
    setRY(x * 16); setRX(-y * 16)
  }
  const onLeave = () => { setRX(0); setRY(0) }

  const onTouchMove = e => {
    if (!e.touches[0]) return
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const x = (touch.clientX - rect.left) / rect.width  - .5
    const y = (touch.clientY - rect.top)  / rect.height - .5
    setRY(x * 16); setRX(-y * 16)
  }
  const onTouchEnd = () => { setRX(0); setRY(0) }

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
        transition={{ type:'spring', stiffness:280, damping:26 }}
        style={{ transformPerspective: 900 }}
      >
        {/* Holographic Cyber Avatar Badge */}
        <div className={`crew-avatar-wrap ${member.accent}`}>
          <div className="crew-avatar-ring" aria-hidden="true" />
          <div className="crew-avatar-inner">
            <member.Icon size={32} />
          </div>
          <span className="crew-avatar-tag">{member.tag}</span>
        </div>

        <div className="crew-info">
          <h3 className="crew-name">{member.name}</h3>
          <span className="crew-role">{member.role}</span>
          <a href={`tel:+${member.tel}`} className="crew-phone">
            <Phone size={13} /> {member.phone}
            <span className="mobile-action-tag"><PhoneCall size={11} /> CALL</span>
          </a>
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
          <h2 className="section-title">The People <em>Making It Happen.</em></h2>
          <p className="section-desc">Four people. One insane vision. Zero sleep. All for you.</p>
        </Reveal>
        <div className="crew-grid">
          {CREW.map((m, i) => <CrewCard key={m.name} member={m} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}
