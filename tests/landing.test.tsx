import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Landing } from "../src/Landing";
import { Results } from "../src/Results";
import { CAROUSEL_LABELS } from "../src/components/Carousel";
import { HERO, NUTRITION_OUTCOME, PUBLIC_OUTCOMES } from "../src/data/benchmark";

describe("landing surface", () => {
  it("shows the locked hero copy and Inquire", () => {
    render(<Landing />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/staple/i);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(HERO.descriptor);
    expect(screen.getByText(HERO.sentence)).toBeInTheDocument();
    const inquireLinks = screen.getAllByRole("link", { name: "Inquire" });
    expect(inquireLinks.length).toBeGreaterThan(0);
    expect(inquireLinks.some((link) => link.getAttribute("href")?.includes("subject=Inquiry%20about%20Staple"))).toBe(true);
  });

  it("does not use forbidden conversion CTAs", () => {
    const { container } = render(<Landing />);
    const text = container.textContent ?? "";
    for (const banned of ["Get started", "Join now", "Try Staple", "Download", "Sign up", "Request access"]) {
      expect(text).not.toContain(banned);
    }
  });

  it("labels the five product verbs, ending on Cook", () => {
    render(<Landing />);
    expect(CAROUSEL_LABELS).toEqual(["Plan", "Choose", "Shop", "Store", "Cook"]);
    for (const label of CAROUSEL_LABELS) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("heading", { name: /plan, shop, store and cook in one system/i })).toBeInTheDocument();
  });

  it("keeps public research high-level while preserving the headline outcomes", () => {
    const { container } = render(<Landing />);
    expect(screen.getByRole("heading", { name: /one plan each week, recalculated around you and your market/i })).toBeInTheDocument();
    expect(screen.getByText(/combines your nutrition needs, budget, pantry, cooking limits and current grocery prices/i)).toBeInTheDocument();
    expect(screen.getByText("A few practical weeks from a larger choice space.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /best week at every budget/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Inputs")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nutrition outcomes from an early deterministic replay/i })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /lower food cost and waste while meeting nutrition needs/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /all ten MAR-10 nutrients/i })).toBeInTheDocument();
    expect(screen.getByText(/modeled edible waste/i)).toBeInTheDocument();
    expect(screen.getByText(/selected point estimates/i)).toBeInTheDocument();
    const research = container.querySelector("#research");
    const results = container.querySelector("#results");
    const faq = container.querySelector("#faq");
    expect(research && results && (research.compareDocumentPosition(results) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
    expect(results && faq && (results.compareDocumentPosition(faq) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
    expect(container.querySelector("#inquire")).toBeNull();
  });

  it("prints the selected public outcomes and rights notice", () => {
    render(<Landing />);
    expect(screen.getByText(NUTRITION_OUTCOME.stapleMar10 + "%")).toBeInTheDocument();
    expect(screen.getByText(`CHF ${PUBLIC_OUTCOMES.cost.staplePerDayChf.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`${PUBLIC_OUTCOMES.waste.staplePerWeekG.toLocaleString("en-GB")} g`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Staple rights and licence" })).toHaveAttribute("href", expect.stringContaining("/LICENSE"));
    expect(screen.getByText(/© Gabriele Pizzi 2026/)).toBeInTheDocument();
  });

  it("uses mailto inquiry links instead of a capture form", () => {
    const { container } = render(<Landing />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelectorAll('a[href^="mailto:"]').length).toBeGreaterThan(0);
  });

  it("does not expose the private application repository as a link", () => {
    const { container } = render(<Landing />);
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.some((h) => h.includes("gbrlpzz/staple/"))).toBe(false);
  });
});

describe("results page", () => {
  it("shows the high-level research paragraph, headline outcomes and nutrition chart", () => {
    const { container } = render(<Results />);
    expect(screen.getByRole("heading", { name: /one plan each week, recalculated around you and your market/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /lower food cost and waste while meeting nutrition needs/i })).toBeInTheDocument();
    expect(screen.getByText(`CHF ${PUBLIC_OUTCOMES.cost.staplePerDayChf.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /all ten MAR-10 nutrients/i })).toBeInTheDocument();
    expect(screen.queryByText(/shop cost by week/i)).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/ETH/);
  });
});
