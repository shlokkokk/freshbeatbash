import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { X, Maximize2 } from 'lucide-react'
import { InstagramIcon } from './Icons'
import { Reveal } from './Reveal'

const IMAGES = [
  { id:'g1', src:'/gallery/g1.png', alt:'The Dancefloor', cls:'g-tall' },
  { id:'g2', src:'/gallery/g2.png', alt:'On Stage',       cls:''      },
  { id:'g3', src:'/gallery/g3.png', alt:'The Squad',      cls:''      },
  { id:'g4', src:'/gallery/g4.png', alt:'DJ Night',       cls:'g-wide'},
]

export function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-eyebrow">LAST YEAR'S VIBE</span>
          <h2 className="section-title">The Energy <em>Speaks.</em></h2>
          <p className="section-desc">A glimpse of last year's madness. Imagine what this year will be.</p>
        </Reveal>

        {/* LayoutGroup enables shared layout animations between grid cells and lightbox */}
        <LayoutGroup>
          <Reveal className="gallery-grid">
            {IMAGES.map((img, i) => (
              <motion.div
                key={img.id}
                layoutId={`gallery-${img.id}`}
                className={`gallery-cell ${img.cls}`}
                onClick={() => setSelected(img)}
                whileHover={{ scale: 1.025 }}
                transition={{ type:'spring', stiffness:400, damping:30 }}
                style={{ cursor:'pointer' }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-label">
                  <span>{img.alt}</span>
                  <span className="mobile-zoom-tag"><Maximize2 size={11} /> VIEW</span>
                </div>
              </motion.div>
            ))}
          </Reveal>

          {/* Lightbox — morphs from gallery cell via shared layoutId */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  layoutId={`gallery-${selected.id}`}
                  className="lightbox-img-wrap"
                  onClick={e => e.stopPropagation()}
                  transition={{ type:'spring', stiffness:260, damping:26 }}
                >
                  <img src={selected.src} alt={selected.alt} />
                  <div className="lightbox-caption">{selected.alt}</div>
                </motion.div>

                <motion.button
                  className="lightbox-close"
                  onClick={() => setSelected(null)}
                  initial={{ opacity:0, scale:.8 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:.8 }}
                  transition={{ delay:.15 }}
                  aria-label="Close lightbox"
                >
                  <X size={22} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        <Reveal className="gallery-footer">
          <p className="gallery-cta-text">More memories on Instagram</p>
          <a href="https://www.instagram.com/freshbeatsbash" target="_blank" rel="noopener noreferrer"
             className="btn btn-ghost">
            <InstagramIcon size={17} /> @freshbeatsbash
          </a>
        </Reveal>
      </div>
    </section>
  )
}
