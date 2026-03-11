

## Diagnosis

The current mobile hero uses a massive sticky scroll-driven animation (300vh container, scroll progress tracking, image parallax exit, letter scatter/assembly). This is fundamentally incompatible with smooth mobile scrolling -- it creates scroll lag, iOS bounce conflicts, and requires excessive scrolling to reach content.

The screenshot shows the desired mobile end-state: a **static** layout with the tagline at top, logo centered, subtitle, and CTA button. No scroll-driven animation, no sticky, no parallax.

## Plan: Static Mobile Hero + Text Fade-in

### Approach
Split `HeroPapacho` into two rendering paths:
- **Desktop** (`md:` and up): Keep the existing scroll-driven cinematic animation exactly as-is
- **Mobile** (touch devices): Render a completely static, single-viewport hero with a simple CSS fade-in for the tagline text

### Mobile hero layout (matching screenshot)
Static `100vh` section with:
1. Background: same `hsl(15 20% 96%)` with noise texture
2. Tagline "Pensado por mamás para mamás" -- italic, blue, centered at top -- fades in after 1s delay
3. Papachoa logo -- centered, large
4. "pijamas que abrazan" subtitle -- fades in after tagline
5. "Ver catálogo" CTA button -- fades in last
6. No hero image on mobile (matches screenshot), no sticky, no scroll tracking

### Changes by file

**`src/components/sections/HeroPapacho.tsx`**
- Add `isTouchDevice` check at component top
- If touch device: return a simple static JSX block (single viewport height, no sticky, no scroll listeners, no parallax)
  - Tagline text rendered as plain `<h1>` with CSS `animation: fade-in` + `animation-delay: 1s`
  - Logo image with `animation-delay: 0.3s`
  - Subtitle with `animation-delay: 1.6s`
  - CTA button with `animation-delay: 2s`
  - All use `animation-fill-mode: both` so they start invisible
- If NOT touch device: keep entire existing desktop logic unchanged (sticky, scroll progress, letter scatter, image parallax, birds, everything)
- Remove all mobile-specific iOS workarounds (introProgress, iosDevice guards, cached metrics for iOS, etc.) since mobile no longer uses scroll animation

**`src/pages/Index.tsx`**
- Remove `isTouchDevice` variable and iOS guard on the `translateY` transform -- simplify back to desktop-only logic since mobile hero is now static and doesn't need the translateY hack at all
- The auto-scroll `useEffect` already skips on iOS; for Android touch, it should also skip since there's no scroll animation to drive

**`src/index.css`**
- No changes needed to iOS overscroll rules (can keep or clean up `.ios-device` styles)

### Result
- Mobile: instant load, butter-smooth scrolling, elegant fade-in sequence, zero scroll conflicts
- Desktop: completely unchanged cinematic experience
