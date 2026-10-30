import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { PleckShowcase } from './components/PleckShowcase'
import { PortfolioMetaShowcase } from './components/PortfolioMetaShowcase'
import { SkillsBento } from './components/SkillsBento'
import { Timeline } from './components/Timeline'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PleckShowcase />
        <PortfolioMetaShowcase />
        <SkillsBento />
        <Timeline />
      </main>
    </>
  )
}

export default App
