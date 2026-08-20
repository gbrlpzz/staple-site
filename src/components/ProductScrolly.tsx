export const PRODUCT_STEPS = [
  {
    id: "plan",
    label: "Plan",
    title: "Compare complete weeks.",
    body: "Compare Budget, Balanced and Quality by meals, nutrition coverage, cooking time and checkout cost.",
    caption: "1 of 5 · Plan",
    src: "/screens/plan.png",
    alt: "Staple week view with Budget, Balanced and Quality plans",
  },
  {
    id: "choose",
    label: "Choose",
    title: "Choose meals you want to eat.",
    body: "Open the breakfasts, lunches, dinners and snacks inside each plan before you choose.",
    caption: "2 of 5 · Choose",
    src: "/screens/recipe.png",
    alt: "Staple menu of cooked mains, lunches and breakfasts",
  },
  {
    id: "shop",
    label: "Shop",
    title: "Shop from one organized list.",
    body: "See each product, pack count, amount needed and current price. Check items off as you shop.",
    caption: "3 of 5 · Shop",
    src: "/screens/shop.png",
    alt: "Staple shopping list with grocery products, quantities and prices",
  },
  {
    id: "store",
    label: "Store",
    title: "Know what you already have.",
    body: "The pantry tracks purchased and used food, so the next plan can use what remains and reduce waste.",
    caption: "4 of 5 · Store",
    src: "/screens/pantry.png",
    alt: "Staple pantry with remaining oats, rice and olive oil",
  },
  {
    id: "cook",
    label: "Cook",
    title: "See today’s full meal plan.",
    body: "Breakfast, lunch, dinner and snacks stay in one quick reference. Mark meals eaten to update the pantry.",
    caption: "5 of 5 · Cook",
    src: "/screens/today.png",
    alt: "Staple Today view with the day’s recipes to cook and eat",
  },
] as const;

export const CAROUSEL_LABELS = PRODUCT_STEPS.map((step) => step.label);

export function ProductCopy({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  const step = PRODUCT_STEPS[active] ?? PRODUCT_STEPS[0];
  return (
    <div className="hp-flow-copy" data-reveal-item="product-copy">
      <div className="section-heading">
        <p className="eyebrow">Product</p>
        <h2 id="product-title">Plan, shop, store and cook in one system.</h2>
        <p>Compare three complete weeks, choose the meals, shop from one list, track pantry stock and cook from the daily plan.</p>
      </div>
      <div className="hp-admin-tab-selector" aria-label="Product screens">
        {PRODUCT_STEPS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`hp-admin-step-btn ${active === index ? "active" : ""}`}
            aria-pressed={active === index}
            onClick={() => onSelect(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="hp-product-progress"
        role="progressbar"
        aria-label={`Product step ${active + 1} of ${PRODUCT_STEPS.length}`}
        aria-valuemin={1}
        aria-valuemax={PRODUCT_STEPS.length}
        aria-valuenow={active + 1}
      >
        <span style={{ width: `${((active + 1) / PRODUCT_STEPS.length) * 100}%` }} />
      </div>
      <div className="hp-story hp-story-swap" aria-live="polite">
        <span className="hp-story-kicker">{step.caption}</span>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="hp-status-bar" aria-hidden="true">
      <span className="hp-status-time">9:41</span>
      <span className="hp-status-icons">
        <svg viewBox="0 0 18 12" width="18" height="12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="9" y="3" width="3" height="9" rx="0.8" />
          <rect x="13.5" y="0.5" width="3" height="11.5" rx="0.8" />
        </svg>
        <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M1.5 8.5a9.5 9.5 0 0 1 13 0" />
          <path d="M4 6.2a6.4 6.4 0 0 1 8 0" />
          <path d="M6.5 4a3.6 3.6 0 0 1 3 0" />
        </svg>
        <svg viewBox="0 0 25 12" width="25" height="12" fill="none" stroke="currentColor" strokeWidth="1.1">
          <rect x="0.6" y="0.6" width="21" height="10.8" rx="3" />
          <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.6" fill="currentColor" stroke="none" />
          <path d="M23.5 4v4a2 2 0 0 0 0-4Z" fill="currentColor" stroke="none" />
        </svg>
      </span>
    </div>
  );
}

export function ProductPhone({ active }: { active: number }) {
  return (
    <div className="hp-flow-visual" data-reveal-item="product-phone">
      <div className="hp-iphone-wrap">
        <div className="hp-iphone">
          <div className="hp-iphone-screen">
            <div className="hp-dynamic-island" aria-hidden="true" />
            <StatusBar />
            <div className="hp-phone-content">
              {PRODUCT_STEPS.map((step, index) => (
                <img
                  key={step.id}
                  className={`hp-phone-shot ${active === index ? "is-active" : ""}`}
                  src={step.src}
                  alt={active === index ? step.alt : ""}
                  width={390}
                  height={844}
                />
              ))}
            </div>
            <div className="hp-home-indicator" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
