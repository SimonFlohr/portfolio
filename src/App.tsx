import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { PleckShowcase } from './components/PleckShowcase'
import { PortfolioMetaShowcase } from './components/PortfolioMetaShowcase'
import { SkillsBento } from './components/SkillsBento'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PleckShowcase />
        <PortfolioMetaShowcase />
        <SkillsBento />
      </main>
    </>
  )
}

export default App
