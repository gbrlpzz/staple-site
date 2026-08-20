import { benchmark, headlineFigures } from "../data/benchmark";

const COLS = 8;
const ROWS = 6;
const COUNT = COLS * ROWS;
const SURVIVORS = new Set([5, 10, 14, 19, 22, 27, 33, 38, 41, 46]);
const OFFER = [14, 27, 41];
const figures = headlineFigures();

export function SolverViz({ phase }: { phase: number }) {
  const clamped = Math.min(4, Math.max(0, phase));
  const offered = clamped >= 4;

  return (
    <div className="hp-solver-viz" data-phase={clamped} aria-hidden="true">
      <div className="hp-solver-viz-frame">
        <div className="hp-solver-grid">
          {Array.from({ length: COUNT }, (_, index) => {
            const keep = SURVIVORS.has(index);
            const isOffer = OFFER.includes(index);
            const cost = 0.35 + ((index * 7) % 10) / 18;
            return (
              <span
                key={index}
                className={`hp-solver-cell${keep ? " is-keep" : ""}${isOffer ? " is-offer" : ""}`}
                style={{
                  ["--i" as string]: index,
                  ["--cost" as string]: cost,
                }}
              />
            );
          })}
        </div>
        <div className={`hp-solver-offer ${offered ? "is-on" : ""}`}>
          {benchmark.choiceExample.plans.map((plan) => (
            <div className="hp-solver-offer-card" key={plan.label}>
              <strong>{plan.label}</strong>
              <span>CHF {plan.costChf.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`hp-solver-stats ${offered ? "is-on" : ""}`}>
        <div>
          <strong>{figures.costDelta}</strong>
          <span>food-at-home vs HABE</span>
        </div>
        <div>
          <strong>{figures.mar10}</strong>
          <span>MAR-10</span>
        </div>
        <div>
          <strong>{figures.wasteDelta}</strong>
          <span>edible waste vs FOEN</span>
        </div>
      </div>
    </div>
  );
}
