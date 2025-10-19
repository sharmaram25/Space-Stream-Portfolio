import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="min-h-[calc(100vh-5rem)] pt-24 md:pt-28 flex items-center section scroll-mt-24 md:scroll-mt-28">
      <div className="w-full grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass p-8 md:p-10 shadow-soft relative overflow-hidden"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-accent/10 blur-2xl" />
          <h1 className="h1">Hi, I’m <span className="text-accent">Ram Sharma</span></h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="chip">CSE Student</span>
            <span className="chip">Frontend Engineer</span>
            <span className="chip">UI/UX Enthusiast</span>
          </div>
          <p className="mt-3 muted max-w-2xl">Crafting elegant, performant web experiences with a streaming-inspired, glassmorphic aesthetic.</p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <a href="#about" className="btn">Explore</a>
            <a href="#projects" className="btn-neutral">View Projects</a>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="glass p-3">
              <div className="text-xl font-bold text-accent">12+</div>
              <div className="text-xs muted">Projects</div>
            </div>
            <div className="glass p-3">
              <div className="text-xl font-bold text-accent">8+</div>
              <div className="text-xs muted">Tech Stacks</div>
            </div>
            <div className="glass p-3">
              <div className="text-xl font-bold text-accent">3</div>
              <div className="text-xs muted">Internships</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="glass p-6 md:p-8 shadow-soft relative overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between">
            <div className="font-semibold text-neutral/90">Now Playing</div>
            <div className="text-xs muted">Focus Mix</div>
          </div>
          <div className="mt-4 aspect-video rounded-lg bg-gradient-to-br from-accent/20 to-transparent" />
          <div className="mt-4">
            <div className="text-neutral/90 font-medium">Deep Work Session</div>
            <div className="text-xs muted">Lo-fi · Blue tones · Minimal vibes</div>
          </div>
          <div className="mt-4 flex items-end gap-1 h-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-1 bg-accent/70 rounded"
                animate={{ height: [6, 24, 10, 18, 8, 28, 12][i % 7] }}
                transition={{ duration: 1 + (i % 5) * 0.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                style={{ height: 8 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
