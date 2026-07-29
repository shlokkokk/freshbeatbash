import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { X, Maximize2, Play, Pause, Volume2, VolumeX, Sparkles, Film, ChevronLeft, ChevronRight, Flame, Users, Heart, Smile, ZoomIn, ZoomOut } from 'lucide-react'
import { InstagramIcon } from './Icons'
import { Reveal } from './Reveal'

const GALLERY_ITEMS = [
  {
    id: 'aftermovie-2025',
    type: 'video',
    src: '/gallery/freshers-2025.mp4',
    title: 'The 2025 Experience',
    tag: 'OFFICIAL AFTERMOVIE',
    icon: Film,
    span: 'video-hero',
    desc: 'Uncut memories & energy from last year\'s bash'
  },
  {
    id: 'fest-2',
    type: 'image',
    src: '/gallery/fest-2.jpg',
    title: 'Electric Nights',
    tag: 'NIGHT AT THE BASH',
    icon: Flame,
    span: 'col-3',
    desc: 'The crowd bringing pure warmth & energy'
  },
  {
    id: 'fest-1',
    type: 'image',
    src: '/gallery/fest-1.jpg',
    title: 'Under The Spotlights',
    tag: 'MIDNIGHT RECAP',
    icon: Sparkles,
    span: 'col-3',
    desc: 'Laughter and stories made beneath the lights'
  },
  {
    id: 'fest-3',
    type: 'image',
    src: '/gallery/fest-3.png',
    title: 'Fresh Beats Family',
    tag: 'THE CREW',
    icon: Smile,
    span: 'crew-hero',
    desc: 'The faces behind the memories'
  },
  {
    id: 'fest-4',
    type: 'image',
    src: '/gallery/fest-4.jpg',
    title: 'Friends & Vibes',
    tag: 'TOGETHER',
    icon: Users,
    span: 'col-3',
    desc: 'The people who make Fresh Beats Bash unforgettable'
  },
  {
    id: 'fest-5',
    type: 'image',
    src: '/gallery/fest-5.jpg',
    title: 'Shared Moments',
    tag: 'MEMORIES',
    icon: Heart,
    span: 'col-3',
    desc: 'Snapshots of a night to remember'
  },
]

export function Gallery() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)

  const videoRef = useRef(null)
  const selectedItem = selectedItemIndex !== null ? GALLERY_ITEMS[selectedItemIndex] : null

  const handlePrev = (e) => {
    e.stopPropagation()
    setIsZoomed(false)
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1))
    }
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setIsZoomed(false)
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0))
    }
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return
      if (e.key === 'Escape') {
        setIsZoomed(false)
        setSelectedItemIndex(null)
      }
      if (e.key === 'ArrowLeft') handlePrev(e)
      if (e.key === 'ArrowRight') handleNext(e)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedItemIndex])

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const toggleInlineVideoPlay = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleInlineVideoMute = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <Reveal className="section-header text-center">
          <span className="section-eyebrow">
            <Sparkles size={13} className="inline-icon text-lime" /> MEMORIES ARCHIVE // 2025 - 2026
          </span>
          <h2 className="section-title">
            The Energy <em>Speaks.</em>
          </h2>
          <p className="section-desc">
            A glimpse of last year's madness — uncut aftermovie, electric energy, and legendary memories.
          </p>
        </Reveal>

        <LayoutGroup>
          <motion.div layout className="gallery-bento-grid">
            <AnimatePresence mode="popLayout">
              {GALLERY_ITEMS.map((item, idx) => {
                const ItemIcon = item.icon || Sparkles

                if (item.type === 'video') {
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="bento-cell bento-video-hero"
                    >
                      <div className="video-card-inner">
                        <video
                          ref={videoRef}
                          src={item.src}
                          autoPlay
                          muted={isMuted}
                          playsInline
                          onEnded={handleVideoEnded}
                          onContextMenu={e => e.preventDefault()}
                          onDragStart={e => e.preventDefault()}
                          className="bento-video-player protected-media"
                          onClick={() => setSelectedItemIndex(idx)}
                        />

                        {/* Top Video Badge */}
                        <div className="video-header-badge">
                          <span className="live-dot" />
                          <ItemIcon size={11} />
                          <span>{item.tag}</span>
                        </div>

                        {/* Video Controls Overlay */}
                        <div className="video-controls-overlay">
                          <div className="video-info">
                            <span className="video-title">{item.title}</span>
                            <span className="video-desc">{item.desc}</span>
                          </div>

                          <div className="video-btn-group">
                            <button
                              className="video-ctrl-btn"
                              onClick={toggleInlineVideoPlay}
                              title={isPlaying ? 'Pause' : 'Play'}
                            >
                              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                            </button>

                            <button
                              className="video-ctrl-btn"
                              onClick={toggleInlineVideoMute}
                              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                            >
                              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-lime" />}
                            </button>

                            <button
                              className="video-ctrl-btn btn-fullscreen"
                              onClick={() => setSelectedItemIndex(idx)}
                              title="Full Screen Cinema View"
                            >
                              <Maximize2 size={14} />
                              <span className="btn-label">CINEMA VIEW</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`bento-cell bento-${item.span}`}
                    onClick={() => {
                      setIsZoomed(false)
                      setSelectedItemIndex(idx)
                    }}
                  >
                    <div className="bento-img-wrap">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        onContextMenu={e => e.preventDefault()}
                        onDragStart={e => e.preventDefault()}
                        className="protected-media"
                      />
                      <div className="bento-glass-overlay">
                        <div className="bento-tag-chip">
                          <ItemIcon size={11} className="inline-icon text-lime" />
                          <span>{item.tag}</span>
                        </div>
                        <div className="bento-details">
                          <span className="bento-item-title">{item.title}</span>
                          <span className="bento-item-view">
                            <Maximize2 size={12} /> VIEW
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Fullscreen Holographic Cinema Lightbox */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                className="cinema-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  setIsZoomed(false)
                  setSelectedItemIndex(null)
                }}
              >
                <div className="cinema-container" onClick={e => e.stopPropagation()}>
                  {/* Left / Right Nav Arrows */}
                  <button className="cinema-nav-btn nav-prev" onClick={handlePrev} aria-label="Previous">
                    <ChevronLeft size={20} />
                  </button>

                  <button className="cinema-nav-btn nav-next" onClick={handleNext} aria-label="Next">
                    <ChevronRight size={20} />
                  </button>

                  {/* Media Content */}
                  <div className="cinema-media-wrap">
                    {selectedItem.type === 'video' ? (
                      <video
                        src={selectedItem.src}
                        controls
                        autoPlay
                        muted
                        playsInline
                        onContextMenu={e => e.preventDefault()}
                        onDragStart={e => e.preventDefault()}
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        className="cinema-video protected-media"
                      />
                    ) : (
                      <div
                        className="cinema-img-zoom-viewport"
                        onClick={() => setIsZoomed(!isZoomed)}
                        title={isZoomed ? "Click to Zoom Out" : "Click to Zoom In"}
                      >
                        <motion.img
                          src={selectedItem.src}
                          alt={selectedItem.title}
                          onContextMenu={e => e.preventDefault()}
                          onDragStart={e => e.preventDefault()}
                          animate={{ scale: isZoomed ? 2.1 : 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className={`cinema-img protected-media ${isZoomed ? 'zoomed-in' : ''}`}
                        />
                        <div className="zoom-indicator-pill">
                          {isZoomed ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
                          <span>{isZoomed ? 'TAP TO UNZOOM' : 'TAP TO ZOOM'}</span>
                        </div>
                      </div>
                    )}

                    <div className="cinema-caption-bar">
                      <div className="caption-text">
                        <div className="caption-tag-row">
                          {selectedItem.icon && <selectedItem.icon size={11} className="text-lime" />}
                          <span className="caption-tag">{selectedItem.tag}</span>
                        </div>
                        <h3>{selectedItem.title}</h3>
                        <p>{selectedItem.desc}</p>
                      </div>

                      <div className="caption-meta">
                        <span className="item-count-chip">
                          {selectedItemIndex + 1} / {GALLERY_ITEMS.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Close Pill Button */}
                  <button
                    className="cinema-close-btn"
                    onClick={() => {
                      setIsZoomed(false)
                      setSelectedItemIndex(null)
                    }}
                    aria-label="Close Lightbox"
                  >
                    <X size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        <Reveal className="gallery-footer">
          <p className="gallery-cta-text">Want to see more uncut photos & clips?</p>
          <a
            href="https://www.instagram.com/freshbeatsbash"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost gallery-ig-btn"
          >
            <InstagramIcon size={17} /> Follow @freshbeatsbash on Instagram ↗
          </a>
        </Reveal>
      </div>
    </section>
  )
}
