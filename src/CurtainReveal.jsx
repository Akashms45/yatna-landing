import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./curtain.css";

/**
 * <CurtainReveal> wraps your hero. Inside the hero, mark:
 *   data-reveal-bg  -> the background image/element (slow settle-in zoom)
 *   data-reveal     -> heading, description, CTA wrapper... (staggered fade + rise, in DOM order)
 */

// Survives route remounts so the intro only ever plays once per page load.
let hasPlayed = false;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Deterministic pseudo-random (no SSR/hydration mismatch, stable between renders)
const rand = (i, salt) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const pleatCount = () => {
  if (typeof window === "undefined") return 12;
  const w = window.innerWidth;
  return w < 640 ? 7 : w < 1024 ? 9 : 12;
};

const OVERLAP = 1.3; // each pleat is 30% wider than its slot, so neighbours overlap (no gaps)
const GATHERED = 0.15; // how tightly the cloth bunches at the edge (lower = tighter)

function Panel({ side, count }) {
  const w = 100 / count;
  return (
    <div className={`curtain-panel curtain-panel--${side}`}>
      {Array.from({ length: count }, (_, i) => {
        const shade0 = 0.02 + rand(i, side === "left" ? 1 : 2) * 0.14;
        return (
          <div
            key={i}
            className="curtain-strip"
            data-i={i}
            data-shade={shade0.toFixed(3)}
            style={{
              left: `${i * w}%`,
              width: `${w * OVERLAP}%`,
              zIndex: i + 1, // pleats nearest the centre sit on top
              "--shade": shade0.toFixed(3),
            }}
          />
        );
      })}
    </div>
  );
}

export default function CurtainReveal({ children }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const [done, setDone] = useState(() => hasPlayed || prefersReducedMotion());
  const [count] = useState(pleatCount);

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

      // Hidden before first paint (layout effect), so the hero never flashes.
      gsap.set(reveal, { opacity: 0, y: 46 });
      gsap.set(bg, { scale: 1.14 });

      const START = 0.8; // beat of stillness before the pull
      const OPEN = 4.8; // per-pleat travel time
      const LAG = 0.07; // delay between neighbouring pleats (the "pull" travelling through cloth)
      const lead = count - 1;

      const tl = gsap.timeline({
        onComplete: () => {
          hasPlayed = true;
          setDone(true);
        },
      });
      tlRef.current = tl;

      tl.to(q(".curtain-seam"), { opacity: 0, duration: 0.7, ease: "power1.out" }, START);

      strips.forEach((el) => {
        const i = Number(el.dataset.i);
        const shade0 = Number(el.dataset.shade);
        // pleats deeper in the pile (low i) end up in heavier shadow
        const shade1 = 0.1 + (1 - i / lead) * 0.45;
        // Leading edge (highest i) is pulled first; the rest follow.
        const at = START + (lead - i) * LAG;
        // Slot offset -> gathered offset, expressed in % of the pleat's own width (responsive)
        const xPercent = -((i * (1 - GATHERED)) / OVERLAP) * 100;

        tl.to(el, { xPercent, duration: OPEN, ease: "power2.inOut" }, at);
        // Hem drags behind the rail: a gentle skew that swells and settles
        tl.to(el, { skewX: 2.4, duration: OPEN * 0.45, ease: "sine.inOut", yoyo: true, repeat: 1 }, at);
        // Folds deepen as the cloth bunches up
        tl.fromTo(el, { "--shade": shade0 }, { "--shade": shade1, duration: OPEN, ease: "power1.inOut" }, at);
      });

      // Hero settles in while the curtains part
      tl.to(bg, { scale: 1, duration: OPEN + 2, ease: "power2.out" }, START);

      // Content arrives once the stage is about half open
      tl.to(
        reveal,
        { opacity: 1, y: 0, duration: 1.3, stagger: 0.22, ease: "power3.out" },
        START + OPEN * 0.55
      );

      // Fade the gathered drapes away so they never block the hero
      const end = START + OPEN + lead * LAG;
      tl.to(q(".curtain-overlay"), { opacity: 0, duration: 1, ease: "power1.out" }, end - 0.2);
    }, rootRef);

    return () => {
      ctx.revert(); // kills tweens, restores inline styles (hero returns to its natural CSS state)
      html.style.overflow = prevOverflow;
    };
  }, [done, count]);

  // Click anywhere on the curtain to speed through the intro
  const skip = () => tlRef.current?.timeScale(5);

  return (
    <div ref={rootRef} className="relative">
      {children}

      {!done && (
        <div className="curtain-overlay" aria-hidden="true" onClick={skip}>
          <Panel side="left" count={count} />
          <Panel side="right" count={count} />
          <div className="curtain-seam" />
          <div className="curtain-vignette" />
          <div className="curtain-valance" />
        </div>
      )}
    </div>
  );
}
