import InteractiveTerminal from './InteractiveTerminal'

export default function Hero() {
  return (
    <section id="hero" className="-mx-6">
      <InteractiveTerminal />
      {/* scroll nudge */}
      <div
        className="flex flex-col items-center py-5 gap-1 cursor-pointer"
        style={{ color: 'var(--text-muted)', fontSize: '12px' }}
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>scroll down for visual portfolio</span>
        <span
          className="cursor-blink"
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRight: '2px solid var(--text-muted)',
            borderBottom: '2px solid var(--text-muted)',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    </section>
  )
}
