import type { ReactNode } from "react";
import { Landing } from "./Landing";
import { Results } from "./Results";

export function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/research" || path === "/results") return <Results />;
  return <Landing />;
}
