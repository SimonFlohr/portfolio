# What & why

<!-- One or two sentences: what this PR adds and why. -->

## Type of change

<!-- The PR title becomes the squash commit, so it must follow Conventional Commits, e.g. "feat(hero): add magnetic CTA buttons". -->

- [ ] `feat` New section / feature
- [ ] `fix` Bug fix
- [ ] `style` Visual / animation polish (no behavior change)
- [ ] `refactor` Code restructure (no visual change)
- [ ] `perf` Performance / bundle size
- [ ] `ci` / `chore` Tooling, CI, dependencies
- [ ] `docs` Documentation

## Checklist

### Quality gate

- [ ] `pnpm verify` passes locally (format, lint, typecheck, build)
- [ ] No placeholder / `TODO` code, and no stray `console.log`
- [ ] Copy and data live in `src/data/portfolioData.ts`, not hard-coded in components

### UI / UX

- [ ] Uses the Nord theme tokens (no ad-hoc hex values)
- [ ] Responsive at mobile (375px), tablet (768px), and desktop (1440px)
- [ ] Respects `prefers-reduced-motion`
- [ ] Keyboard accessible (focus states visible, `⌘K` / tab order unaffected)
- [ ] No layout shift or jank on scroll (checked with Lenis smooth scroll)

### Performance

- [ ] Lighthouse spot-check run (Performance / Accessibility / Best Practices / SEO)
- [ ] No new heavy dependencies (or justified below)

## Notes

<!-- Trade-offs, follow-ups, or anything worth calling out. Delete if none. -->
