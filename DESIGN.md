# Design

## Theme
Light. The brand register says "light surface, deep ink, one signal accent, used sparingly." Same rules as a dark steel+phosphor system, translated to paper.

## Color tokens (OKLCH)

```css
:root {
  /* Paper — warm cream, never pure white */
  --color-paper: oklch(96% 0.012 75);
  --color-paper-elevated: oklch(98% 0.010 75);
  --color-paper-sunken: oklch(93% 0.014 75);

  /* Ink — deep warm neutral, never pure black */
  --color-ink: oklch(22% 0.008 60);
  --color-ink-dim: oklch(45% 0.010 60);
  --color-ink-muted: oklch(60% 0.008 60);

  /* Hairline borders */
  --color-hairline: oklch(22% 0.008 60 / 12%);
  --color-hairline-strong: oklch(22% 0.008 60 / 24%);

  /* Hover surface */
  --color-hover: oklch(22% 0.008 60 / 4%);

  /* Signal accent — ink blue, committed, sparingly */
  --color-signal: oklch(45% 0.13 255);
  --color-signal-dim: oklch(45% 0.13 255 / 60%);

  /* Optional secondary — used in status indicators only */
  --color-arc: oklch(65% 0.12 200);
  --color-trace: oklch(60% 0.14 35);
}
```

## Typography

**Display:** Bricolage Grotesque (Google Fonts, variable, opsz + wght axes)
- Used for: hero name, section headings, project titles
- Weight: 600-700
- Tracking: -0.02em at large sizes
- Line-height: 0.95-1.05 at display

**Body:** Inter (Google Fonts, variable)
- Used for: bio, descriptions, paragraphs
- Weight: 400-500
- Line-height: 1.6
- Max line-length: 65-72ch

**Mono:** JetBrains Mono (Google Fonts, variable)
- Used for: status bar, role labels, technical metadata, file paths
- Weight: 400-500
- Tracking: 0
- Always uppercase for labels, 0.04em letter-spacing

## Layout

- Single column, max-w-7xl (1280px) container
- Section vertical rhythm: 6rem (96px) on desktop, 4rem (64px) on mobile
- Hero: full viewport (min-h-[100dvh])
- Projects: horizontal scroll on desktop, vertical stack on mobile (climax section)
- Skills grid: 3-column on desktop, gap-px with hairline container (not card borders)
- No equal-card grid pattern; vary card sizing and structure per section

## Motion

**Hero signature entrance (the one expressive moment):**
- Name scrambles in via GSAP `ScrambleTextPlugin` (text: "MOHAMMED HASAN ELGAMMAL" or similar)
- Then content (role, status, CTAs) lifts up with 80ms stagger
- Total duration: ~1.6s
- Easing: `power3.out`

**Section reveals (structure-revealing):**
- Fade opacity 0→1
- Translate Y 12px→0
- Duration: 600ms
- Easing: `power3.out`
- Trigger: ScrollTrigger when section enters viewport at 80%

**List staggers:**
- Stagger: 60ms between items
- Children: fade + 8px Y translate
- Easing: `power3.out`

**Projects horizontal scroll (climax):**
- Pin the section
- Scrub: 0.5
- Translate X driven by scroll progress
- Each case file: ~85vw wide on desktop

**Hover micro-motion:**
- Cards: subtle border tint shift, no transform
- Links: underline grows from left
- CTAs: background fill sweep

**Hard rules:**
- No bounce, no elastic
- `power3.out` or `expo.out` only
- `prefers-reduced-motion`: signature entrance → calm fade; all transforms → instant; horizontal scroll → vertical stack

## Components

- StatusBar (persistent top, h-6, shows LIVE indicator + active section + scroll %)
- Sidebar (mobile nav)
- Hero with CornerStatus blocks (top-left, top-right) for "operations console" feel
- MagneticButton (for primary CTAs)
- Shuffle (GSAP ScrambleText helper)
- Features: hero, about, skills, experience, projects, contact
- Each feature in `src/features/<name>/` with components/, hooks/, constants/, types.ts, index.ts
- Lazy-load all sections except Hero

## Spacing scale

Based on Tailwind defaults but with deliberate overrides for portfolio rhythm:
- Section padding-y: 24 (96px) desktop, 16 (64px) mobile
- Container max-width: 7xl (1280px)
- Inner padding: 6 (24px) on mobile, 8 (32px) on tablet, 12 (48px) on desktop
- Card padding: 6 (24px) on mobile, 8 (32px) on desktop
- Gap between cards in grid: px (hairline via container) for skills; 6 (24px) for project case files

## Accessibility

- WCAG AA on light palette: ink (oklch 22%) on paper (oklch 96%) = ~14:1 contrast
- Signal accent on paper: oklch 45% blue on oklch 96% cream = ~7:1 contrast
- `prefers-reduced-motion`: degraded per hard rules above
- Keyboard-navigable, semantic HTML
- Copy affordances on email/phone in contact section
