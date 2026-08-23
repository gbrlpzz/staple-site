# Landing motion lessons

This note records the reusable interaction lessons applied to Staple.
The implementation follows Regola and Apple HIG first. It uses no copied assets,
code or product language.

## Observed system

- A floating, low-contrast navigation layer keeps the page present without taking space from the hero.
- The hero uses one strong sentence, a short explanation and one action over a product object.
- A tall scroll band pins a product frame while the reader advances through a sequence.
- Section content enters with a restrained reveal as it reaches the viewport.
- The main product section stays focused on one job: show the weekly workflow beside the phone.
- FAQs use one open answer at a time with animated height and a reduced-motion fallback.
- The motion layer uses Lenis for smooth scrolling, IntersectionObserver for entry timing, and CSS transitions for progressive reveals.

## Staple implementation

- `src/Landing.tsx` keeps the hero, guided product pin, algorithm, results and questions in a short sequence.
- `src/components/FAQ.tsx` provides linked disclosure controls and a single open answer with direct inquiry copy.
- `src/components/RevealOnEntry.tsx` adds restrained viewport entry motion without hiding content.
- `src/styles.css` keeps the original product stop pinned on desktop and falls back to a normal stack below 961px.
- `src/useVisualViewport.ts` keeps the root ready for viewport and keyboard-aware Regola geometry.

## Deviation record

- **HIG guidance:** Apple Motion asks for purposeful, optional motion and a reduced-motion path.
- **Deviation:** the landing page uses custom scroll-linked product staging and word-level opacity changes instead of only native component motion.
- **Why this context needs it:** the product is a system whose value is sequential. Showing the sequence in place reduces explanation and lets people inspect each step without losing the overall frame.
- **Scope:** public Staple landing page only. No application workflow depends on the animation.
- **Risk check:** every product step has visible text and a direct button fallback; hover is not required; touch targets are at least 44px; `prefers-reduced-motion` removes the movement.
