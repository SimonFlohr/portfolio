import { motion, useReducedMotion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { timeline } from '../data/portfolioData'

export function Timeline() {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end end'],
  })

  return (
    <section id="journey" className="border-t border-snow-0/10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs tracking-[0.18em] text-frost-1 uppercase">Journey</p>
        <h2 className="mt-4 text-4xl font-medium tracking-tight text-snow-0 sm:text-5xl">
          Engineering & education
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-snow-2">
          B.S. in Software Engineering, then the M.S. in April 2026, then Pleck and this site.
        </p>

        <div className="relative mt-12">
          <div className="absolute top-2 bottom-2 left-[5px] w-px bg-snow-0/15" aria-hidden />
          <motion.div
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-frost-1"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          <ol ref={trackRef} className="space-y-10">
            {timeline.map((entry) => (
              <li key={entry.id} className="relative pl-10">
                <span
                  aria-hidden
                  className={
                    entry.when === 'Now'
                      ? 'absolute top-1.5 left-[5px] size-2.5 -translate-x-1/2 rounded-full bg-aurora-green ring-4 ring-polar-0'
                      : 'absolute top-1.5 left-[5px] size-2.5 -translate-x-1/2 rounded-full bg-polar-0 ring-2 ring-frost-1'
                  }
                />
                <p className="font-mono text-[11px] tracking-wide text-frost-1 uppercase">
                  {entry.when}
                </p>
                <h3 className="mt-1 text-xl font-medium text-snow-0">{entry.title}</h3>
                <p className="mt-1 font-mono text-xs text-snow-2">{entry.place}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-snow-2">{entry.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
