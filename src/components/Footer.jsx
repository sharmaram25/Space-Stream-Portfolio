import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="px-4 md:px-8 mt-16">
      <div className="mx-auto max-w-6xl">
        <div className="h-0.5 w-full bg-accent/30 mb-4" />
        <div className="glass px-5 py-6 grid md:grid-cols-3 gap-4 items-center">
          <div className="text-accent font-semibold text-lg">Streamfolio</div>
          <ul className="flex flex-wrap gap-3 justify-center text-sm text-neutral/90">
            {quickLinks.map(l => (
              <li key={l.href}><a className="hover:text-accent" href={l.href}>{l.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center justify-end gap-3 text-neutral/80">
            <a className="hover:text-accent transition" href="https://github.com/your-handle" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a className="hover:text-accent transition" href="https://linkedin.com/in/your-handle" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
            <a className="hover:text-accent transition" href="mailto:ram@example.com" aria-label="Email"><FiMail /></a>
          </div>
        </div>
        <div className="text-center text-xs text-neutral/70 mt-3">© {new Date().getFullYear()} Ram Sharma. All rights reserved.</div>
      </div>
    </footer>
  )
}
