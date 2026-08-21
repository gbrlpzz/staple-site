import { useEffect, useState, type CSSProperties } from "react";
import { ProductCopy, ProductPhone } from "./components/ProductScrolly";
import { FAQ } from "./components/FAQ";
import { RevealOnEntry } from "./components/RevealOnEntry";
import { ResearchPanel } from "./components/ResearchPanel";
import { ResultsPanel } from "./components/ResultsPanel";
import { HERO } from "./data/benchmark";
import { INQUIRE_HREF, MobileMenu, SECTION_LINKS, SiteNav } from "./components/SiteNav";
import { useScrollytelling } from "./useScrollytelling";
import { useSectionSpy } from "./useSectionSpy";

const SECTION_IDS = SECTION_LINKS.map((link) => link.id);

function cssVar(name: `--${string}`, value: string | number): CSSProperties {
  return { [name]: value } as CSSProperties;
}

function useInitialHashScroll() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
}

function Hero() {
  return (
    <section className="hp-hero hp-hero-enhanced" id="top" aria-labelledby="hero-title" data-hero-motion="off">
      <div className="hp-hero-media" aria-hidden="true">
        <div className="hp-hero-devices">
          <img src="/hero-devices.webp" alt="" width={1800} height={1639} />
        </div>
      </div>
      <div className="hp-hero-container">
        <div className="hp-hero-copy-panel">
          <h1 id="hero-title">
            <span className="hp-hero-clause">
              <span className="hp-hero-wordmark">staple</span>
            </span>
            <span className="hp-hero-clause">{HERO.descriptor}</span>
          </h1>
          <p className="hp-hero-lede">{HERO.sentence}</p>
          <a className="button button-primary hp-hero-cta" href={INQUIRE_HREF} target="_blank" rel="noopener noreferrer">
            Inquire
          </a>
        </div>
      </div>
    </section>
  );
}

export function Landing() {
  useInitialHashScroll();
  const product = useScrollytelling<HTMLDivElement>(5);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useSectionSpy(SECTION_IDS);

  return (
    <div className="hp-shell">
      <SiteNav
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
      />
      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={() => setMenuOpen(false)} />
      <main id="main">
        <Hero />

        <section className="hp-section-scrolly hp-section-canvas" id="product" aria-labelledby="product-title">
          <div className="hp-scrolly" ref={product.ref} style={cssVar("--hp-steps", 5)}>
            <div className="hp-scrolly-panel">
              <div className="hp-section-inner">
                <RevealOnEntry>
                  <div className="hp-flow-layout">
                    <ProductCopy active={product.active} onSelect={product.goToStep} />
                    <ProductPhone active={product.active} />
                  </div>
                </RevealOnEntry>
              </div>
            </div>
          </div>
        </section>

        <section className="hp-section hp-section-paper" id="research" aria-labelledby="research-title">
          <div className="hp-section-inner">
            <RevealOnEntry><ResearchPanel /></RevealOnEntry>
          </div>
        </section>

        <section className="hp-section hp-section-canvas" id="results" aria-labelledby="results-title">
          <div className="hp-section-inner">
            <RevealOnEntry><ResultsPanel /></RevealOnEntry>
          </div>
        </section>

        <section className="hp-section hp-section-paper hp-faq-section" id="faq" aria-labelledby="faq-title">
          <div className="hp-section-inner">
            <RevealOnEntry><FAQ /></RevealOnEntry>
          </div>
        </section>

      </main>

      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <div className="hp-footer-brand">
            <a className="hp-brand" href="#top" aria-label="Staple home" target="_blank" rel="noopener noreferrer">
              <span className="collect-wordmark">staple</span>
            </a>
          </div>
          <nav className="hp-footer-links" aria-label="Footer">
            <div>
              <span className="hp-footer-heading">Product</span>
              <a href="#product" target="_blank" rel="noopener noreferrer">Weekly loop</a>
            </div>
            <div>
              <span className="hp-footer-heading">Algorithm</span>
              <a href="#research" target="_blank" rel="noopener noreferrer">Algorithm</a>
              <a href="#results" target="_blank" rel="noopener noreferrer">Results</a>
            </div>
            <div>
              <span className="hp-footer-heading">Contact</span>
              <a href={INQUIRE_HREF} target="_blank" rel="noopener noreferrer">Inquire</a>
              <a href="https://gabrielepizzi.com" target="_blank" rel="noopener noreferrer">gabrielepizzi.com</a>
            </div>
          </nav>
          <p className="hp-footer-legal">
            <a href="https://gabrielepizzi.com" target="_blank" rel="noopener noreferrer">© Gabriele Pizzi 2026</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
