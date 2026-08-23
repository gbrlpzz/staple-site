import { useEffect, useState } from "react";
import { onScrollFrame } from "./scrollFrame";

/**
 * Tracks which page section is currently in view as the user scrolls.
 * Shared by the top navigation and the mobile sheet.
 */
export function useSectionSpy(sectionIds: string[], offset = 140): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + offset;
      let current = "";
      let last = "";
      let firstTop = Number.POSITIVE_INFINITY;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        firstTop = Math.min(firstTop, top);
        if (scrollPos >= top && scrollPos < top + height) {
          current = id;
          break;
        }
        if (scrollPos >= top) last = id;
      }
      if (!current) current = scrollPos < firstTop ? (sectionIds[0] ?? "") : last;
      setActive(current);
    };

    return onScrollFrame(handleScroll);
  }, [sectionIds.join(","), offset]);

  return active;
}
