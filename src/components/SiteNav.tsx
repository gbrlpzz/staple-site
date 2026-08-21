import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { CONTACT_EMAIL } from "../data/benchmark";

export const SECTION_LINKS = [
  { id: "product", label: "Product" },
  { id: "research", label: "Algorithm" },
  { id: "results", label: "Results" },
] as const;

export const INQUIRE_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Inquiry about Staple")}`;

function sectionHref(id: string, basePath: string) {
  return `${basePath}#${id}`;
}

function useActiveNavIndicator(activeSection: string) {
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => {
      const active = nav.querySelector<HTMLElement>(".hp-nav-link.active");
      if (!active) {
        setIndicator({ left: 0, width: 0 });
        return;
      }
      setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
    };
    update();
    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    resizeObserver?.observe(nav);
    window.addEventListener("resize", update);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [activeSection]);

  return { navRef, indicator };
}

export function SiteNav({
  activeSection,
  menuOpen,
  onMenuToggle,
  basePath = "",
}: {
  activeSection: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
  basePath?: string;
}) {
  const { navRef, indicator } = useActiveNavIndicator(activeSection);

  return (
    <header className="hp-topbar">
      <div className="hp-topbar-inner">
        <a className="hp-brand" href={basePath || "#top"} aria-label="Staple home" target="_blank" rel="noopener noreferrer">
          <span className="collect-wordmark">staple</span>
        </a>
        <nav ref={navRef} className="hp-nav" aria-label="Sections">
          <span
            className="hp-nav-indicator"
            aria-hidden="true"
            style={{ width: `${indicator.width}px`, transform: `translateX(${indicator.left}px)` }}
          />
          {SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              className={`hp-nav-link ${activeSection === link.id ? "active" : ""}`}
              href={sectionHref(link.id, basePath)}
              aria-current={activeSection === link.id ? "location" : undefined}
             target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hp-topbar-actions">
          <button
            type="button"
            className="hp-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="hp-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={onMenuToggle}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={20} />
          </button>
          <a className="button button-primary button-small" href={INQUIRE_HREF} target="_blank" rel="noopener noreferrer">
            Inquire
          </a>
        </div>
      </div>
    </header>
  );
}

export function MobileMenu({
  open,
  activeSection,
  onClose,
  basePath = "",
}: {
  open: boolean;
  activeSection: string;
  onClose: () => void;
  basePath?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () => Array.from(panel.querySelectorAll<HTMLAnchorElement>("a[href]"));
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 960) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const { overflow } = document.body.style;
    const { overflow: documentOverflow } = document.documentElement.style;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = overflow;
      document.documentElement.style.overflow = documentOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="hp-menu-root">
      <div className="hp-menu-scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="hp-menu"
        id="hp-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Sections"
        data-lenis-prevent
        ref={panelRef}
      >
        <nav>
          {SECTION_LINKS.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.id}
                className={`hp-menu-link ${active ? "active" : ""}`}
                href={sectionHref(link.id, basePath)}
                aria-current={active ? "location" : undefined}
                onClick={onClose}
               target="_blank" rel="noopener noreferrer">
                <span>{link.label}</span>
                <Icon name={active ? "check" : "chevron-right"} size={15} />
              </a>
            );
          })}
          <a className="hp-menu-link hp-menu-cta" href={INQUIRE_HREF} onClick={onClose} target="_blank" rel="noopener noreferrer">
            <span>Inquire</span>
            <Icon name="arrow-right" size={15} />
          </a>
        </nav>
      </div>
    </div>
  );
}
