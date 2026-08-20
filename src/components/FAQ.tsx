import { useState } from "react";
import { CONTACT_EMAIL } from "../data/benchmark";

const QUESTIONS = [
  {
    question: "What is Staple?",
    answer: "Staple is a personal nutrition system. It plans a complete week of meals and shopping around your nutrition needs, budget, pantry and current grocery prices.",
  },
  {
    question: "How does Staple choose a week?",
    answer: "The optimizer samples complete seven-day menus, removes plans that miss a hard nutrition or cooking floor, and surfaces a small set of feasible cost–quality choices.",
  },
  {
    question: "Does the system account for what I already have?",
    answer: "Yes. Pantry state carries forward between weeks. Products already available are subtracted from the next shop, while purchased and eaten food updates the inventory.",
  },
  {
    question: "Are the results a clinical or purchasing trial?",
    answer: "No. The public numbers are a preliminary deterministic replay for one fixed scenario. They are point estimates, not causal effects or health advice.",
  },
  {
    question: "How can I ask about Staple?",
    answer: "For questions about the optimizer, retail integration, research, licensing or partnerships, send an inquiry.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="hp-faq-layout">
      <div className="section-heading hp-faq-intro" data-reveal-item="intro">
        <p className="eyebrow">Questions</p>
        <h2 id="faq-title">Any questions?</h2>
        <p><a href={`mailto:${CONTACT_EMAIL}`}>Reach out to inquire.</a></p>
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
