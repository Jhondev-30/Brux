/**
 * Defers below-the-fold section initialization until the element is already in
 * view, precedes/matches the active URL hash target, or enters a generous
 * pre-roll margin after the user starts scrolling. Keeps initial page load
 * free of offscreen GSAP/SplitText/canvas work while preserving animations
 * and pin-spacer geometry on scroll or anchor navigation.
 */
export function deferSectionInit(selector: string, init: () => void): () => void {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return () => {};

  let done = false;
  let observer: IntersectionObserver | null = null;
  const controller = new AbortController();
  const { signal } = controller;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    controller.abort();
  };

  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    init();
  };

  const hashNeedsElement = () => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return false;
    try {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return false;
      if (target === el || el.contains(target)) return true;
      return Boolean(el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
    } catch {
      return false;
    }
  };

  const isInOrAboveViewport = (marginPx: number) =>
    el.getBoundingClientRect().top <= window.innerHeight + marginPx;

  if (isInOrAboveViewport(-1) || hashNeedsElement()) {
    run();
    return () => {};
  }

  const observeWithMargin = (rootMargin: string) => {
    if (done) return;
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
  };

  const upgradeMargin = () => {
    if (done) return;
    if (isInOrAboveViewport(750)) {
      run();
      return;
    }
    observeWithMargin("750px 0px");
  };

  // Start strict at -1px while scrollY === 0 so sections touching 100svh do not
  // hydrate during the initial LCP/curtain frame; expand to 750px as soon as
  // the user scrolls or interacts.
  if (window.scrollY > 0) {
    observeWithMargin("750px 0px");
  } else {
    observeWithMargin("-1px 0px");
    window.addEventListener("scroll", upgradeMargin, { passive: true, once: true, signal });
    window.addEventListener("wheel", upgradeMargin, { passive: true, once: true, signal });
    window.addEventListener("touchmove", upgradeMargin, { passive: true, once: true, signal });
  }

  window.addEventListener(
    "hashchange",
    () => {
      if (hashNeedsElement()) run();
    },
    { passive: true, signal },
  );

  return cleanup;
}
