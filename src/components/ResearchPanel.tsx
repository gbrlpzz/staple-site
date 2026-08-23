import { FrontierChart } from "./Charts";

const PLANNING_CONTEXT = [
  { name: "Nutrition", detail: "weekly priorities" },
  { name: "Pantry", detail: "what is already there" },
  { name: "Market", detail: "what is practical now" },
  { name: "Routine", detail: "time and cooking context" },
] as const;

export function ResearchPanel() {
  return (
    <div className="hp-research-panel">
      <div className="section-heading hp-optimizer-heading-normalized" data-reveal-item="heading">
        <p className="eyebrow">Algorithm</p>
        <h2 id="research-title">One plan each week, recalculated around you and your market.</h2>
        <p>
          Staple brings together the context of your week and returns a small set of complete choices. Each option makes a different balance between cost, nourishment and variety visible before you shop.
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
            <strong>Read the shape</strong>
            Lower cost, higher coverage and more variety lead to different ways through the week.
          </p>
        </div>
        <FrontierChart />
      </div>
    </div>
  );
}
