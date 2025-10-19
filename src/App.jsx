import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Education from './components/Education'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FixedBackground from './components/FixedBackground'

function SectionSpacer() {
  return <div className="h-12" />
}

export default function App() {
  return (
    <div className="relative">
      <FixedBackground />
      <Navbar />
      <main className="pt-24 pb-24">
        <Hero />
        <SectionSpacer />
        <About />
        <SectionSpacer />
  <Skills />
  <SectionSpacer />
        <Education />
        <SectionSpacer />
        <Projects />
        <SectionSpacer />
        <Experience />
        <SectionSpacer />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
