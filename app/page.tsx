import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSolution from './components/ProblemSolution'
import InteractiveDemo from './components/InteractiveDemo'
import UseCases from './components/UseCases'
import Features from './components/Features'
import Comparison from './components/Comparison'
import Architecture from './components/Architecture'
import Roadmap from './components/Roadmap'
import ComingSoonAI from './components/ComingSoonAI'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <InteractiveDemo />
      <UseCases />
      <Features />
      <Comparison />
      <Architecture />
      <Roadmap />
      <ComingSoonAI />
      <Footer />
    </main>
  )
}

