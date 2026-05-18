import SectionBlock from './SectionBlock'

export default function Interests() {
  return (
    <SectionBlock id="interests" title="I ♥">
      <p className="text-[15px] leading-loose" style={{ color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--accent-teal)' }}>Home Labbing</span> (Self-hosting everything),{' '}
        <span style={{ color: 'var(--accent-pink)' }}>Linux Ricing</span> (Customizing the perfect workflow),{' '}
        <span style={{ color: 'var(--accent-teal)' }}>AAA Gaming</span>,{' '}
        Sports,{' '}
        <span style={{ color: 'var(--accent-pink)' }}>Mechanical Keyboards</span>,{' '}
        and Emerging Tech Trends.
      </p>
    </SectionBlock>
  )
}
