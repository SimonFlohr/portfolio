import { useRef, type MouseEvent, type ReactNode } from 'react'
import { skillGroups } from '../data/portfolioData'
import { RevealOnScroll } from './ui/RevealOnScroll'

const spans = ['lg:col-span-4', 'lg:col-span-8', 'lg:col-span-12'] as const

const ringMask = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)'

function glowStyle(padding: string, radius: number, alpha: number) {
  return {
    padding,
    background: `radial-gradient(${radius}px circle at var(--glow-x, 50%) var(--glow-y, 0%), color-mix(in srgb, var(--color-frost-1) ${alpha * 100}%, transparent), transparent 42%)`,
    mask: ringMask,
    maskComposite: 'exclude' as const,
    WebkitMask: ringMask,
    WebkitMaskComposite: 'xor' as const,
  }
}

export function SkillsBento() {
  return (
    <section
      id="skills"
      className="scroll-mt-28 border-t border-snow-0/10 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.18em] text-frost-1 uppercase">Skills</p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-snow-0 sm:text-5xl">
            Languages, data, practice
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-snow-2">
            What Pleck and this site are built with.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          {skillGroups.map((group, index) => (
            <GlowCard key={group.id} className={spans[index]}>
              <p className="font-mono text-[11px] tracking-wide text-frost-1 uppercase">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-xl font-medium text-snow-0">{group.title}</h3>
              <ul
                className={
                  group.items.length > 4
                    ? 'mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
                    : 'mt-5 space-y-4'
                }
              >
                {group.items.map((item) => (
                  <li key={item.name}>
                    <p className="text-sm text-snow-0">{item.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-snow-2">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)

  function track(event: MouseEvent<HTMLElement>) {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    node.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }

  return (
    <RevealOnScroll className={className}>
      <article
        ref={ref}
        onMouseMove={track}
        className="group relative h-full overflow-hidden rounded-2xl border border-snow-0/10 bg-polar-1/35 p-5"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={glowStyle('1px', 520, 0.85)}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={glowStyle('14px', 280, 0.45)}
        />
        <div className="relative">{children}</div>
      </article>
    </RevealOnScroll>
  )
}
