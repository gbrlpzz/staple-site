import { useRef } from "react";

const SLIDES = [
  { id: "plan", src: "/screens/plan.png", title: "Plan", caption: "Optimize the week.", alt: "Staple week view with Budget, Balanced and Quality plans" },
  { id: "choose", src: "/screens/recipe.png", title: "Choose", caption: "Pick the week you will eat.", alt: "Staple menu of cooked mains, lunches and breakfasts" },
  { id: "shop", src: "/screens/shop.png", title: "Shop", caption: "Buy exactly what is needed.", alt: "Staple shopping list with grocery products, quantities and prices" },
  { id: "store", src: "/screens/pantry.png", title: "Store", caption: "Carry inventory forward.", alt: "Staple pantry with remaining oats, rice and olive oil" },
  { id: "cook", src: "/screens/today.png", title: "Cook", caption: "Cook and eat.", alt: "Staple Today view with the day’s recipes to cook and eat" },
] as const;

export function Carousel() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.86), behavior: "smooth" });
  };

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") scrollBy(1);
    if (event.key === "ArrowLeft") scrollBy(-1);
  };

  return (
    <div className="carousel" onKeyDown={onKey}>
      <div className="carousel-track" ref={track} tabIndex={0} aria-label="Product screens">
        {SLIDES.map((slide) => (
          <figure className="slide" key={slide.id} id={`slide-${slide.id}`}>
            <div className="phone">
              <img src={slide.src} alt={slide.alt} width={390} height={844} />
            </div>
            <figcaption className="caption">
              <strong>{slide.title}</strong>
              <span>{slide.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="carousel-nav">
        <button type="button" aria-label="Previous screen" onClick={() => scrollBy(-1)}>
          ←
        </button>
        <button type="button" aria-label="Next screen" onClick={() => scrollBy(1)}>
          →
        </button>
      </div>
    </div>
  );
}

export { CAROUSEL_LABELS } from "./ProductScrolly";
export const SLIDE_TITLES = SLIDES.map((s) => s.title);
