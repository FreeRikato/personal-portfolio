import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import Bio from './components/Bio'
import Interests from './components/Interests'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg)' }}>
      <Navbar theme={theme} onToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      <main className="max-w-[700px] mx-auto px-6 pt-20 pb-20">
        <Hero />
        <Work />
        <Experience />
        <Bio />
        <Interests />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <footer
        className="text-center py-8 text-sm"
        style={{ color: 'var(--text)', opacity: 0.4, borderTop: '1px solid var(--border)' }}
      >
        <p>Aravinthan R · 2026</p>
      </footer>
    </div>
  )
}

export default App
