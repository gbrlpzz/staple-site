import { useState } from "react";
import { CONTACT_EMAIL } from "../data/benchmark";

const QUESTIONS = [
  {
    question: "What is Staple?",
    answer: "Staple is a personal nutrition system. Every week, it builds a complete meal and shopping plan around your nutrition needs, your budget, your pantry and current store prices.",
  },
  {
    question: "How does Staple choose a week?",
    answer: "It searches complete seven-day menus, discards any plan that misses a firm nutrition or cooking floor, and offers a concise set of realistic choices across budget and quality.",
  },
  {
    question: "Does Staple account for what I already have?",
    answer: "Yes. Your pantry carries over from week to week. Items you already own reduce the next shop, while purchases and meals keep the inventory up to date.",
  },
  {
    question: "Are these results from a clinical or purchasing trial?",
    answer: "No. The public figures come from an early deterministic replay. They are selected point estimates, not causal effects, clinical evidence or health advice.",
  },
  {
    question: "How can I get in touch?",
    answer: "For questions about the planner, retail integration, research, licensing or partnerships, please send an email.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="hp-faq-layout">
      <div className="section-heading hp-faq-intro" data-reveal-item="intro">
        <p className="eyebrow">Questions</p>
        <h2 id="faq-title">Any questions?</h2>
        <p><a href={`mailto:${CONTACT_EMAIL}`} target="_blank" rel="noopener noreferrer">Get in touch any time.</a></p>
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
