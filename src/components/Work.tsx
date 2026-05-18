import SectionBlock from './SectionBlock'

export default function Work() {
  return (
    <SectionBlock id="work" title="Work">
      <div className="text-[15px] leading-relaxed" style={{ color: 'var(--text)' }}>
        <p className="text-justify">
          Full-Stack AI Engineer with 2+ years of experience building production-grade AI backend
          systems across SaaS, education, and supply chain domains. Specialized in AI architecture,
          multi-agent orchestration, and scalable applications using{' '}
          <span style={{ color: 'var(--accent-teal)' }}>React, Next.js, Node.js, LangGraph, MCP, Docker, and AWS</span>.
          Experienced in developing{' '}
          <span style={{ color: 'var(--accent-pink)' }}>RAG systems, autonomous AI agents, and voice AI solutions</span>
          {' '}with strong expertise in cloud-native deployment, DevOps, and reliable AI infrastructure.
        </p>
      </div>
      <a
        href="#projects"
        className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg font-semibold text-sm no-underline transition-all duration-200 hover:opacity-90"
        style={{
          backgroundColor: 'var(--accent-teal)',
          color: '#0a0a0a',
          textDecoration: 'none',
        }}
      >
        My Projects →
      </a>
    </SectionBlock>
  )
}
