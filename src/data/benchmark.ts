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
  },
  caveats: [
    "The public figures are preliminary point estimates from a deterministic replay, not a clinical or purchasing trial.",
    "The public result is a selected nutrition outcome; the underlying benchmark, protocol and optimizer implementation remain private.",
    "The Swiss survey is contextual, not a causal comparator.",
  ],
} as const;

export const HERO = {
  name: "Staple",
  descriptor: "is a personal nutrition system.",
  sentence:
    "Plans a week of meals and shopping around your nutrition, budget, pantry and current grocery prices.",
} as const;

export const CONTACT_EMAIL = "info@gabrielepizzi.com";
