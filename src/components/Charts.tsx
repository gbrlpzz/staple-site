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

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

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


function ChartHeading({ title, unit }: { title: string; unit: string }) {
  return (
    <figcaption className="hp-chart-heading">
      <h3>{title}</h3>
      <p>{unit}</p>
    </figcaption>
  );
}

type PublicPlotPoint = { x: number; y: number; selectedLabel?: "Budget" | "Balanced" | "Quality"; boundary?: boolean };

const PUBLIC_PLOT_POINTS: PublicPlotPoint[] = [
  { x: 8, y: 18 },
  { x: 16, y: 27 },
  { x: 24, y: 24 },
  { x: 31, y: 38 },
  { x: 39, y: 34 },
  { x: 46, y: 50, selectedLabel: "Budget", boundary: true },
  { x: 53, y: 47 },
  { x: 60, y: 63, selectedLabel: "Balanced", boundary: true },
  { x: 68, y: 58 },
  { x: 76, y: 74, selectedLabel: "Quality", boundary: true },
  { x: 84, y: 68 },
  { x: 93, y: 82 },
] as const;

export function FrontierChart() {
  const reveal = useEntryReveal();
  const boundary = PUBLIC_PLOT_POINTS.filter((point) => point.boundary);
  const x = (value: number) => value;
  const y = (value: number) => 100 - value;

  return (
    <figure
      ref={reveal.ref}
      className={"plot hp-native-chart hp-frontier-plot " + (reveal.entered ? "is-entered" : "is-awaiting")}
      aria-label="Illustrative plot of possible weekly choices and three public plan options. The positions are conceptual and do not expose the underlying implementation."
    >
      <ChartHeading title="A few practical weeks from a larger choice space." unit="Illustrative planning view" />
      <div className="hp-frontier-legend" aria-hidden="true">
        <span><i className="hp-frontier-key hp-frontier-key-other" />Possible week</span>
        <span><i className="hp-frontier-key hp-frontier-key-line" />Trade-off shape</span>
        <span><i className="hp-frontier-key hp-frontier-key-selected" />Public choice</span>
      </div>
      <div className="hp-frontier-canvas" aria-hidden="true">
        <span className="hp-frontier-y-label">Higher fit</span>
        <div className="hp-frontier-stage">
          <svg className="hp-frontier-path" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              pathLength="1000"
              points={boundary.map((point) => x(point.x) + "," + y(point.y)).join(" ")}
            />
          </svg>
          {PUBLIC_PLOT_POINTS.map((point, index) => {
            const label = point.selectedLabel;
            return (
              <div
                className={"hp-frontier-point " + (label ? "is-selected hp-frontier-point-" + label.toLowerCase() : "is-other")}
                key={point.x + "-" + point.y + "-" + index}
                style={{
                  left: x(point.x) + "%",
                  top: y(point.y) + "%",
                  ...chartVars({ "point-delay": index * 70 + "ms" }),
                }}
              >
                <span className="hp-frontier-dot" />
                {label && (
                  <span className="hp-frontier-point-label">
                    <strong>{label}</strong>
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <span className="hp-frontier-x-label">More variety</span>
      </div>
      <p className="note">This public illustration shows the shape of the choice, not the data, scoring rules or search behind it.</p>
    </figure>
  );
}
