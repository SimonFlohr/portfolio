import { useState } from 'react'

type CiBadgeProps = {
  repo: string
  actionsHref: string
  label: string
  className?: string
}

export function CiBadge({ repo, actionsHref, label, className }: CiBadgeProps) {
  const [failed, setFailed] = useState(false)
  const src = `https://img.shields.io/github/actions/workflow/status/SimonFlohr/${repo}/ci.yml?branch=main&label=CI`
  const classes = `inline-flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frost-1 ${className ?? ''}`

  if (failed) {
    return <span className={`font-mono text-xs text-snow-1 ${className ?? ''}`}>CI</span>
  }

  return (
    <a href={actionsHref} target="_blank" rel="noreferrer" aria-label={label} className={classes}>
      <img src={src} alt="" className="h-5" onError={() => setFailed(true)} />
    </a>
  )
}
