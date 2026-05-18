import SectionBlock from './SectionBlock'

const STACK = [
  {
    category: 'Languages',
    tags: ['Python', 'TypeScript', 'Go', 'SQL', 'Bash'],
  },
  {
    category: 'AI / GenAI / ML',
    tags: [
      'LangChain', 'LangGraph', 'RAG', 'GraphRAG', 'Agentic AI',
      'TensorFlow', 'Scikit-Learn', 'MLflow', 'NLP',
      'Vector Search', 'Prompt Engineering',
    ],
  },
  {
    category: 'Backend & Cloud',
    tags: ['Node.js', 'FastAPI', 'Express.js', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Cloudflare'],
  },
  {
    category: 'Frontend & Mobile',
    tags: ['React.js', 'Next.js', 'React Native', 'Tailwind CSS'],
  },
  {
    category: 'Tools',
    tags: ['Git', 'WebSockets', 'OWASP ZAP', 'Chrome Extension SDK'],
  },
]

export default function Stack() {
  return (
    <SectionBlock id="stack" title="Stack">
      <div className="space-y-6">
        {STACK.map(({ category, tags }) => (
          <div key={category}>
            <div
              className="text-[11px] font-semibold uppercase mb-2"
              style={{
                color: 'var(--text-muted)',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.1em',
              }}
            >
              {category}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <StackTag key={tag} label={tag} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>
  )
}

function StackTag({ label }: { label: string }) {
  return (
    <span
      className="text-[13px] px-3 py-1 rounded-md cursor-default transition-all duration-150"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-teal)'
        e.currentTarget.style.color = 'var(--accent-teal)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--text)'
      }}
    >
      {label}
    </span>
  )
}
