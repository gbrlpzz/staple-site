/**
 * One shared scroll channel for the whole page.
 *
 * Scroll events can fire several times per frame; running layout reads and
 * state updates per event wastes work and makes the pinned sections stutter.
 * Every subscriber here runs at most once per animation frame, after the
 * browser has settled the scroll, so geometry is fresh and the work is
 * coalesced. The native listener is passive: scrolling is never blocked.
 */
type FrameCallback = () => void;

const subscribers = new Set<FrameCallback>();
let frameScheduled = false;
let listening = false;

function runSubscribers(): void {
  frameScheduled = false;
  for (const callback of subscribers) callback();
}

function requestFrame(): void {
  if (frameScheduled) return;
  frameScheduled = true;
  window.requestAnimationFrame(runSubscribers);
}

function handleNativeEvent(): void {
  requestFrame();
}

/** Subscribe to scroll/resize updates, coalesced to one call per frame.
 *  Returns an unsubscribe function. Fires once on subscribe so callers
 *  initialize against current geometry. */
export function onScrollFrame(callback: FrameCallback): () => void {
  subscribers.add(callback);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", handleNativeEvent, { passive: true });
    window.addEventListener("resize", handleNativeEvent);
  }
  window.requestAnimationFrame(callback);

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && listening) {
      listening = false;
      window.removeEventListener("scroll", handleNativeEvent);
      window.removeEventListener("resize", handleNativeEvent);
    }
  };
}
