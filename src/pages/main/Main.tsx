
import Hero from "../../components/hero/Hero"
import Feature from "../../components/feature/Feature"
import Guide from "./../../components/guide/Guide"
import Testimonials from "../../components/testimonials/Testimonials"
import Publisher from "../../components/publisher/Publisher"
import  CTA from "../../components/cta/CTA"
import Footer from "../../components/footer/Footer"
const Main = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Guide />
      <Testimonials />
      <Publisher />
      <CTA />
      <Footer />
    </div>
  )
}

export default Main