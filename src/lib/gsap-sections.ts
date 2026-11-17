import { gsap } from "gsap";
import { Minus, Plus, type IconNode } from "lucide";

type MorphEl = HTMLElement & { morphTo?: (icon: IconNode | string) => void };

/**
 * Attaches smooth accordion open/close height animation, MorphIcon swap,
 * and ScrollTrigger entrance choreography to any FAQ section with [data-faq-section].
 */
export function wireFaqSection(root: HTMLElement): () => void {
  const controller = new AbortController();
  const { signal } = controller;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  root.querySelectorAll<HTMLDetailsElement>("details").forEach((item) => {
    const summary = item.querySelector("summary");
    const answerWrap = item.querySelector<HTMLElement>("[data-faq-answer]");
    const answerText = answerWrap?.firstElementChild as HTMLElement | null;
    const icon = item.querySelector<MorphEl>("[data-faq-icon]");
    if (!summary || !answerWrap || !answerText) return;

    summary.addEventListener(
      "click",
      (e) => {
        if (reduce.matches) {
          requestAnimationFrame(() => icon?.morphTo?.(item.open ? Minus : Plus));
          return;
        }
        e.preventDefault();
        gsap.killTweensOf([answerWrap, answerText]);
        if (!item.open) {
          item.open = true;
          icon?.morphTo?.(Minus);
          gsap.fromTo(
            answerWrap,
            { height: 0 },
            { height: "auto", duration: 0.5, ease: "expo.out", clearProps: "height" },
          );
          gsap.fromTo(
            answerText,
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.45, delay: 0.05, ease: "power2.out", clearProps: "transform,opacity,visibility" },
          );
        } else {
          icon?.morphTo?.(Plus);
          gsap.to(answerText, { autoAlpha: 0, y: 6, duration: 0.16, ease: "power2.in" });
          gsap.to(answerWrap, {
            height: 0,
            duration: 0.32,
            ease: "power3.inOut",
            onComplete: () => {
              item.open = false;
              gsap.set([answerWrap, answerText], { clearProps: "all" });
            },
          });
        }
      },
      { signal },
    );
  });

  return () => controller.abort();
}

/**
 * ScrollTrigger entrance for FAQ sections (requires GSAP context active).
 */
export function animateFaqEntrance(faqRoot: HTMLElement) {
  const heading = faqRoot.querySelector<HTMLElement>("h2");
  const lead = faqRoot.querySelector<HTMLElement>("[data-faq-lead]");
  const lines = faqRoot.querySelectorAll<HTMLElement>("[data-faq-line]");
  const summaries = faqRoot.querySelectorAll<HTMLElement>("details summary");

  const tl = gsap.timeline({
    scrollTrigger: { trigger: faqRoot, start: "top 78%", once: true },
  });

  if (heading) {
    tl.from(heading, {
      y: 22,
      autoAlpha: 0,
      duration: 0.85,
      ease: "expo.out",
      clearProps: "transform,opacity,visibility",
    });
  }
  if (lead) {
    tl.from(lead, { y: 16, autoAlpha: 0, duration: 0.75, ease: "expo.out", clearProps: "transform,opacity,visibility" }, 0.16);
  }
  if (lines.length) {
    tl.from(lines, { scaleX: 0, transformOrigin: "left center", duration: 0.95, ease: "power3.inOut", stagger: 0.06, clearProps: "transform" }, 0.12);
  }
  if (summaries.length) {
    tl.from(
      summaries,
      { x: -24, autoAlpha: 0, duration: 0.75, ease: "expo.out", stagger: 0.06, clearProps: "transform,opacity,visibility" },
      0.2,
    );
  }
}

/**
 * ScrollTrigger entrance for pricing/strategy redirect bands.
 */
export function animateRedirectBand(band: HTMLElement | null) {
  if (!band) return;
  const actions = band.querySelector<HTMLElement>("[data-band-actions]");
  const tl = gsap.timeline({
    scrollTrigger: { trigger: band, start: "top 84%", once: true },
    defaults: { ease: "power3.out" },
  });

  tl.from(band, {
    y: 24,
    scale: 0.975,
    autoAlpha: 0,
    duration: 0.85,
    clearProps: "transform,opacity,visibility",
  });
  if (actions) {
    tl.from(
      actions.children,
      { y: 14, autoAlpha: 0, duration: 0.65, stagger: 0.08, clearProps: "transform,opacity,visibility" },
      0.22,
    );
  }
}
