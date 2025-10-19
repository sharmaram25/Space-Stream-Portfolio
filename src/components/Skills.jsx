import { motion } from 'framer-motion'
import { SiReact, SiTailwindcss, SiTypescript, SiVite, SiNodedotjs, SiGit } from 'react-icons/si'
import SectionHeader from './SectionHeader'

const categories = [
  {
    title: 'Core',
    items: [
      { label: 'React', Icon: SiReact },
      { label: 'Tailwind', Icon: SiTailwindcss },
      { label: 'TypeScript', Icon: SiTypescript },
      { label: 'Vite', Icon: SiVite },
    ],
  },
  {
    title: 'Backend & Tools',
    items: [
      { label: 'Node.js', Icon: SiNodedotjs },
      { label: 'Git', Icon: SiGit },
    ],
  },
]

function Bar({ value }) {
  return (
    <div className="w-full h-2 bg-white/40 rounded">
      <div className="h-2 bg-accent rounded" style={{ width: `${value}%` }} />
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <SectionHeader title="Skills" subtitle="Core tools and proficiency" />
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="glass p-5"
          >
            <div className="font-semibold text-neutral/90 mb-3">{cat.title}</div>
            <div className="grid gap-3">
              {cat.items.map(({ label, Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="chip flex items-center gap-2"><Icon className="text-accent" />{label}</span>
                  <Bar value={label === 'React' ? 90 : label === 'Tailwind' ? 85 : label === 'TypeScript' ? 80 : 75} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
