import { Users, Music2, Radio, Mic, Clapperboard, Feather } from 'lucide-react'
import { Reveal } from './Reveal'
import { MagneticButton } from './MagneticButton'

const REG_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfBXAG7O4bLi1jpkrnA58_n6wIicrXJYnefLV0K75dHK7-jxQ/viewform'

const PERFS = [
  { Icon: Users,      label: 'Dance'      },
  { Icon: Music2,     label: 'Singing'    },
  { Icon: Radio,      label: 'Instrument' },
  { Icon: Mic,        label: 'Comedy'     },
  { Icon: Clapperboard,label: 'Skit'     },
  { Icon: Feather,    label: 'Poetry'     },
]

export function Stage() {
  return (
    <section id="stage" className="stage-section">
      <div className="stage-lights" aria-hidden="true">
        <div className="sl sl-1" /><div className="sl sl-2" /><div className="sl sl-3" />
      </div>
      <div className="container">
        <Reveal className="stage-inner">
          <span className="section-eyebrow">TAKE THE STAGE</span>
          <h2 className="stage-title">Got a Talent?<br /><em>Own the Spotlight.</em></h2>
          <p className="stage-body">
            From dance to poetry, stand-up to serenade — every form of expression has a place on
            our stage. Register your act and perform in front of 500+ of your peers. This is your moment.
          </p>
          <div className="perf-grid">
            {PERFS.map(({ Icon, label }) => (
              <div key={label} className="perf-item">
                <Icon size={20} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <MagneticButton
            href={REG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-xl"
            id="stage-btn"
          >
            <span className="btn-pulse-dot" />
            <Mic size={18} /> Register Your Performance
          </MagneticButton>
          <p className="stage-note">* Open to all college students. Spots are limited — don't wait.</p>
        </Reveal>
      </div>
    </section>
  )
}
