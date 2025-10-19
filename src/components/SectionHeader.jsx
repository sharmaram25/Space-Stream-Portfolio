export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="h2">{title}</h2>
      {subtitle && <p className="muted mt-1">{subtitle}</p>}
      <div className="h-1 w-20 bg-accent/60 rounded mt-3" />
    </div>
  )}
