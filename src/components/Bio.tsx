import SectionBlock from './SectionBlock'

const TIMELINE = [
  { year: '2019', event: 'Faced a "Java Wall"—was so intimidated by the language that I skipped the exam. It was the wake-up call I needed.' },
  { year: '2020', event: 'The Comeback. Spent the year grinding Java and finished with a 99% score. Enrolled in M.Sc Data Science at TCE.' },
  { year: '2022', event: 'Pivoted into the world of Python and Data Science.' },
  { year: '2023', event: 'Research Internship at IISc Bangalore, working at the intersection of high-level theory and practice.' },
  { year: '2024', event: 'Mastered the Full Stack, learning to build the "brain" and the "body" of applications.' },
  { year: '2025 (start)', event: 'Deep-dived into Generative AI and the rapidly evolving AI landscape.' },
  { year: '2025 (mid)', event: 'Joined Rootquotient as a Software Engineer.' },
  { year: '2026', event: 'Transitioning to new horizons. Ready to build the next generation of AI-driven tech.' },
]

export default function Bio() {
  return (
    <SectionBlock id="bio" title="The Grind">
      <ul className="list-none">
        {TIMELINE.map(({ year, event }, i) => (
          <li
            key={year}
            className="grid gap-4 py-3 text-sm"
            style={{
              gridTemplateColumns: '110px 1fr',
              borderBottom: i < TIMELINE.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <span
              className="font-bold text-[12px]"
              style={{ color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {year}
            </span>
            <span className="leading-relaxed" style={{ color: 'var(--text)' }}>
              {event}
            </span>
          </li>
        ))}
      </ul>
    </SectionBlock>
  )
}
