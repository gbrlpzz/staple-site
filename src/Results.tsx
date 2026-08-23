import { useState } from "react";
import { Link } from "./App";
import { MobileMenu, RIGHTS_HREF, SiteNav } from "./components/SiteNav";
import { ResearchPanel } from "./components/ResearchPanel";
import { ResultsPanel } from "./components/ResultsPanel";

export function Results() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = window.location.pathname.replace(/\/$/, "") === "/research" ? "research" : "results";
  return (
    <>
      <SiteNav
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        basePath="/"
      />
      <MobileMenu
        open={menuOpen}
        activeSection={activeSection}
        onClose={() => setMenuOpen(false)}
        basePath="/"
      />
      <article className="research-page">
        <section aria-labelledby="research-title">
          <ResearchPanel />
        </section>
        <section aria-labelledby="results-title">
          <ResultsPanel />
        </section>
        <p>
          <Link href="/">← Staple</Link>
        </p>
      </article>
      <footer className="hp-footer">
        <div className="hp-footer-legal">
          © Gabriele Pizzi 2026 · <a href={RIGHTS_HREF} target="_blank" rel="noopener noreferrer" aria-label="Staple rights and licence">Rights</a>
        </div>
      </footer>
    </>
  );
}

export { Results as Research };
