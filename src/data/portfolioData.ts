export const site = {
  name: 'Simon Flohr',
  brand: 'sFlohr',
  domain: 'simonflohr.dev',
  url: 'https://simonflohr.dev',
  location: 'Des Moines, IA',
  workModes: ['Remote', 'Local'],
  availability: 'Available for local and remote SWE Roles',
  role: 'Software Engineer',
  roleFocus: ['Full-Stack', 'Frontend', 'Cloud'],
  email: 'simonflohr31@gmail.com',
  github: 'https://github.com/SimonFlohr',
  linkedin: 'https://www.linkedin.com/in/simonflohr/',
  resumeHref: '/resume.pdf',
  description:
    'Software engineer in Des Moines. I built Pleck, a private family vault, and this site to show how it works.',
} as const

export const navItems = [
  { id: 'top', label: 'Top' },
  { id: 'pleck', label: 'Pleck' },
  { id: 'site', label: 'This site' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const hero = {
  eyebrow: `📍 Des Moines, IA`,
  credentials: '📚 M.S. & B.S. — Software Engineering',
  availability: site.availability,
  title: 'The interesting bugs show up later.',
  lede: 'I\u2019m a software engineer in Des Moines. This page is the work: a case study, the stack, and a way to get in touch.',
  primaryCta: { label: 'Read the Pleck case study', href: '#pleck' },
  secondaryCta: { label: 'Get in touch', href: '#contact' },
} as const

export const pleck = {
  name: 'Pleck',
  repoName: 'pleck-web',
  repoUrl: 'https://github.com/SimonFlohr/pleck-web',
  demoLabel: 'Try live demo',
  demoUrl: 'https://getpleck.com/demo',
  etymology: "Derived from the Dutch word 'plek', meaning a place or spot.",
  tagline: 'One family vault. Nothing lost.',
  summary:
    'A private, invite-only PWA. The family in this case study lives in the US and the Netherlands. The UI is English and Dutch. Members add sparks, which are photos and text. The home page is a day-grouped feed with search, and filters can be shared as a URL. v1 will open Pleck to families anywhere, in any combination of time zones.',
  mvpNote: 'Voice notes will be added in v1. They are not in this version.',
  stack: [
    'Next.js 16',
    'TypeScript',
    'PostgreSQL',
    'Neon',
    'pg_trgm',
    'Drizzle ORM',
    'Clerk',
    'AWS S3',
  ],
} as const

export const principles = [
  {
    id: 'one-place',
    index: '01',
    title: 'A persistent vault for the family',
    body: "Pleck does not send notifications. You open the vault to see what's new.",
  },
  {
    id: 'conversation',
    index: '02',
    title: 'Talking stays off-platform',
    body: 'Pleck has no replies or comments. The conversation stays off-platform. Pleck keeps the photos and the notes.',
  },
  {
    id: 'capture',
    index: '03',
    title: 'Save the metadata you cannot reconstruct',
    body: 'At insert, Pleck stores the author time zone, the author\u2019s local date, the EXIF capture time (happened_at), a SHA-256 of the file, and the MIME type. S3 keeps versioned objects. Deleting an object sets deleted_at and leaves the object.',
  },
] as const

export type ReaderId = 'simon' | 'femke'

export const readers = [
  {
    id: 'simon',
    name: 'Simon',
    zone: 'America/Chicago',
    city: 'Des Moines',
    locale: 'en-US',
    language: 'English',
  },
  {
    id: 'femke',
    name: 'Femke',
    zone: 'Europe/Amsterdam',
    city: 'Amsterdam',
    locale: 'nl-NL',
    language: 'Nederlands',
  },
] as const satisfies readonly {
  id: ReaderId
  name: string
  zone: string
  city: string
  locale: string
  language: string
}[]

export const whoseDay = {
  problem:
    'A spark posted at 6:55 PM in (America/Chicago) is 01:55 AM on Monday in (Europe/Amsterdam). Whose calendar day does it belong to?',
  solution:
    'At insert, Pleck stores author_timezone (an IANA name) and sets author_local_date with localDate(instant, zone). Postgres cannot do that in a GENERATED column. AT TIME ZONE is STABLE, and generated columns require IMMUTABLE, because the IANA data can change. Writing the date once means a later DST update does not move the spark to another day. Chicago and Amsterdam timezones are the demo. v1 keeps the same rule for any combination of zones.',
  renderRule:
    'A stamp uses the reader\u2019s language (Intl.DateTimeFormat, English or Dutch) and the author\u2019s clock.',
  sparks: [
    {
      id: 'femke-monday',
      author: 'Femke',
      authorZone: 'Europe/Amsterdam',
      authorCity: 'Amsterdam',
      instant: '2026-06-15T00:30:00+02:00',
      authorLocalDate: '2026-06-15',
      createdAt: '2026-06-14T22:30:00.000Z',
      text: 'De tomaten in de tuin zijn eindelijk rood.',
      stamps: {
        simon: {
          headline: 'Femke · Monday 12:30 AM · Amsterdam',
          subtext: null,
        },
        femke: {
          headline: 'Femke · maandag 00:30',
          subtext: null,
        },
      },
    },
    {
      id: 'simon-sunday',
      author: 'Simon',
      authorZone: 'America/Chicago',
      authorCity: 'Chicago',
      instant: '2026-06-14T18:55:00-05:00',
      authorLocalDate: '2026-06-14',
      createdAt: '2026-06-14T23:55:00.000Z',
      text: 'Sunday dinner. The tomatoes from the garden finally turned.',
      stamps: {
        simon: {
          headline: 'Simon · Sunday 6:55 PM',
          subtext: null,
        },
        femke: {
          headline: 'Simon · zondag 18:55 · Chicago',
          subtext: null,
        },
      },
    },
  ],
  dayGroups: [
    {
      authorLocalDate: '2026-06-15',
      labels: { simon: 'Monday', femke: 'maandag' },
      relative: { simon: 'Tomorrow', femke: 'Vandaag' },
      sparkIds: ['femke-monday'],
    },
    {
      authorLocalDate: '2026-06-14',
      labels: { simon: 'Sunday', femke: 'zondag' },
      relative: { simon: 'Today', femke: 'Gisteren' },
      sparkIds: ['simon-sunday'],
    },
  ],
  perspectives: {
    simon:
      "It's Sunday evening in Des Moines. Femke\u2019s stamp is Monday — the timestamp is followed up by 'Amsterdam' to indicate the timezone.",
    femke:
      "Same two rows, in Dutch. Simon's stamp stays Sunday — the timestamp is followed up by 'Chicago' to indicate the timezone.",
  },
} as const

export const feedIndex = {
  name: 'sparks_feed_idx',
  why: 'OFFSET can skip or repeat a row when a new post lands above the screen. The next load starts after the last row shown.',
  definition: `CREATE INDEX sparks_feed_idx
  ON sparks (circle_id, author_local_date DESC, created_at DESC, id DESC)
  WHERE deleted_at IS NULL;`,
  columns: [
    { name: 'circle_id', direction: 'ASC', role: 'The query is for one circle.' },
    { name: 'author_local_date', direction: 'DESC', role: 'Author\u2019s frozen local day.' },
    { name: 'created_at', direction: 'DESC', role: 'Tie-break inside a day.' },
    { name: 'id', direction: 'DESC', role: 'Final unique tie-break.' },
  ],
  predicate: 'deleted_at IS NULL',
  comparison: '(author_local_date, created_at, id) < ($1, $2, $3)',
  query: `SELECT id, author_local_date, created_at, text_content
FROM sparks
WHERE circle_id = $circle
  AND deleted_at IS NULL
  AND (author_local_date, created_at, id) < ($1, $2, $3)
ORDER BY author_local_date DESC, created_at DESC, id DESC
LIMIT $limit;`,
  cursorExample: {
    lead: 'Femke posted earlier in UTC. Her Monday still loads first.',
    mark: 'cursor',
    after: 'The cursor is this row. The next load starts after it.',
  },
} as const

export const trigramSearch = {
  extension: 'pg_trgm',
  operatorClass: 'gin_trgm_ops',
  column: 'text_content',
  why: 'pg_trgm splits text into three-character pieces. The query tomat is inside both Dutch tomaten and English tomatoes, and ILIKE can use the GIN index.',
  definition: `CREATE INDEX sparks_text_trgm_idx
  ON sparks USING gin (text_content gin_trgm_ops);`,
  query: 'tomat',
  predicate: "text_content ILIKE '%tomat%'",
  matches: [
    {
      lang: 'nl',
      label: 'Dutch',
      word: 'tomaten',
      sentence: 'De tomaten in de tuin zijn eindelijk rood.',
    },
    {
      lang: 'en',
      label: 'English',
      word: 'tomatoes',
      sentence: 'The tomatoes from the garden finally turned.',
    },
  ],
} as const

export const vaultPipeline = [
  {
    id: 'pick',
    title: 'Client photo pick',
    detail: 'The file stays in the browser. The app server does not receive the bytes.',
  },
  {
    id: 'prepare',
    title: 'EXIF, fingerprint, compress',
    detail:
      'prepare-photo.ts reads happened_at from EXIF, hashes the file with SHA-256, and compresses it before upload.',
  },
  {
    id: 'sign',
    title: 'Presigned PUT',
    detail: 'Next.js 16 /api/upload returns a presigned PUT URL. The browser writes to S3.',
  },
  {
    id: 'store',
    title: 'Private versioned bucket',
    detail:
      'The bucket is private and versioned. A delete sets deleted_at. The object version stays.',
  },
  {
    id: 'render',
    title: 'Presigned GET',
    detail: 'The feed requests a short-lived presigned GET. The bucket stays private.',
  },
] as const

export const pleckTabs = [
  {
    id: 'timezone',
    index: '01',
    label: 'Whose day?',
    kicker: 'Timezone simulator',
  },
  {
    id: 'keyset',
    index: '02',
    label: 'Keyset & trigram',
    kicker: 'Feed engine',
  },
  {
    id: 'vault',
    index: '03',
    label: 'S3 vault',
    kicker: 'Upload path',
  },
] as const

export type PleckTabId = (typeof pleckTabs)[number]['id']

export const portfolioMeta = {
  name: 'simonflohr.dev',
  url: site.url,
  repoName: 'portfolio',
  repoUrl: 'https://github.com/SimonFlohr/portfolio',
  summary:
    'A Vite and React SPA. The Pleck section switches the reader, shows two feed loads, and walks the upload. ⌘K opens the command palette. The pre-push hook runs pnpm verify, and GitHub Actions runs the same script.',
  stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'GitHub Actions'],
  shortcuts: ['⌘K'],
  ci: {
    workflow: '.github/workflows/ci.yml',
    command: 'pnpm verify',
    steps: ['Prettier', 'ESLint', 'tsc -b', 'vite build'],
  },
} as const

export const skillGroups = [
  {
    id: 'languages',
    title: 'Languages',
    items: [
      { name: 'TypeScript', detail: 'This site, and Pleck\u2019s app code.' },
      { name: 'JavaScript', detail: 'The browser upload code and the Node server.' },
      {
        name: 'SQL',
        detail: 'The keyset query, the partial feed index, and the trigram index.',
      },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud, data & ORM',
    items: [
      { name: 'PostgreSQL', detail: 'Neon. pg_trgm for Dutch and English substring search.' },
      { name: 'Drizzle ORM', detail: 'Pleck\u2019s schema and queries.' },
      { name: 'AWS S3', detail: 'Private versioned bucket. Presigned PUT and GET.' },
      { name: 'Node.js', detail: 'Next.js 16. /api/upload returns the presigned PUT.' },
      { name: 'Clerk', detail: 'Invite-only sign-in for Pleck.' },
    ],
  },
  {
    id: 'practice',
    title: 'Practice',
    items: [
      { name: 'React', detail: 'React 19 on this site. Pleck\u2019s UI is React.' },
      { name: 'Next.js 16', detail: 'App Router on Pleck. This site is Vite.' },
      { name: 'Tailwind CSS', detail: 'Nord colors live in the theme in src/index.css.' },
      {
        name: 'Motion',
        detail: 'Layout animation and the timeline. prefers-reduced-motion turns it off.',
      },
      {
        name: 'GitHub Actions',
        detail: 'pnpm verify on pull requests. The pre-push hook runs it too.',
      },
      { name: 'Linux / macOS', detail: 'Where I do the work.' },
    ],
  },
] as const

export const timeline = [
  {
    id: 'bs',
    when: 'January 2025',
    title: 'B.S. Software Engineering',
    place: 'Western Governors University',
    body: 'Most of this was building software and then testing it: APIs, databases, security, and getting a deploy out.',
  },
  {
    id: 'ms',
    when: 'April 2026',
    title: 'M.S. Software Engineering',
    place: 'Western Governors University',
    body: 'This was design and architecture. Requirements, testing, and how the pieces of a system fit.',
  },
  {
    id: 'systems',
    when: 'Now',
    title: 'Full-stack systems',
    place: 'Pleck · simonflohr.dev',
    body: 'Pleck keeps one family\u2019s photos and notes across the US and the Netherlands. The author\u2019s local date is written at insert, the feed uses a keyset cursor, and the browser uploads to S3 with a presigned URL.',
  },
] as const

export const education = [
  {
    id: 'ms',
    degree: 'M.S. Software Engineering',
    school: 'Western Governors University',
    completed: 'April 2026',
  },
  {
    id: 'bs',
    degree: 'B.S. Software Engineering',
    school: 'Western Governors University',
    completed: null,
  },
] as const

export const socialIcons = [
  { id: 'linkedin', label: 'LinkedIn', href: site.linkedin },
  { id: 'github', label: 'GitHub', href: site.github },
] as const

export const socialLinks = [
  { id: 'pleck', label: 'pleck-web', href: pleck.repoUrl },
  { id: 'site', label: site.domain, href: site.url },
] as const

export const commands = [
  {
    id: 'jump-top',
    label: "Jump to 'Top'",
    hint: 'Hero',
    kind: 'section',
    sectionId: 'top',
  },
  {
    id: 'jump-pleck',
    label: "Jump to 'Pleck'",
    hint: 'Case study',
    kind: 'section',
    sectionId: 'pleck',
  },
  {
    id: 'jump-site',
    label: "Jump to 'This site'",
    hint: 'How this page is built',
    kind: 'section',
    sectionId: 'site',
  },
  {
    id: 'jump-skills',
    label: "Jump to 'Skills'",
    hint: 'Stack',
    kind: 'section',
    sectionId: 'skills',
  },
  {
    id: 'jump-journey',
    label: "Jump to 'Journey'",
    hint: 'Timeline',
    kind: 'section',
    sectionId: 'journey',
  },
  {
    id: 'jump-contact',
    label: "Jump to 'Contact'",
    hint: 'Footer',
    kind: 'section',
    sectionId: 'contact',
  },
  { id: 'copy-email', label: 'Copy email', hint: site.email, kind: 'copy', value: site.email },
  {
    id: 'open-pleck',
    label: "Open 'pleck-web' on GitHub",
    hint: 'GitHub',
    kind: 'external',
    href: pleck.repoUrl,
  },
  { id: 'resume', label: 'Download resume', hint: 'PDF', kind: 'download', href: site.resumeHref },
] as const

export type Command = (typeof commands)[number]
