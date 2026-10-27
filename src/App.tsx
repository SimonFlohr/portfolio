import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { PleckShowcase } from './components/PleckShowcase'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PleckShowcase />
      </main>
    </>
  )
}

export default App
