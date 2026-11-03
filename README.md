# 🅿 Portfolio | ![Verify](https://img.shields.io/github/actions/workflow/status/SimonFlohr/portfolio/ci.yml?branch=main&label=Verify)

> A one-page portfolio. The Pleck case study, the stack behind this site, and a way to get in touch.

## 🧐 Why this exists

I am a software engineer in Des Moines and this portfolio showcases my work.

The case study discusses [Pleck](https://github.com/SimonFlohr/pleck-web), a private family vault I created. It switches the reader between Des Moines and Amsterdam, implements a keyset cursor, and walks a presigned S3 upload. Those interactions run in the browser from fixed examples. The app and its live demo stay in that other repo: [getpleck.com/demo](https://getpleck.com/demo).

_sFlohr — the mark in the nav. The site is simonflohr.dev._

Portfolio content lives in `src/data/portfolioData.ts`. Each section reads that file.

## 🚨 Status

The page is usable. The nav tracks the section in view. ⌘K (Ctrl+K off a Mac) opens a command palette that jumps sections, copies the email, opens the Pleck repo, and downloads a resume. Motion respects `prefers-reduced-motion`.

Not built yet:

- Lenis is installed, and the pull-request template mentions smooth scroll. Nothing in `src/` imports it. Scrolling uses CSS `scroll-behavior`.
- Resume links point at `/resume.pdf`. That file is not in `public/` yet.

## 📊 Technology stack

- Vite 8 + React 19 + TypeScript. The entry is `src/main.tsx`.
- Tailwind CSS 4, through the Vite plugin. Nord colors live in `src/index.css`.
- Motion for the hero, the command palette, and the timeline.
- Inter and JetBrains Mono, self-hosted with `@fontsource-variable`.
- Static content in `src/data/portfolioData.ts`. This repo has no database and no auth.
- pnpm. Node `>=22.12` locally. CI and Pages use Node 24.
- GitHub Actions runs `pnpm verify`: Prettier, ESLint, `tsc -b`, and `vite build`. The pre-push hook runs the same script. Pre-commit runs lint-staged. commitlint checks the message. Direct commits and pushes to `main` are blocked.

## 🚧 Local development

```bash
pnpm install
pnpm dev
```

Setup needs no env file. `pnpm dev` prints the URL. The default port is 5173.

`pnpm preview` serves the production build. `pnpm verify` is the CI gate: format, lint, typecheck, and build.

## License

MIT — see [LICENSE](LICENSE).
