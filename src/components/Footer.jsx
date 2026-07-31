import { useMemo } from 'react'
import { Phone } from 'lucide-react'
import { InstagramIcon } from './Icons'

const NAV_LINKS = [
  { href:'#story',      label:'About'      },
  { href:'#highlights', label:'Highlights' },
  { href:'#schedule',   label:'Schedule'   },
  { href:'#gallery',    label:'Gallery'    },
  { href:'#crew',       label:'Team'       },
]

const CONTACTS = [
  { name:'Roshan',  tel:'916359910536',  phone:'+91 63599 10536' },
  { name:'Deex',    tel:'918238218284',  phone:'+91 82382 18284' },
  { name:'Shiv',    tel:'918758766111',  phone:'+91 87587 66111' },
  { name:'Khushal', tel:'918141288107',  phone:'+91 81412 88107' },
  { name:'Manav',   tel:'917874712871',  phone:'+91 78747 12871' },
  { name:'Dhairya', tel:'919510202351',  phone:'+91 95102 02351' },
]

const COLORS = ['var(--lime)', 'var(--cyan)', 'var(--pink)']

function FooterViz() {
  const bars = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      minH:  (Math.random() * 4  + 2).toFixed(1),
      maxH:  (Math.random() * 46 + 8).toFixed(1),
      dur:   (Math.random() * .9 + .35).toFixed(2),
      delay: (Math.random() * 1.4).toFixed(2),
      color: COLORS[i % 3],
    })), [])

  return (
    <div className="footer-viz" aria-hidden="true">
      {bars.map((b, i) => (
        <div
          key={i}
          className="fvbar"
          style={{
            '--min-h': `${b.minH}px`,
            '--max-h': `${b.maxH}px`,
            '--d':     `${b.dur}s`,
            '--dl':    `${b.delay}s`,
            background: b.color,
          }}
        />
      ))}
    </div>
  )
}

export function Footer({ onOpenIntel }) {
  return (
    <footer id="footer">
      <FooterViz />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="Fresh Beats Bash" className="footer-logo" width={60} height={60} />
            <p className="footer-name">FRESH BEATS BASH</p>
            <p className="footer-sub">Freshers × Farewell · 2026</p>
            <p className="footer-tagline-quote">"One Night. Two Worlds. Infinite Memories."</p>

            {/* Venue block */}
            <div className="footer-venue-block">
              <p className="footer-venue-name">CLOUD3DISCO</p>
              <p className="footer-venue-addr">3rd Floor, PVR · Ved Transcube Plaza, Vadodara</p>
              <button onClick={onOpenIntel} className="footer-intel-btn" aria-label="Open event details">
                Directions & Full Details ↗
              </button>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-col-head">Navigate</h4>
            <ul>
              {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-head">Quick Contact</h4>
            {CONTACTS.map(c => (
              <a key={c.name} href={`tel:+${c.tel}`} className="footer-contact-link">
                <Phone size={13} /> {c.name} — {c.phone}
              </a>
            ))}
            <a href="https://www.instagram.com/freshbeatsbash" target="_blank" rel="noopener"
               className="footer-contact-link footer-insta-link">
              <InstagramIcon size={13} /> @freshbeatsbash
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 Fresh Beats Bash. All rights reserved.</p>
          <div className="footer-credit-pill">
            <span>Designed &amp; Built by</span>
            <span className="credit-name">Shlok Shah</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
