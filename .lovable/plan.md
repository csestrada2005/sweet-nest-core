

## Problem Analysis

The HeroPapacho hero section has several iOS Safari-specific rendering issues causing cropped text and laggy animations:

1. **`transformStyle: "preserve-3d"` + `perspective`** — iOS Safari has well-documented bugs with 3D transform contexts containing many child elements. It clips content unexpectedly and creates excessive compositing layers.

2. **`translate3d` using viewport units (`vw`/`vh`) in Z-axis** — The Z component of `translate3d` should use `px`, not `vw`. iOS handles this differently and can produce visual artifacts.

3. **`will-change-transform` on every letter span** (27+ elements) — iOS Safari has a hard limit on GPU-composited layers. Exceeding it causes the browser to fall back to software rendering, resulting in lag and visual glitches.

4. **`overflow: hidden` on the sticky container** combined with 3D transforms — iOS clips transformed children differently when the parent has `overflow: hidden` and 3D transforms are active.

5. **Per-frame `setState` from scroll events** — iOS fires scroll events at a lower frequency, and re-rendering 27 letter transforms via React state on every scroll tick is expensive.

## Plan

### 1. Simplify transforms to 2D in HeroPapacho

- Replace `translate3d(Xvw, Yvh, Zvw)` with `translate(Xpx, Ypx) rotate(deg)` — compute pixel values at render time using `window.innerWidth`/`window.innerHeight`.
- Remove `transformStyle: "preserve-3d"` and `perspective` from the parent container.
- Remove `will-change-transform` from individual letter `<span>`s; add a single `will-change: transform` on the parent `h1` only.

### 2. Add iOS-safe rendering hints

- Add `-webkit-backface-visibility: hidden` to the letter container to prevent iOS flicker.
- Add `overflow: visible` to the sticky container (it already has `overflow: hidden` which clips transformed letters on iOS).

### 3. Throttle scroll-driven updates

- Use `requestAnimationFrame` to batch scroll updates instead of calling `setProgress` directly on every scroll event. This avoids React re-renders on every iOS scroll tick.

### Technical details

All changes are in `src/components/sections/HeroPapacho.tsx`:
- Lines 198-206: Remove `perspective` and `preserve-3d`, add `backfaceVisibility: "hidden"`
- Lines 217-222: Replace `translate3d(vw, vh, vw)` with `translate(px, px)`, remove `will-change-transform` class
- Lines 92-101: Wrap scroll handler in rAF throttle
- Line 154: Change `overflow: "hidden"` to `overflow: "clip"` (CSS `clip` respects paint boundaries without breaking transforms on iOS)

