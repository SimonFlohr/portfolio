import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type KeyboardEvent } from 'react'
import {
  feedIndex,
  pleck,
  pleckTabs,
  principles,
  readers,
  trigramSearch,
  vaultPipeline,
  whoseDay,
  type PleckTabId,
  type ReaderId,
} from '../data/portfolioData'
import { RevealOnScroll } from './ui/RevealOnScroll'

const sparkById = new Map(whoseDay.sparks.map((spark) => [spark.id, spark]))

export function PleckShowcase() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState<PleckTabId>('timezone')

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = pleckTabs.findIndex((item) => item.id === tab)
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const next = pleckTabs[(index + direction + pleckTabs.length) % pleckTabs.length]
    setTab(next.id)
  }

  return (
    <section id="pleck" className="border-t border-snow-0/10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl min-w-0">
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.18em] text-frost-1 uppercase">Case study</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-medium tracking-tight text-snow-0 sm:text-5xl">
              {pleck.name}
            </h2>
            <a
              href={pleck.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-snow-0/10 px-3 font-mono text-xs text-snow-2 hover:border-frost-1/40 hover:text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
            >
              {pleck.repoName}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-xl text-snow-1">{pleck.tagline}</p>
          <p className="mt-3 max-w-2xl font-mono text-xs text-snow-2">{pleck.etymology}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-snow-2">{pleck.summary}</p>
          <p className="mt-3 max-w-3xl text-sm text-polar-3">{pleck.mvpNote}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {pleck.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-snow-0/10 bg-polar-1/50 px-2.5 py-1 font-mono text-[11px] text-snow-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {principles.map((principle, index) => (
            <RevealOnScroll key={principle.id} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-t-2 border-snow-0/10 border-t-frost-1 bg-polar-1/35 p-5">
                <p className="font-mono text-xs text-frost-1">{principle.index}</p>
                <h3 className="mt-3 text-lg leading-snug font-medium text-snow-0">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-snow-2">{principle.body}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-14">
          <div
            role="tablist"
            aria-label="Pleck engineering"
            className="grid grid-cols-1 gap-1 rounded-2xl border border-snow-0/10 bg-polar-1/40 p-1 sm:grid-cols-3"
            onKeyDown={onTabKeyDown}
          >
            {pleckTabs.map((item) => {
              const selected = tab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`pleck-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`pleck-panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  className="relative w-full rounded-xl px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1 sm:py-2"
                  onClick={() => setTab(item.id)}
                >
                  {selected ? (
                    <motion.span
                      layoutId="pleck-tab"
                      className="absolute inset-0 rounded-xl bg-polar-0/80 ring-1 ring-frost-1/30"
                      transition={
                        reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                    />
                  ) : null}
                  <span className="relative block font-mono text-[10px] tracking-wide text-frost-1 uppercase">
                    {item.index} {item.kicker}
                  </span>
                  <span
                    className={
                      selected
                        ? 'relative mt-0.5 block text-sm text-snow-0'
                        : 'relative mt-0.5 block text-sm text-snow-2'
                    }
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              role="tabpanel"
              id={`pleck-panel-${tab}`}
              aria-labelledby={`pleck-tab-${tab}`}
              className="mt-4"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {tab === 'timezone' ? <TimezoneSimulator /> : null}
              {tab === 'keyset' ? <KeysetTrigram /> : null}
              {tab === 'vault' ? <VaultPipeline /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function TimezoneSimulator() {
  const reduce = useReducedMotion()
  const [reader, setReader] = useState<ReaderId>('simon')
  const active = readers.find((item) => item.id === reader) ?? readers[0]

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="rounded-2xl border border-snow-0/10 bg-polar-1/30 p-5 sm:p-6">
        <p className="font-mono text-[11px] tracking-wide text-aurora-yellow uppercase">
          Whose day is it?
        </p>
        <p className="mt-3 text-sm leading-relaxed text-snow-1">{whoseDay.problem}</p>
        <p className="mt-3 text-sm leading-relaxed text-snow-2">{whoseDay.solution}</p>
        <p className="mt-3 text-sm leading-relaxed text-snow-2">{whoseDay.renderRule}</p>
        <p className="mt-5 border-t border-snow-0/10 pt-4 font-mono text-xs leading-relaxed text-frost-1">
          {whoseDay.perspectives[reader]}
        </p>
      </div>

      <div className="min-w-0 rounded-2xl border border-snow-0/10 bg-polar-0/55 p-4">
        <div
          role="radiogroup"
          aria-label="Reader"
          className="grid grid-cols-1 gap-1 rounded-xl bg-polar-1/70 p-1 sm:grid-cols-2"
        >
          {readers.map((item) => {
            const selected = reader === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className="relative rounded-lg px-2 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
                onClick={() => setReader(item.id)}
              >
                {selected ? (
                  <motion.span
                    layoutId="reader-pill"
                    className="absolute inset-0 rounded-lg bg-frost-3/30 ring-1 ring-frost-1/40"
                    transition={
                      reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                  />
                ) : null}
                <span className="relative block text-sm text-snow-0">{item.name}</span>
                <span className="relative block font-mono text-[10px] text-snow-2">
                  {item.city} · {item.language}
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-3 font-mono text-[10px] tracking-wide text-snow-2 uppercase">
          Reading as {active.name} · {active.zone}
        </p>

        <div className="mt-3 space-y-4" aria-live="polite">
          {whoseDay.dayGroups.map((group) => (
            <div key={group.authorLocalDate}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-xs tracking-wide text-snow-0 uppercase">
                  {group.labels[reader]}
                </h3>
                <span
                  className={
                    group.relative[reader] === 'Tomorrow'
                      ? 'font-mono text-[10px] tracking-wide text-aurora-yellow uppercase'
                      : 'font-mono text-[10px] tracking-wide text-snow-2 uppercase'
                  }
                >
                  {group.relative[reader]}
                </span>
              </div>
              <div className="space-y-2">
                {group.sparkIds.map((id) => {
                  const spark = sparkById.get(id)
                  if (!spark) return null
                  const stamp = spark.stamps[reader]
                  return (
                    <motion.article
                      key={spark.id}
                      layout
                      className="rounded-xl border border-snow-0/10 bg-polar-1/45 px-3 py-3"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={reader}
                          initial={reduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <p className="font-mono text-[13px] text-snow-0">{stamp.headline}</p>
                          {stamp.subtext ? (
                            <p className="mt-1 font-mono text-[11px] text-snow-2">
                              {stamp.subtext}
                            </p>
                          ) : null}
                        </motion.div>
                      </AnimatePresence>
                      <p className="mt-2 text-sm leading-relaxed text-snow-2">{spark.text}</p>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KeysetTrigram() {
  const [column, setColumn] = useState(1)
  const [query, setQuery] = useState<string>(trigramSearch.query)
  const [cursorOn, setCursorOn] = useState(false)
  const selected = feedIndex.columns[column]
  const cursor = feedIndex.cursorExample

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-snow-0/10 bg-polar-1/30 p-5">
        <p className="font-mono text-[11px] tracking-wide text-frost-1 uppercase">
          {feedIndex.name}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-snow-2">{feedIndex.why}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {feedIndex.columns.map((item, index) => {
            const active = index === column
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={active}
                className={
                  active
                    ? 'rounded-lg bg-frost-3/25 px-2.5 py-1.5 text-left ring-1 ring-frost-1/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1'
                    : 'rounded-lg bg-polar-0/50 px-2.5 py-1.5 text-left ring-1 ring-snow-0/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1'
                }
                onClick={() => setColumn(index)}
              >
                <span className="block font-mono text-[11px] text-snow-0">{item.name}</span>
                <span className="block font-mono text-[10px] text-snow-2">{item.direction}</span>
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-snow-1">{selected.role}</p>
        <p className="mt-2 font-mono text-[11px] text-aurora-green">WHERE {feedIndex.predicate}</p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-polar-0/70 p-3 font-mono text-[11px] leading-relaxed text-snow-2">
          {feedIndex.definition}
        </pre>
      </div>

      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-snow-0/10 bg-polar-1/30 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] tracking-wide text-frost-1 uppercase">
              Keyset cursor
            </p>
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-full border border-snow-0/15 px-3 font-mono text-[11px] text-snow-1 hover:border-frost-1/40 hover:text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
              onClick={() => setCursorOn((on) => !on)}
            >
              {cursorOn ? 'Reset cursor' : 'Step the cursor'}
            </button>
          </div>
          <p className="mt-3 font-mono text-[11px] text-snow-1">{feedIndex.comparison}</p>
          <ul className="mt-3 space-y-2">
            {whoseDay.sparks.map((spark) => {
              const included = cursorOn && isBeforeCursor(spark, cursor)
              const boundary = cursorOn && spark.id === cursor.id
              return (
                <li
                  key={spark.id}
                  className={
                    included
                      ? 'rounded-xl border border-frost-1/40 bg-frost-3/15 px-3 py-2'
                      : 'rounded-xl border border-snow-0/10 bg-polar-0/45 px-3 py-2'
                  }
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-xs text-snow-0">{spark.author}</span>
                    <span className="font-mono text-[10px] text-snow-2">
                      {boundary ? 'cursor' : included ? 'next page' : 'this page'}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-snow-2">
                    {spark.authorLocalDate} · {spark.createdAt} · {spark.id}
                  </p>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-snow-2">
            {cursorOn
              ? cursor.note
              : 'Both sparks are on the first page. Step the cursor to leave it on Femke’s Monday row. Simon’s Sunday row is the next page.'}
          </p>
        </div>

        <div className="rounded-2xl border border-snow-0/10 bg-polar-1/30 p-5">
          <label
            htmlFor="trigram-query"
            className="font-mono text-[11px] tracking-wide text-frost-1 uppercase"
          >
            {trigramSearch.extension} · {trigramSearch.operatorClass}
          </label>
          <p className="mt-2 text-sm leading-relaxed text-snow-2">{trigramSearch.why}</p>
          <input
            id="trigram-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            spellCheck={false}
            className="mt-3 w-full rounded-lg border border-snow-0/10 bg-polar-0/70 px-3 py-2 font-mono text-sm text-snow-0 outline-none focus-visible:border-frost-1/50"
          />
          <p className="mt-2 font-mono text-[11px] text-snow-2">
            {trigramSearch.column} ILIKE &apos;%{query}%&apos;
          </p>
          <ul className="mt-3 space-y-2">
            {trigramSearch.matches.map((match) => {
              const parts = highlight(match.sentence, query)
              const hit = parts.some((part) => part.hit)
              return (
                <li key={match.lang} className="rounded-xl bg-polar-0/45 px-3 py-2">
                  <p className="font-mono text-[10px] tracking-wide text-snow-2 uppercase">
                    {match.label}
                    {hit ? ' · hit' : ' · miss'}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-snow-1">
                    {parts.map((part, index) =>
                      part.hit ? (
                        <mark
                          key={`${match.lang}-${index}`}
                          className="rounded bg-aurora-yellow/25 px-0.5 text-snow-0"
                        >
                          {part.text}
                        </mark>
                      ) : (
                        <span key={`${match.lang}-${index}`}>{part.text}</span>
                      ),
                    )}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function isBeforeCursor(
  spark: { authorLocalDate: string; createdAt: string; id: string },
  cursor: { authorLocalDate: string; createdAt: string; id: string },
) {
  if (spark.authorLocalDate !== cursor.authorLocalDate) {
    return spark.authorLocalDate < cursor.authorLocalDate
  }
  if (spark.createdAt !== cursor.createdAt) return spark.createdAt < cursor.createdAt
  return spark.id < cursor.id
}

function highlight(text: string, query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return [{ text, hit: false }]

  const parts: { text: string; hit: boolean }[] = []
  const lower = text.toLowerCase()
  let cursor = 0

  while (cursor < text.length) {
    const at = lower.indexOf(needle, cursor)
    if (at < 0) {
      parts.push({ text: text.slice(cursor), hit: false })
      break
    }
    if (at > cursor) parts.push({ text: text.slice(cursor, at), hit: false })
    parts.push({ text: text.slice(at, at + needle.length), hit: true })
    cursor = at + needle.length
  }

  return parts
}

function VaultPipeline() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = vaultPipeline[step]

  useEffect(() => {
    if (reduce || paused) return
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % vaultPipeline.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [paused, reduce])

  return (
    <div className="rounded-2xl border border-snow-0/10 bg-polar-1/30 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-wide text-frost-1 uppercase">
          Zero-proxy vault
        </p>
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full border border-snow-0/15 px-3 font-mono text-[11px] text-snow-1 hover:border-frost-1/40 hover:text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
          onClick={() => setPaused((value) => !value)}
        >
          {paused || reduce ? 'Play' : 'Pause'}
        </button>
      </div>

      <div className="relative mt-6 hidden h-4 md:block" aria-hidden>
        <div className="absolute inset-x-[8%] top-1/2 h-px bg-snow-0/15" />
        {!reduce ? (
          <motion.span
            className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-frost-1 shadow-[0_0_12px_var(--color-frost-1)]"
            animate={{ left: `${8 + (step / (vaultPipeline.length - 1)) * 84}%` }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          />
        ) : null}
      </div>

      <ol className="mt-2 grid gap-2 md:mt-6 md:grid-cols-5">
        {vaultPipeline.map((node, index) => {
          const selected = index === step
          return (
            <li key={node.id}>
              <button
                type="button"
                aria-pressed={selected}
                className={
                  selected
                    ? 'h-full w-full rounded-xl border border-frost-1/50 bg-frost-3/20 px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1'
                    : 'h-full w-full rounded-xl border border-snow-0/10 bg-polar-0/45 px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1'
                }
                onClick={() => {
                  setPaused(true)
                  setStep(index)
                }}
              >
                <span className="font-mono text-[10px] text-frost-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="mt-1 block text-sm text-snow-0">{node.title}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="mt-4 rounded-xl border border-snow-0/10 bg-polar-0/50 px-4 py-3">
        <p className="font-mono text-xs text-snow-0">{active.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-snow-2">{active.detail}</p>
      </div>

      <svg viewBox="0 0 640 72" className="mt-4 hidden w-full md:block" aria-hidden>
        <path
          d="M24 36 H616"
          fill="none"
          stroke="currentColor"
          className="text-snow-0/20"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        {vaultPipeline.map((node, index) => {
          const x = 24 + (index / (vaultPipeline.length - 1)) * 592
          const selected = index === step
          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy="36"
                r={selected ? 7 : 4}
                className={selected ? 'fill-frost-1' : 'fill-polar-3'}
              />
              <text x={x} y="62" textAnchor="middle" className="fill-snow-2 font-mono text-[9px]">
                {node.id}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
