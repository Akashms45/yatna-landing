import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// YATNA APP SHOWCASE (Multilingual: Kannada: 0, English: 1, Hindi: 2)
// Perfectly centered arrows vertically between heading and description:
// - Left Side: Arrow at the point END (right), centered between heading & desc
// - Right Side: Arrow at the point STARTING (left), centered between heading & desc
// - Description text color: Darker rich charcoal-brown (#30251F)
// -----------------------------------------------------------------------------
const APP_CONTENT = {
  names: ['ಯತ್ನ', 'Yatna', 'यत्न'],
  subtitles: [
    'ನಿಮ್ಮ ನಿತ್ಯ ಪೂರ್ಣಫಲ ಸಾಧನೆಯನ್ನು ಸರಳಗೊಳಿಸುವ ಡಿಜಿಟಲ್ ಸಂಗಾತಿ.',
    'Your digital companion to complete the sacred 16-day Poornaphala vow with ease.',
    'आपकी 16 दिवसीय पावन पूर्णफल साधना को सरल बनाने वाला डिजिटल साथी।',
  ],

  leftFeatures: [
    {
      id: 'sadhana',
      title: ['ಪೂರ್ಣ ಫಲ ಸಾಧನೆ', 'Poorna Phala Sadhana', 'पूर्ण फल साधना'],
      desc: [
        '೧೬ ದಿನಗಳ ದೀಕ್ಷಾ ದಿನಚರಿ & ಪ್ರಗತಿ ಟ್ರ್ಯಾಕರ್.',
        'Track your daily spiritual journey.',
        '16 दिवसीय संकल्प साधना एवं दैनिक प्रगति ट्रैकर।',
      ],
      // Indented inward toward the top of the mockup
      posClass: 'lg:translate-x-3 xl:translate-x-5',
    },
    {
      id: 'poojas',
      title: ['ಪೂಜೆಗಳು & ಸೇವೆಗಳು', 'Poojas & Sevas', 'पूजा एवं सेवाएँ'],
      desc: [
        'ದೇವಸ್ಥಾನದ ಸಮಸ್ತ ಸೇವೆಗಳು & ಧಾರ್ಮಿಕ ವಿಧಿಗಳು.',
        'Explore devotional services and rituals.',
        'मंदिर की समस्त पूजा सेवाएँ एवं धार्मिक अनुष्ठान।',
      ],
      // Pushed far outward to the left (matching the reference doodle scatter)
      posClass: 'lg:-translate-x-10 xl:-translate-x-14',
    },
    {
      id: 'temple',
      title: ['ದೇವಾಲಯದ ವಿವರ', 'Temple Information', 'मंदिर की जानकारी'],
      desc: [
        'ದರ್ಶನ, ಅಭಿಷೇಕ & ಪ್ರಸಾದದ ನಿಖರ ಸಮಯ.',
        'Everything about the temple in one place.',
        'दर्शन, अभिषेक एवं महाप्रसाद का सम्पूर्ण समय।',
      ],
      // Indented inward toward the narrower base of the phone
      posClass: 'lg:translate-x-4 xl:translate-x-6',
    },
  ],

  rightFeatures: [
    {
      id: 'counter',
      title: ['ಮಂತ್ರ ಕೌಂಟರ್', 'Mantra Counter', 'मंत्र काउंटर'],
      desc: [
        '೧೦೮ ಜಪ ಎಣಿಕೆ & ಡಿಜಿಟಲ್ ಜಪಮಾಲೆ.',
        'Count and track your mantra repetitions.',
        '108 जप गणना एवं डिजिटल जपमाला।',
      ],
      // Indented inward toward the top-right of the mockup (mirrors Left 1)
      posClass: 'lg:-translate-x-3 xl:-translate-x-5',
    },
    {
      id: 'library',
      title: ['ಮಂತ್ರ ಸಂಗ್ರಹ', 'Mantra Library', 'मंत्र संग्रह'],
      desc: [
        'ಕಾರ್ಯ ಸಿದ್ಧಿ ಮಂತ್ರ, ಸ್ತೋತ್ರ & ಚಾಲೀಸಾ.',
        'Access prayers, mantras, and stotras.',
        'कार्य सिद्धि मंत्र, स्तोत्र एवं पावन चालीसा।',
      ],
      // Pushed far outward to the right with expansive open space for both the point and the arrow
      posClass: 'lg:translate-x-32 xl:translate-x-44 lg:pl-8 xl:pl-12',
    },
    {
      id: 'audio',
      title: ['ಭಕ್ತಿ ಆಡಿಯೋ', 'Devotional Audio', 'भक्ति ऑडियो'],
      desc: [
        'ಶಾಂತಿಯುತ ಹನುಮಾನ್ ಜಪ & ಪವಿತ್ರ ನಾದ.',
        'Listen to peaceful devotional chants.',
        'शांतिदायक पावन हनुमान जाप एवं भक्ति स्वर।',
      ],
      // Indented inward toward the narrower base of the phone (mirrors Left 3)
      posClass: 'lg:-translate-x-4 xl:-translate-x-6',
    },
  ],
};

// -----------------------------------------------------------------------------
// HAND-DRAWN LINE ARROWS
// - Left: Originates at the END of the point, points right toward mockup
// - Right: Originates at the STARTING of the point, points left toward mockup
// -----------------------------------------------------------------------------

// Left 1: Arches down-right directly toward the floating Sadhana Calendar card
function ArrowLeftTop() {
  return (
    <svg
      viewBox="0 0 78 32"
      className="w-14 sm:w-16 md:w-18 h-5 sm:h-6 text-[#742C25] pointer-events-none select-none drop-shadow-xs"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="4" cy="10" r="2" fill="currentColor" />
      <path d="M 4 10 C 26 4, 48 8, 70 24" />
      <path d="M 58 24 L 70 24 L 66 14" />
    </svg>
  );
}

// Left 2: Playful loop arrow shooting right directly toward center services
function ArrowLeftMid() {
  return (
    <svg
      viewBox="0 0 82 32"
      className="w-14 sm:w-16 md:w-18 h-5 sm:h-6 text-[#742C25] pointer-events-none select-none drop-shadow-xs"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="4" cy="24" r="2" fill="currentColor" />
      <path d="M 4 24 C 18 24, 24 6, 36 10 C 46 14, 38 26, 28 20 C 22 16, 38 12, 72 16" />
      <path d="M 62 11 L 72 16 L 63 22" />
    </svg>
  );
}

// Left 3: Sweeping curve up-right directly toward Today's Temple Timings
function ArrowLeftBottom() {
  return (
    <svg
      viewBox="0 0 78 30"
      className="w-14 sm:w-16 md:w-18 h-5 sm:h-6 text-[#742C25] pointer-events-none select-none drop-shadow-xs"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="4" cy="22" r="2" fill="currentColor" />
      <path d="M 4 22 Q 36 32, 70 8" />
      <path d="M 58 9 L 70 8 L 65 19" />
    </svg>
  );
}

// Right 1: Arching loop down-left directly into floating Mantra Counter card
function ArrowRightTop() {
  return (
    <svg
      viewBox="0 0 82 32"
      className="w-14 sm:w-16 md:w-18 h-5 sm:h-6 text-[#742C25] pointer-events-none select-none drop-shadow-xs"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="76" cy="24" r="2" fill="currentColor" />
      <path d="M 76 24 C 62 24, 56 6, 44 10 C 34 14, 42 26, 52 20 C 58 16, 42 12, 8 16" />
      <path d="M 18 11 L 8 16 L 17 22" />
    </svg>
  );
}

// Right 2: Hook curve shooting left directly into central Mantra Library banner
function ArrowRightMid() {
  return (
    <svg
      viewBox="0 0 90 30"
      className="w-16 sm:w-20 md:w-22 h-5 sm:h-6 text-[#742C25] pointer-events-none select-none drop-shadow-xs"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="84" cy="22" r="2" fill="currentColor" />
      <path d="M 84 22 C 60 22, 42 8, 8 12" />
      <path d="M 18 6 L 8 12 L 17 19" />
    </svg>
  );
}

// Right 3: Sweeping curve up-left directly toward Devotional Audio player
function ArrowRightBottom() {
  return (
    <svg
      viewBox="0 0 78 30"
      className="w-14 sm:w-16 md:w-18 h-5 sm:h-6 text-[#742C25] pointer-events-none select-none drop-shadow-xs"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="72" cy="22" r="2" fill="currentColor" />
      <path d="M 72 22 Q 40 32, 8 8" />
      <path d="M 19 9 L 8 8 L 13 19" />
    </svg>
  );
}

export default function YatnaApp({ langIndex = 0 }) {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const centerImgRef = useRef(null);
  const rightColRef = useRef(null);

  const title = APP_CONTENT.names[langIndex] || APP_CONTENT.names[0];
  const subtitle = APP_CONTENT.subtitles[langIndex] || APP_CONTENT.subtitles[0];
  const leftFeatures = APP_CONTENT.leftFeatures;
  const rightFeatures = APP_CONTENT.rightFeatures;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (centerImgRef.current) {
        gsap.fromTo(
          centerImgRef.current,
          { opacity: 0, y: 20, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (leftColRef.current && rightColRef.current) {
        gsap.fromTo(
          [...leftColRef.current.children, ...rightColRef.current.children],
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [langIndex]);

  return (
    <section
      id="yatna-app"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F7F0E3] select-none text-[#30251F] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-10 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* =================================================================== */}
      {/* 1. SECTION HEADER: Brand Font & Generous Space After Description    */}
      {/* =================================================================== */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-4">
        <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-1.5">
          {/* Left doodle burst rays (\ | /) */}
          {/* <svg
            className="w-5 sm:w-6 h-5 sm:h-6 text-[#C79A45] opacity-80 select-none pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="20" y1="12" x2="6" y2="12" />
            <line x1="18" y1="5" x2="8" y2="9" />
            <line x1="18" y1="19" x2="8" y2="15" />
          </svg> */}

          <h2 className="font-logo text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-[#742C25] leading-tight drop-shadow-xs">
            {title}
          </h2>

          {/* Right doodle burst rays (/ | \) */}
          {/* <svg
            className="w-5 sm:w-6 h-5 sm:h-6 text-[#C79A45] opacity-80 select-none pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="12" x2="18" y2="12" />
            <line x1="6" y1="5" x2="16" y2="9" />
            <line x1="6" y1="19" x2="16" y2="15" />
          </svg> */}
        </div>

        <p className="font-serif text-xs sm:text-sm text-[#76665A] leading-relaxed mt-1.5">
          {subtitle}
        </p>
      </div>

      {/* =================================================================== */}
      {/* 2. MAIN TRIPTYCH: Fits comfortably in 1 screen view                 */}
      {/* =================================================================== */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-6 lg:gap-2 xl:gap-4">
          {/* --------------------------------------------------------------- */}
          {/* LEFT 3 FEATURES: Arrows centered between heading & description  */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={leftColRef}
            className="lg:col-span-3 xl:col-span-3 flex flex-col justify-between py-1 lg:py-2 space-y-6 lg:space-y-0 order-2 lg:order-1"
          >
            {/* Left 1: Top-Left (Indented inward toward Sadhana Calendar) */}
            <div
              className={`relative flex flex-col items-start lg:items-end text-left lg:text-right ${leftFeatures[0].posClass} transition-transform duration-200`}
            >
              <div className="relative max-w-[260px] xl:max-w-[280px]">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#742C25] leading-snug">
                  {leftFeatures[0].title[langIndex]}
                </h3>
                <p className="font-serif text-xs text-[#30251F] leading-relaxed mt-1">
                  {leftFeatures[0].desc[langIndex]}
                </p>

                {/* Arrow centered between heading & desc at the END of the point */}
                <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-3 xl:ml-4 pointer-events-none">
                  <ArrowLeftTop />
                </div>
                {/* Mobile fallback arrow */}
                <div className="flex items-center gap-2 lg:hidden mt-1.5">
                  <ArrowLeftTop />
                </div>
              </div>
            </div>

            {/* Left 2: Mid-Left (Pushed far outward to the left) */}
            <div
              className={`relative flex flex-col items-start text-left ${leftFeatures[1].posClass} transition-transform duration-200`}
            >
              <div className="relative max-w-[250px] xl:max-w-[270px]">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#742C25] leading-snug">
                  {leftFeatures[1].title[langIndex]}
                </h3>
                <p className="font-serif text-xs text-[#30251F] leading-relaxed mt-1">
                  {leftFeatures[1].desc[langIndex]}
                </p>

                {/* Arrow centered between heading & desc at the END of the point */}
                <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-3 xl:ml-4 pointer-events-none">
                  <ArrowLeftMid />
                </div>
                {/* Mobile fallback arrow */}
                <div className="flex items-center gap-2 lg:hidden mt-1.5">
                  <ArrowLeftMid />
                </div>
              </div>
            </div>

            {/* Left 3: Bottom-Left (Indented inward toward Temple Timings) */}
            <div
              className={`relative flex flex-col items-start lg:items-end text-left lg:text-right ${leftFeatures[2].posClass} transition-transform duration-200`}
            >
              <div className="relative max-w-[260px] xl:max-w-[280px]">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#742C25] leading-snug">
                  {leftFeatures[2].title[langIndex]}
                </h3>
                <p className="font-serif text-xs text-[#30251F] leading-relaxed mt-1">
                  {leftFeatures[2].desc[langIndex]}
                </p>

                {/* Arrow centered between heading & desc at the END of the point */}
                <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-3 xl:ml-4 pointer-events-none">
                  <ArrowLeftBottom />
                </div>
                {/* Mobile fallback arrow */}
                <div className="flex items-center gap-2 lg:hidden mt-1.5">
                  <ArrowLeftBottom />
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* CENTERPIECE: Phone Mockup Image (Confirmed size, grand & crisp) */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={centerImgRef}
            className="lg:col-span-6 xl:col-span-6 flex items-center justify-center order-1 lg:order-2 px-2"
          >
            <div className="w-full max-w-[440px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[580px] xl:max-w-[620px]">
              <img
                src="/yatnaapp.png"
                alt="Yatna Mobile App Mockup"
                className="w-full h-auto object-contain block drop-shadow-[0_20px_45px_rgba(48,37,31,0.20)] select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* RIGHT 3 FEATURES: Arrows centered between heading & description */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={rightColRef}
            className="lg:col-span-3 xl:col-span-3 flex flex-col justify-between py-1 lg:py-2 space-y-6 lg:space-y-0 text-left order-3"
          >
            {/* Right 1: Top-Right (Indented inward toward Mantra Counter) */}
            <div
              className={`relative flex flex-col items-start ${rightFeatures[0].posClass} transition-transform duration-200`}
            >
              <div className="relative max-w-[260px] xl:max-w-[280px]">
                {/* Arrow centered between heading & desc at the STARTING of the point */}
                <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3.5 xl:mr-5 pointer-events-none">
                  <ArrowRightTop />
                </div>

                <h3 className="font-serif text-sm sm:text-base font-bold text-[#742C25] leading-snug">
                  {rightFeatures[0].title[langIndex]}
                </h3>
                <p className="font-serif text-xs text-[#30251F] leading-relaxed mt-1">
                  {rightFeatures[0].desc[langIndex]}
                </p>

                {/* Mobile fallback arrow */}
                <div className="flex items-center gap-2 lg:hidden mt-1.5">
                  <ArrowRightTop />
                </div>
              </div>
            </div>

            {/* Right 2: Mid-Right (Pushed FAR OUTWARD with generous space for point and arrow) */}
            <div
              className={`relative flex flex-col items-start ${rightFeatures[1].posClass} transition-transform duration-200`}
            >
              <div className="relative max-w-[250px] xl:max-w-[270px]">
                {/* Arrow centered between heading & desc at the STARTING of the point */}
                <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3.5 xl:mr-5 pointer-events-none">
                  <ArrowRightMid />
                </div>

                <h3 className="font-serif text-sm sm:text-base font-bold text-[#742C25] leading-snug">
                  {rightFeatures[1].title[langIndex]}
                </h3>
                <p className="font-serif text-xs text-[#30251F] leading-relaxed mt-1">
                  {rightFeatures[1].desc[langIndex]}
                </p>

                {/* Mobile fallback arrow */}
                <div className="flex items-center gap-2 lg:hidden mt-1.5">
                  <ArrowRightMid />
                </div>
              </div>
            </div>

            {/* Right 3: Bottom-Right (Indented inward toward Audio Controls) */}
            <div
              className={`relative flex flex-col items-start ${rightFeatures[2].posClass} transition-transform duration-200`}
            >
              <div className="relative max-w-[260px] xl:max-w-[280px]">
                {/* Arrow centered between heading & desc at the STARTING of the point */}
                <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3.5 xl:mr-5 pointer-events-none">
                  <ArrowRightBottom />
                </div>

                <h3 className="font-serif text-sm sm:text-base font-bold text-[#742C25] leading-snug">
                  {rightFeatures[2].title[langIndex]}
                </h3>
                <p className="font-serif text-xs text-[#30251F] leading-relaxed mt-1">
                  {rightFeatures[2].desc[langIndex]}
                </p>

                {/* Mobile fallback arrow */}
                <div className="flex items-center gap-2 lg:hidden mt-1.5">
                  <ArrowRightBottom />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
