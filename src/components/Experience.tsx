import SectionBlock from './SectionBlock'

const EXPERIENCE = [
  {
    company: 'RootQuotient',
    role: 'Software Developer',
    tech: 'Node.js, GraphRAG, LLMs, Redis, React Native',
    location: 'Chennai, India',
    period: 'Dec 2024 – Present',
    bullets: [
      'Built AI-powered analytics dashboards and GraphRAG-based chatbot systems combining vector search, semantic retrieval, and entity relationship graphs.',
      'Developed LLM-driven automation workflows for personalized user engagement and intelligent notification summarization.',
      'Designed and optimized REST APIs and Redis caching strategies, reducing response times by 30%.',
      'Architected React Native–Unity integration for seamless synchronization across Android and iOS platforms.',
      'Performed deep performance optimization, stabilizing production apps to achieve a 99% crash-free rate.',
    ],
  },
  {
    company: 'Indian Institute of Science (IISc)',
    role: 'Research Intern',
    tech: 'Python, Deep Learning, Scheduling Optimization',
    location: 'Bangalore, India',
    period: 'Jul 2023 – Dec 2023',
    bullets: [
      'Researched deep learning methods for semiconductor scheduling on large-scale industrial datasets.',
      'Developed ML models for predictive scheduling optimization, reducing generation time by 40%.',
      'Built Python automation pipelines for bulk document and asset generation.',
      'Worked extensively on data preprocessing, feature engineering, and scalable AI workflow development.',
    ],
  },
]

export default function Experience() {
  return (
    <SectionBlock id="experience" title="Experience">
      <div>
        {EXPERIENCE.map((exp, i) => (
          <div
            key={exp.company}
            className="py-5"
            style={{ borderBottom: i < EXPERIENCE.length - 1 ? '1px solid var(--border)' : 'none' }}
          >
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <span className="font-semibold text-[15px]" style={{ color: 'var(--text)' }}>
                {exp.company}
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                {exp.period}
              </span>
            </div>
            <div className="text-sm mb-3" style={{ color: 'var(--accent-teal)' }}>
              {exp.role} · {exp.tech}
            </div>
            <ul className="space-y-1.5">
              {exp.bullets.map((b, j) => (
                <li
                  key={j}
                  className="text-sm pl-4 relative leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span className="absolute left-0" style={{ color: 'var(--accent-teal)', opacity: 0.5 }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionBlock>
  )
}
