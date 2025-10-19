import { motion } from 'framer-motion'
import { useState, useMemo, useRef } from 'react'
import SectionHeader from './SectionHeader'
import ProjectRow from './ProjectRow'
import { projectRows } from '../data/projects'
import { FiExternalLink, FiCode } from 'react-icons/fi'

const projects = [
  {
    name: 'Glass UI Kit',
    desc: 'Reusable glassmorphism components for React.',
    live: '#',
    code: '#',
    tech: ['React', 'Tailwind', 'Framer Motion']
  },
  {
    name: 'Streamfolio',
    desc: 'Minimalist, streaming-inspired portfolio site.',
    live: '#',
    code: '#',
    tech: ['Vite', 'React', 'Netlify']
  },
  {
    name: 'AlgoViz',
    desc: 'Interactive algorithm visualizer for learning.',
    live: '#',
    code: '#',
    tech: ['TypeScript', 'D3', 'Vite']
  },
  {
    name: 'Cloud Notes',
    desc: 'Fast notes app with offline support.',
    live: '#',
    code: '#',
    tech: ['PWA', 'React', 'Node']
  },
]

export default function Projects() {
  const [active, setActive] = useState('All')
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tech)))]
  const filtered = useMemo(() => {
    if (active === 'All') return projects
    return projects.filter(p => p.tech.includes(active))
  }, [active])
  const rowRef = useRef(null)
  const scrollBy = (dx) => {
    if (!rowRef.current) return
    rowRef.current.scrollBy({ left: dx, behavior: 'smooth' })
  }
  return (
    <section id="projects" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <SectionHeader title="Projects" subtitle="A selection of shipped work and experiments" />
      <div className="flex gap-2 flex-wrap mb-6">
        {allTags.map(t => (
          <button key={t} onClick={() => setActive(t)} className={`chip hover:bg-white/30 ${active === t ? 'ring-2 ring-accent/60' : ''}`} type="button">{t}</button>
        ))}
      </div>
      {projectRows.map(row => (
        <ProjectRow key={row.title} title={row.title} items={row.items.filter(i => active === 'All' || i.tech.includes(active))} />
      ))}
    </section>
  )
}
