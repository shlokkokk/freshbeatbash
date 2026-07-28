import { Sunrise, Sunset, CheckCircle2 } from 'lucide-react'
import { Reveal } from './Reveal'

const freshList = [
  'Meet your people before orientation ends',
  'Dance like nobody\'s judging (they\'re not)',
  'Start your collection of insane memories',
  'This is just the very beginning',
]
const fareList = [
  'Get every bit of recognition you deserve',
  'One last song with your entire squad',
  'Toast to the chapter that changed you',
  'Leave a legacy impossible to forget',
]

export function Story() {
  return (
    <section id="story" className="story-section">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-eyebrow">THE CONCEPT</span>
          <h2 className="section-title">One Night. <em>Two Worlds.</em></h2>
          <p className="section-desc">
            A rare collision — the rush of a new beginning and the beauty of a farewell,
            sharing the same dancefloor, the same night, the same memory.
          </p>
        </Reveal>
      </div>

      <div className="story-split">
        <Reveal className="story-half story-fresh">
          <div className="story-inner">
            <div className="story-icon-box story-icon-lime"><Sunrise size={22} /></div>
            <span className="story-tag">WELCOME, FRESHERS</span>
            <h3 className="story-heading">Your Story<br />Starts <span className="text-lime">Here.</span></h3>
            <p className="story-body">
              Step into a world where every hallway holds a new friend, every class holds a new
              challenge, and every night holds the potential for something legendary. Tonight is
              your first chapter.
            </p>
            <ul className="story-list story-list-lime">
              {freshList.map(t => (
                <li key={t}><CheckCircle2 size={15} /> {t}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="story-divider" aria-hidden="true">
          <div className="divider-logo-badge">
            <img src="/logo.png" alt="" />
          </div>
        </div>

        <Reveal delay={0.15} className="story-half story-fare">
          <div className="story-inner story-inner-right">
            <div className="story-icon-box story-icon-pink"><Sunset size={22} /></div>
            <span className="story-tag story-tag-pink">BOW OUT, LEGENDS</span>
            <h3 className="story-heading">Make Your<br />Last Night <span className="text-pink">Count.</span></h3>
            <p className="story-body">
              You built this place. You shaped its culture, left your fingerprints on its walls.
              Now, one final night to celebrate everything you've been — and everything you're
              about to become.
            </p>
            <ul className="story-list story-list-pink">
              {fareList.map(t => (
                <li key={t}><CheckCircle2 size={15} /> {t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
