const PLANS = [
  { label: "Budget", detail: "lower checkout" },
  { label: "Balanced", detail: "best fit" },
  { label: "Quality", detail: "more variety" },
] as const;

const SELECTED_MARKS = new Set([14, 27, 41]);

const MARKS = Array.from({ length: 48 }, (_, index) => ({
  index,
  opacity: 0.1 + ((index * 11) % 22) / 100,
  scale: 0.68 + ((index * 7) % 24) / 100,
  selected: SELECTED_MARKS.has(index),
}));

export function AlgorithmVisual() {
  return (
    <figure className="hp-algorithm-visual" aria-labelledby="algorithm-visual-caption">
      <div className="hp-algorithm-visual-top">
        <p className="eyebrow">Choice landscape</p>
        <span className="hp-algorithm-status"><i aria-hidden="true" />Illustrative view</span>
      </div>

      <div
        className="hp-choice-landscape"
        aria-label="Illustrative landscape of possible weekly plans with three practical choices"
      >
        <div className="hp-choice-landscape-grid" aria-hidden="true">
          {MARKS.map((mark) => (
            <span
              key={mark.index}
              className={"hp-choice-mark" + (mark.selected ? " is-selected" : "")}
              style={{
                ["--choice-opacity" as string]: mark.opacity,
                ["--choice-scale" as string]: mark.scale,
              }}
            />
          ))}
        </div>

        <div className="hp-choice-landscape-legend" aria-hidden="true">
          <span className="hp-choice-key"><i className="is-muted" />Possible weeks</span>
          <span className="hp-choice-key"><i className="is-selected" />Practical choices</span>
        </div>
      </div>

      <div className="hp-choice-output">
        <div className="hp-choice-output-head">
          <div>
            <p className="eyebrow">Selected</p>
            <h3>Three ways to live the week.</h3>
          </div>
          <span className="hp-algorithm-output-mark" aria-hidden="true">↗</span>
        </div>

        <div className="hp-choice-plans">
          {PLANS.map((plan, index) => (
            <div className={"hp-choice-plan" + (plan.label === "Balanced" ? " is-featured" : "")} key={plan.label}>
              <span className="hp-algorithm-plan-index">0{index + 1}</span>
              <strong>{plan.label}</strong>
              <span>{plan.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <figcaption id="algorithm-visual-caption" className="hp-algorithm-feedback">
        <span><strong>Public concept view.</strong> The underlying search remains private.</span>
        <span aria-hidden="true">↻</span>
      </figcaption>
    </figure>
  );
}
