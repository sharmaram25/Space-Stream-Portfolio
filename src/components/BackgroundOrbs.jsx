import { motion } from 'framer-motion'

export default function BackgroundOrbs() {
  const orbs = [
    { size: 220, x: '10%', y: '12%', opacity: 0.15 },
    { size: 280, x: '80%', y: '18%', opacity: 0.12 },
    { size: 260, x: '25%', y: '85%', opacity: 0.14 },
  ]
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.0, scale: 0.9 }}
          animate={{ opacity: o.opacity, scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: o.size, height: o.size, left: o.x, top: o.y }}
          className="absolute rounded-full bg-accent/20 blur-3xl"
        />
      ))}
    </div>
  )
}
