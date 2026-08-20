import raw from "./benchmark.json";

export type Benchmark = typeof raw;
export const benchmark: Benchmark = raw;

export function formatChf(value: number, digits = 2): string {
  return `CHF ${value.toFixed(digits)}`;
}

export function signedPercent(value: number): string {
  const rounded = Math.round(value);
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

export function headlineFigures(data: Benchmark = benchmark) {
  const mar10Pp = Math.round((data.adequacy.stapleMar10 - data.adequacy.menuChMar10) * 10) / 10;
  return {
    costDelta: signedPercent(data.cost.deltaPercent),
    costLabel: data.cost.label,
    stapleCost: `${formatChf(data.cost.staplePerDay)}/day Staple`,
    habeCost: `${formatChf(data.cost.habePerDay)}/day Swiss HABE comparator`,
    mar10: `${data.adequacy.stapleMar10}%`,
    mar10Label: data.adequacy.label,
    mar10Delta: `+${mar10Pp} pp`,
    menuChMar10: `${data.adequacy.menuChMar10}% Swiss mean comparator`,
    wasteDelta: signedPercent(data.waste.deltaPercent),
    wasteLabel: data.waste.label,
    stapleWaste: `${data.waste.stapleGPerWeek} g/week Staple`,
    foenWaste: `${data.waste.foenGPerWeek.toLocaleString("en-GB")} g/week FOEN household comparator`,
    wasteQualifier: data.waste.qualifier,
    afterFill: `${formatChf(data.cost.staplePerDayAfterFill)}/day`,
    overall: `${formatChf(data.cost.staplePerDay)}/day`,
  };
}

export const HERO = {
  name: "Staple",
  descriptor: "is a personal nutrition system.",
  sentence:
    "Plans a week of meals and shopping around your nutrition, budget, pantry and current grocery prices.",
} as const;

export const CONTACT_EMAIL = "info@gabrielepizzi.com";
