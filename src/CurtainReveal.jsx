import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./curtain.css";

/**
 * <CurtainReveal> wraps your hero. Inside the hero, mark:
 *   data-reveal-bg  -> background image/element (slow settle-in zoom)
 *   data-reveal     -> heading, description, CTA wrapper... (staggered fade + rise, in DOM order)
 */

// Survives route remounts so the intro only plays once per page load.
let hasPlayed = false;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Deterministic pseudo-random: stable between renders, no SSR mismatch
const rand = (i, salt) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const foldCount = () => {
  if (typeof window === "undefined") return 12;
  const w = window.innerWidth;
  return w < 640 ? 7 : w < 1024 ? 10 : 14;
};

const OVERLAP = 1.35; // each fold is wider than its slot, so neighbours overlap (no gaps)

/** Irregular folds: uneven widths, different crest positions, different sway. Real cloth is never uniform. */
function makeFolds(count, salt) {
  const raw = Array.from({ length: count }, (_, i) => 0.55 + rand(i, salt) * 0.9);
  const sum = raw.reduce((a, b) => a + b, 0);
  let left = 0;
  return raw.map((r, i) => {
    const width = (r / sum) * 100;
    const fold = {
      left,
      width,
      crest: 34 + rand(i, salt + 5) * 30, // 34–64 %
      shade: 0.02 + rand(i, salt + 9) * 0.14,
      skew: 1.2 + rand(i, salt + 13) * 2.4,
    };
    left += width;
    return fold;
  });
}

function Panel({ side, folds }) {
  return (
    <div className={`curtain-panel curtain-panel--${side}`}>
      {folds.map((f, i) => (
        <div
          key={i}
          className="curtain-strip"
          data-i={i}
          data-left={f.left}
          data-width={f.width}
          data-crest={f.crest}
          data-shade={f.shade}
          data-skew={f.skew}
          style={{
            left: `${f.left}%`,
            width: `${f.width * OVERLAP}%`,
            zIndex: i + 1, // folds nearest the centre sit on top
            "--crest": `${f.crest}%`,
            "--shade": f.shade,
          }}
        />
      ))}
    </div>
  );
}

export default function CurtainReveal({ children, replayKey = 0 }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const [done, setDone] = useState(false);
  const [count] = useState(foldCount);
  const leftFolds = useMemo(() => makeFolds(count, 1), [count]);
  const rightFolds = useMemo(() => makeFolds(count, 7), [count]);

  useEffect(() => {
    if (replayKey > 0) {
      setDone(false);
    }
  }, [replayKey]);

  useLayoutEffect(() => {
    if (done) return;

    const q = gsap.utils.selector(rootRef);
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden"; // no scrolling behind the curtains

    const ctx = gsap.context(() => {
      const reveal = q("[data-reveal]");
      const bg = q("[data-reveal-bg]");
      const strips = q(".curtain-strip");

      // Hidden before first paint, so the hero never flashes
      gsap.set(reveal, { opacity: 0, y: 46 });
      if (bg.length > 0) {
        gsap.set(bg, { scale: 1.14 });
      }

      const START = 0.8; // a beat of stillness before the pull
      const OPEN = 5.4; // travel time per fold
      const LAG = 0.07; // delay between neighbouring folds (the pull travels through the cloth)
      const lead = count - 1;

      const tl = gsap.timeline({
        onComplete: () => {
          hasPlayed = true;
          gsap.set(reveal, { opacity: 1, y: 0, clearProps: "all" });
          if (bg.length > 0) {
            gsap.set(bg, { scale: 1, clearProps: "all" });
          }
          setDone(true);
        },
      });
      tlRef.current = tl;

      tl.to(q(".curtain-seam"), { opacity: 0, duration: 0.7, ease: "power1.out" }, START);
      tl.to(q(".curtain-vignette"), { opacity: 0, duration: OPEN, ease: "power1.inOut" }, START + OPEN * 0.3);

      strips.forEach((el) => {
        const i = Number(el.dataset.i);
        const left = Number(el.dataset.left);
        const width = Number(el.dataset.width) * OVERLAP;
        const crest = Number(el.dataset.crest);
        const shade0 = Number(el.dataset.shade);
        const skew = Number(el.dataset.skew);

        // Leading edge (highest i) is pulled first; the rest follow.
        const at = START + (lead - i) * LAG;

        // ONE continuous motion straight off the screen. Because each fold travels by
        // (its own offset + its width), the spacing shrinks as it moves: the cloth bunches
        // up and keeps going, never parking in a pile.
        const xPercent = -((left + width + 4) / width) * 100;
        tl.to(el, { xPercent, duration: OPEN, ease: "power2.inOut" }, at);

        // Hem drags behind the rail: gentle skew that swells and settles (different per fold)
        tl.to(el, { skewX: skew, duration: OPEN * 0.42, ease: "sine.inOut", yoyo: true, repeat: 1 }, at);

        // Silk shimmer: the highlight slides across the fold as the cloth moves
        tl.fromTo(
          el,
          { "--crest": `${crest}%` },
          { "--crest": `${crest + 9}%`, duration: OPEN * 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 },
          at
        );

        // Folds darken as they bunch (peaks mid-way), then clear as they leave
        const peak = 0.12 + (1 - i / lead) * 0.4;
        tl.fromTo(el, { "--shade": shade0 }, { "--shade": peak, duration: OPEN * 0.5, ease: "power1.inOut" }, at);
        tl.to(el, { "--shade": shade0, duration: OPEN * 0.5, ease: "power1.inOut" }, at + OPEN * 0.5);
      });

      // Hero settles in while the curtains part
      if (bg.length > 0) {
        tl.to(bg, { scale: 1, duration: OPEN + 2, ease: "power2.out" }, START);
      }

      // Content arrives once the centre is clear
      tl.to(
        reveal,
        { opacity: 1, y: 0, duration: 1.3, stagger: 0.22, ease: "power3.out" },
        START + OPEN * 0.5
      );
    }, rootRef);

    return () => {
      ctx.revert(); // kills tweens, restores inline styles (hero returns to its natural CSS state)
      html.style.overflow = prevOverflow;
    };
  }, [done, count, replayKey]);

  // Click anywhere on the curtain to speed through the intro
  const skip = () => tlRef.current?.timeScale(5);

  return (
    <div ref={rootRef} className="relative">
      {children}

      {!done && (
        <div className="curtain-overlay" aria-hidden="true" onClick={skip}>
          <Panel side="left" folds={leftFolds} />
          <Panel side="right" folds={rightFolds} />
          <div className="curtain-seam" />
          <div className="curtain-vignette" />
        </div>
      )}
    </div>
  );
}
