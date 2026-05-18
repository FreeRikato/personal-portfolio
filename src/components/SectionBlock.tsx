import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  id: string
  title: string
  children: ReactNode
}

export default function SectionBlock({ id, title, children }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id={id} className="fade-section py-12">
      <h2 className="text-[1.4rem] font-bold mb-1" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      <div
        className="w-8 h-[3px] rounded-sm mb-6"
        style={{ backgroundColor: 'var(--text)' }}
      />
      {children}
    </section>
  )
}
