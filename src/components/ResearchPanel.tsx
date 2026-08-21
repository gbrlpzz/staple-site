import { FrontierChart } from "./Charts";

const DATA_INPUTS = [
  {
    name: "Apple Health",
    detail: "Energy needs",
    href: "https://www.apple.com/ios/health/",
  },
  {
    name: "Local grocery prices",
    detail: "Checkout cost",
    href: null,
  },
  {
    name: "Swiss food database",
    detail: "Nutrition values",
    href: "https://naehrwertdaten.ch/en/",
  },
  {
    name: "Staple state",
    detail: "Budget, pantry, cooking limits",
    href: null,
  },
] as const;

export function ResearchPanel() {
  return (
    <div className="hp-research-panel">
      <div className="section-heading hp-optimizer-heading-normalized" data-reveal-item="heading">
        <p className="eyebrow">Algorithm</p>
        <h2 id="research-title">One plan each week, recalculated around you and your market.</h2>
        <p>Staple uses your health, pantry and cooking limits, plus local grocery prices and nutrition data. It tests complete seven-day menus and removes any menu that costs more without improving nutrition. The remaining menus show the trade-off between nutrition and cost.</p>
      </div>
      <div className="hp-optimizer-minimal" data-reveal-item="evidence">
        <div className="hp-input-rail" aria-label="Data used by the algorithm">
          <p className="hp-input-rail-label">Inputs</p>
          <ul className="hp-input-list">
            {DATA_INPUTS.map((input) => {
              const content = <><strong>{input.name}</strong><span>{input.detail}</span></>;
              return input.href
                ? <li key={input.name}><a href={input.href} target="_blank" rel="noopener noreferrer">{content}</a></li>
                : <li key={input.name}>{content}</li>;
            })}
          </ul>
        </div>
        <FrontierChart />
      </div>
    </div>
  );
}
