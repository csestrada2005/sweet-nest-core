
Objetivo: dejar Desktop/Android intactos y corregir iOS con paridad visual del hero (como Android al terminar) + eliminar el “lag/jump hacia arriba”.

## Diagnóstico final (con base en código actual + screenshot)
1) En iOS el hero no “arranca solo” porque se quitó `window.scrollTo` (correcto por performance), pero toda la animación sigue dependiendo del scroll (`progress`).
2) El salto/lag hacia arriba persiste por combinación de:
- lógica de scroll sensible en iOS (rubber-band/momentum),
- cálculo por `getBoundingClientRect()` en cada frame (costoso),
- efectos visuales extra del sticky al salir (`hero-exiting`) que pueden amplificar jitter.

## Solución propuesta (robusta, iOS-only, sin tocar Android/Desktop)

### A) Hero iOS: autoplay visual SIN scroll programático
Archivo: `src/components/sections/HeroPapacho.tsx`

- Mantener Desktop/Android exactamente igual.
- En iOS agregar `introProgress` (0→1) con RAF + easing al cargar (duración ~2.6–3.2s).
- Calcular `effectiveProgress`:
  - iOS: `max(scrollProgress, introProgress)`
  - otros: `scrollProgress`
- Resultado: al abrir en iOS, letras se ensamblan + imagen sube y desaparece (como Android), pero sin `window.scrollTo` (sin pelear con momentum nativo).

### B) Scroll progress más estable (menos jank)
Archivo: `src/components/sections/HeroPapacho.tsx`

- Reemplazar lectura continua de `getBoundingClientRect()` por métrica cacheada:
  - medir `sectionTop` y `scrollable` en mount/resize/orientationchange,
  - en scroll usar `window.scrollY` contra esas métricas.
- Mantener throttling con RAF.
- Esto reduce layout thrash y el lag visible al subir/bajar.

### C) Quitar efecto de salida conflictivo en iOS
Archivo: `src/components/sections/HeroPapacho.tsx`

- Desactivar `hero-exiting` únicamente en iOS (no aplicar scale/opacity al sticky en Safari móvil).
- Desktop/Android conservan ese efecto.

### D) Endurecer iOS contra “bounce up” del viewport
Archivos: `src/main.tsx`, `src/index.css`

- En `main.tsx`, al detectar iOS, añadir clase global: `html.classList.add("ios-device")`.
- En `index.css`, solo para `.ios-device`:
  - `overscroll-behavior-y: none;`
  - preservar `overflow-x` limpio.
- Esto ayuda a evitar el rebote agresivo hacia arriba en iOS Safari.

### E) Mantener lo ya correcto
- Conservar fix actual de clipping de letras en iOS (2D px transform + `overflow: clip`).
- Mantener en `Index.tsx`:
  - iOS sin auto-scroll programático,
  - iOS sin `translateY(-100vh)`,
  - Desktop/Android sin cambios.

## Cambios concretos por archivo

1) `src/components/sections/HeroPapacho.tsx`
- Nuevos estados/refs: `scrollProgress`, `introProgress`, métricas (`sectionTopRef`, `scrollableRef`), RAF intro.
- Nuevo `effectiveProgress`.
- Reescritura de `onScroll` para usar `window.scrollY` + métricas cacheadas.
- Intro autoplay iOS (cancelable si el usuario ya interactúa).
- `hero-exiting` deshabilitado en iOS.

2) `src/main.tsx`
- Importar `isIOS`.
- Añadir clase `ios-device` en `<html>` al iniciar.

3) `src/index.css`
- Bloque iOS específico con `overscroll-behavior-y: none` (scoped por `.ios-device`).

4) `src/pages/Index.tsx`
- Validar que permanezca como está actualmente para iOS (sin revertir a auto-scroll/translate hack).

## Criterios de aceptación (QA)
1) iOS al cargar `/`:
- la animación del hero sí inicia sola,
- termina visualmente como Android (imagen se va, texto/logo/CTA llegan a estado final).
2) iOS al hacer scroll hacia arriba/abajo repetidamente:
- no hay tirones fuertes ni “salto hacia arriba” inesperado.
3) Desktop/Android:
- sin cambios de comportamiento respecto al estado actual.
4) Letras en iOS:
- no se recortan en ningún punto del hero.

## Riesgo y mitigación
- Riesgo: autoplay iOS demasiado rápido/lento.
  - Mitigación: exponer duración en constante y ajustar fino en 1 iteración.
- Riesgo: `overscroll-behavior` no uniforme en todas las versiones iOS.
  - Mitigación: no depender solo de eso; la mejora principal viene de eliminar conflictos (no `scrollTo`) + cálculo de progreso estable.
