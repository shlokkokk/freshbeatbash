import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Disc3, Music, Users, Mic, Trophy, Camera, Utensils, Gamepad2, MoveHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from './Reveal'

const CARDS = [
  { id:1, accent:'lime',   Icon:Disc3,       title:'DJ Night',            desc:'A professional DJ who reads the room, builds the vibe, and keeps the floor moving all night. Peak setlists. Peak energy. Zero breaks.',            chip:'All Night Long',       num:'01' },
  { id:2, accent:'cyan',   Icon:Music,        title:'Live Performances',  desc:'Your batchmates on stage — singing, playing, performing with everything they have. Real talent. Real emotion. Guaranteed goosebumps.',          chip:'Student Artists',      num:'02' },
  { id:3, accent:'pink',   Icon:Users,        title:'Dance Showdown',     desc:'Group choreographies, solo acts, freestyle battles — the stage is open to anyone who\'s ever said "watch this" on a dancefloor.',              chip:'Every Style Welcome',  num:'03' },
  { id:4, accent:'purple', Icon:Mic,          title:'Comedy & Skits',     desc:'The funniest people in your batch finally have a mic. Roasts, skits, stand-up — guaranteed to make your jaw hurt from laughing all night.',       chip:'Rated R for Relatable',num:'04' },
  { id:5, accent:'lime',   Icon:Trophy,       title:'Awards Night',       desc:'The most creative superlatives your batch has ever seen. Most likely to be famous. Best campus duo. King & Queen of the night. And many more.',  chip:'Everyone\'s a Winner', num:'05' },
  { id:6, accent:'cyan',   Icon:Camera,       title:'Photo Capsule',      desc:'A dedicated photo experience with instant prints, drop-worthy shots, and a digital gallery that lets you relive this night for years to come.',   chip:'Memories on Film',     num:'06' },
  { id:7, accent:'pink',   Icon:Utensils,     title:'Food Court',         desc:'Curated bites and drinks to keep the energy alive. Street-food favourites, midnight cravings, and everything in between. No one leaves hungry.',  chip:'Fuel the Night',       num:'07' },
  { id:8, accent:'purple', Icon:Gamepad2,     title:'Games & Challenges', desc:'Crowd games, batch challenges, hidden talent reveals, and activities that\'ll have literally everyone screaming — in the best way possible.',     chip:'Everyone Plays',       num:'08' },
]

export function Highlights() {
  const trackRef     = useRef(null)
  const containerRef = useRef(null)
  const [width, setWidth]         = useState(0)
  const [isDragging, setDragging] = useState(false)

  // Measure drag bounds dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && containerRef.current) {
        const scrollW = trackRef.current.scrollWidth
        const outerW  = containerRef.current.offsetWidth
        setWidth(Math.max(0, scrollW - outerW))
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <section id="highlights" className="highlights-section">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-eyebrow">WHAT'S IN STORE</span>
          <h2 className="section-title">Engineered for <em>Memories.</em></h2>
          <p className="section-desc">Eight flavors of an unforgettable night. Pick your vibe or own them all.</p>
          <div className="mobile-drag-hint">
            <MoveHorizontal size={14} /> SWIPE CAROUSEL
          </div>
        </Reveal>
      </div>

      <div className="hl-outer" ref={containerRef}>
        <motion.div
          ref={trackRef}
          className={`hl-track ${isDragging ? 'dragging' : ''}`}
          drag="x"
          dragConstraints={{ left: -width, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 35 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          whileTap={{ cursor: 'grabbing' }}
        >
          {CARDS.map(c => (
            <motion.article
              key={c.id}
              className="hl-card"
              data-accent={c.accent}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="hl-num">{c.num}</span>
              <div className="hl-icon"><c.Icon size={24} /></div>
              <h3 className="hl-title">{c.title}</h3>
              <p className="hl-desc">{c.desc}</p>
              <span className="hl-chip">{c.chip}</span>
            </motion.article>
          ))}
        </motion.div>

        <div className="hl-drag-hint">
          <MoveHorizontal size={14} />
          <span>Drag left or right to explore</span>
        </div>
      </div>
    </section>
  )
}
