export const NUTRITION_OUTCOME = {
  stapleMar10: 99.7,
  menuChMar10: 74.2,
  nutrients: [
    { id: "proteinG", name: "Protein", staplePct: 204, menuChPct: 147 },
    { id: "fiberG", name: "Fiber", staplePct: 130, menuChPct: 54 },
    { id: "calciumMg", name: "Calcium", staplePct: 97, menuChPct: 93 },
    { id: "magnesiumMg", name: "Magnesium", staplePct: 183, menuChPct: 97 },
    { id: "ironMg", name: "Iron", staplePct: 159, menuChPct: 103 },
    { id: "zincMg", name: "Zinc", staplePct: 140, menuChPct: 112 },
    { id: "vitaminAMcg", name: "Vitamin A", staplePct: 259, menuChPct: null },
    { id: "vitaminCMg", name: "Vitamin C", staplePct: 180, menuChPct: 103 },
    { id: "vitaminB12Mcg", name: "Vitamin B12", staplePct: 105, menuChPct: 105 },
    { id: "folateMcg", name: "Folate", staplePct: 193, menuChPct: 82 },
  ],
  sources: {
    menuCh: {
      label: "Swiss adult nutrition — National Nutrition Survey menuCH",
      url: "https://www.studydata.blv.admin.ch/catalog/4",
    },
    swissFcd: {
      label: "Nutrient values — Swiss Food Composition Database V7.1",
      url: "https://naehrwertdaten.ch/en/",
    },
    habe: {
      label: "Swiss household grocery spending — Federal Statistical Office Household Budget Survey",
      url: "https://www.bfs.admin.ch/bfs/en/home/statistics/economic-social-situation-population/surveys/hbs.html",
    },
    foen: {
      label: "Swiss household food waste — Federal Office for the Environment",
      url: "https://www.bafu.admin.ch/en/state-wastemanagement",
    },
  },
  caveats: [
    "The public figures are preliminary point estimates from a deterministic replay, not a clinical or purchasing trial.",
    "Cost and waste values are modeled outputs, not observed household expenditure or discard.",
    "Survey and waste comparators are contextual, not causal.",
    "The underlying benchmark, protocol and optimizer implementation remain private.",
  ],
} as const;

export const PUBLIC_OUTCOMES = {
  cost: {
    staplePerDayChf: 8.68,
    staplePerDayAfterPantryFillChf: 7.7,
    comparatorPerDayChf: 13.65,
    reductionPercent: 36,
  },
  waste: {
    staplePerWeekG: 617,
    comparatorPerWeekG: 1731,
    reductionPercent: 64,
  },
} as const;

export const HERO = {
  name: "Staple",
  descriptor: "is a personal nutrition system.",
  sentence:
    "Plans a week of meals and shopping around your nutrition, budget, pantry and current grocery prices.",
} as const;

export const CONTACT_EMAIL = "info@gabrielepizzi.com";
