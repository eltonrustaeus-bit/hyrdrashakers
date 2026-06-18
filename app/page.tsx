import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import InstagramCTA from '@/components/InstagramCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060c1a]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <InstagramCTA />
      <Footer />
    </main>
  )
}
