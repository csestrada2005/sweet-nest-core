

## Plan

### 1. Simplify AboutPapachoa (all platforms)

Remove all "special interaction" elements from the section:
- Remove `IntersectionObserver` + `imgVisible` state + slide-in animation on the image
- Remove `SectionReveal` wrappers (delayed fade-ins)
- Remove `minHeight: 100vh` — let it size naturally with padding
- Keep the content, background color, texture, image, and layout intact — just render everything immediately without animations

**File:** `src/components/sections/AboutPapachoa.tsx`

### 2. Restore full hero scroll height on iOS (fix animation being too short)

Currently the hero section uses `height: calc(var(--vh) * 350)` for all platforms. On iOS the `AboutPapachoa` section was previously `100vh` tall which gave enough scroll runway. Now that it's shorter, the hero animation completes too quickly on iOS.

The fix: On iOS, keep the same `350vh` scroll container height — the hero animation is driven by scroll progress within this container, so it will work the same. The real iOS clipping fix is already in place (2D px-based transforms + `overflow: clip`). No height change needed.

Actually, re-reading the user's message: "the hero animation doesn't work because this section is too small" — they're saying the **current** iOS hero is broken. Looking at the code, the hero height is `350vh` on all platforms, so the animation should have enough room. The issue is likely that on iOS, without the auto-scroll and without the `translateY(-100vh)` hack, the user scrolls through the hero normally but the letters aren't animating properly.

Looking at the scroll progress calculation: `raw = -rect.top / scrollable` where `scrollable = el.offsetHeight - window.innerHeight`. With 350vh height, scrollable = 250vh. Then `capped = Math.min(raw / 0.5, 1)` means animation completes at 50% scroll (125vh). This should work on iOS.

The user says "return it to how it was before but only fix the letter clipping." The "before" state had the full 350vh scroll, auto-scroll animation, and the translateY hack — but those caused iOS stuttering. The user wants:
- Keep the original hero behavior (350vh, full scatter animation)
- Only fix: prevent letters from being clipped on iOS

The current code already does this with the `isIOS()` conditional in `getLetterTransform`. So the hero code is correct as-is. The problem might be in `Index.tsx` where iOS skips auto-scroll and the translateY hack — the user wants those restored on iOS too since the hero animation "doesn't work."

Wait — re-reading: "La animación del hero section ahora no sirve porque esta sección es muy chica" — "this section" likely refers to the AboutPapachoa section becoming smaller after simplification, which would mean there's less scroll distance... but the hero height is independent of AboutPapachoa. 

Actually, I think the user means: on iOS currently, the hero animation is broken (not working at all). They want it restored to how it was before all the iOS fixes, but keeping only the letter-clipping fix. So: restore auto-scroll + translateY hack on iOS too (remove the `if (iosDevice) return` guards), keeping only the 2D transform + overflow:clip fixes.

### Changes

**`src/components/sections/AboutPapachoa.tsx`** — Simplify to a plain static section:
- Remove `useEffect`, `useRef`, `useState`, `SectionReveal` imports
- Remove IntersectionObserver logic
- Remove `minHeight: 100vh` from section and content container
- Remove `SectionReveal` wrappers — render text directly
- Keep image visible immediately (opacity 1, no transform animation)
- Use standard padding (`py-24 md:py-32`)

**`src/pages/Index.tsx`** — Remove iOS guards so auto-scroll and translateY hack work on all platforms:
- Remove `if (iosDevice) return` from both useEffects
- Remove iOS conditional in the translateY style — apply to all platforms
- Remove `isIOS` import (no longer needed here)

**`src/components/sections/HeroPapacho.tsx`** — Keep as-is. The iOS letter clipping fix (2D px transforms + overflow:clip) is already correctly conditional.

