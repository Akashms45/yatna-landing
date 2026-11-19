import React from 'react';
import { HANUMAN_CHALISA_ARCS } from './hanumanChalisaData';

/**
 * HanumanCenterpiece
 * 
 * Sacred Centerpiece:
 * 1. Lord Hanuman seated directly on top of the footer top rock design (base at Y = 460).
 * 2. Flat rock plateau summit sculpted in #742C25 to fuse seamlessly with the footer silhouette.
 * 3. Hanuman Chalisa curves start from the 50% half-top level of the image (Y = 330)
 *    and wrap closely and roundly (210° sweep) around Lord Hanuman's head and shoulders.
 * 4. Generous 22px radial spacing between each concentric line.
 * 5. Bigger font in all lines (11.5px up to 18.7px) with distinct word spacing.
 * 6. Every line flows consistently from Left to Right (Left -> Right).
 */
export default function HanumanCenterpiece() {
  const CX = 500;
  // 50% half-top level of the Hanuman image (Hanuman sits Y: 200 to 460; mid-torso is at Y = 330)
  const CY_HALO = 330;

  // Deep rounded horseshoe angle: 195 deg to -15 deg (210 deg sweep)
  const COS_START = -0.965926; // cos(195 deg)
  const SIN_START = -0.258819; // sin(195 deg)
  const COS_END = 0.965926;    // cos(-15 deg)
  const SIN_END = -0.258819;   // sin(-15 deg)

  return (
    <div className="w-full flex justify-center items-end pointer-events-none select-none">
      <svg
        viewBox="0 -35 1000 520"
        className="w-full max-w-[440px] sm:max-w-[600px] md:max-w-[760px] lg:max-w-[920px] xl:max-w-[1000px] h-auto block overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Lord Hanuman seated upon the footer rock design surrounded by the sacred Hanuman Chalisa in close rounded concentric arcs"
      >
        <defs>
          {/* Subtle Divine Golden Aura Glow behind Lord Hanuman */}
          <radialGradient id="hanuman-halo-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C79A45" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#C79A45" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C79A45" stopOpacity="0" />
          </radialGradient>

          {/* 10 Left-to-Right Rounded Arc Paths with 22px spacing */}
          {HANUMAN_CHALISA_ARCS.map((arc) => {
            const r = arc.r;
            const x1 = (CX + r * COS_START).toFixed(1);
            const y1 = (CY_HALO - r * SIN_START).toFixed(1);
            const x2 = (CX + r * COS_END).toFixed(1);
            const y2 = (CY_HALO - r * SIN_END).toFixed(1);

            return (
              <path
                key={arc.id}
                id={`chalisa-path-${arc.id}`}
                d={`M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`}
                fill="none"
              />
            );
          })}
        </defs>

        {/* Delicate Golden Concentric Guideline Rings (with clear 22px spacing between lines) */}
        {HANUMAN_CHALISA_ARCS.map((arc) => {
          const r = arc.r;
          const x1 = (CX + r * COS_START).toFixed(1);
          const y1 = (CY_HALO - r * SIN_START).toFixed(1);
          const x2 = (CX + r * COS_END).toFixed(1);
          const y2 = (CY_HALO - r * SIN_END).toFixed(1);

          return (
            <path
              key={`ring-${arc.id}`}
              d={`M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`}
              fill="none"
              stroke="#C79A45"
              strokeWidth="0.75"
              strokeOpacity="0.25"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Soft Golden Aura Glow behind Lord Hanuman's head and chest */}
        <circle
          cx={CX}
          cy={313}
          r={125}
          fill="url(#hanuman-halo-glow)"
        />

        {/* 10 Concentric Hanuman Chalisa Text Arcs in Kannada */}
        {/* Originates from 50% level, bigger font sizes, generous word-spacing and 22px line gap */}
        {HANUMAN_CHALISA_ARCS.map((arc) => (
          <text
            key={`text-${arc.id}`}
            className="fill-[#742C25] font-serif font-bold select-none tracking-normal"
            style={{
              fontSize: `${arc.fontSize}px`,
              fontFamily: "'Noto Serif Kannada', 'Tiro Kannada', 'Georgia', serif",
              wordSpacing: '0.28em',
              letterSpacing: '0.025em',
            }}
          >
            <textPath
              href={`#chalisa-path-${arc.id}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {arc.text}
            </textPath>
          </text>
        ))}

        {/* ================================================================= */}
        {/* INTEGRATED FLAT ROCK TOP SUMMIT IN #742C25                        */}
        {/* Flat rock ledge at Y = 460 where Hanuman's seated base rests      */}
        {/* ================================================================= */}
        <g id="footer-rock-summit">
          {/* Solid #742C25 rock body that merges seamlessly into the footer */}
          <path
            d="M 270 520 L 305 492 C 335 476, 365 460, 400 460 L 600 460 C 635 460, 665 476, 695 492 L 730 520 Z"
            fill="#742C25"
          />

          {/* Delicate golden accent along the rock's top flat ledge */}
          <path
            d="M 390 461 L 610 461"
            stroke="#C79A45"
            strokeWidth="1"
            strokeOpacity="0.35"
          />
        </g>

        {/* ================================================================= */}
        {/* LORD HANUMAN SEATED FIRMLY ON TOP OF THE FOOTER ROCK SUMMIT       */}
        {/* Base settles naturally upon the rock ledge (y moved slightly down) */}
        {/* ================================================================= */}
        <image
          href="/hanuman.png"
          x={CX - 130}
          y={208}
          width={260}
          height={260}
          preserveAspectRatio="xMidYMid meet"
          className="drop-shadow-lg"
        />
      </svg>
    </div>
  );
}
