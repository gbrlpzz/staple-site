import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Landing } from "../src/Landing";
import { Results } from "../src/Results";
import { CAROUSEL_LABELS } from "../src/components/Carousel";
import { benchmark, HERO, headlineFigures } from "../src/data/benchmark";

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

  it("separates the optimizer from pilot results", () => {
    const { container } = render(<Landing />);
    expect(screen.getByRole("heading", { name: /one plan each week, recalculated around you and your market/i })).toBeInTheDocument();
    expect(screen.getByText("Local grocery prices")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pareto frontier/i })).toBeInTheDocument();
    expect(screen.getByText("Inputs")).toBeInTheDocument();
    expect(screen.getByText("Nutrition coverage (%)")).toBeInTheDocument();
    expect(screen.getByText("Weekly checkout cost (CHF)")).toBeInTheDocument();
    expect(benchmark.choiceExample.frontier.points).toHaveLength(11);
    expect(benchmark.choiceExample.frontier.points.filter((point) => point.selectedLabel)).toHaveLength(3);
    expect(screen.getByRole("link", { name: /Apple Health/i })).toHaveAttribute("href", "https://www.apple.com/ios/health/");
    expect(screen.getByRole("heading", { name: /lower food cost and waste while meeting nutrition needs/i })).toBeInTheDocument();
    expect(screen.getByText(/shop cost by week/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /all ten MAR-10 nutrients/i })).toBeInTheDocument();
    expect(screen.getByText(/snapshot as of 19 August 2026/i)).toBeInTheDocument();
    expect(benchmark.nutrients).toHaveLength(10);
    expect(screen.getByRole("link", { name: /National Nutrition Survey menuCH/i })).toHaveAttribute("href", benchmark.sourceLinks.menuCh.url);
    const research = container.querySelector("#research");
    const results = container.querySelector("#results");
    const faq = container.querySelector("#faq");
    expect(research && results && (research.compareDocumentPosition(results) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
    expect(results && faq && (results.compareDocumentPosition(faq) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
    expect(container.querySelector("#inquire")).toBeNull();
  });

  it("prints headline numbers from the research-data source", () => {
    const figures = headlineFigures(benchmark);
    render(<Landing />);
    expect(screen.getAllByText(figures.costDelta).length).toBeGreaterThan(0);
    expect(screen.getByText(`${benchmark.adequacy.stapleMar10}%`)).toBeInTheDocument();
    expect(screen.getAllByText(figures.wasteDelta).length).toBeGreaterThan(0);
    expect(screen.getByText(/BFS Household Budget Survey/)).toBeInTheDocument();
  });

  it("updates printed figures when the research source changes", () => {
    const mutated = structuredClone(benchmark);
    mutated.cost.staplePerDay = 3.21;
    mutated.cost.deltaPercent = -99;
    const figures = headlineFigures(mutated);
    expect(figures.stapleCost).toContain("3.21");
    expect(figures.costDelta).toBe("-99%");
    expect(headlineFigures(benchmark).stapleCost).toContain(String(benchmark.cost.staplePerDay));
  });

  it("uses mailto inquiry links instead of a capture form", () => {
    const { container } = render(<Landing />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelectorAll('a[href^="mailto:"]').length).toBeGreaterThan(0);
  });

  it("does not link a GitHub repository", () => {
    const { container } = render(<Landing />);
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.some((h) => h.includes("github.com"))).toBe(false);
  });

  it("shows the copyright credit without institutional affiliation", () => {
    const { container } = render(<Landing />);
    expect(screen.getByRole("link", { name: /© Gabriele Pizzi 2026/ })).toHaveAttribute("href", "https://gabrielepizzi.com");
    expect(container.textContent).not.toMatch(/ETH/);
  });
});

describe("results page", () => {
  it("shows research and results without ETH", () => {
    const { container } = render(<Results />);
    expect(screen.getByRole("heading", { name: /one plan each week, recalculated around you and your market/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /lower food cost and waste while meeting nutrition needs/i })).toBeInTheDocument();
    expect(screen.getByText(/shop cost by week/i)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/ETH/);
  });
});
