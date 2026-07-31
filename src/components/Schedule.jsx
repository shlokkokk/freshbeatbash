import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DoorOpen, Sparkles, Star, Award, Disc3, Moon } from 'lucide-react'
import { Reveal } from './Reveal'

const EVENTS = [
  { side:'left',  Icon:DoorOpen,   phase:'Early Evening', title:'Gates Open',         body:'Arrive, check in, grab your wristband, and soak in the atmosphere as the venue transforms from empty hall to electric arena.' },
  { side:'right', Icon:Sparkles,   phase:'Opening',       title:'Grand Welcome',      body:'An opening ceremony that sets the tone — welcoming freshers by name and honouring every graduating senior in the room.' },
  { side:'left',  Icon:Star,       phase:'Main Event',    title:'Performances Begin', body:'Singers, dancers, comedians, spoken word artists — the full depth of your batch\'s talent, finally given the stage it deserves.' },
  { side:'right', Icon:Award,      phase:'The Honours',   title:'Awards & Tributes',  body:'Superlatives, heartfelt tributes, and recognition that\'ll have people calling their friends mid-ceremony to say "you should have come."' },
  { side:'left',  Icon:Disc3,      phase:'The Peak',      title:'DJ Night Ignites',   body:'The lights drop. The bass kicks in. The entire crowd becomes one. This is the part you\'ll be talking about on graduation day four years from now.' },
  { side:'right', Icon:Moon,       phase:'The Finale',    title:'Midnight Memories',  body:'The last song. The last photo. The hug that says everything words can\'t. The night ends, but what you felt here never does.' },
]

function TimelineItem({ ev, idx }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`tl-item tl-${ev.side}`}
      initial={{ opacity:0, x: ev.side === 'left' ? -40 : 40 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.8, delay: idx * 0.05, ease:[0.16,1,0.3,1] }}
    >
      {ev.side === 'right' && <div className="tl-node" />}
      <div className="tl-content">
        <div className="tl-icon-box"><ev.Icon size={18} /></div>
        <span className="tl-phase">{ev.phase}</span>
        <h3 className="tl-title">{ev.title}</h3>
        <p className="tl-body">{ev.body}</p>
      </div>
      {ev.side === 'left' && <div className="tl-node" />}
    </motion.div>
  )
}

export function Schedule({ onOpenIntel }) {
  const spineRef = useRef(null)
  const spineInView = useInView(spineRef, { once: true })

  return (
    <section id="schedule" className="schedule-section">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-eyebrow">THE NIGHT UNFOLDS</span>
          <h2 className="section-title">How It All <em>Runs.</em></h2>
          <p className="section-desc">Every moment planned, every detail crafted.</p>
          <button
            onClick={onOpenIntel}
            className="schedule-intel-pill"
            aria-label="View venue and event details"
          >
            <span className="schedule-intel-dot" />
            CLOUD3DISCO · 22 AUG · 4 PM — <span className="schedule-intel-cta">Venue & Details ↗</span>
          </button>
        </Reveal>

        <div className="timeline">
          <motion.div
            ref={spineRef}
            className="tl-spine"
            initial={{ scaleY: 0, transformOrigin:'top' }}
            animate={spineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease:[0.16,1,0.3,1], delay: 0.2 }}
          />

          {EVENTS.map((ev, i) => <TimelineItem key={ev.title} ev={ev} idx={i} />)}
        </div>
      </div>
    </section>
  )
}
