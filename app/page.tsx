import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSolution from './components/ProblemSolution'
import InteractiveDemo from './components/InteractiveDemo'
import UseCases from './components/UseCases'
import Features from './components/Features'
import Comparison from './components/Comparison'
import Testimonials from './components/Testimonials'
import Architecture from './components/Architecture'
import Roadmap from './components/Roadmap'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
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
      <Testimonials />
      <Architecture />
      <Roadmap />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}

