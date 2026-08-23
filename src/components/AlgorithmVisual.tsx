const INPUTS = [
  { label: "Nutrition", detail: "your targets" },
  { label: "Budget", detail: "weekly limit" },
  { label: "Pantry", detail: "what remains" },
  { label: "Market", detail: "current prices" },
] as const;

const PLANS = [
  { label: "Budget", detail: "lower checkout", state: "view" },
  { label: "Balanced", detail: "best fit", state: "selected" },
  { label: "Quality", detail: "more variety", state: "view" },
] as const;

export function AlgorithmVisual() {
  return (
    <figure className="hp-algorithm-visual" aria-labelledby="algorithm-visual-caption">
      <div className="hp-algorithm-visual-top">
        <p className="eyebrow">Staple engine</p>
        <span className="hp-algorithm-status"><i aria-hidden="true" />Recalculates weekly</span>
      </div>

      <div className="hp-algorithm-inputs" aria-label="Staple planning inputs">
        {INPUTS.map((input) => (
          <div className="hp-algorithm-input" key={input.label}>
            <strong>{input.label}</strong>
            <span>{input.detail}</span>
          </div>
        ))}
      </div>

      <div className="hp-algorithm-connector" aria-hidden="true">
        <span>evaluate</span>
      </div>

      <div className="hp-algorithm-output">
        <div className="hp-algorithm-output-top">
          <div>
            <p className="eyebrow">Output</p>
            <h3>Complete week</h3>
          </div>
          <span className="hp-algorithm-output-mark" aria-hidden="true">↗</span>
        </div>

        <div className="hp-algorithm-plans">
          {PLANS.map((plan, index) => (
            <div className={`hp-algorithm-plan ${plan.state === "selected" ? "is-selected" : ""}`} key={plan.label}>
              <span className="hp-algorithm-plan-index">0{index + 1}</span>
              <strong>{plan.label}</strong>
              <span className="hp-algorithm-plan-detail">{plan.detail}</span>
              <span className="hp-algorithm-plan-state">{plan.state}</span>
            </div>
          ))}
        </div>

        <p className="hp-algorithm-output-note">Nutrition, cost, cooking time and pantry fit stay visible together.</p>
      </div>

      <figcaption id="algorithm-visual-caption" className="hp-algorithm-feedback">
        <span><strong>State updates</strong> after shopping and cooking.</span>
        <span aria-hidden="true">↻</span>
      </figcaption>
    </figure>
  );
}
