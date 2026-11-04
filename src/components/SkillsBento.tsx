import { useRef, type MouseEvent, type ReactNode } from 'react'
import { skillGroups } from '../data/portfolioData'
import { RevealOnScroll } from './ui/RevealOnScroll'

const spans = ['lg:col-span-4', 'lg:col-span-8', 'lg:col-span-12'] as const

type SkillName = (typeof skillGroups)[number]['items'][number]['name']

const skillTone: Record<SkillName, string> = {
  TypeScript: 'bg-frost-2/25 text-frost-2 ring-frost-2/55',
  JavaScript: 'bg-aurora-yellow/15 text-aurora-yellow ring-aurora-yellow/40',
  SQL: 'bg-aurora-green/15 text-aurora-green ring-aurora-green/40',
  PostgreSQL: 'bg-frost-0/15 text-frost-0 ring-frost-0/40',
  'Drizzle ORM': 'bg-aurora-purple/15 text-aurora-purple ring-aurora-purple/40',
  'AWS S3': 'bg-aurora-red/15 text-aurora-red ring-aurora-red/40',
  'Node.js': 'bg-frost-2/20 text-frost-2 ring-frost-2/45',
  Clerk: 'bg-aurora-yellow/10 text-aurora-yellow ring-aurora-yellow/30',
  React: 'bg-frost-1/15 text-frost-1 ring-frost-1/40',
  'Next.js 16': 'bg-snow-0/10 text-snow-0 ring-snow-0/30',
  'Tailwind CSS': 'bg-frost-0/20 text-frost-0 ring-frost-0/45',
  Motion: 'bg-aurora-purple/20 text-aurora-purple ring-aurora-purple/45',
  'GitHub Actions': 'bg-aurora-red/10 text-aurora-red ring-aurora-red/35',
  'Linux / macOS': 'bg-aurora-green/10 text-aurora-green ring-aurora-green/30',
}

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
    <section id="skills" className="border-t border-snow-0/10 px-5 py-16 sm:px-8 sm:py-24">
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
                    <p
                      className={`w-fit max-w-full rounded-md px-2 py-0.5 font-mono text-[13px] ring-1 ${skillTone[item.name]}`}
                    >
                      {item.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-snow-2">{item.detail}</p>
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
