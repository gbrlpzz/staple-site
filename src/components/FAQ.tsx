import { useState } from "react";

const QUESTIONS = [
  {
    question: "What is Staple?",
    answer: "A personal nutrition system that builds a meal and shopping plan around your needs, budget, pantry and current prices.",
  },
  {
    question: "How does Staple choose a week?",
    answer: "It searches complete seven-day menus, filters out plans that miss nutrition or cooking requirements, then offers realistic choices across budget and quality.",
  },
  {
    question: "Does Staple account for what I already have?",
    answer: "Yes. Pantry stock carries over week to week, reducing the next shop and waste.",
  },
  {
    question: "Are these results from a clinical or purchasing trial?",
    answer: "No. These are selected point estimates from an early deterministic replay—not causal effects, clinical evidence or health advice.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="hp-faq-layout">
      <div className="section-heading hp-faq-intro" data-reveal-item="intro">
        <p className="eyebrow">Questions</p>
        <h2 id="faq-title">Any questions?</h2>
      </div>
      <div className="hp-faq-list" data-reveal-item="list">
        {QUESTIONS.map((item, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <div className="hp-faq-item" key={item.question}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className={`hp-faq-icon ${open ? "is-open" : ""}`} aria-hidden="true"><span className="hp-faq-glyph" /></span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!open}
                className={`hp-faq-answer ${open ? "is-open" : ""}`}
              >
                <div className="hp-faq-answer-inner"><p>{item.answer}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
