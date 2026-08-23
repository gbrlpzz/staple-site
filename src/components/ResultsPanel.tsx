import { NUTRITION_OUTCOME, PUBLIC_OUTCOMES } from "../data/benchmark";
import { NutrientChart } from "./Charts";

const nutritionDelta = Math.round((NUTRITION_OUTCOME.stapleMar10 - NUTRITION_OUTCOME.menuChMar10) * 10) / 10;
const { cost, waste } = PUBLIC_OUTCOMES;

export function ResultsPanel() {
  return (
    <div className="hp-results-panel hp-results-panel-core">
      <div className="section-heading hp-results-heading" data-reveal-item="heading">
        <p className="eyebrow">Selected outcomes</p>
        <h2 id="results-title">Lower food cost and waste while meeting nutrition needs.</h2>
        <p>
          The public result is a selected set of outcome figures from an early deterministic replay. It shows the intended direction of the system without publishing the underlying benchmark or optimizer implementation.
        </p>
      </div>

      <div data-reveal-item="overview" className="hp-results-overview" aria-label="Three selected public outcomes">
        <article>
          <p className="eyebrow">Checkout cost</p>
          <p className="hp-results-overview-value">CHF {cost.staplePerDayChf.toFixed(2)}</p>
          <p className="hp-results-overview-unit">modeled per day</p>
          <p className="hp-results-overview-delta">
            <strong>−{cost.reductionPercent}%</strong> vs the <a href={NUTRITION_OUTCOME.sources.habe.url} target="_blank" rel="noopener noreferrer">Swiss single-adult grocery average</a> (CHF {cost.comparatorPerDayChf.toFixed(2)}/day)
          </p>
          <p>After the first pantry fill: CHF {cost.staplePerDayAfterPantryFillChf.toFixed(2)} per day.</p>
        </article>

        <article>
          <p className="eyebrow">Nutrition</p>
          <p className="hp-results-overview-value">{NUTRITION_OUTCOME.stapleMar10}%</p>
          <p className="hp-results-overview-unit">MAR-10 adequacy</p>
          <p className="hp-results-overview-delta">
            <strong>+{nutritionDelta} pp</strong> vs the <a href={NUTRITION_OUTCOME.sources.menuCh.url} target="_blank" rel="noopener noreferrer">Swiss survey mean</a> ({NUTRITION_OUTCOME.menuChMar10}%)
          </p>
          <p>The index averages ten capped nutrient ratios.</p>
        </article>

        <article>
          <p className="eyebrow">Modeled waste</p>
          <p className="hp-results-overview-value">{waste.staplePerWeekG.toLocaleString("en-GB")} g</p>
          <p className="hp-results-overview-unit">per week</p>
          <p className="hp-results-overview-delta">
            <strong>−{waste.reductionPercent}%</strong> vs the <a href={NUTRITION_OUTCOME.sources.foen.url} target="_blank" rel="noopener noreferrer">household estimate</a> ({waste.comparatorPerWeekG.toLocaleString("en-GB")} g/week)
          </p>
          <p>The household estimate covers a broader discard basket.</p>
        </article>
      </div>

      <div data-reveal-item="plots" className="hp-results-plots">
        <NutrientChart />
      </div>

      <details data-reveal-item="details" className="hp-results-details">
        <summary>Sources and limitations</summary>
        <div className="hp-results-notes hp-results-final-sections">
          <section aria-labelledby="sources-heading">
            <h3 id="sources-heading">Sources</h3>
            <p>Nutrition values use the Swiss Food Composition Database V7.1. Cost and waste figures are modeled outputs, with contextual comparisons from Swiss public statistics.</p>
            <ul className="hp-cite hp-cite-inline hp-source-links">
              <li><a href={NUTRITION_OUTCOME.sources.habe.url} target="_blank" rel="noopener noreferrer">{NUTRITION_OUTCOME.sources.habe.label}</a></li>
              <li><a href={NUTRITION_OUTCOME.sources.menuCh.url} target="_blank" rel="noopener noreferrer">{NUTRITION_OUTCOME.sources.menuCh.label}</a></li>
              <li><a href={NUTRITION_OUTCOME.sources.foen.url} target="_blank" rel="noopener noreferrer">{NUTRITION_OUTCOME.sources.foen.label}</a></li>
              <li><a href={NUTRITION_OUTCOME.sources.swissFcd.url} target="_blank" rel="noopener noreferrer">{NUTRITION_OUTCOME.sources.swissFcd.label}</a></li>
            </ul>
          </section>
          <section aria-labelledby="limitations-heading">
            <h3 id="limitations-heading">Limitations</h3>
            <ul className="hp-limitations-list">
              {NUTRITION_OUTCOME.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
            </ul>
          </section>
        </div>
      </details>
    </div>
  );
}
