import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiCode } from 'react-icons/fi'

export default function ProjectRow({ title, items }) {
  const rowRef = useRef(null)
  const scrollBy = (dx) => rowRef.current?.scrollBy({ left: dx, behavior: 'smooth' })
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="text-neutral/90 font-semibold">{title}</div>
        <div className="hidden md:flex gap-2">
          <button type="button" className="chip" onClick={() => scrollBy(-420)}>‹</button>
          <button type="button" className="chip" onClick={() => scrollBy(420)}>›</button>
        </div>
      </div>
      <div ref={rowRef} className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2">
        {items.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass p-4 min-w-[300px] md:min-w-[420px] snap-start"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-accent/10 to-transparent">
              <img loading="lazy" src={p.thumb} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 chip">Featured</div>
            </div>
            <div className="mt-3 font-semibold text-neutral/90">{p.name}</div>
            <div className="text-sm text-neutral">{p.desc}</div>
            <div className="mt-2 flex gap-1 flex-wrap">
              {p.tech.map(t => <span key={t} className="chip text-xs">{t}</span>)}
            </div>
            <div className="mt-3 flex gap-2">
              <a className="btn flex items-center gap-2" href={p.live} target="_blank" rel="noreferrer"><FiExternalLink /> Live</a>
              <a className="btn-neutral flex items-center gap-2" href={p.code} target="_blank" rel="noreferrer"><FiCode /> Code</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
