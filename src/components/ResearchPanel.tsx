import { FrontierChart } from "./Charts";
import { Icon, type IconName } from "./Icon";

const DATA_INPUTS = [
  {
    name: "Apple Health",
    icon: "heart" as IconName,
    detail: "Activity + body weight → energy needs",
    href: "https://www.apple.com/ios/health/",
  },
  {
    name: "Live local grocery prices",
    icon: "cart" as IconName,
    detail: "Local products + pack sizes → checkout cost",
    href: null,
  },
  {
    name: "Swiss Food Composition Database V7.1",
    icon: "file" as IconName,
    detail: "Ingredient values → nutrition coverage",
    href: "https://naehrwertdaten.ch/en/",
  },
  {
    name: "Staple state",
    icon: "archive" as IconName,
    detail: "Budget + pantry + cooking limits",
    href: null,
  },
] as const;

export function ResearchPanel() {
  return (
    <div className="hp-research-panel">
      <div className="section-heading hp-optimizer-heading-normalized">
        <p className="eyebrow">Optimizer</p>
        <h2 id="research-title">One plan each week, recalculated around you and your market.</h2>
        <p>Staple combines your health, pantry and cooking limits with live local grocery prices and nutrition data, tests complete seven-day menus, then keeps only the weeks where better nutrition would mean spending more.</p>
      </div>
      <div className="hp-optimizer-minimal">
        <div className="hp-optimizer-card-stack" role="group" aria-label="Search and data used by the optimizer">
          <div className="hp-input-search-card">
            <Icon name="search" size={18} />
            <span className="hp-input-card-copy">
              <strong>How Staple chooses</strong>
              <span>Try full weeks. Remove weeks that do not fit. Keep the best cost–nutrition choices.</span>
            </span>
          </div>
          {DATA_INPUTS.map((input) => {
            const content = <>
              <Icon name={input.icon} size={17} />
              <span className="hp-input-card-copy"><strong>{input.name}</strong><span>{input.detail}</span></span>
            </>;
            return input.href
              ? <a className="hp-input-data-row" href={input.href} key={input.name}>{content}</a>
              : <div className="hp-input-data-row" key={input.name}>{content}</div>;
          })}
        </div>
        <FrontierChart />
      </div>
    </div>
  );
}
