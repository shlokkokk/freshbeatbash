import { InstagramIcon } from './Icons'
import { Reveal } from './Reveal'
import { MagneticButton } from './MagneticButton'

export function Social() {
  return (
    <section id="contact" className="social-section">
      <div className="social-glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="social-inner">
          <div className="social-icon-wrap"><InstagramIcon size={34} /></div>
          <span className="section-eyebrow">STAY IN THE LOOP</span>
          <h2 className="social-title">Follow the Journey.</h2>
          <p className="social-body">
            Teasers. Behind-the-scenes. Performer announcements. Countdown drops.
            Everything Fresh Beats Bash, live and unfiltered on Instagram.
          </p>
          <MagneticButton
            href="https://www.instagram.com/freshbeatsbash"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram btn-xl"
            id="insta-btn"
          >
            <InstagramIcon size={18} /> @freshbeatsbash
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
