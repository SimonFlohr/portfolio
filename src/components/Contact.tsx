import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site, socialLinks } from '../data/portfolioData'
import { AuthorClock } from './ui/AuthorClock'
import { RevealOnScroll } from './ui/RevealOnScroll'
import { SocialIcons } from './ui/SocialIcons'

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

export function Contact() {
  const reduce = useReducedMotion() === true
  const [toast, setToast] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  function showToast(message: string, didCopy: boolean) {
    if (timer.current !== null) window.clearTimeout(timer.current)
    setCopied(didCopy)
    setToast(message)
    timer.current = window.setTimeout(() => {
      setToast(null)
      setCopied(false)
    }, 2200)
  }

  async function copyEmail() {
    try {
      await copyText(site.email)
      showToast(`Copied ${site.email}`, true)
    } catch {
      showToast(`Couldn’t copy. ${site.email}`, false)
    }
  }

  return (
    <footer id="contact" className="border-t border-snow-0/10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.18em] text-frost-1 uppercase">Contact</p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-snow-0 sm:text-5xl">
            Get in touch
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-snow-2">{site.description}</p>
          <p className="mt-3 font-mono text-xs tracking-wide text-snow-2 uppercase">
            {site.location} · {site.workModes.join(' · ')} · {site.availability}
          </p>
        </RevealOnScroll>

        <AuthorClock className="mt-8" />

        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-frost-3 px-5 text-sm font-medium text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
            aria-label={`Copy ${site.email}`}
            onClick={() => void copyEmail()}
          >
            {copied ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <p className="font-mono text-sm text-snow-1">{site.email}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <SocialIcons className="flex gap-2" />
          <ul className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-snow-0/10 px-4 text-sm text-snow-1 transition hover:border-frost-1/40 hover:text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 font-mono text-[11px] tracking-wide text-snow-2">
          {site.name} · {site.domain}
        </p>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4">
        <AnimatePresence>
          {toast ? (
            <motion.p
              key={toast}
              role="status"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 8 }}
              transition={
                reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }
              }
              className="rounded-full border border-snow-0/10 bg-polar-1 px-4 py-2 font-mono text-xs text-snow-0 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)]"
            >
              {toast}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </footer>
  )
}
