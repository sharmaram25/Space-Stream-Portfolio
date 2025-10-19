import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

function Counter({ from = 0, to = 100, duration = 1.2, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(from)
  const rounded = useTransform(mv, latest => Math.round(latest))

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, mv, to, duration])

  return (
    <motion.span ref={ref}>{rounded.get()}{suffix}</motion.span>
  )
}

export default function About() {
  return (
    <section id="about" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <motion.article
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="glass p-6 md:p-8 rounded-2xl mx-auto max-w-5xl"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            loading="lazy"
            src="https://via.placeholder.com/400x400.webp?text=Profile"
            alt="Profile"
            className="rounded-2xl w-40 h-40 md:w-48 md:h-48 object-cover ring-1 ring-white/10 shadow-soft"
          />
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral/90">Hey, I’m Ram — CSE undergrad & frontend engineer</h2>
            <p className="mt-3 text-neutral">
              I craft fast, accessible web experiences with React, TypeScript, and Tailwind. I enjoy designing subtle motion, clean architectures, and shipping polished UIs.
            </p>
            <ul className="mt-3 grid md:grid-cols-2 gap-2 text-neutral/90 text-sm">
              <li className="glass p-3 rounded-xl">• Focus: React, TypeScript, UI engineering</li>
              <li className="glass p-3 rounded-xl">• Comfortable: Tailwind, Node.js, Git, CI</li>
              <li className="glass p-3 rounded-xl">• Interests: Design systems, micro‑interactions</li>
              <li className="glass p-3 rounded-xl">• Looking for: Frontend internships</li>
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="glass text-center p-4 rounded-xl">
                <div className="text-2xl font-bold text-accent"><Counter to={12} />+</div>
                <div className="text-sm text-neutral">Projects</div>
              </div>
              <div className="glass text-center p-4 rounded-xl">
                <div className="text-2xl font-bold text-accent"><Counter to={8} />+</div>
                <div className="text-sm text-neutral">Tech Stacks</div>
              </div>
              <div className="glass text-center p-4 rounded-xl">
                <div className="text-2xl font-bold text-accent"><Counter to={3} />+</div>
                <div className="text-sm text-neutral">Internships</div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#projects" className="btn">View projects</a>
              <a href="#contact" className="btn-neutral">Get in touch</a>
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  )
}
