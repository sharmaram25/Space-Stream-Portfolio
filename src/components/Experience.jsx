import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBriefcase, FiGitPullRequest, FiX } from 'react-icons/fi'
import SectionHeader from './SectionHeader'

const data = [
  { type: 'work', company: 'Tech Labs', role: 'Frontend Intern', duration: 'Jun 2024 – Aug 2024', summary: 'Built UI components and improved performance.', impact: ['Shipped 10+ components', 'Cut LCP by 25%'], stack: ['React', 'Tailwind', 'Vite', 'CI/CD'] },
  { type: 'oss', company: 'Open Source', role: 'Contributor', duration: '2023 – Present', summary: 'Docs, bugfixes, and small features across projects.', impact: ['15+ PRs merged', 'Improved DX guides'], stack: ['Docs', 'PR Reviews'] },
]

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work', Icon: FiBriefcase },
  { id: 'oss', label: 'Open Source', Icon: FiGitPullRequest },
]

export default function Experience() {
  const [tab, setTab] = useState('all')
  const [detail, setDetail] = useState(null)
  const items = useMemo(() => data.filter(d => tab === 'all' ? true : d.type === tab), [tab])

  return (
    <section id="experience" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <SectionHeader title="Experience" subtitle="Work and contributions" />

      <div className="flex items-center gap-2 glass p-1 rounded-full w-fit mx-auto mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-2 rounded-full text-sm flex items-center gap-2 transition ${tab === t.id ? 'text-white' : 'hover:text-accent text-neutral'}`}
            aria-pressed={tab === t.id}
          >
            {tab === t.id && (
              <motion.span layoutId="exp-tab" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 450, damping: 35 }} />
            )}
            {t.Icon ? <t.Icon className="text-xs" /> : null}
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent/25" aria-hidden="true" />
        <ul className="grid gap-6">
          {items.map((r, idx) => (
            <li key={`${r.company}-${idx}`} className="relative">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_rgba(56,132,255,0.15)]" />
              <motion.article
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
                className={`glass p-5 md:p-6 rounded-xl md:max-w-[44rem] ${idx % 2 ? 'md:ml-[calc(50%+1.5rem)]' : 'md:mr-[calc(50%+1.5rem)]'}`}
              >
                <header className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-neutral/90">{r.company} — {r.role}</h3>
                  <time className="text-xs md:text-sm text-neutral/80">{r.duration}</time>
                </header>
                <p className="mt-1 text-neutral">{r.summary}</p>
                <ul className="mt-2 list-disc list-inside text-sm text-neutral/90">
                  {r.impact.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1">
                  {r.stack.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
                <div className="mt-3">
                  <button className="btn" onClick={() => setDetail(r)} aria-haspopup="dialog">View details</button>
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {detail && (
          <motion.div className="fixed inset-0 z-50 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetail(null)}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="glass mx-4 md:mx-auto md:max-w-xl mt-20 p-5 rounded-xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog" aria-modal="true" aria-label="Experience details"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold text-neutral/90">{detail.company} — {detail.role}</div>
                <button className="glass p-2" aria-label="Close" onClick={() => setDetail(null)}><FiX /></button>
              </div>
              <p className="mt-2 text-neutral">{detail.summary}</p>
              <ul className="mt-2 list-disc list-inside text-sm text-neutral/90">
                {detail.impact.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1">
                {detail.stack.map(s => <span key={s} className="chip">{s}</span>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
