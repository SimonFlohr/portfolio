import { ArrowUpRight, Copy, CornerDownLeft, FileDown, Search } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { commands, type Command } from '../data/portfolioData'

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    const field = document.createElement('textarea')
    field.value = value
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const copied = document.execCommand('copy')
    field.remove()
    if (!copied) throw new Error('copy failed')
  }
}

const commandIcons = {
  section: CornerDownLeft,
  copy: Copy,
  external: ArrowUpRight,
  download: FileDown,
} as const

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const reduce = useReducedMotion() === true

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="command-palette"
          className="fixed inset-0 z-[70]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.16 }}
        >
          <PaletteDialog onClose={onClose} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion() === true
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [notice, setNotice] = useState<string | null>(null)

  const filtered = commands.filter((command) => {
    const haystack = `${command.label} ${command.hint}`.toLowerCase()
    return haystack.includes(query.trim().toLowerCase())
  })
  const selected = filtered.length === 0 ? 0 : Math.min(index, filtered.length - 1)
  const active = filtered[selected]

  useEffect(() => {
    const previous = document.activeElement
    const previousOverflow = document.body.style.overflow
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  useEffect(() => {
    if (!active) return
    document.getElementById(`${listId}-${active.id}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, listId])

  function move(delta: number) {
    if (filtered.length === 0) return
    setIndex((current) => {
      const base = Math.min(current, filtered.length - 1)
      return (base + delta + filtered.length) % filtered.length
    })
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
      return
    }
    if (event.key === 'Tab') {
      event.preventDefault()
      inputRef.current?.focus()
      return
    }
    if (event.key === 'Enter' && active) {
      event.preventDefault()
      void run(active)
    }
  }

  async function run(command: Command) {
    if (command.kind === 'section') {
      const node = document.getElementById(command.sectionId)
      if (node) {
        node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        history.pushState(null, '', `#${command.sectionId}`)
      }
      onClose()
      return
    }

    if (command.kind === 'copy') {
      try {
        await copyText(command.value)
        setNotice(`Copied ${command.value}`)
      } catch {
        setNotice(`Couldn’t copy. ${command.value}`)
      }
      return
    }

    if (command.kind === 'external') {
      window.open(command.href, '_blank', 'noopener,noreferrer')
      onClose()
      return
    }

    const head = await fetch(command.href, { method: 'HEAD' })
    const type = head.headers.get('content-type') ?? ''
    if (!head.ok || type.includes('text/html')) {
      setNotice('Resume PDF is not on this server yet.')
      return
    }

    const anchor = document.createElement('a')
    anchor.href = command.href
    anchor.download = ''
    anchor.rel = 'noopener'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    onClose()
  }

  return (
    <div
      className="flex h-full items-start justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-polar-0/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-snow-0/10 bg-polar-1 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.85)]"
      >
        <div className="flex items-center gap-3 border-b border-snow-0/10 px-4">
          <Search className="size-4 shrink-0 text-frost-1" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={active ? `${listId}-${active.id}` : undefined}
            aria-label="Search commands"
            placeholder="Jump, copy, open…"
            className="w-full bg-transparent py-3.5 text-sm text-snow-0 outline-none placeholder:text-snow-2/70"
            onChange={(event) => {
              setQuery(event.target.value)
              setIndex(0)
              setNotice(null)
            }}
          />
        </div>

        {notice ? (
          <p
            role="status"
            className="border-b border-snow-0/10 px-4 py-2 font-mono text-xs text-aurora-green"
          >
            {notice}
          </p>
        ) : null}

        <ul
          id={listId}
          role="listbox"
          aria-label="Commands"
          className="max-h-[50dvh] overflow-y-auto p-1.5"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-snow-2">No matching commands.</li>
          ) : (
            filtered.map((command, itemIndex) => {
              const Icon = commandIcons[command.kind]
              const isSelected = itemIndex === selected
              return (
                <li key={command.id} role="presentation">
                  <button
                    id={`${listId}-${command.id}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={
                      isSelected
                        ? 'flex min-h-11 w-full items-center gap-3 rounded-xl bg-polar-2 px-3 py-3 text-left sm:py-2.5'
                        : 'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-left sm:py-2.5'
                    }
                    onMouseEnter={() => setIndex(itemIndex)}
                    onClick={() => void run(command)}
                  >
                    <Icon className="size-3.5 shrink-0 text-frost-1" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-snow-0">{command.label}</span>
                      <span className="mt-0.5 block truncate font-mono text-[11px] text-snow-2 sm:hidden">
                        {command.hint}
                      </span>
                    </span>
                    <span className="ml-auto hidden truncate font-mono text-[11px] text-snow-2 sm:inline">
                      {command.hint}
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}
