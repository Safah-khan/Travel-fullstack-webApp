import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import DestinationsSection from '../components/DestinationsSection'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DestinationsSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
