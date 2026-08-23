import { FrontierChart } from "./Charts";

const PLANNING_CONTEXT = [
  { name: "Nutrition", detail: "priorities" },
  { name: "Pantry", detail: "on hand" },
  { name: "Market", detail: "prices" },
  { name: "Routine", detail: "time" },
] as const;

export function ResearchPanel() {
  return (
    <div className="hp-research-panel">
      <div className="section-heading hp-optimizer-heading-normalized" data-reveal-item="heading">
        <p className="eyebrow">Algorithm</p>
        <h2 id="research-title">One plan each week, recalculated around you and your market.</h2>
        <p>
          Each week, Staple recalculates a small set of complete choices around your nutrition, pantry, market and routine.
        </p>
      </div>

      <div className="hp-optimizer-minimal" data-reveal-item="evidence">
        <div className="hp-input-rail" aria-label="Planning context">
          <p className="hp-input-rail-label">Planning context</p>
          <ul className="hp-input-list">
            {PLANNING_CONTEXT.map((input) => (
              <li key={input.name}>
                <strong>{input.name}</strong>
                <span>{input.detail}</span>
              </li>
            ))}
          </ul>
          <p className="hp-side-rule">
            <strong>Read the trade-off</strong>
            Lower checkout cost and higher nutrition coverage pull in different directions.
          </p>
        </div>
        <FrontierChart />
      </div>
    </div>
  );
}
