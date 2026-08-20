import { useEffect } from "react";

/** Keep viewport-aware landing chrome above the mobile browser UI and keyboard. */
export function useVisualViewport(): void {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const root = document.documentElement;
    const sync = () => {
      root.style.setProperty("--visual-viewport-height", `${Math.round(viewport.height)}px`);
      root.style.setProperty("--visual-viewport-top", `${Math.round(viewport.offsetTop)}px`);
      root.dataset.keyboardOpen = String(viewport.height < window.innerHeight - 120);
    };
    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    window.addEventListener("orientationchange", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
      window.removeEventListener("orientationchange", sync);
      root.style.removeProperty("--visual-viewport-height");
      root.style.removeProperty("--visual-viewport-top");
      delete root.dataset.keyboardOpen;
    };
  }, []);
}
