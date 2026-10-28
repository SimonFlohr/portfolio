import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { PleckShowcase } from './components/PleckShowcase'
import { PortfolioMetaShowcase } from './components/PortfolioMetaShowcase'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PleckShowcase />
        <PortfolioMetaShowcase />
      </main>
    </>
  )
}

export default App
