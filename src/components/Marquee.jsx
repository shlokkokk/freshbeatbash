const TICKER = [
  'FRESH BEATS BASH', 'DJ NIGHT', 'LIVE PERFORMANCES',
  'DANCE SHOWDOWN', 'COMEDY & SKITS', 'AWARDS NIGHT',
  'PHOTO CAPSULE', 'FOOD COURT', 'CAMPUS GAMES',
  'FRESHERS × FAREWELL', '2026',
]

const text = TICKER.join('  ·  ') + '  ·  '

export function Marquee() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {/* Duplicate for seamless loop */}
        <span className="marquee-content">{text}</span>
        <span className="marquee-content" aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}
