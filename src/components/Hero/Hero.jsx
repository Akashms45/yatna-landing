import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOGO_PATH } from '../../assets/logoData';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Three clean languages for instant single-click cycling (no dropdown, no border, no bg)
const LANGUAGES = ['ಕನ್ನಡ', 'English', 'हिन्दी'];

// WebGL2 Shaders for authentic noise-dissolve ink reveal
const VERTEX_SRC = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_progress;
uniform float u_scale;
uniform float u_soft;
uniform float u_bias;
uniform float u_seed;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21) + u_seed);
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    norm += amp;
    p *= 2.03;
    amp *= 0.5;
  }
  return sum / norm;
}

void main() {
  float m = min(u_resolution.x, u_resolution.y);
  vec2 p = (v_uv * u_resolution) / m;
  float n = fbm(p * u_scale);
  n = smoothstep(0.28, 0.72, n);
  vec2 d2 = (v_uv - 0.5) * vec2(max(u_resolution.x / max(u_resolution.y, 1.0), 1.0),
                                max(u_resolution.y / max(u_resolution.x, 1.0), 1.0));
  float d = clamp(length(d2) * 1.41421, 0.0, 1.0);
  float t = mix(-u_soft - 0.02, 1.0 + u_soft + 0.02, u_progress);
  float thr = t * (1.0 + u_bias) - u_bias * d;
  float alpha = smoothstep(thr - u_soft, thr + u_soft, n);
  float a = clamp(alpha, 0.0, 1.0);
  fragColor = vec4(u_color * a, a);
}`;

export default function Hero({ langIndex = 0, setLangIndex }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const glProgressRef = useRef(0);

  // Logo element refs
  const logoWrapperRef = useRef(null);
  const logoGroupRef = useRef(null);
  const emblemPathRef = useRef(null);

  // Navbar element refs
  const appNameRef = useRef(null);
  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  const langTextRef = useRef(null);

  // State: active nav item and internal fallback language index
  const [activeNav, setActiveNav] = useState('Home');
  const [internalLang, setInternalLang] = useState(langIndex);

  // Current active language (prefer parent prop if provided)
  const currentLang = setLangIndex !== undefined ? langIndex : internalLang;

  // Single click cycles cleanly through the 3 languages
  const cycleLanguage = () => {
    const next = (currentLang + 1) % LANGUAGES.length;
    if (setLangIndex) {
      setLangIndex(next);
    } else {
      setInternalLang(next);
    }
  };

  // Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll directly to the About section
  const scrollToAbout = () => {
    setActiveNav('About');
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll directly to the Poojas section
  const scrollToPoojas = () => {
    setActiveNav('Poojas');
    const poojasEl = document.getElementById('poojas');
    if (poojasEl) {
      poojasEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to Poorna Phala
  const scrollToPoornaphala = () => {
    setActiveNav('Poornaphala');
    const poornaphalaEl = document.getElementById('poornaphala');
    if (poornaphalaEl) {
      poornaphalaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. WebGL2 Noise Dissolve Reveal Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const posAttr = gl.getAttribLocation(prog, 'a_position');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const u = (n) => gl.getUniformLocation(prog, n);
    const loc = {
      res: u('u_resolution'),
      color: u('u_color'),
      progress: u('u_progress'),
      scale: u('u_scale'),
      soft: u('u_soft'),
      bias: u('u_bias'),
      seed: u('u_seed'),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const clientW = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      const clientH = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
      const w = Math.max(1, Math.round(clientW * dpr));
      const h = Math.max(1, Math.round(clientH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Warm cream #F7F0E3 normalized to 0..1
    const r = 0xf7 / 255;
    const g = 0xf0 / 255;
    const b = 0xe3 / 255;
    const seed = 42.0;

    const rafRef = { current: 0 };
    const isMounted = { current: true };

    const render = () => {
      if (!isMounted.current) return;

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform3f(loc.color, r, g, b);
      gl.uniform1f(loc.progress, glProgressRef.current);
      gl.uniform1f(loc.scale, 5.5);
      gl.uniform1f(loc.soft, 0.035);
      gl.uniform1f(loc.bias, 0.22);
      gl.uniform1f(loc.seed, seed);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      isMounted.current = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  // 2. GSAP Scroll Animation
  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate responsive vertical travel distance from center (H/2) to top navbar center (40px)
      const computeDistance = () => {
        const h = window.innerHeight;
        return -(h / 2 - 40);
      };

      let travelY = computeDistance();

      // Master Scroll-Driven Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            travelY = computeDistance();
          },
        },
      });

      // -----------------------------------------------------------------
      // PHASE 1: Logo moves to top & rotates full one round (360deg)
      // Progress 0.0 -> 0.40
      // -----------------------------------------------------------------

      // 1. Logo travels from screen center up to the top center navbar
      tl.to(
        logoWrapperRef.current,
        {
          y: () => travelY,
          scale: 0.38, // Visible and prominent size on top (~160px wide)
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.0
      );

      // 2. Logo rotates full one round (360 degrees) ending up in same straight orientation
      tl.to(
        logoGroupRef.current,
        {
          rotation: 360,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.0
      );

      // -----------------------------------------------------------------
      // PHASE 2: ONCE placed at top, hero reveal begins
      // Progress 0.40 -> 0.85
      // -----------------------------------------------------------------

      // 3. WebGL FBM Ink Dissolve sweeps smoothly from 0 to 1 on scroll down, and reverses on scroll back
      const inkProgress = { val: 0 };
      tl.to(
        inkProgress,
        {
          val: 1,
          duration: 0.45,
          ease: 'power1.inOut',
          onUpdate: () => {
            glProgressRef.current = inkProgress.val;
          },
        },
        0.40
      );

      // 4. Logo shifts color from Brick Red (#9E3D2F) to Muted Gold (#C79A45)
      tl.to(
        emblemPathRef.current,
        {
          fill: '#C79A45',
          duration: 0.3,
          ease: 'power1.inOut',
        },
        0.45
      );

      // 4. Left Navbar Items (Home, About) slide out from docked logo toward the left
      tl.fromTo(
        leftNavRef.current,
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: 'power3.out',
        },
        0.48
      );

      // 5. Right Navbar Items (Poojas, Poornaphala) slide out from docked logo toward the right
      tl.fromTo(
        rightNavRef.current,
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: 'power3.out',
        },
        0.48
      );

      // 6. Top-left App Name ("ಯತ್ನ" in Kannada) fades in
      tl.fromTo(
        appNameRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.52
      );

      // 7. Top-right Language text fades in
      tl.fromTo(
        langTextRef.current,
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.52
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[270vh] bg-[#742C25]"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden select-none"
      >
        {/* ============================================================ */}
        {/* LAYER 1: Deep Brick Red (#742C25) Underneath                 */}
        {/* ============================================================ */}
        <div className="absolute inset-0 bg-[#742C25] z-0 pointer-events-none" />

        {/* ============================================================ */}
        {/* LAYER 2: WebGL Noise Dissolve Veil in Warm Cream (#F7F0E3)   */}
        {/* Starts 100% solid, dissolves via WebGL FBM noise threshold   */}
        {/* ============================================================ */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 block"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            maxWidth: 'none',
            display: 'block',
          }}
        />

        {/* ============================================================ */}
        {/* TOP NAVBAR CONTAINER (Fixed Header Structure)                */}
        {/* ============================================================ */}
        <header className="relative w-full z-40 h-20 px-6 sm:px-10 lg:px-14 flex items-center justify-between pointer-events-none">
          {/* Left Corner: App Name "ಯತ್ನ" / "Yatna" / "यत्न" based on active language */}
          <div
            ref={appNameRef}
            onClick={scrollToTop}
            className="flex items-center opacity-0 pointer-events-auto cursor-pointer z-10"
          >
            <span className="font-logo text-2xl sm:text-3xl font-bold tracking-wider text-[#FFF9EE] drop-shadow-sm hover:text-[#C79A45] transition-colors">
              {['ಯತ್ನ', 'Yatna', 'यत्न'][currentLang] || 'ಯತ್ನ'}
            </span>
          </div>

          {/* Symmetrical Centered Navigation System */}
          {/* Left Wing and Right Wing have identical flex:1 so the center logo is mathematically at 50% */}
          {/* Equal gap on both sides: Distance(About, Logo) == Distance(Logo, Poojas) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 sm:px-10 lg:px-14">
            {/* Left Wing (Home, About) - flex-1, right-aligned with symmetric padding */}
            <nav
              ref={leftNavRef}
              className="flex-1 flex items-center justify-end gap-6 sm:gap-8 md:gap-10 opacity-0 pointer-events-auto pr-8 sm:pr-12 md:pr-14"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveNav('Home');
                  scrollToTop();
                }}
                className={`text-xs sm:text-sm font-serif tracking-wider transition-all duration-200 cursor-pointer ${
                  activeNav === 'Home'
                    ? 'text-[#C79A45] font-semibold'
                    : 'text-[#FFF9EE]/85 hover:text-[#FFF9EE]'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={scrollToAbout}
                className={`text-xs sm:text-sm font-serif tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeNav === 'About'
                    ? 'text-[#C79A45] font-semibold'
                    : 'text-[#FFF9EE]/85 hover:text-[#FFF9EE]'
                }`}
              >
                About
              </button>
            </nav>

            {/* Center Logo Slot: Dead center of header at 50%, with equal spacing on both sides */}
            <div
              className="w-40 sm:w-44 md:w-48 h-10 flex items-center justify-center flex-shrink-0 cursor-pointer pointer-events-auto"
              onClick={scrollToTop}
              title="Return to top"
            />

            {/* Right Wing (Poojas, Poornaphala) - flex-1, left-aligned with symmetric padding */}
            <nav
              ref={rightNavRef}
              className="flex-1 flex items-center justify-start gap-6 sm:gap-8 md:gap-10 opacity-0 pointer-events-auto pl-8 sm:pl-12 md:pl-14"
            >
              <button
                type="button"
                onClick={scrollToPoojas}
                className={`text-xs sm:text-sm font-serif tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeNav === 'Poojas'
                    ? 'text-[#C79A45] font-semibold'
                    : 'text-[#FFF9EE]/85 hover:text-[#FFF9EE]'
                }`}
              >
                Poojas
              </button>
              <button
                type="button"
                onClick={scrollToPoornaphala}
                className={`text-xs sm:text-sm font-serif tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeNav === 'Poornaphala'
                    ? 'text-[#C79A45] font-semibold'
                    : 'text-[#FFF9EE]/85 hover:text-[#FFF9EE]'
                }`}
              >
                Poornaphala
              </button>
            </nav>
          </div>

          {/* Right Corner: Smaller Language Switcher (No dropdown, no border, no bg) */}
          <div
            ref={langTextRef}
            className="flex items-center opacity-0 pointer-events-auto z-10"
          >
            <button
              type="button"
              onClick={cycleLanguage}
              title="Click to change language"
              className="font-serif text-xs sm:text-sm text-[#FFF9EE] hover:text-[#C79A45] transition-colors cursor-pointer select-none bg-transparent border-0 p-0 tracking-wide font-medium"
            >
              {LANGUAGES[currentLang]}
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* CENTER SCROLL-DRIVEN LOGO                                    */}
        {/* - Starts straight (0deg) at screen center                    */}
        {/* - On scroll: rotates full one round (360deg) into top center */}
        {/* - Docked size is larger (~160px) and clearly visible         */}
        {/* - Symmetrical equal gap to About and Poojas                  */}
        {/* - Color shifts to gold once placed                           */}
        {/* ============================================================ */}
        <div
          data-reveal
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        >
          <div
            ref={logoWrapperRef}
            className="w-[380px] sm:w-[420px] h-[85px] sm:h-[95px] flex items-center justify-center origin-center pointer-events-auto cursor-pointer"
            onClick={scrollToTop}
          >
            <div
              ref={logoGroupRef}
              className="w-full h-full flex items-center justify-center origin-center"
            >
              <svg
                viewBox="320 160 1410 320"
                className="w-full h-full overflow-visible"
              >
                <path
                  ref={emblemPathRef}
                  d={LOGO_PATH}
                  fill="#9E3D2F"
                  className="transition-colors duration-300"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* HERO SECTION BODY: FULL PLAIN, NOTHING ELSE!                */}
        {/* Pure single-color plane per user instruction                */}
        {/* ============================================================ */}
      </div>
    </section>
  );
}
