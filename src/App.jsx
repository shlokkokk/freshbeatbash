import { motion, useScroll } from 'framer-motion'
import { useLenis }    from './hooks/useLenis'
import { Cursor }      from './components/Cursor'
import { Nav }         from './components/Nav'
import { Hero }        from './components/Hero'
import { Marquee }     from './components/Marquee'
import { Stats }       from './components/Stats'
import { Story }       from './components/Story'
import { Highlights }  from './components/Highlights'
import { Schedule }    from './components/Schedule'
import { Stage }       from './components/Stage'
import { Gallery }     from './components/Gallery'
import { Crew }        from './components/Crew'
import { Sponsors }    from './components/Sponsors'
import { Social }      from './components/Social'
import { Footer }      from './components/Footer'
import { MobileDock }  from './components/MobileDock'

export default function App() {
  useLenis()
  const { scrollYProgress } = useScroll()

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      />

      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Stats />
        <Marquee />
        <Story />
        <Highlights />
        <Schedule />
        <Stage />
        <Gallery />
        <Crew />
        <Sponsors />
        <Social />
      </main>

      <Footer />
      <MobileDock />
    </>
  )
}
