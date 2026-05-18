import {
  useState, useRef, useCallback, useEffect,
  type KeyboardEvent, type ReactNode,
} from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'

// ─── constants ────────────────────────────────────────────────────────────────

const HOST  = 'portfolio.aravinthan.space'
const USER  = 'visitor'

const TEAL  = '#5ce6b5'
const PINK  = '#f778ba'
const WHITE = '#e8e8e8'
const DIM   = '#404040'
const RED   = '#f87171'

// ─── ASCII art (ANSI Shadow figlet — wrapped in <pre> to preserve whitespace) ──

const RIKATO_ART = ` ██████╗ ██╗██╗  ██╗ █████╗ ████████╗ ██████╗
 ██╔══██╗██║██║ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗
 ██████╔╝██║█████╔╝ ███████║   ██║   ██║   ██║
 ██╔══██╗██║██╔═██╗ ██╔══██║   ██║   ██║   ██║
 ██║  ██║██║██║  ██╗██║  ██║   ██║   ╚██████╔╝
 ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ `

// ─── command registry ─────────────────────────────────────────────────────────

const COMMANDS: Record<string, string> = {
  about:      'about Aravinthan (Rikato)',
  banner:     'display ASCII banner',
  clear:      'clear the terminal',
  contact:    'get in touch',
  echo:       'print text to terminal',
  education:  'education background',
  experience: 'work experience',
  gui:        'scroll to visual portfolio',
  help:       'list available commands',
  history:    'view command history',
  projects:   'list featured projects',
  pwd:        'print working directory',
  skills:     'view tech stack',
  socials:    'social media links',
  welcome:    'display welcome message',
  whoami:     'about current user',
}

const CMD_KEYS = Object.keys(COMMANDS).sort()

// ─── output components ────────────────────────────────────────────────────────

function AsciiArt() {
  return (
    <pre
      style={{
        color: TEAL,
        margin: 0,
        fontFamily: 'inherit',
        fontSize: '12px',
        lineHeight: 1.35,
        whiteSpace: 'pre',
        overflow: 'hidden',
      }}
    >
      {RIKATO_ART}
    </pre>
  )
}

function WelcomeOutput() {
  return (
    <div style={{ lineHeight: 1.7 }}>
      <AsciiArt />
      <div style={{ height: '10px' }} />
      <div style={{ color: WHITE }}>  Full-stack AI engineer</div>
      <div style={{ color: WHITE, opacity: 0.7 }}>  Building AI systems that survive the real world.</div>
      <div style={{ height: '10px' }} />
      <div style={{ color: WHITE, opacity: 0.6 }}>
        Type <span style={{ color: TEAL, opacity: 1 }}>help</span> to see available commands.
        {' '}Type <span style={{ color: TEAL, opacity: 1 }}>gui</span> to switch to visual mode.
      </div>
    </div>
  )
}

function HelpOutput() {
  const col = 13
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ color: WHITE, marginBottom: '6px' }}>Available commands:</div>
      {CMD_KEYS.map(cmd => (
        <div key={cmd} style={{ display: 'flex' }}>
          <span style={{ color: TEAL, minWidth: `${col}ch` }}>{cmd}</span>
          <span style={{ color: WHITE }}>- {COMMANDS[cmd]}</span>
        </div>
      ))}
      <div style={{ height: '8px' }} />
      <div style={{ color: DIM }}>────────────────────────────────</div>
      <div style={{ lineHeight: 1.8 }}>
        <div>
          <span style={{ color: WHITE, minWidth: '15ch', display: 'inline-block' }}>Tab or Ctrl+i</span>
          <span style={{ color: WHITE, opacity: 0.6 }}>=&gt; autocomplete command</span>
        </div>
        <div>
          <span style={{ color: WHITE, minWidth: '15ch', display: 'inline-block' }}>Up / Down</span>
          <span style={{ color: WHITE, opacity: 0.6 }}>=&gt; navigate command history</span>
        </div>
        <div>
          <span style={{ color: WHITE, minWidth: '15ch', display: 'inline-block' }}>Ctrl + L</span>
          <span style={{ color: WHITE, opacity: 0.6 }}>=&gt; clear terminal</span>
        </div>
      </div>
    </div>
  )
}

function AboutOutput() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ color: TEAL, fontWeight: 'bold' }}>Aravinthan R (Rikato)</div>
      <div style={{ color: DIM }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
      <div style={{ color: WHITE, marginBottom: '8px' }}>
        Full-Stack AI Engineer with 2+ years of experience building production-grade
        AI backend systems across SaaS, education, and supply chain domains. Specialized
        in AI architecture, multi-agent orchestration, and scalable applications using
        React, Next.js, Node.js, LangGraph, MCP, Docker, and AWS.
      </div>
      <div style={{ display: 'flex', marginBottom: '2px' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '14ch' }}>Location</span>
        <span style={{ color: WHITE }}>Chennai, India</span>
      </div>
      <div style={{ display: 'flex', marginBottom: '2px' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '14ch' }}>Status</span>
        <span style={{ color: TEAL }}>Open to new opportunities ✓</span>
      </div>
      <div style={{ display: 'flex', marginBottom: '2px' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '14ch' }}>Currently</span>
        <span style={{ color: WHITE }}>Software Developer @ RootQuotient</span>
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '14ch' }}>Previously</span>
        <span style={{ color: WHITE }}>Research Intern @ IISc Bangalore</span>
      </div>
    </div>
  )
}

function WhoamiOutput() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ color: WHITE }}>
        You are a <span style={{ color: TEAL }}>visitor</span> exploring Aravinthan's portfolio terminal.
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '10ch' }}>Session</span>
        <span style={{ color: WHITE }}>~/portfolio.aravinthan.space</span>
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '10ch' }}>Access</span>
        <span style={{ color: WHITE }}>guest</span>
      </div>
      <div style={{ height: '6px' }} />
      <div style={{ color: WHITE, opacity: 0.7 }}>
        If you're a recruiter or collaborator, try:{' '}
        <span style={{ color: TEAL, opacity: 1 }}>contact</span>{' '}or{' '}
        <span style={{ color: TEAL, opacity: 1 }}>projects</span>
      </div>
    </div>
  )
}

function SkillsOutput() {
  const Row = ({ label, items, color = WHITE }: { label: string; items: string[]; color?: string }) => (
    <div style={{ display: 'flex', marginBottom: '4px', flexWrap: 'wrap' }}>
      <span style={{ color: WHITE, opacity: 0.5, minWidth: '14ch', flexShrink: 0 }}>{label}</span>
      <span style={{ color }}>{items.join(' | ')}</span>
    </div>
  )
  return (
    <div style={{ lineHeight: 1.8 }}>
      <Row label="Languages"  items={['Python', 'TypeScript', 'Go', 'SQL', 'Bash']} color={TEAL} />
      <Row label="AI / GenAI" items={['LangChain', 'LangGraph', 'RAG', 'GraphRAG', 'Agentic AI', 'TensorFlow', 'Scikit-Learn', 'NLP', 'Vector Search']} />
      <Row label="Backend"    items={['Node.js', 'FastAPI', 'Express.js', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Cloudflare']} />
      <Row label="Frontend"   items={['React.js', 'Next.js', 'React Native', 'Tailwind CSS']} />
      <Row label="Tools"      items={['MLflow', 'Prompt Engineering', 'OWASP ZAP', 'WebSockets', 'Git']} color={WHITE} />
    </div>
  )
}

function ProjectsOutput() {
  const projects = [
    { name: 'CursOps',        year: '2025', desc: 'Agentic AI workflow platform with HITL validation',      stack: 'Python · Agentic AI · Docker · AWS' },
    { name: 'StemGenie',      year: '2024', desc: 'GenAI video engine for mathematical animations',          stack: 'Gemini · Python/Manim · Docker · React' },
    { name: 'HackNova',       year: '2025', desc: 'AI-assisted security analysis & real-time scanning',      stack: 'Redis · WebSockets · OWASP ZAP' },
    { name: 'Vishnu Billing', year: '2025', desc: 'Offline-first BI app with conversational AI',             stack: 'React Native · SQLite · MCP' },
    { name: 'Mimir',          year: '2025', desc: 'Personal AI knowledge assistant',                         stack: 'RAG · LangGraph · Vector Search' },
  ]
  return (
    <div style={{ lineHeight: 1.8 }}>
      {projects.map((p, i) => (
        <div key={p.name} style={{ marginBottom: '10px' }}>
          <span style={{ color: WHITE, opacity: 0.5 }}>{i + 1}. </span>
          <span style={{ color: TEAL, fontWeight: 'bold' }}>{p.name}</span>
          <span style={{ color: WHITE, opacity: 0.5 }}> ({p.year})</span>
          <div style={{ color: WHITE, paddingLeft: '18px' }}>{p.desc}</div>
          <div style={{ color: WHITE, opacity: 0.5, paddingLeft: '18px', fontSize: '12px' }}>→ {p.stack}</div>
        </div>
      ))}
    </div>
  )
}

function ExperienceOutput() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ color: TEAL, fontWeight: 'bold' }}>RootQuotient</div>
      <div style={{ color: WHITE, opacity: 0.6 }}>Software Developer · Dec 2024 – Present · Chennai</div>
      {[
        'Built AI dashboards with GraphRAG-based chatbots',
        'Developed LLM-driven automation workflows',
        'Reduced API response times by 30% via Redis caching',
        'React Native–Unity integration for mobile/game engines',
        'Achieved 99% crash-free rate in production',
      ].map((b, i) => <div key={i} style={{ color: WHITE, paddingLeft: '12px' }}><span style={{ color: DIM }}>· </span>{b}</div>)}
      <div style={{ height: '8px' }} />
      <div style={{ color: PINK, fontWeight: 'bold' }}>Indian Institute of Science (IISc)</div>
      <div style={{ color: WHITE, opacity: 0.6 }}>Research Intern · Jul – Dec 2023 · Bangalore</div>
      {[
        'Deep learning for semiconductor scheduling optimization',
        'ML models reducing schedule generation time by 40%',
        'Python automation pipelines for bulk asset generation',
      ].map((b, i) => <div key={i} style={{ color: WHITE, paddingLeft: '12px' }}><span style={{ color: DIM }}>· </span>{b}</div>)}
    </div>
  )
}

function EducationOutput() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ color: TEAL, fontWeight: 'bold' }}>Thiagarajar College of Engineering</div>
      <div style={{ color: WHITE }}>M.Sc Data Science · 2020 – 2025</div>
      <div style={{ color: WHITE, opacity: 0.6 }}>Madurai, Tamil Nadu, India</div>
    </div>
  )
}

function ContactOutput() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '10ch' }}>Email</span>
        <span style={{ color: TEAL }}>aravinthanrc@gmail.com</span>
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '10ch' }}>Phone</span>
        <span style={{ color: WHITE }}>+91 9080310713</span>
      </div>
    </div>
  )
}

function SocialsOutput() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '12ch' }}>GitHub</span>
        <span style={{ color: TEAL }}>github.com/rikato</span>
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '12ch' }}>LinkedIn</span>
        <span style={{ color: TEAL }}>linkedin.com/in/aravinthan-r</span>
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ color: WHITE, opacity: 0.6, minWidth: '12ch' }}>Email</span>
        <span style={{ color: TEAL }}>aravinthanrc@gmail.com</span>
      </div>
    </div>
  )
}

function HistoryOutput({ history }: { history: string[] }) {
  if (history.length === 0) {
    return <div style={{ color: WHITE, opacity: 0.6 }}>No commands in history yet.</div>
  }
  return (
    <div style={{ lineHeight: 1.8 }}>
      {history.map((cmd, i) => (
        <div key={i}>
          <span style={{ color: WHITE, opacity: 0.4, minWidth: '4ch', display: 'inline-block', textAlign: 'right', marginRight: '12px' }}>
            {i + 1}
          </span>
          <span style={{ color: WHITE }}>{cmd}</span>
        </div>
      ))}
    </div>
  )
}

function BannerOutput() {
  return (
    <div>
      <AsciiArt />
      <div style={{ color: WHITE, opacity: 0.5, marginTop: '8px' }}>v2026.1.0 · portfolio.aravinthan.space</div>
    </div>
  )
}

function GuiOutput() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <div style={{ color: WHITE }}>Switching to GUI mode…</div>
      <div style={{ color: WHITE, opacity: 0.6 }}>
        Scrolling to visual portfolio.{' '}
        <a href="#work" style={{ color: TEAL, textDecoration: 'none' }}>Click here</a> if it doesn't scroll.
      </div>
    </div>
  )
}

// ─── prompt ───────────────────────────────────────────────────────────────────

function Prompt() {
  return (
    <span style={{ whiteSpace: 'nowrap', userSelect: 'none', flexShrink: 0 }}>
      <span style={{ color: TEAL }}>{USER}@{HOST}</span>
      <span style={{ color: WHITE }}>:~$ </span>
    </span>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

type Entry = { id: number; cmd: string; output: ReactNode }

export default function InteractiveTerminal() {
  const [entries, setEntries]       = useState<Entry[]>([{ id: 0, cmd: '', output: <WelcomeOutput /> }])
  const [input, setInput]           = useState('')
  const [isFullscreen, setFullscreen] = useState(false)

  const cmdHistoryRef = useRef<string[]>([])
  const histIdxRef    = useRef(-1)
  const containerRef  = useRef<HTMLDivElement>(null)
  const inputRef      = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries])

  // Prevent page scroll when terminal is focused
  useEffect(() => {
    if (!isFullscreen) return
    const prevent = (e: WheelEvent) => { e.stopPropagation() }
    containerRef.current?.addEventListener('wheel', prevent, { passive: false })
    return () => containerRef.current?.removeEventListener('wheel', prevent)
  }, [isFullscreen])

  const executeCommand = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) {
      setEntries(prev => [...prev, { id: Date.now(), cmd: '', output: null }])
      return
    }

    const [cmd, ...args] = trimmed.split(/\s+/)
    const cmdLower = cmd.toLowerCase()

    if (cmdLower === 'clear') { setEntries([]); return }
    if (cmdLower === 'gui') document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })

    const prevHistory = cmdHistoryRef.current
    cmdHistoryRef.current = [...prevHistory, trimmed]
    histIdxRef.current = -1

    let output: ReactNode
    switch (cmdLower) {
      case 'help':       output = <HelpOutput />;  break
      case 'about':      output = <AboutOutput />; break
      case 'whoami':     output = <WhoamiOutput />; break
      case 'skills':     output = <SkillsOutput />; break
      case 'projects':   output = <ProjectsOutput />; break
      case 'experience': output = <ExperienceOutput />; break
      case 'education':  output = <EducationOutput />; break
      case 'contact':    output = <ContactOutput />; break
      case 'socials':    output = <SocialsOutput />; break
      case 'history':    output = <HistoryOutput history={prevHistory} />; break
      case 'welcome':    output = <WelcomeOutput />; break
      case 'banner':     output = <BannerOutput />; break
      case 'gui':        output = <GuiOutput />; break
      case 'echo':       output = <span style={{ color: WHITE }}>{args.join(' ')}</span>; break
      case 'pwd':        output = <span style={{ color: WHITE }}>/home/{USER}/{HOST}</span>; break
      default:
        output = (
          <span style={{ color: RED }}>
            bash: {cmdLower}: command not found. Type{' '}
            <span style={{ color: TEAL }}>help</span> for available commands.
          </span>
        )
    }

    setEntries(prev => [...prev, { id: Date.now(), cmd: trimmed, output }])
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = input; setInput(''); executeCommand(val)
    } else if (e.key === 'Tab' || (e.ctrlKey && e.key === 'i')) {
      e.preventDefault()
      if (!input) return
      const matches = CMD_KEYS.filter(c => c.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      } else if (matches.length > 1) {
        setEntries(prev => [...prev, {
          id: Date.now(), cmd: input,
          output: <span style={{ color: WHITE, opacity: 0.6 }}>{matches.join('    ')}</span>,
        }])
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const hist = cmdHistoryRef.current
      const newIdx = Math.min(histIdxRef.current + 1, hist.length - 1)
      histIdxRef.current = newIdx
      if (hist.length > 0) setInput(hist[hist.length - 1 - newIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.max(histIdxRef.current - 1, -1)
      histIdxRef.current = newIdx
      const hist = cmdHistoryRef.current
      setInput(newIdx === -1 ? '' : hist[hist.length - 1 - newIdx] ?? '')
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault(); setEntries([])
    }
  }

  const wrapStyle: React.CSSProperties = isFullscreen
    ? { position: 'fixed', inset: 0, zIndex: 200, height: '100dvh' }
    : { height: 'calc(100dvh - 56px)', position: 'relative' }

  return (
    <div
      style={{
        ...wrapStyle,
        backgroundColor: '#0d1117',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'text',
        overflow: 'hidden',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* scrollable output */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px',
          paddingBottom: '12px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#2a2a2a #0d1117',
        }}
      >
        {entries.map(entry => (
          <div key={entry.id} style={{ marginBottom: '6px' }}>
            {entry.cmd !== '' && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '2px' }}>
                <Prompt />
                <span style={{ color: WHITE }}>{entry.cmd}</span>
              </div>
            )}
            {entry.output != null && (
              <div style={{ paddingBottom: '4px' }}>{entry.output}</div>
            )}
          </div>
        ))}

        {/* live input line */}
        <div
          style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
          onClick={e => { e.stopPropagation(); inputRef.current?.focus() }}
        >
          <Prompt />
          <span style={{ color: WHITE, whiteSpace: 'pre', fontFamily: 'inherit', fontSize: 'inherit' }}>
            {input}
          </span>
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block', width: '8px', height: '16px',
              backgroundColor: TEAL, marginLeft: '1px', verticalAlign: 'text-bottom',
            }}
          />
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); histIdxRef.current = -1 }}
            onKeyDown={handleKeyDown}
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>

      {/* hint bar */}
      <div
        style={{
          padding: '6px 20px',
          borderTop: `1px solid ${DIM}`,
          color: WHITE,
          opacity: 0.45,
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        <span><span style={{ opacity: 2 }}>help</span> — commands</span>
        <span><span>Tab</span> — autocomplete</span>
        <span><span>↑↓</span> — history</span>
        <span><span>Ctrl+L</span> — clear</span>
        <span style={{ marginLeft: 'auto' }}><span>gui</span> — visual portfolio ↓</span>

        {/* fullscreen toggle */}
        <button
          onClick={e => { e.stopPropagation(); setFullscreen(f => !f) }}
          title={isFullscreen ? 'Minimize' : 'Fullscreen'}
          style={{
            background: 'transparent',
            border: `1px solid ${DIM}`,
            borderRadius: '4px',
            color: WHITE,
            opacity: 0.8,
            cursor: 'pointer',
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = TEAL }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.borderColor = DIM }}
        >
          {isFullscreen
            ? <><Minimize2 size={11} /> minimize</>
            : <><Maximize2 size={11} /> fullscreen</>
          }
        </button>
      </div>
    </div>
  )
}
