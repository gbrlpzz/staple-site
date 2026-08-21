import { benchmark, formatChf, headlineFigures } from "../data/benchmark";
import { NutrientChart, SpendChart } from "./Charts";

const figures = headlineFigures();

export function ResultsPanel() {
  return (
    <div className="hp-results-panel hp-results-panel-core">
      <div className="section-heading hp-results-heading" data-reveal-item="heading">
        <p className="eyebrow">Results</p>
        <h2 id="results-title">Lower food cost and waste while meeting nutrition needs.</h2>
        <p>
          One fixed pilot scenario follows a {benchmark.scenario.bodyWeightKg} kg adult at {benchmark.scenario.energyKcal.toLocaleString("en-GB")} kcal per day across {benchmark.scenario.weeks} pantry-linked weeks, using {benchmark.scenario.pricePulls.length} dated local grocery price pulls.
        </p>
      </div>

      <div data-reveal-item="overview" className="hp-results-overview" aria-label="Three headline results">
        <article>
          <p className="eyebrow">Checkout cost</p>
          <p className="hp-results-overview-value">{formatChf(benchmark.cost.staplePerDay)}</p>
          <p className="hp-results-overview-unit">per day</p>
          <p className="hp-results-overview-delta"><strong>{figures.costDelta}</strong> vs Swiss spending</p>
          <p><a href={benchmark.sourceLinks.habe.url}>Swiss single-adult grocery spending</a>: {formatChf(benchmark.cost.habePerDay)}</p>
          <p>After the first pantry fill: {formatChf(benchmark.cost.staplePerDayAfterFill)} per day.</p>
        </article>
        <article>
          <p className="eyebrow">Nutrition</p>
          <p className="hp-results-overview-value">{benchmark.adequacy.stapleMar10}%</p>
          <p className="hp-results-overview-unit">MAR-10 adequacy</p>
          <p className="hp-results-overview-delta"><strong>{figures.mar10Delta}</strong> vs the survey</p>
          <p><a href={benchmark.sourceLinks.menuCh.url}>Swiss adult diet survey</a>: {benchmark.adequacy.menuChMar10}%</p>
          <p>The index averages ten capped nutrient ratios.</p>
        </article>
        <article>
          <p className="eyebrow">Modeled waste</p>
          <p className="hp-results-overview-value">{benchmark.waste.stapleGPerWeek} g</p>
          <p className="hp-results-overview-unit">per week</p>
          <p className="hp-results-overview-delta"><strong>{figures.wasteDelta}</strong> vs the estimate</p>
          <p><a href={benchmark.sourceLinks.foen.url}>Swiss household discard estimate</a>: {benchmark.waste.foenGPerWeek.toLocaleString("en-GB")} g</p>
          <p>The household estimate covers a broader discard basket.</p>
        </article>
      </div>

      <div data-reveal-item="plots" className="hp-results-plots">
        <SpendChart />
        <NutrientChart />
      </div>

      <details data-reveal-item="details" className="hp-results-details">
        <summary>Sources and limitations</summary>
        <div className="hp-results-notes hp-results-final-sections">
          <section aria-labelledby="sources-heading">
            <h3 id="sources-heading">Sources</h3>
            <p>{benchmark.sources.optimizer}</p>
            <p>{benchmark.sources.protocol}</p>
            <p>{benchmark.sources.system}</p>
            <p>{benchmark.sources.nutrients}</p>
            <ul className="hp-cite hp-cite-inline hp-source-links">
              <li><a href={benchmark.sourceLinks.habe.url}>{benchmark.sourceLinks.habe.label}</a><span>{benchmark.sources.habe}</span></li>
              <li><a href={benchmark.sourceLinks.menuCh.url}>{benchmark.sourceLinks.menuCh.label}</a><span>{benchmark.sources.menuCh}</span></li>
              <li><a href={benchmark.sourceLinks.foen.url}>{benchmark.sourceLinks.foen.label}</a><span>{benchmark.sources.foen}</span></li>
              <li><a href={benchmark.sourceLinks.swissFcd.url}>{benchmark.sourceLinks.swissFcd.label}</a><span>{benchmark.scenario.references}.</span></li>
            </ul>
          </section>
          <section aria-labelledby="limitations-heading">
            <h3 id="limitations-heading">Limitations</h3>
            <ul className="hp-limitations-list">
              {benchmark.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
            </ul>
          </section>
        </div>
      </details>
    </div>
  );
}
