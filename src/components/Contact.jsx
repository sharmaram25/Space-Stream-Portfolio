import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiFileText, FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi'
import SectionHeader from './SectionHeader'

const contactItems = [
  {
    label: 'Email',
    value: 'ram@example.com',
    href: 'mailto:ram@example.com',
    Icon: FiMail,
    copy: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/your-handle',
    href: 'https://linkedin.com/in/your-handle',
    Icon: FiLinkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/your-handle',
    href: 'https://github.com/your-handle',
    Icon: FiGithub,
  },
  {
    label: 'Resume',
    value: 'View PDF',
    href: '#',
    Icon: FiFileText,
  },
]

function InfoCard({ label, value, href, Icon, copy }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e) => {
    e?.preventDefault()
    try {
      await navigator.clipboard?.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (_) {
      // no-op: clipboard may be restricted
    }
  }

  const content = (
    <div className="relative flex items-start gap-4 p-5 rounded-xl glass ring-1 ring-white/10 hover:ring-accent/40 transition group overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/10 to-transparent" />
      <div className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-accent/15 text-accent">
        <Icon />
      </div>
      <div className="min-w-0">
        <div className="text-sm text-neutral/70">{label}</div>
        <div className="text-neutral/90 font-medium truncate">{value}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-neutral/70">
          {href && (
            <span className="inline-flex items-center gap-1">
              <FiExternalLink className="opacity-70" />
              <span>Open</span>
            </span>
          )}
          {copy && (
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/15 text-neutral/80 hover:text-neutral/90 ring-1 ring-white/10"
              aria-label={`Copy ${label}`}
            >
              {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-20 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  )

  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} aria-label={label}>
      <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
        {content}
      </motion.div>
    </a>
  ) : (
    <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
      {content}
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <SectionHeader title="Contact" subtitle="Let’s connect" />
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="glass p-6 md:p-8">
          <div className="text-neutral/90 text-lg font-semibold">Let’s build something impactful together</div>
          <p className="muted mt-1">Open to internships, freelance, and collaborations.</p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <a href="mailto:ram@example.com" className="btn">Email Me</a>
            <a href="#projects" className="btn-neutral">View Projects</a>
          </div>
          <div className="mt-6 text-xs text-neutral/70">
            Prefer a quick copy? Use the copy button on any card.
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactItems.map((item) => (
            <InfoCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
