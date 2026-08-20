import type { ReactNode } from "react";
import { Landing } from "./Landing";
import { Results } from "./Results";

export function Link({ href, children }: { href: string; children: ReactNode }) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("http") || href.startsWith("mailto:")) return;
    event.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/research" || path === "/results") return <Results />;
  return <Landing />;
}
