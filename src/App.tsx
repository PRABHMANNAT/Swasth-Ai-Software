import HeroSection from './components/HeroSection'
import AppShowcaseSection from './components/AppShowcaseSection'
import { FeaturesShowcase } from './components/FeaturesShowcase'
import { FAQSection } from './components/FAQSection'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="bg-black">
      <HeroSection />
      <AppShowcaseSection />
      <FeaturesShowcase />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default App
