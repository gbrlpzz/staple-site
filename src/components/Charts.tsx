import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NUTRITION_OUTCOME } from "../data/benchmark";

const NUTRIENT_ORDER = [
  "proteinG",
  "fiberG",
  "calciumMg",
  "magnesiumMg",
  "ironMg",
  "zincMg",
  "vitaminAMcg",
  "vitaminCMg",
  "vitaminB12Mcg",
  "folateMcg",
] as const;

type CssVars = CSSProperties & Record<"--target-position", string | number>;

function chartVars(values: Record<string, string | number>): CssVars {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => ["--" + key, value])) as unknown as CssVars;
}

function useEntryReveal() {
  const ref = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window.IntersectionObserver !== "function") {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { rootMargin: "-33% 0px -33% 0px", threshold: 0.01 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, entered };
}

export function NutrientChart() {
  const reveal = useEntryReveal();
  const byId = new Map(NUTRITION_OUTCOME.nutrients.map((row) => [row.id, row]));
  const rows = NUTRIENT_ORDER.map((id) => byId.get(id)).filter(
    (row): row is (typeof NUTRITION_OUTCOME.nutrients)[number] => Boolean(row),
  );
  const maxValue = Math.max(...rows.flatMap((row) => [row.staplePct, row.menuChPct ?? 0]));
  const scaleMax = Math.max(200, Math.ceil(maxValue / 20) * 20);
  const targetPosition = ((100 / scaleMax) * 100) + "%";

  return (
    <figure ref={reveal.ref} className={"plot hp-native-chart hp-nutrient-plot " + (reveal.entered ? "is-entered" : "is-awaiting")}>
      <figcaption className="hp-chart-heading">
        <h3>All ten MAR-10 nutrients</h3>
        <p>Percent of nutrition reference</p>
      </figcaption>
      <div className="hp-chart-legend" aria-hidden="true">
        <span><i className="hp-legend-mark hp-legend-staple" />Staple</span>
        <span><i className="hp-legend-mark hp-legend-context" />Swiss adult diet survey</span>
        <span><i className="hp-legend-target" />100% reference</span>
      </div>
      <div className="hp-nutrient-bars" aria-label="All ten MAR-10 nutrients as selected public nutrition outcomes">
        {rows.map((row) => {
          const menu = row.menuChPct;
          return (
            <div className="hp-nutrient-row" key={row.id}>
              <div className="hp-nutrient-row-label">
                <strong>{row.name}</strong>
                <span>
                  Staple {row.staplePct}%.{" "}
                  {menu == null ? "Survey value unavailable." : "Swiss survey " + menu + "%."}
                </span>
              </div>
              <div className="hp-nutrient-pair" aria-hidden="true" style={chartVars({ "target-position": targetPosition })}>
                <div className="hp-nutrient-track">
                  <span className="hp-nutrient-target" />
                  <span className="hp-nutrient-bar hp-nutrient-bar-staple" style={{ width: (row.staplePct / scaleMax) * 100 + "%" }} />
                </div>
                <div className="hp-nutrient-track">
                  <span className="hp-nutrient-target" />
                  {menu != null && <span className="hp-nutrient-bar hp-nutrient-bar-context" style={{ width: (menu / scaleMax) * 100 + "%" }} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="note">The red line is 100%. MAR-10 caps each nutrient at 100% before averaging the ten ratios. These are selected public outcomes, not the underlying optimizer data.</p>
    </figure>
  );
}
