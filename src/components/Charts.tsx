import { useEffect, useRef, useState, type CSSProperties } from "react";
import { benchmark, formatChf } from "../data/benchmark";

const NUTRIENT_ORDER = ["proteinG", "fiberG", "calciumMg", "magnesiumMg", "ironMg", "zincMg", "vitaminAMcg", "vitaminCMg", "vitaminB12Mcg", "folateMcg"];
type ChartProps = { showTitle?: boolean };

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

function chartVars(values: Record<string, string | number>): CssVars {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [`--${key}`, value])) as CssVars;
}

function ChartHeading({
  title,
  unit,
  compact,
}: {
  title: string;
  unit: string;
  compact?: boolean;
}) {
  return (
    <figcaption className={`hp-chart-heading ${compact ? "is-compact" : ""}`}>
      <h3>{title}</h3>
      <p>{unit}</p>
    </figcaption>
  );
}

export function SpendChart({ showTitle = true }: ChartProps) {
  const weeks = benchmark.weeklyExpenditure;
  const maxValue = Math.max(benchmark.cost.habePerWeek, ...weeks.map((row) => row.stapleChf));
  const max = Math.ceil(maxValue / 20) * 20;
  const referencePosition = `${(benchmark.cost.habePerWeek / max) * 100}%`;
  const summary = weeks.map((row) => `week ${row.week}: ${formatChf(row.stapleChf)}`).join("; ");

  return (
    <figure className="plot hp-native-chart hp-spend-plot" aria-label={`Shop cost by week. ${summary}. Swiss Household Budget Survey context: ${formatChf(benchmark.cost.habePerWeek)} per week.`}>
      <ChartHeading title="Shop cost by week" unit="CHF per week" compact={!showTitle} />
      <div className="hp-chart-summary" aria-hidden="true">
        <div><span>Eight-week mean</span><strong>{formatChf(benchmark.cost.staplePerWeek)}</strong></div>
        <div><span>Swiss spending context</span><strong>{formatChf(benchmark.cost.habePerWeek)}</strong></div>
      </div>
      <div className="hp-week-chart" aria-hidden="true">
        <div className="hp-week-plot">
          <div className="hp-week-reference" style={{ bottom: referencePosition }}>
            <span>Swiss context</span>
          </div>
          <div className="hp-week-grid hp-week-grid-100" style={{ bottom: `${(100 / max) * 100}%` }}><span>100</span></div>
          <div className="hp-week-grid hp-week-grid-50" style={{ bottom: `${(50 / max) * 100}%` }}><span>50</span></div>
          <div className="hp-week-bars">
            {weeks.map((row, index) => (
              <div className="hp-week-column" key={row.week}>
                <span className="hp-week-value" style={{ bottom: `calc(${(row.stapleChf / max) * 100}% + 5px)` }}>{row.stapleChf.toFixed(1)}</span>
                <span
                  className={`hp-week-bar ${index === 0 ? "is-pantry-fill" : ""}`}
                  style={chartVars({ "bar-height": `${(row.stapleChf / max) * 100}%` })}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="hp-week-axis">
          {weeks.map((row) => <span className="hp-week-label" key={row.week}>W{row.week}</span>)}
        </div>
      </div>
      <p className="note">Week 1 fills the pantry. The dashed line is Swiss single-adult grocery spending from the Household Budget Survey.</p>
    </figure>
  );
}

export function NutrientChart({ showTitle = true }: ChartProps) {
  const byId = new Map(benchmark.nutrients.map((row) => [row.id, row]));
  const rows = NUTRIENT_ORDER.map((id) => byId.get(id)).filter(
    (row): row is (typeof benchmark.nutrients)[number] => Boolean(row),
  );
  const maxValue = Math.max(...rows.flatMap((row) => [row.staplePct, row.menuChPct ?? 0]));
  const scaleMax = Math.max(200, Math.ceil(maxValue / 20) * 20);
  const targetPosition = `${(100 / scaleMax) * 100}%`;

  return (
    <figure className="plot hp-native-chart hp-nutrient-plot">
      <ChartHeading title="All ten MAR-10 nutrients" unit="Percent of nutrition reference" compact={!showTitle} />
      <div className="hp-chart-legend" aria-hidden="true">
        <span><i className="hp-legend-mark hp-legend-staple" />Staple</span>
        <span><i className="hp-legend-mark hp-legend-context" />Swiss adult diet survey</span>
        <span><i className="hp-legend-target" />100% reference</span>
      </div>
      <div className="hp-nutrient-bars" aria-label="All ten MAR-10 nutrients as raw percent of the nutrition reference">
        {rows.map((row) => {
          const menu = row.menuChPct;
          return (
            <div className="hp-nutrient-row" key={row.id}>
              <div className="hp-nutrient-row-label">
                <strong>{row.name}</strong>
                <span>Staple {row.staplePct}% · {menu == null ? "survey value unavailable" : `Swiss survey ${menu}%`}</span>
              </div>
              <div className="hp-nutrient-pair" aria-hidden="true" style={chartVars({ "target-position": targetPosition })}>
                <div className="hp-nutrient-track">
                  <span className="hp-nutrient-target" />
                  <span className="hp-nutrient-bar hp-nutrient-bar-staple" style={{ width: `${(row.staplePct / scaleMax) * 100}%` }} />
                </div>
                <div className="hp-nutrient-track">
                  <span className="hp-nutrient-target" />
                  {menu != null && <span className="hp-nutrient-bar hp-nutrient-bar-context" style={{ width: `${(menu / scaleMax) * 100}%` }} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="note">The red line is 100%. MAR-10 caps each nutrient at 100% before averaging the ten ratios. Bars show the raw percentages.</p>
    </figure>
  );
}

export function WasteChart({ showTitle = true }: ChartProps) {
  const rows = [
    { label: "Staple", value: benchmark.waste.stapleGPerWeek, className: "hp-waste-bar-staple" },
    { label: "Swiss household discard context", value: benchmark.waste.foenGPerWeek, className: "hp-waste-bar-context" },
  ];
  const max = Math.max(...rows.map((row) => row.value));

  return (
    <figure className="plot hp-native-chart hp-waste-plot">
      <ChartHeading title="Modeled edible waste" unit="Grams per week" compact={!showTitle} />
      <div className="hp-waste-bars" aria-label={`Modeled edible waste per week: Staple ${benchmark.waste.stapleGPerWeek} grams; Swiss household discard context ${benchmark.waste.foenGPerWeek} grams`}>
        {rows.map((row) => (
          <div className="hp-waste-row" key={row.label}>
            <div className="hp-waste-label"><strong>{row.label}</strong><b>{row.value.toLocaleString("en-GB")} g</b></div>
            <div className="hp-waste-track" aria-hidden="true"><span className={row.className} style={{ width: `${(row.value / max) * 100}%` }} /></div>
          </div>
        ))}
      </div>
      <p className="note">The Swiss household estimate covers a broader discard basket than Staple’s planned shop.</p>
    </figure>
  );
}

export function FrontierChart() {
  const frontier = benchmark.choiceExample.frontier;
  const points = [...frontier.points].sort((a, b) => a.costChf - b.costChf);
  const selected = points.filter((point) => point.selectedLabel);
  const pareto = points.filter((point) => !points.some((other) =>
    other !== point &&
    other.costChf <= point.costChf &&
    other.coveragePercent >= point.coveragePercent &&
    (other.costChf < point.costChf || other.coveragePercent > point.coveragePercent),
  ));
  const minX = Math.floor((Math.min(...points.map((point) => point.costChf)) - 5) / 10) * 10;
  const maxX = Math.ceil((Math.max(...points.map((point) => point.costChf)) + 5) / 10) * 10;
  const minY = 100;
  const maxY = 130;
  const x = (value: number) => ((value - minX) / (maxX - minX)) * 100;
  const y = (value: number) => (1 - (value - minY) / (maxY - minY)) * 100;
  const xTicks = [90, 120, 150].filter((tick) => tick >= minX && tick <= maxX);
  const yTicks = [100, 110, 120, 130].filter((tick) => tick >= minY && tick <= maxY);
  const figureRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = figureRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figureRef} className={`plot hp-native-chart hp-frontier-plot ${entered ? "is-entered" : "is-awaiting"}`} aria-label={`Pareto frontier with ${points.length} distinct weekly plans. Plans shown in the app: ${selected.map((plan) => `${plan.selectedLabel}: ${formatChf(plan.costChf)}, ${plan.coveragePercent}% coverage`).join("; ")}.`}>
      <ChartHeading title="Pareto frontier" unit="Complete weeks: checkout cost × nutrition coverage" />
      <div className="hp-frontier-legend" aria-hidden="true">
        <span><i className="hp-frontier-key hp-frontier-key-other" />Week that fits</span>
        <span><i className="hp-frontier-key hp-frontier-key-line" />Best cost–nutrition boundary</span>
        <span><i className="hp-frontier-key hp-frontier-key-selected" />App choices</span>
      </div>
      <div className="hp-frontier-canvas" aria-hidden="true">
        <span className="hp-frontier-axis-y">Nutrition coverage (%)</span>
        <div className="hp-frontier-stage">
          {yTicks.map((tick) => (
            <span className="hp-frontier-y-tick" key={tick} style={{ top: `${y(tick)}%` }}>{tick}</span>
          ))}
          {xTicks.map((tick) => (
            <span className="hp-frontier-x-tick" key={tick} style={{ left: `${x(tick)}%` }}>{tick}</span>
          ))}
          <svg className="hp-frontier-path" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              pathLength="1"
              points={pareto.map((point) => `${x(point.costChf)},${y(point.coveragePercent)}`).join(" ")}
            />
          </svg>
          {points.map((point, index) => {
            const label = point.selectedLabel;
            return (
              <div
                className={`hp-frontier-point ${label ? `is-selected hp-frontier-point-${label.toLowerCase()}` : "is-other"}`}
                key={`${point.costChf}-${point.coveragePercent}-${index}`}
                style={{
                  left: `${x(point.costChf)}%`,
                  top: `${y(point.coveragePercent)}%`,
                  ...chartVars({ "point-delay": `${index * 70}ms` }),
                }}
              >
                <span className="hp-frontier-dot" />
                {label && (
                  <span className="hp-frontier-point-label">
                    <strong>{label}</strong>
                    <small>{formatChf(point.costChf)} · {point.coveragePercent}%</small>
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="hp-frontier-axis-x">Weekly checkout cost (CHF)</div>
      </div>
    </figure>
  );
}
