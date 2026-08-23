import { useEffect, useRef, useState, type ReactNode } from "react";

export function RevealOnEntry({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window.IntersectionObserver !== "function") {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`hp-entry-reveal ${entered ? "is-entered" : "is-awaiting"}`}>{children}</div>;
}
