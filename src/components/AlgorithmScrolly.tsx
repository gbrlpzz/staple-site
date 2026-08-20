import { SolverViz } from "./SolverViz";

export const ALGORITHM_STEPS = [
  {
    id: "sample",
    label: "Sample",
    caption: "Search the week, not the meal.",
    title: "Hundreds of complete weeks.",
    body: "Each candidate is Monday to Sunday. The search tries whole weeks from breakfasts, lunches and mains — not one dish at a time.",
  },
  {
    id: "climb",
    label: "Climb",
    caption: "Keep only the better week.",
    title: "Swap one dish. Keep the improvement.",
    body: "A neighbour is a single substitution. If the new week is better on cost and quality, it stays. Same inputs always return the same search.",
  },
  {
    id: "assemble",
    label: "Assemble",
    caption: "Priced at the till.",
    title: "Packages, pantry, live prices.",
    body: "Whole grocery packages. Live local prices. What is already in the cupboard is subtracted. Cost is what you pay.",
  },
  {
    id: "filter",
    label: "Filter",
    caption: "Hard floors first.",
    title: "If it misses a floor, it is out.",
    body: "Calories, protein, fibre, adequacy, cook load, surplus. A week that fails is not an option.",
  },
  {
    id: "offer",
    label: "Offer",
    caption: "Three feasible weeks.",
    title: "Budget. Balanced. Quality.",
    body: "The cheapest, the best cost per nourished day, and the highest quality. The phone only shows what the search already found.",
  },
] as const;

export const ALGORITHM_LABELS = ALGORITHM_STEPS.map((step) => step.label);

export function AlgorithmCopy({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  const step = ALGORITHM_STEPS[active] ?? ALGORITHM_STEPS[0];
  return (
    <div className="hp-flow-copy">
      <div className="section-heading">
        <p className="eyebrow">The optimizer</p>
        <h2 id="algorithm-title">It searches. Then it keeps a week you can eat.</h2>
        <p>
          Not a language model. A weekly optimizer with hard floors, live prices
          and a pantry that carries forward.
        </p>
      </div>
      <div className="hp-admin-tab-selector" aria-label="Optimizer steps">
        {ALGORITHM_STEPS.map((item, index) => (
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
      <div className="hp-story hp-story-swap" aria-live="polite">
        <span className="hp-story-kicker">{step.caption}</span>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </div>
    </div>
  );
}

export function AlgorithmVisual({ active }: { active: number }) {
  return (
    <div className="hp-flow-visual">
      <SolverViz phase={active} />
    </div>
  );
}
