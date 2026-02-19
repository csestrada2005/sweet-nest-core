

# HeroPapacho: Scroll-to-Assemble + Parallax Redesign

## Overview

Rewrite the hero so that letters start scattered in 3D space (using viewport units) and smoothly assemble into readable text as the user scrolls. The mouse parallax on image and text is preserved.

## Changes (single file: `src/components/sections/HeroPapacho.tsx`)

### 1. Add scroll progress tracking
- Increase section height to `300vh` with a sticky inner container (`100vh`), matching the pattern in `Hero.tsx`.
- Add a `scrollProgress` state (0 to 1) driven by a passive scroll listener that reads the section's `getBoundingClientRect().top` relative to scroll distance.

### 2. Word-then-letter splitting
- Split "Pijamas que abrazan" into words first, then letters.
- Render structure:
  ```
  <h1>
    {words.map(word => (
      <>
        <span className="inline-block whitespace-nowrap">
          {word.letters.map(letter => <span className="letter">...</span>)}
        </span>
        <span className="inline-block w-[0.3em]" /> {/* space between words */}
      </>
    ))}
  </h1>
  ```

### 3. Viewport-unit scatter values
- Replace the current px-based pseudo-random values with vw/vh units:
  - `tx`: range approx -15vw to 15vw
  - `ty`: range approx -30% to 45% (matching reference)
  - `tz`: range approx -40vw to 0vw
  - `rot`: range approx -18deg to 18deg
- Keep the same sin/cos seeding approach, just scale the multipliers.

### 4. Scroll-driven interpolation
- Each letter's inline transform multiplies scatter values by `(1 - scrollProgress)`:
  ```
  transform: translate3d(
    ${l.tx * (1 - scrollProgress)}vw,
    ${l.ty * (1 - scrollProgress)}vh,
    ${l.tz * (1 - scrollProgress)}vw
  ) rotateZ(${l.rot * (1 - scrollProgress)}deg)
  ```
- At scroll 0: fully scattered. At scroll 1: perfectly assembled (all transforms zero).

### 5. Keep mouse parallax
- Image wrapper: `translate3d(mouse.x * -15px, mouse.y * -15px, 0)` with `transition: transform 0.2s ease-out`
- Text wrapper: `translate3d(mouse.x * 20px, mouse.y * 20px, 0)` with same transition
- No changes to the existing mouse tracking logic.

### 6. Keep image + expanding line
- Image stays centered with `max-h-[50vh]`, drop shadow, and the 3px brand-color floor line that animates on mount (unchanged).

### 7. Layout structure
```
<section style="height: 300vh">
  <div style="position: sticky; top: 0; height: 100vh">
    <!-- background texture -->
    <!-- image + line (with mouse parallax) -->
    <!-- h1 with word/letter spans (with opposite mouse parallax + scroll interpolation) -->
  </div>
</section>
```

