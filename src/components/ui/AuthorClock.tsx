import { useEffect, useState } from 'react'
import { readers, site } from '../../data/portfolioData'

const simon = readers.find((reader) => reader.id === 'simon') ?? readers[0]

type AuthorClockProps = {
  density?: 'full' | 'compact'
  className?: string
}

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((item) => item.type === type)?.value ?? ''
}

function localDateKey(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  return `${part(parts, 'year')}-${part(parts, 'month')}-${part(parts, 'day')}`
}

function weekdayTime(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
  }).formatToParts(date)
  const dayPeriod = part(parts, 'dayPeriod')
  const clock = `${part(parts, 'hour')}:${part(parts, 'minute')}${dayPeriod ? ` ${dayPeriod}` : ''}`
  return `${part(parts, 'weekday')} ${clock}`
}

function timeOnly(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function AuthorClock({ density = 'full', className }: AuthorClockProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let interval = 0
    const delay = 60_000 - (Date.now() % 60_000)
    const timeout = window.setTimeout(() => {
      setNow(new Date())
      interval = window.setInterval(() => setNow(new Date()), 60_000)
    }, delay)
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  const readerZone = new Intl.DateTimeFormat().resolvedOptions().timeZone || simon.zone
  const authorLabel = weekdayTime(now, simon.zone)
  const daysDiffer =
    readerZone !== simon.zone && localDateKey(now, simon.zone) !== localDateKey(now, readerZone)
  const readerLabel = daysDiffer ? weekdayTime(now, readerZone) : null
  const spoken = readerLabel
    ? `${simon.name}, ${authorLabel}, ${site.location}. Your clock, ${readerLabel}`
    : `${simon.name}, ${authorLabel}, ${site.location}`

  if (density === 'compact') {
    return (
      <time dateTime={now.toISOString()} aria-label={spoken} className={className}>
        {timeOnly(now, simon.zone)}
      </time>
    )
  }

  return (
    <div className={className}>
      <p className="font-mono text-[11px] leading-snug text-snow-0">
        {simon.name}
        <span className="whitespace-nowrap text-snow-1"> · {authorLabel}</span>
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-snow-2 uppercase">
        {site.location}
      </p>
      {readerLabel ? <p className="mt-1 font-mono text-[10px] text-snow-2">{readerLabel}</p> : null}
    </div>
  )
}
