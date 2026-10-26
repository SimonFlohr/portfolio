import { Menu, Search, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { navItems, site, type SectionId } from '../data/portfolioData'
import { AuthorClock } from './ui/AuthorClock'

type NavbarProps = {
  onOpenCommandPalette?: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<SectionId | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const shortcut =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
      ? '⌘K'
      : 'Ctrl+K'

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!onOpenCommandPalette) return
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setMenuOpen(false)
        onOpenCommandPalette()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onOpenCommandPalette])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null)

    if (sections.length === 0) return

    function update() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      // A short footer never fills the band, so the end of the page belongs to the last section.
      if (maxScroll > 0 && maxScroll - window.scrollY <= 48) {
        setActive(sections[sections.length - 1].id as SectionId)
        return
      }

      const bandTop = window.innerHeight * 0.2
      const bandBottom = window.innerHeight * 0.62
      let bestId: SectionId | null = null
      let bestOverlap = 0

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const overlap = Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop)
        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestId = section.id as SectionId
        }
      }

      setActive(bestId)
    }

    const frame = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    function onPointerDown(event: PointerEvent) {
      const header = headerRef.current
      if (header && event.target instanceof Node && !header.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    function onResize() {
      if (window.matchMedia('(min-width: 768px)').matches) setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  function goTo(id: string) {
    const node = document.getElementById(id)
    if (!node) return false
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.pushState(null, '', `#${id}`)
    return true
  }

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,var(--color-polar-0)_15%,transparent)]"
      />
      <div className="relative px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-4">
        <div className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center gap-2 rounded-2xl border border-snow-0/10 bg-polar-1/55 px-2 py-2 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl md:rounded-full md:px-2.5">
          <div className="mr-auto flex items-center gap-2">
            <a
              href="#top"
              className="flex items-center gap-2 rounded-full py-1 pr-2 pl-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
              onClick={(event) => {
                setActive(null)
                if (goTo('top')) event.preventDefault()
              }}
            >
              <span className="font-mono text-sm tracking-tight">
                <span className="text-frost-1">s</span>
                <span className="text-snow-0">Flohr</span>
              </span>
              <span className="hidden rounded-full border border-snow-0/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-snow-2 sm:inline">
                {site.domain}
              </span>
            </a>
            <AuthorClock
              density="compact"
              className="hidden rounded-full border border-snow-0/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-snow-2 lg:inline"
            />
          </div>

          <nav
            aria-label="Sections"
            className="hidden flex-1 flex-nowrap justify-center gap-0.5 md:flex"
          >
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="relative shrink-0 rounded-full px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
                  onClick={(event) => {
                    setActive(item.id)
                    if (goTo(item.id)) event.preventDefault()
                  }}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-frost-3/25 ring-1 ring-frost-1/30"
                      transition={
                        reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                    />
                  ) : null}
                  <span className={isActive ? 'relative text-snow-0' : 'relative text-snow-2'}>
                    {item.label}
                  </span>
                </a>
              )
            })}
          </nav>

          <button
            type="button"
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K"
            aria-label="Open command palette"
            className="inline-flex size-11 shrink-0 items-center justify-center gap-2 rounded-full border border-snow-0/10 bg-polar-0/50 font-mono text-[11px] text-snow-2 transition hover:border-frost-1/40 hover:text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1 md:size-auto md:px-2.5 md:py-1.5"
            onClick={() => {
              setMenuOpen(false)
              onOpenCommandPalette?.()
            }}
          >
            <Search className="size-4 md:size-3.5" aria-hidden />
            <span className="hidden md:inline">{shortcut}</span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-snow-0/10 bg-polar-0/50 text-snow-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1 md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Menu className="size-4" aria-hidden />
            )}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              id={menuId}
              aria-label="Sections"
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={
                reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
              }
              className="pointer-events-auto mx-auto mt-2 w-full max-w-5xl rounded-2xl border border-snow-0/10 bg-polar-1/90 p-2 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl md:hidden"
            >
              <AuthorClock className="border-b border-snow-0/10 px-3 pt-2 pb-3" />
              {navItems.map((item, index) => {
                const isActive = active === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={
                      isActive
                        ? 'flex min-h-11 items-center gap-3 rounded-xl bg-frost-3/25 px-3 py-3 text-sm text-snow-0 ring-1 ring-frost-1/30'
                        : 'flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm text-snow-2'
                    }
                    onClick={(event) => {
                      setMenuOpen(false)
                      setActive(item.id)
                      if (goTo(item.id)) event.preventDefault()
                    }}
                  >
                    <span className="font-mono text-[10px] tracking-wide text-frost-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                )
              })}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
