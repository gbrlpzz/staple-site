export function ResearchPanel() {
  return (
    <div className="hp-research-panel">
      <div className="section-heading hp-optimizer-heading-normalized" data-reveal-item="heading">
        <p className="eyebrow">Algorithm</p>
        <h2 id="research-title">One plan each week, recalculated around you and your market.</h2>
        <p>
          Staple combines your nutrition needs, budget, pantry, cooking limits and current grocery prices to evaluate complete weekly plans and return a small set of practical choices. The underlying search, data model and implementation remain private.
        </p>
      </div>

      <div
        className="loop-row hp-research-loop"
        data-reveal-item="evidence"
        aria-label="Your inputs feed complete weekly plans, then shopping and cooking update the next week."
      >
        <span className="chip">Your needs</span>
        <span className="arrow" aria-hidden="true">→</span>
        <span className="chip">Pantry + prices</span>
        <span className="arrow" aria-hidden="true">→</span>
        <span className="chip chip-core">Complete weekly choices</span>
        <span className="arrow" aria-hidden="true">→</span>
        <span className="chip">Shop + cook</span>
        <span className="arrow" aria-hidden="true">↻</span>
      </div>
    </div>
  );
}
