import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function Education() {
  return (
    <section id="education" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <SectionHeader title="Education" subtitle="Academic background" />
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass p-6 md:p-8 rounded-2xl mx-auto max-w-4xl"
      >
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-semibold text-neutral/90">B.Tech in Computer Science & Engineering</h3>
          <span className="text-sm md:text-base text-neutral">2022 – 2026</span>
        </header>
        <div className="mt-1 text-neutral/90">XYZ University, City, Country</div>
        <p className="mt-3 text-neutral">
          Strong foundation in computer science with a focus on modern web technologies, software engineering principles, and hands-on projects. Built full‑stack applications, explored cloud fundamentals, and contributed to open‑source.
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass p-3 rounded-xl text-center">
            <div className="text-xs text-neutral">GPA</div>
            <div className="text-lg font-semibold text-accent">9.1</div>
          </div>
          <div className="glass p-3 rounded-xl text-center">
            <div className="text-xs text-neutral">Focus</div>
            <div className="text-sm font-medium text-neutral/90">Full‑Stack, DSA</div>
          </div>
          <div className="glass p-3 rounded-xl text-center">
            <div className="text-xs text-neutral">Activities</div>
            <div className="text-sm font-medium text-neutral/90">Hackathons, Clubs</div>
          </div>
          <div className="glass p-3 rounded-xl text-center">
            <div className="text-xs text-neutral">Highlights</div>
            <div className="text-sm font-medium text-neutral/90">Capstone, Research</div>
          </div>
        </div>
      </motion.article>
    </section>
  )
}
