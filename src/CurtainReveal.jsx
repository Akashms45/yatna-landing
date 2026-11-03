import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./curtain.css";

/**
 * <CurtainReveal> wraps your hero. Inside the hero, mark:
 *   data-reveal-bg  -> the background image/element (slow settle-in zoom)
 *   data-reveal     -> heading, description, CTA wrapper... (staggered fade + rise, in DOM order)
 */

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

export default function CurtainReveal({ children, replayKey = 0 }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const [done, setDone] = useState(false);
  const [count] = useState(pleatCount);

  // If replayKey changes, re-trigger curtain intro
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
    html.style.overflow = "hidden"; // prevent scrolling while curtains are active

    const ctx = gsap.context(() => {
      const reveal = q("[data-reveal]");
      const bg = q("[data-reveal-bg]");
      const strips = q(".curtain-strip");

      // Set initial hidden positions for revealed elements
      gsap.set(reveal, { opacity: 0, y: 36 });
      if (bg.length > 0) {
        gsap.set(bg, { scale: 1.15, opacity: 0.3 });
      }

      const START = 0.35; // brief stillness before opening
      const OPEN = 3.2;   // velvet parting travel time
      const LAG = 0.055;  // wave delay between pleats
      const lead = count - 1;

      const tl = gsap.timeline({
        onComplete: () => {
          // Ensure all hero elements are fully visible and clear inline GSAP overrides
          gsap.set(reveal, { opacity: 1, y: 0, clearProps: "opacity,transform" });
          if (bg.length > 0) {
            gsap.set(bg, { scale: 1, opacity: 1, clearProps: "transform" });
          }
          setDone(true);
        },
      });
      tlRef.current = tl;

      // Part the center seam
      tl.to(q(".curtain-seam"), { opacity: 0, duration: 0.5, ease: "power1.out" }, START);

      // Animate each velvet pleat
      strips.forEach((el) => {
        const i = Number(el.dataset.i);
        const shade0 = Number(el.dataset.shade);
        const shade1 = 0.1 + (1 - i / lead) * 0.45;
        const at = START + (lead - i) * LAG;
        const xPercent = -((i * (1 - GATHERED)) / OVERLAP) * 100;

        tl.to(el, { xPercent, duration: OPEN, ease: "power2.inOut" }, at);
        tl.to(el, { skewX: 2.2, duration: OPEN * 0.45, ease: "sine.inOut", yoyo: true, repeat: 1 }, at);
        tl.fromTo(el, { "--shade": shade0 }, { "--shade": shade1, duration: OPEN, ease: "power1.inOut" }, at);
      });

      // Background hero zooms and settles smoothly
      if (bg.length > 0) {
        tl.to(bg, { scale: 1, opacity: 1, duration: OPEN + 1, ease: "power2.out" }, START);
      }

      // Hero content rises and reveals as stage opens
      tl.to(
        reveal,
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: "power3.out" },
        START + OPEN * 0.32
      );

      // Fade out overlay gently
      const end = START + OPEN + lead * LAG;
      tl.to(q(".curtain-overlay"), { opacity: 0, duration: 0.8, ease: "power1.out" }, end - 0.25);
    }, rootRef);

    return () => {
      ctx.revert();
      html.style.overflow = prevOverflow;
    };
  }, [done, count, replayKey]);

  // Click anywhere on curtains to fast-forward
  const skip = () => {
    if (tlRef.current) {
      tlRef.current.timeScale(6);
    }
  };

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
          <div className="curtain-skip-hint">Click anywhere to skip</div>
        </div>
      )}
    </div>
  );
}
