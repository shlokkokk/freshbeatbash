import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Zap, Sparkles, Flame, Star, ShieldCheck, ArrowUpRight, Handshake } from 'lucide-react'
import { Reveal } from './Reveal'
import { MagneticButton } from './MagneticButton'

const SPONSORS = [
  {
    tier: 'TITLE SPONSOR',
    name: 'YOUR BRAND HERE',
    category: 'Title Partner Spot',
    desc: 'Prime brand exposure across all festival stages, visuals, & print media.',
    accent: 's-lime',
    Icon: Zap,
  },
  {
    tier: 'POWERED BY',
    name: 'POWERED BY SLOT',
    category: 'Co-Presenting Partner',
    desc: 'Main stage branding, VIP arena placement, and live audience integration.',
    accent: 's-cyan',
    Icon: Flame,
  },
  {
    tier: 'EXPERIENCE PARTNER',
    name: 'EXPERIENCE SLOT',
    category: 'Activity & Lounge Spot',
    desc: 'Dedicated photo zone, brand stall, & direct crowd engagement experience.',
    accent: 's-pink',
    Icon: Sparkles,
  },
  {
    tier: 'OFFICIAL MEDIA',
    name: 'MEDIA PARTNER',
    category: 'Media & Streaming',
    desc: 'Official media coverage, digital campaign feature, & reel collaborations.',
    accent: 's-purple',
    Icon: Star,
  },
]

function SponsorCard({ sponsor, delay }) {
  const [rotateX, setRX] = useState(0)
  const [rotateY, setRY] = useState(0)

  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRY(x * 14)
    setRX(-y * 14)
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

  const onLeave = () => {
    setRX(0)
    setRY(0)
  }

  return (
    <Reveal delay={delay}>
      <motion.div
        className={`sponsor-card ${sponsor.accent}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onTouchStart={onTouchMove}
        onTouchMove={onTouchMove}
        onTouchEnd={onLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        style={{ transformPerspective: 900 }}
      >
        <div className="sponsor-card-border" aria-hidden="true" />
        <div className="sponsor-top">
          <span className="sponsor-badge">
            <ShieldCheck size={12} /> {sponsor.tier}
          </span>
          <div className="sponsor-icon-box">
            <sponsor.Icon size={20} />
          </div>
        </div>

        <div className="sponsor-body">
          <h3 className="sponsor-name">{sponsor.name}</h3>
          <span className="sponsor-cat">{sponsor.category}</span>
          <p className="sponsor-desc">{sponsor.desc}</p>
        </div>

        <div className="sponsor-glow" aria-hidden="true" />
      </motion.div>
    </Reveal>
  )
}

export function Sponsors() {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-eyebrow">OUR PARTNERS</span>
          <h2 className="section-title">
            Backed by <em>Visionaries.</em>
          </h2>
          <p className="section-desc">
            The brands powering Fresh Beats Bash 2026 to bring you an insane night.
          </p>
        </Reveal>

        <div className="sponsors-grid">
          {SPONSORS.map((s, i) => (
            <SponsorCard key={s.name} sponsor={s} delay={i * 0.08} />
          ))}
        </div>

        {/* Sponsor Callout / Partnership CTA Box */}
        <Reveal delay={0.35} className="sponsor-cta-card">
          <div className="sponsor-cta-glow" aria-hidden="true" />
          <div className="sponsor-cta-inner">
            <div className="sponsor-cta-content">
              <div className="sponsor-cta-badge">
                <Handshake size={14} /> PARTNER WITH US
              </div>
              <h3 className="sponsor-cta-title">Want Your Brand Featured?</h3>
              <p className="sponsor-cta-desc">
                Put your brand directly in front of 1,000+ hype college students. Custom stalls, logo placements, &amp; stage shoutouts available.
              </p>
            </div>
            <div className="sponsor-cta-action">
              <MagneticButton
                href="tel:+917874712871"
                className="btn btn-primary"
                id="sponsor-call-btn"
              >
                <Award size={16} /> Become a Sponsor <ArrowUpRight size={15} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
