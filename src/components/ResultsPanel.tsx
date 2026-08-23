import { NUTRITION_OUTCOME } from "../data/benchmark";
import { NutrientChart } from "./Charts";

const nutritionDelta = Math.round((NUTRITION_OUTCOME.stapleMar10 - NUTRITION_OUTCOME.menuChMar10) * 10) / 10;

export function ResultsPanel() {
  return (
    <div className="hp-results-panel hp-results-panel-core">
      <div className="section-heading hp-results-heading" data-reveal-item="heading">
        <p className="eyebrow">Nutrition outcomes</p>
        <h2 id="results-title">A complete week designed around everyday nutrition needs.</h2>
        <p>
          The public result is a selected nutrition outcome from an early deterministic replay. It shows the intended direction of the system without publishing the underlying benchmark or optimizer implementation.
        </p>
      </div>

      <div data-reveal-item="overview" className="hp-results-overview" aria-label="Nutrition outcome">
        <article>
          <p className="eyebrow">MAR-10 adequacy</p>
          <p className="hp-results-overview-value">{NUTRITION_OUTCOME.stapleMar10}%</p>
          <p className="hp-results-overview-unit">selected public outcome</p>
          <p className="hp-results-overview-delta"><strong>+{nutritionDelta} pp</strong> vs the <a href={NUTRITION_OUTCOME.sources.menuCh.url} target="_blank" rel="noopener noreferrer">{NUTRITION_OUTCOME.sources.menuCh.label}</a> ({NUTRITION_OUTCOME.menuChMar10}%).</p>
          <p>MAR-10 averages ten capped nutrient ratios; this is not a clinical or purchasing-trial result.</p>
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
            <p>Nutrition values use the Swiss Food Composition Database V7.1. The contextual comparison uses the Swiss National Nutrition Survey menuCH.</p>
            <ul className="hp-cite hp-cite-inline hp-source-links">
              <li><a href={NUTRITION_OUTCOME.sources.menuCh.url} target="_blank" rel="noopener noreferrer">{NUTRITION_OUTCOME.sources.menuCh.label}</a></li>
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
