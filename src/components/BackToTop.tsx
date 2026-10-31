import { ArrowUp } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

export function BackToTop() {
  const reduce = useReducedMotion()
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const heroEl = hero

    let shown = false
    let frame = 0

    function update() {
      const bottom = heroEl.getBoundingClientRect().bottom
      // Stay shown until a real slice of the hero is back, so the edge does not flicker.
      const next = shown ? bottom < window.innerHeight * 0.35 : bottom <= -8
      if (next === shown) return
      shown = next
      setVisible(next)
    }

    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!visible) linkRef.current?.blur()
  }, [visible])

  function goToTop(event: MouseEvent<HTMLAnchorElement>) {
    const node = document.getElementById('top')
    if (!node) return
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.pushState(null, '', '#top')
    event.preventDefault()
  }

  return (
    <motion.a
      ref={linkRef}
      href="#top"
      aria-label="Back to top"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' }}
      className={`fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 inline-flex size-11 items-center justify-center rounded-full border border-snow-0/10 bg-polar-1 text-snow-1 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)] transition-colors hover:border-frost-1/40 hover:text-snow-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1 ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      onClick={goToTop}
    >
      <ArrowUp className="size-4" aria-hidden />
    </motion.a>
  )
}
