import { useState } from 'react'
import { BackToTop } from './components/BackToTop'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { PleckShowcase } from './components/PleckShowcase'
import { PortfolioMetaShowcase } from './components/PortfolioMetaShowcase'
import { SkillsBento } from './components/SkillsBento'
import { Timeline } from './components/Timeline'

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <>
      <Navbar onOpenCommandPalette={() => setPaletteOpen((open) => !open)} />
      <main>
        <Hero />
        <PleckShowcase />
        <PortfolioMetaShowcase />
        <SkillsBento />
        <Timeline />
      </main>
      <Contact />
      <BackToTop />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}

export default App
