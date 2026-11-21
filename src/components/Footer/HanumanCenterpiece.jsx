import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RAMA_CIRCLES } from './ramaChantData';

/**
 * HanumanCenterpiece
 * 
 * Sacred Centerpiece:
 * 1. Lord Hanuman seated in dhyana mudra upon the carved flat rock summit in #742C25.
 * 2. Full 360° complete rounded circles of the sacred word "ರಾಮ" (Rama) in Kannada script,
 *    forming a complete, unbroken circular halo with zero gaps (using textLength & lengthAdjust).
 * 3. 26px radial line spacing between each concentric circle with progressive font sizing
 *    (10.5px to 16.0px) and clean inter-word spacing.
 * 4. Interactive Ink Reveal on Mouse Hover:
 *    Sri Rama & Mata Sita (ramsita.png) are covered beneath the cream background and text.
 *    Hovering over the sacred chant opens an authentic organic ink reveal droplet that
 *    reveals Lord Rama & Sita only where the mouse is hovered.
 *    Moving the mouse elsewhere smoothly covers the previous space back with text.
 */
export default function HanumanCenterpiece() {
  const CX = 500;
  // Center of full circular Rama rings (centered with Lord Hanuman's upper body)
  const CY_CENTER = 310;

  // Interactive Ink Reveal State
  const [cursor, setCursor] = useState({ x: 500, y: 180, r: 0, op: 0 });
  const targetRef = useRef({ x: 500, y: 180, active: false });
  const animIdRef = useRef(0);
  const svgRef = useRef(null);

  // GSAP: Continuous alternating cycle wheel rotation of the 9 sacred Rama chant rings
  useEffect(() => {
    const ctx = gsap.context(() => {
      RAMA_CIRCLES.forEach((circle) => {
        const isClockwise = circle.id % 2 === 1;
        // First line moves to the right (Clockwise = +360)
        // Next line moves to the left (Counter-Clockwise = -360)
        // Alternating across all 9 rings
        const targetRotation = isClockwise ? 360 : -360;
        const dur = 15 + circle.id * 3;

        gsap.to(`#rama-ring-${circle.id}`, {
          rotation: targetRotation,
          svgOrigin: `${CX} ${CY_CENTER}`,
          repeat: -1,
          ease: 'none',
          duration: dur,
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [CX, CY_CENTER]);

  // Smooth animation loop for the organic ink reveal droplet
  useEffect(() => {
    const update = () => {
      const target = targetRef.current;
      setCursor((prev) => {
        const targetR = target.active ? 85 : 0;
        const targetOp = target.active ? 1 : 0;
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const dr = targetR - prev.r;
        const dop = targetOp - prev.op;

        // Skip re-render if fully settled and inactive
        if (!target.active && prev.r < 0.3 && prev.op < 0.01) {
          return prev.r === 0 ? prev : { ...prev, r: 0, op: 0 };
        }

        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
          r: prev.r + dr * 0.15,
          op: prev.op + dop * 0.15,
        };
      });
      animIdRef.current = requestAnimationFrame(update);
    };
    animIdRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animIdRef.current);
  }, []);

  // Track cursor position mapped to SVG viewBox coordinates (0 to 1000, -25 to 545)
  const handlePointerMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const x = Math.max(0, Math.min(1000, ((clientX - rect.left) / rect.width) * 1000));
    const y = -25 + ((clientY - rect.top) / rect.height) * 570;

    // Do NOT trigger or continue hover animation below rock boundaries (Y > 536)
    if (y > 536) {
      targetRef.current.active = false;
      return;
    }

    targetRef.current = {
      x,
      y: Math.max(-25, Math.min(536, y)),
      active: true,
    };
  };

  const handlePointerLeave = () => {
    targetRef.current.active = false;
  };

  return (
    <div
      className="w-full flex justify-center items-end select-none relative group touch-none cursor-pointer"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <svg
        ref={svgRef}
        viewBox="0 -25 1000 570"
        className="w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[600px] md:max-w-[760px] lg:max-w-[920px] xl:max-w-[1000px] h-auto block overflow-hidden"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Lord Hanuman seated upon the sacred rock surrounded by complete circular rounded Rama rings in Kannada with interactive ink reveal of Sri Rama and Sita on hover"
      >
        <defs>
          {/* Full Screen Width Clip Path with expanded bottom border for text & img (Y <= 536) */}
          {/* Borders of text and img made slightly more expansive while remaining safely within rock base (Y <= 536) */}
          <clipPath id="aboveRockBottomClip">
            <rect x="-500" y="-200" width="2000" height="736" />
          </clipPath>

          {/* Organic Ink Bleed Fractal Filter (Authentic torn noise edge) */}
          <filter id="inkBleedHover" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
              seed="42"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="24"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="1.5"
              result="feathered"
            />
          </filter>

          {/* Dynamic Interactive Ink Mask for Sri Rama & Sita */}
          <mask id="ramsitaInkMask">
            {/* Background is completely black = 100% hidden by default */}
            <rect x="-100" y="-100" width="1200" height="750" fill="#000000" />

            {/* Organic White Ink Droplet blooming only at cursor position */}
            {cursor.r > 0.5 && (
              <g filter="url(#inkBleedHover)" opacity={cursor.op}>
                {/* Main central ink drop */}
                <circle cx={cursor.x} cy={cursor.y} r={cursor.r} fill="#ffffff" />
                {/* Satellite ink bleed splatters */}
                <circle cx={cursor.x - cursor.r * 0.44} cy={cursor.y + cursor.r * 0.4} r={cursor.r * 0.38} fill="#ffffff" />
                <circle cx={cursor.x + cursor.r * 0.48} cy={cursor.y - cursor.r * 0.36} r={cursor.r * 0.32} fill="#ffffff" />
                <circle cx={cursor.x - cursor.r * 0.36} cy={cursor.y - cursor.r * 0.44} r={cursor.r * 0.28} fill="#ffffff" />
                <circle cx={cursor.x + cursor.r * 0.42} cy={cursor.y + cursor.r * 0.44} r={cursor.r * 0.3} fill="#ffffff" />
              </g>
            )}

            {/* Solid black block strictly below rock base (Y >= 538) so ink bleed never passes below */}
            <rect x="-500" y="538" width="2000" height="500" fill="#000000" />
          </mask>
        </defs>

        {/* ================================================================= */}
        {/* 1. SRI RAMA & MATA SITA BEHIND THE TEXT (INK REVEAL ON HOVER)     */}
        {/* Strictly clipped at Y <= 475: zero reveal ever passes below rock  */}
        {/* Pure ink reveal with zero glow                                    */}
        {/* ================================================================= */}
        <g id="ramsita-reveal-layer" clipPath="url(#aboveRockBottomClip)">
          {/* Sri Rama & Mata Sita Image (masked by organic ink reveal) */}
          <image
            href="/ramsita.png"
            x={CX - 215}
            y={28}
            width={430}
            height={490}
            preserveAspectRatio="xMidYMid meet"
            mask="url(#ramsitaInkMask)"
            className="select-none pointer-events-none"
          />
        </g>

        {/* ================================================================= */}
        {/* 2. FULL 360° CONCENTRIC "ರಾಮ" (RAMA) CIRCLES IN KANNADA          */}
        {/* Animated via GSAP in alternating opposite directions (Right / Left)*/}
        {/* Strictly clipped at Y <= 485: zero text ever passes below rock    */}
        {/* ================================================================= */}
        <g id="rama-circles-layer" clipPath="url(#aboveRockBottomClip)">
          {RAMA_CIRCLES.map((circle) => (
            <g
              id={`rama-ring-${circle.id}`}
              key={`circle-group-${circle.id}`}
            >
              {/* Circular Path colocated directly inside rotating group */}
              <path
                id={`rama-circle-${circle.id}`}
                d={`M ${CX} ${CY_CENTER - circle.r} A ${circle.r} ${circle.r} 0 1 1 ${CX} ${CY_CENTER + circle.r} A ${circle.r} ${circle.r} 0 1 1 ${CX} ${CY_CENTER - circle.r} Z`}
                fill="none"
              />
              <text
                className="fill-[#742C25] font-serif font-bold select-none tracking-normal pointer-events-none"
                style={{
                  fontSize: `${circle.fontSize}px`,
                  fontFamily: "'Noto Serif Kannada', 'Tiro Kannada', 'Georgia', serif",
                  wordSpacing: '0.42em',
                  letterSpacing: '0.02em',
                }}
              >
                <textPath
                  href={`#rama-circle-${circle.id}`}
                  startOffset="0%"
                  textLength={circle.circumference}
                  lengthAdjust="spacing"
                >
                  {circle.text}
                </textPath>
              </text>
            </g>
          ))}
        </g>

        {/* ================================================================= */}
        {/* 3. INTEGRATED FLAT ROCK TOP SUMMIT IN #742C25                     */}
        {/* Base at Y = 545 sits flush at the bottom edge to dock into footer */}
        {/* ================================================================= */}
        <g id="footer-rock-summit" className="pointer-events-none">
          {/* Solid #742C25 rock body covering background text behind it */}
          <path
            d="M 270 545 L 305 517 C 335 501, 365 485, 400 485 L 600 485 C 635 485, 665 501, 695 517 L 730 545 Z"
            fill="#742C25"
          />

          {/* Delicate golden accent along the rock's top flat ledge */}
          <path
            d="M 390 486 L 610 486"
            stroke="#C79A45"
            strokeWidth="1"
            strokeOpacity="0.35"
          />
        </g>

        {/* ================================================================= */}
        {/* 4. LORD HANUMAN SEATED DIRECTLY ON TOP OF THE ROCK                */}
        {/* Base rests cleanly upon the rock ledge at Y = 485-493             */}
        {/* ================================================================= */}
        <image
          href="/hanuman.png"
          x={CX - 130}
          y={233}
          width={260}
          height={260}
          preserveAspectRatio="xMidYMid meet"
          className="drop-shadow-lg pointer-events-none"
        />
      </svg>
    </div>
  );
}
