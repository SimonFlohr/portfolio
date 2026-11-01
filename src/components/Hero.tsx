import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import portrait from '../assets/simon.jpg'
import { hero, site } from '../data/portfolioData'
import { AuthorClock } from './ui/AuthorClock'
import { RevealOnScroll } from './ui/RevealOnScroll'
import { SocialIcons } from './ui/SocialIcons'

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 32 },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const words = hero.title.split(' ')

  function trackSpotlight(event: MouseEvent<HTMLElement>) {
    const node = sectionRef.current
    if (!node || reduce) return
    const rect = node.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    node.style.setProperty('--spot-x', `${x}%`)
    node.style.setProperty('--spot-y', `${y}%`)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-dvh items-center overflow-hidden px-5 pt-24 pb-14 sm:px-8 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
      style={{ ['--spot-x' as string]: '72%', ['--spot-y' as string]: '18%' }}
      onMouseMove={trackSpotlight}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-polar-1),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(540px circle at var(--spot-x) var(--spot-y), color-mix(in srgb, var(--color-frost-1) 18%, transparent), transparent 62%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="contents lg:block">
          <motion.div
            className="order-2 lg:order-none"
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={reduce ? undefined : stagger}
          >
            <motion.p
              variants={reduce ? undefined : reveal}
              className="font-mono text-xs tracking-[0.18em] text-snow-2 uppercase"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.p
              variants={reduce ? undefined : reveal}
              className="mt-2 font-mono text-xs tracking-[0.14em] text-snow-2 uppercase sm:tracking-[0.18em]"
            >
              {hero.credentials}
            </motion.p>

            <motion.p
              variants={reduce ? undefined : reveal}
              className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-aurora-green/30 bg-aurora-green/10 px-3 py-1.5 font-mono text-[11px] tracking-wide text-aurora-green uppercase sm:mt-5"
            >
              <span className="relative flex size-1.5 shrink-0" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-aurora-green opacity-70 motion-reduce:animate-none" />
                <span className="relative size-1.5 rounded-full bg-aurora-green" />
              </span>
              {hero.availability}
            </motion.p>

            <motion.h1
              variants={reduce ? undefined : stagger}
              className="mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-balance text-snow-0 sm:mt-6 sm:text-6xl"
            >
              {reduce
                ? hero.title
                : words.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={reveal}
                      className="inline-block"
                    >
                      {word}
                      {index < words.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                  ))}
            </motion.h1>
          </motion.div>

          <RevealOnScroll delay={0.12} className="order-3 max-w-xl lg:order-none lg:mt-6">
            <p className="text-base leading-relaxed text-snow-2 sm:text-lg">{hero.lede}</p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <MagneticLink
                href={hero.primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-frost-3 px-5 text-sm font-medium text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
              >
                {hero.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </MagneticLink>
              <MagneticLink
                href={hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-snow-0/15 bg-polar-0/40 px-5 text-sm text-snow-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
              >
                {hero.secondaryCta.label}
              </MagneticLink>
            </div>
          </RevealOnScroll>
        </div>
        <Portrait />
      </div>
    </section>
  )
}

function Portrait() {
  const reduce = useReducedMotion() === true
  const frameRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const shiftX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.5 })
  const shiftY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.5 })

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width
    const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height
    x.set(dx * -14)
    y.set(dy * -12)
  }

  return (
    <div
      ref={frameRef}
      className="relative order-1 mx-auto mt-1 w-40 shrink-0 sm:mt-4 sm:w-56 lg:order-2 lg:mx-0 lg:mt-0 lg:w-full lg:max-w-72 lg:justify-self-end"
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <div className="relative aspect-square">
        <div
          aria-hidden
          className="absolute -top-3 -right-3 hidden aspect-square w-[86%] rounded-[1.4rem] border border-frost-1/25 sm:block"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at 50% 46%, black 58%, transparent 80%)',
            maskImage: 'radial-gradient(circle at 50% 46%, black 58%, transparent 80%)',
          }}
        >
          <motion.img
            src={portrait}
            alt={`Portrait of ${site.name}`}
            width={1511}
            height={1511}
            draggable={false}
            className="size-full object-cover select-none"
            style={reduce ? { scale: 1.08 } : { x: shiftX, y: shiftY, scale: 1.14 }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-polar-0/40 mix-blend-multiply"
          />
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute top-1 left-1 size-3.5 border-t border-l border-frost-1/80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-1 right-1 size-3.5 border-t border-r border-frost-1/80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-1 left-1 size-3.5 border-b border-l border-frost-1/80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-1 bottom-1 size-3.5 border-r border-b border-frost-1/80"
        />
      </div>
      <AuthorClock className="mt-3 text-center lg:text-left" />
      <SocialIcons className="mt-3 flex justify-center gap-2 lg:justify-start" />
    </div>
  )
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  function reset() {
    x.set(0)
    y.set(0)
  }

  function onPointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28)
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.4)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      data-magnetic
      className={className}
      style={reduce ? undefined : { x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onPointerUp={(event) => {
        if (event.pointerType !== 'mouse') reset()
      }}
    >
      {children}
    </motion.a>
  )
}
