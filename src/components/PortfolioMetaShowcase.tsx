import { ArrowUpRight } from 'lucide-react'
import { portfolioMeta, site } from '../data/portfolioData'
import { CiBadge } from './ui/CiBadge'
import { RevealOnScroll } from './ui/RevealOnScroll'

const layers = [
  {
    id: 'interface',
    title: 'Interface',
    body: 'Vite, React 19, and Tailwind. Nord colors are set in the theme. Inter and JetBrains Mono are self-hosted. Motion runs the layout animation. A grain image covers the background.',
  },
  {
    id: 'content',
    title: 'Content',
    body: 'The copy and the Pleck examples live in portfolioData.ts. Each section reads that file.',
  },
  {
    id: 'delivery',
    title: 'Delivery',
    body: 'The pre-push hook runs pnpm verify: Prettier, ESLint, tsc -b, then the Vite build. GitHub Actions runs that same script on a pull request.',
  },
] as const

export function PortfolioMetaShowcase() {
  return (
    <section id="site" className="border-t border-snow-0/10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.18em] text-frost-1 uppercase">This site</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="text-4xl font-medium tracking-tight text-snow-0 sm:text-5xl">
                {portfolioMeta.name}
              </h2>
              <CiBadge
                repo="portfolio"
                actionsHref={`${portfolioMeta.repoUrl}/actions`}
                label="Live CI status for this site on GitHub Actions"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:justify-end">
              <a
                href={portfolioMeta.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-snow-0/10 px-3 font-mono text-xs text-snow-2 transition hover:border-frost-1/40 hover:text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
              >
                {portfolioMeta.repoName}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-snow-2">
            {portfolioMeta.summary}
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-2 items-stretch gap-2 sm:flex sm:flex-wrap">
          <Metric label="Gate" value={portfolioMeta.ci.command} hint="pre-push and CI" />
          <Metric label="Shortcut" value={portfolioMeta.shortcuts[0]} hint="command palette" />
        </div>

        <ol className="mt-6 grid gap-2 sm:grid-cols-4">
          {portfolioMeta.ci.steps.map((step, index) => (
            <li
              key={step}
              className="rounded-xl border border-snow-0/10 bg-polar-1/35 px-3 py-3 font-mono text-xs text-snow-1"
            >
              <span className="text-aurora-green">{String(index + 1).padStart(2, '0')}</span>
              <span className="mt-1 block text-sm text-snow-0">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {layers.map((layer, index) => (
            <RevealOnScroll key={layer.id} delay={index * 0.05}>
              <article className="h-full rounded-2xl border border-snow-0/10 bg-polar-1/30 p-5">
                <h3 className="text-lg font-medium text-snow-0">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-snow-2">{layer.body}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {portfolioMeta.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-snow-0/10 px-2.5 py-1 font-mono text-[11px] text-snow-2"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] break-all text-polar-3">
          {site.url} · {portfolioMeta.ci.workflow}
        </p>
      </div>
    </section>
  )
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="h-full rounded-xl border border-snow-0/10 bg-polar-1/40 px-3 py-2">
      <p className="font-mono text-[10px] tracking-wide text-snow-2 uppercase">{label}</p>
      <p className="font-mono text-sm text-snow-0">{value}</p>
      <p className="font-mono text-[10px] text-frost-1">{hint}</p>
    </div>
  )
}
