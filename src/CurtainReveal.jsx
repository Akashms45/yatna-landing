import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./curtain.css";

/**
 * <CurtainReveal> wraps your hero. Inside the hero, mark:
 *   data-reveal-bg  -> background image/element (slow settle-in zoom)
 *   data-reveal     -> heading, description, CTA wrapper... (staggered fade + rise, in DOM order)
 */

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

  // Support replaying whenever replayKey changes
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

      // Initial state: subtle hidden offset, stage background slightly scaled up
      gsap.set(reveal, { opacity: 0, y: 32 });
      if (bg.length > 0) {
        gsap.set(bg, { scale: 1.15, opacity: 0.8 });
      }

      // Responsive, brisk timing so hero reveals immediately as curtains open
      const START = 0.25; // beat before pulling
      const OPEN = 2.6;   // swift, graceful travel time per fold
      const LAG = 0.045;  // smooth ripple delay between neighbouring folds
      const lead = count - 1;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(reveal, { opacity: 1, y: 0, clearProps: "all" });
          if (bg.length > 0) {
            gsap.set(bg, { scale: 1, opacity: 1, clearProps: "all" });
          }
          setDone(true);
        },
      });
      tlRef.current = tl;

      // Center seam & vignette open up
      tl.to(q(".curtain-seam"), { opacity: 0, duration: 0.4, ease: "power1.out" }, START);
      tl.to(q(".curtain-vignette"), { opacity: 0, duration: OPEN * 0.8, ease: "power1.inOut" }, START);

      // Animate each silk fold off-screen
      strips.forEach((el) => {
        const i = Number(el.dataset.i);
        const left = Number(el.dataset.left);
        const width = Number(el.dataset.width) * OVERLAP;
        const crest = Number(el.dataset.crest);
        const shade0 = Number(el.dataset.shade);
        const skew = Number(el.dataset.skew);

        // Leading edge (nearest center) pulled first
        const at = START + (lead - i) * LAG;

        // Travel off-screen
        const xPercent = -((left + width + 8) / width) * 100;
        tl.to(el, { xPercent, duration: OPEN, ease: "power2.inOut" }, at);

        // Hem lag & silk sway
        tl.to(el, { skewX: skew, duration: OPEN * 0.42, ease: "sine.inOut", yoyo: true, repeat: 1 }, at);

        // Silk shimmer highlight travels across the cloth
        tl.fromTo(
          el,
          { "--crest": `${crest}%` },
          { "--crest": `${crest + 18}%`, duration: OPEN * 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 },
          at
        );

        // Folds darken as they bunch up
        const peak = 0.12 + (1 - i / lead) * 0.35;
        tl.fromTo(el, { "--shade": shade0 }, { "--shade": peak, duration: OPEN * 0.5, ease: "power1.inOut" }, at);
        tl.to(el, { "--shade": shade0, duration: OPEN * 0.5, ease: "power1.inOut" }, at + OPEN * 0.5);
      });

      // Background stage zooms smoothly into position
      if (bg.length > 0) {
        tl.to(bg, { scale: 1, opacity: 1, duration: OPEN + 0.6, ease: "power2.out" }, START);
      }

      // Hero content arrives promptly as the center opens (at ~0.8s)
      tl.to(
        reveal,
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
        START + OPEN * 0.22
      );

      // Fade out overlay as curtains exit the screen
      const totalTime = START + OPEN + lead * LAG;
      tl.to(q(".curtain-overlay"), { opacity: 0, duration: 0.5, ease: "power1.out" }, totalTime - 0.4);
    }, rootRef);

    return () => {
      ctx.revert();
      html.style.overflow = prevOverflow;
    };
  }, [done, count, replayKey]);

  // Click anywhere on curtain to immediately finish
  const skip = () => {
    if (tlRef.current) {
      tlRef.current.progress(1);
    } else {
      setDone(true);
    }
  };

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
