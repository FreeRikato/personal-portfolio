import { type CSSProperties } from 'react'
import SectionBlock from './SectionBlock'

interface Project {
  name: string
  year: string
  desc: string
  tags: string[]
  wide?: boolean
}

const PROJECTS: Project[] = [
  {
    name: 'CursOps',
    year: '2025',
    desc: 'Agentic AI workflow platform enabling teams to manage repos and execute AI-assisted development with Human-in-the-Loop validation and autonomous sprint tracking.',
    tags: ['Python', 'Agentic AI', 'Telegram API', 'Docker', 'AWS'],
  },
  {
    name: 'StemGenie',
    year: '2024',
    desc: 'GenAI video engine translating natural language prompts into mathematical animations using LLMs and iterative prompt engineering workflows.',
    tags: ['Google Gemini', 'Python/Manim', 'Docker', 'React'],
  },
  {
    name: 'HackNova',
    year: '2025',
    desc: 'AI-assisted security analysis platform with real-time vulnerability scanning, JWT interception, and AI-driven insight dashboards.',
    tags: ['Redis', 'WebSockets', 'OWASP ZAP'],
  },
  {
    name: 'Vishnu Billing',
    year: '2025',
    desc: 'Offline-first business intelligence app with conversational AI for natural language sales and inventory analytics.',
    tags: ['React Native', 'SQLite', 'MCP'],
  },
  {
    name: 'Mimir',
    year: '2025',
    desc: 'Personal AI knowledge assistant with intelligent retrieval and reasoning over your personal knowledge base.',
    tags: ['RAG', 'LangGraph', 'Vector Search'],
    wide: true,
  },
]

export default function Projects() {
  return (
    <SectionBlock id="projects" title="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROJECTS.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </SectionBlock>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    el.style.borderColor = 'var(--accent-teal)'
    el.style.transform = 'translateY(-2px)'
    el.style.boxShadow = '0 8px 24px rgba(92,230,181,0.1)'
  }
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    el.style.borderColor = 'var(--border)'
    el.style.transform = 'translateY(0)'
    el.style.boxShadow = 'none'
  }

  const cardStyle: CSSProperties = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    gridColumn: project.wide ? '1 / -1' : undefined,
    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
  }

  return (
    <div
      className="rounded-xl p-5 cursor-default"
      style={cardStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-semibold text-[15px]" style={{ color: 'var(--text)' }}>
          {project.name}
        </span>
        <span
          className="text-[11px]"
          style={{ color: 'var(--text)', opacity: 0.5, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {project.year}
        </span>
      </div>
      <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text)' }}>
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] px-2 py-0.5 rounded"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              backgroundColor: 'rgba(92,230,181,0.1)',
              color: 'var(--accent-teal)',
              border: '1px solid rgba(92,230,181,0.2)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
