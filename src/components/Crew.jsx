import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PhoneCall, 
  Zap, 
  Users, 
  Megaphone, 
  DollarSign, 
  Check,
  Copy,
  X,
  Phone
} from 'lucide-react'
import { Reveal } from './Reveal'

/* ─── 1. DIRECT HOTLINE DIRECTORY ─── */
const DIRECT_CONTACTS = [
  { name: 'Shiv Ramavat',      shortName: 'Shiv Ramavat',    phone: '+91 87587 66111', tel: '918758766111', role: 'Social Media Head' },
  { name: 'Roshan Udvadia',    shortName: 'Roshan',          phone: '+91 63599 10536', tel: '916359910536', role: 'Sponsor Seeker' },
  { name: 'Deex Udvadia',      shortName: 'Deex',            phone: '+91 82382 18284', tel: '918238218284', role: 'Public Relations' },
  { name: 'Khushal Prajapati', shortName: 'Khushal',         phone: '+91 81412 88107', tel: '918141288107', role: 'Public Relations' },
  { name: 'Parmar Rudraksha',  shortName: 'Rudraksha',       phone: '+91 78740 88365', tel: '917874088365', role: 'Finance Head' },
  { name: 'Dhairya Manvar',    shortName: 'Dhairya',         phone: '+91 95102 02351', tel: '919510202351', role: 'Management Head' },
]

const NUMBER_LOOKUP = {
  'manav solanki': { name: 'Manav Solanki / Rudraksha', phone: '+91 78740 88365', tel: '917874088365', role: 'Chief Organiser' },
  'manav':         { name: 'Manav Solanki / Rudraksha', phone: '+91 78740 88365', tel: '917874088365', role: 'Chief Organiser' },
  'shiv ramavat':  { name: 'Shiv Ramavat',       phone: '+91 87587 66111', tel: '918758766111', role: 'Social Media Head' },
  'shiv':          { name: 'Shiv Ramavat',       phone: '+91 87587 66111', tel: '918758766111', role: 'Social Media Head' },
  'dhairya manvar':{ name: 'Dhairya Manvar',     phone: '+91 95102 02351', tel: '919510202351', role: 'Management Head' },
  'dhairya':       { name: 'Dhairya Manvar',     phone: '+91 95102 02351', tel: '919510202351', role: 'Management Head' },
  'roshan':        { name: 'Roshan Udvadia',     phone: '+91 63599 10536', tel: '916359910536', role: 'Sponsor Seeker' },
  'dhrumil':       { name: 'Roshan Udvadia & Dhrumil', phone: '+91 63599 10536', tel: '916359910536', role: 'Sponsorship Team' },
  'deex':          { name: 'Deex Udvadia',       phone: '+91 82382 18284', tel: '918238218284', role: 'Public Relations' },
  'khushal':       { name: 'Khushal Prajapati',  phone: '+91 81412 88107', tel: '918141288107', role: 'Public Relations' },
  'rudraksha':     { name: 'Parmar Rudraksha',   phone: '+91 78740 88365', tel: '917874088365', role: 'Finance Head' },
}

/* ─── 2. SUPPORTED BY LEADERSHIP DATA ─── */
const SUPPORTED_BY = [
  { name: 'Manav Solanki',     initials: 'MS', role: 'Event Lead' },
  { name: 'Soham Patel',       initials: 'SP', role: 'Advisor' },
  { name: 'Shyam Pandya',      initials: 'SP', role: 'Advisor' },
  { name: 'Prashant Vadagama', initials: 'PV', role: 'Advisor' },
]

/* ─── CONTACT POPUP MODAL ─── */
function ContactModal({ contact, onClose }) {
  const [copied, setCopied] = useState(false)
  if (!contact) return null

  const getInitials = (fullName) => {
    if (!fullName) return 'FB'
    const parts = fullName.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return fullName.slice(0, 2).toUpperCase()
  }

  const initials = getInitials(contact.name)

  const copyNumber = () => {
    navigator.clipboard.writeText(contact.phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="crew-modal-overlay" onClick={onClose}>
      <motion.div 
        className="crew-modal-card"
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-glow-bg" />

        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={16} />
        </button>

        <div className="modal-avatar-wrapper">
          <div className="modal-avatar-ring" />
          <div className="modal-avatar">{initials}</div>
        </div>

        <div className="modal-header-info">
          <div className="modal-status-pill">
            <span className="pulse-dot" />
            <span>DIRECT HOTLINE</span>
          </div>
          <span className="modal-badge">{contact.role}</span>
          <h3 className="modal-title">{contact.name}</h3>
        </div>

        <div className="modal-actions-box">
          <span className="modal-phone-text">{contact.phone}</span>
          <div className="modal-btns-row">
            <a href={`tel:+${contact.tel}`} className="modal-call-action">
              <PhoneCall size={15} />
              <span>Call Now</span>
            </a>
            <button onClick={copyNumber} className="modal-copy-action">
              {copied ? <Check size={15} className="text-lime" /> : <Copy size={15} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── MAIN CREW COMPONENT ─── */
export function Crew() {
  const [activeModal, setActiveModal] = useState(null)

  const handleNameClick = (nameKey) => {
    const key = nameKey.toLowerCase().trim()
    const found = NUMBER_LOOKUP[key]
    if (found) {
      setActiveModal(found)
    }
  }

  return (
    <section id="crew" className="revamped-crew-section">
      <div className="container">
        
        {/* Section Header */}
        <Reveal className="section-header">
          <span className="section-eyebrow">EVENT CREW</span>
          <h2 className="section-title">
            The Team <em>Behind The Bash.</em>
          </h2>
          <p className="section-desc">
            Organisers, department leads, and ground team for Fresh Beats Bash 2026.
          </p>
        </Reveal>

        <div className="crew-tier-container">
          
          {/* 1. TOP SECTION: DIRECT CALL HOTLINES */}
          <div className="crew-hotline-bar hotline-top-position">
            <div className="hotline-bar-title">
              <Phone size={14} className="text-lime" />
              <span>DIRECT CALL HOTLINES</span>
            </div>
            <div className="hotline-chips-grid">
              {DIRECT_CONTACTS.map((item) => (
                <div key={item.name} className="hotline-quick-chip" onClick={() => setActiveModal(item)}>
                  <div className="hotline-chip-meta">
                    <span className="quick-chip-role">{item.role}</span>
                    <strong className="quick-chip-name">{item.name}</strong>
                  </div>
                  <div className="hotline-chip-action">
                    <span className="quick-chip-num">{item.phone}</span>
                    <div className="quick-chip-btn">
                      <PhoneCall size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. SECOND SECTION: SOCIAL MEDIA & MANAGEMENT (50/50 ACROSS) */}
          <div className="tier-duo-row">
            
            {/* Card 1: SOCIAL MEDIA */}
            <div className="crew-card-box card-social">
              <div className="card-top-head">
                <span className="card-icon-pill accent-pink">
                  <Megaphone size={15} />
                </span>
                <span className="card-dept-tag">SOCIAL MEDIA</span>
              </div>

              <div className="card-lead-identity" onClick={() => handleNameClick('shiv ramavat')}>
                <div className="lead-avatar-circle circle-pink">SR</div>
                <div className="lead-text-meta">
                  <span className="lead-label-title">DEPARTMENT HEAD</span>
                  <h3 className="lead-fullname">Shiv Ramavat</h3>
                </div>
                <button className="lead-call-trigger" title="Contact Shiv Ramavat">
                  <PhoneCall size={14} />
                </button>
              </div>

              <div className="card-team-subblock">
                <span className="subblock-heading">TEAM MEMBERS</span>
                <div className="team-tags-flex">
                  {['Vaibhav', 'Yash', 'Nupur', 'Prachi', 'Riddhi', 'Shlok Shah'].map((m) => (
                    <span key={m} className="team-chip-item">{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: MANAGEMENT & PUBLIC RELATIONS */}
            <div className="crew-card-box card-management">
              <div className="card-top-head">
                <span className="card-icon-pill accent-cyan">
                  <Users size={15} />
                </span>
                <span className="card-dept-tag">MANAGEMENT</span>
              </div>

              <div className="card-lead-identity" onClick={() => handleNameClick('dhairya')}>
                <div className="lead-avatar-circle circle-cyan">DM</div>
                <div className="lead-text-meta">
                  <span className="lead-label-title">DEPARTMENT HEAD</span>
                  <h3 className="lead-fullname">Dhairya Manvar</h3>
                </div>
                <button className="lead-call-trigger" title="Contact Dhairya">
                  <PhoneCall size={14} />
                </button>
              </div>

              <div className="card-team-subblock">
                <span className="subblock-heading">PUBLIC RELATIONS TEAM</span>
                <div className="team-tags-flex">
                  {['Khushal', 'Dev', 'Deex', 'Kushal', 'Milan', 'Rudra', 'Het', 'Prince', 'Parth', 'Manthan', 'Dhaval'].map((m) => {
                    const key = m.toLowerCase()
                    const isCallable = !!NUMBER_LOOKUP[key]
                    return (
                      <span 
                        key={m} 
                        className={`team-chip-item ${isCallable ? 'chip-clickable' : ''}`}
                        onClick={() => isCallable && handleNameClick(m)}
                      >
                        {m} {isCallable && <PhoneCall size={10} className="chip-phone-icon" />}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* 3. THIRD SECTION: SPONSOR SEEKERS & FINANCE (50/50 ACROSS) */}
          <div className="tier-duo-row">
            
            {/* Card 3: SPONSOR SEEKERS */}
            <div className="crew-card-box card-sponsor">
              <div className="card-top-head">
                <span className="card-icon-pill accent-orange">
                  <Zap size={15} />
                </span>
                <span className="card-dept-tag">SPONSOR SEEKERS</span>
              </div>

              <div className="duo-leads-inline">
                <div className="duo-lead-item" onClick={() => handleNameClick('roshan')}>
                  <div className="lead-avatar-circle circle-orange">RU</div>
                  <div className="lead-text-meta">
                    <span className="lead-label-title">SEEKER 1</span>
                    <h3 className="lead-fullname">Roshan</h3>
                  </div>
                  <button className="lead-call-trigger" title="Contact Roshan">
                    <PhoneCall size={13} />
                  </button>
                </div>

                <div className="duo-lead-item lead-static">
                  <div className="lead-avatar-circle circle-orange">DH</div>
                  <div className="lead-text-meta">
                    <span className="lead-label-title">SEEKER 2</span>
                    <h3 className="lead-fullname">Dhrumil</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: FINANCE */}
            <div className="crew-card-box card-finance">
              <div className="card-top-head">
                <span className="card-icon-pill accent-green">
                  <DollarSign size={15} />
                </span>
                <span className="card-dept-tag">FINANCE</span>
              </div>

              <div className="card-lead-identity" onClick={() => handleNameClick('rudraksha')}>
                <div className="lead-avatar-circle circle-green">RK</div>
                <div className="lead-text-meta">
                  <span className="lead-label-title">FINANCE LEAD</span>
                  <h3 className="lead-fullname">Rudraksha</h3>
                </div>
                <button className="lead-call-trigger" title="Contact Rudraksha">
                  <PhoneCall size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* 4. FOURTH SECTION: SUPPORTED BY STRIP */}
          <div className="supported-strip-container">
            <div className="supported-strip-label">
              <span className="supported-dot-pulse" />
              <span>SUPPORTED BY</span>
            </div>
            <div className="supported-strip-pills">
              {['Manav Solanki', 'Soham Patel', 'Shyam Pandya', 'Prashant Vadagama'].map((name) => (
                <div key={name} className="supported-pill-item">
                  <span className="supported-pill-name">{name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* MODAL POPUP */}
        <AnimatePresence>
          {activeModal && (
            <ContactModal contact={activeModal} onClose={() => setActiveModal(null)} />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
