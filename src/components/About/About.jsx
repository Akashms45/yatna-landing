import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Multilingual Temple Information (Verbatim from User)
const TEMPLE_DATA = [
  // 0: Kannada / ಕನ್ನಡ
  {
    title: 'ಶ್ರೀ ಕಾರ್ಯ ಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ',
    subtitle: 'ಗಿರಿನಗರ, ಬೆಂಗಳೂರು • ಅವಧೂತ ದತ್ತ ಪೀಠಂ',
    description:
      'ಬೆಂಗಳೂರಿನ ಗಿರಿನಗರದಲ್ಲಿರುವ ಶ್ರೀ ಕಾರ್ಯ ಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನವು ಅವಧೂತ ದತ್ತ ಪೀಠದಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುವ ಅತ್ಯಂತ ಪವಿತ್ರ ಆಧ್ಯಾತ್ಮಿಕ ಕೇಂದ್ರವಾಗಿದೆ. ಶ್ರೀ ಗಣಪತಿ ಸಚ್ಚಿದಾನಂದ ಸ್ವಾಮೀಜಿಯವರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಈ ಆಲಯದಲ್ಲಿ 200 ಟನ್ ತೂಕದ ಏಕಶಿಲಾ ಹನುಮಂತನ ಭವ್ಯ ಮೂರ್ತಿಯಿದೆ. ಇಲ್ಲಿ ನಡೆಯುವ ಅಪೂರ್ವ ಪೂರ್ಣ ಫಲ ಸಮರ್ಪಣ ದೀಕ್ಷೆ (16 ದಿನಗಳ ತೆಂಗಿನಕಾಯಿ ಕಟ್ಟುವ ಆಚರಣೆ) ಭಕ್ತರ ಇಷ್ಟಾರ್ಥಗಳನ್ನು ಈಡೇರಿಸುವ ಪವಿತ್ರ ಸಂಪ್ರದಾಯವಾಗಿ ಜಗತ್ಪ್ರಸಿದ್ಧಿಯಾಗಿದೆ.',
  },
  // 1: English
  {
    title: 'Sri Karya Siddhi Anjaneya Swamy Temple',
    subtitle: 'Girinagar, Bengaluru • Avadhoota Datta Peetham',
    description:
      'Sri Karya Siddhi Anjaneya Swamy Temple in Girinagar, Bengaluru, is a powerful spiritual landmark managed by the Avadhoota Datta Peetham. Built under the guidance of Sri Ganapathy Sachchidananda Swamiji, the temple is home to a magnificent 200-tonne monolithic idol of Lord Hanuman. It is globally renowned for the unique Poorna Phala Samarpana Deeksha, a sacred 16-day ritual where devotees tie a coconut within the temple to seek the fulfillment of their deepest prayers and wishes.',
  },
  // 2: Hindi / हिंदी
  {
    title: 'श्री कार्य सिद्धि आंजनेय स्वामी मंदिर',
    subtitle: 'गिरिनगर, बेंगलुरु • अवधूत दत्त पीठम',
    description:
      'ಬೆಂಗಳೂರು (बेंगलुरु) के गिरिनगर में स्थित श्री कार्य सिद्धि आंजनेय स्वामी मंदिर अवधूत दत्त पीठम द्वारा संचालित एक अत्यंत शक्तिशाली आध्यात्मिक केंद्र है। श्री गणपति सच्चिदानन्द स्वामीजी के मार्गदर्शन में बने इस भव्य मंदिर में भगवान हनुमान की 200 टन की विशाल एकाश्म (monolithic) मूर्ति स्थापित है। यह मंदिर अपनी अनूठी पूर्ण फल समर्पण दीक्षा के लिए विश्वभर में प्रसिद्ध है, जहां भक्त अपनी मनोकामनाओं की पूर्ति के लिए 16 दिनों तक मंदिर में नारियल बांधते हैं।',
  },
];

export default function About({ langIndex = 0 }) {
  const sectionRef = useRef(null);
  const maskRectRef = useRef(null);

  const currentData = TEMPLE_DATA[langIndex] || TEMPLE_DATA[0];

  useEffect(() => {
    if (!sectionRef.current || !maskRectRef.current) return;

    const ctx = gsap.context(() => {
      // Initialize mask height to 0 (outline only)
      maskRectRef.current.setAttribute('height', '0');

      // Stays fixed/pinned until the ink reveal finishes, then scrolls to next section
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          // Finishes reveal smoothly by 85% of scroll, holding at 100% before unpinning
          const p = Math.min(1, self.progress / 0.85);
          const h = p * 1620;
          if (maskRectRef.current) {
            maskRectRef.current.setAttribute('height', h.toFixed(1));
          }
        },
      });

      return () => {
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-[220vh] bg-[#F7F0E3] select-none"
    >
      {/* Sticky Pinned Viewport: stays fixed until ink reveal completes */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-16 py-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-14 items-center">
          {/* ========================================================== */}
          {/* LEFT SIDE: Images without border, identical size & position */}
          {/* Outline (about1.png) on base, Color (about2.png) revealed   */}
          {/* through organic top-down ink mask while section is pinned   */}
          {/* ========================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] max-h-[30vh] sm:max-h-[42vh] lg:max-h-[75vh] aspect-[1145/1374] select-none flex items-center justify-center">
            <svg
              viewBox="0 0 1145 1374"
              className="w-full h-full block filter drop-shadow-xl overflow-visible select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Organic fractal noise displacement filter for ink tear edge */}
                <filter
                  id="hanumanInkBleedFilter"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                  filterUnits="userSpaceOnUse"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.032"
                    numOctaves="4"
                    seed="23"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="46"
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="displaced"
                  />
                  <feGaussianBlur
                    in="displaced"
                    stdDeviation="1.0"
                    result="feathered"
                  />
                </filter>

                {/* Mask sweeping from top to bottom */}
                <mask
                  id="hanumanInkMask"
                  maskUnits="userSpaceOnUse"
                  x="-80"
                  y="-80"
                  width="1305"
                  height="1540"
                >
                  <g filter="url(#hanumanInkBleedFilter)">
                    <rect
                      ref={maskRectRef}
                      x="-80"
                      y="-80"
                      width="1305"
                      height="0"
                      fill="#ffffff"
                    />
                  </g>
                </mask>
              </defs>

              {/* LAYER 1: Outline Base Image (about1.png) */}
              <image
                href="/about1.png"
                xlinkHref="/about1.png"
                x="0"
                y="0"
                width="1145"
                height="1374"
                preserveAspectRatio="xMidYMid meet"
              />

              {/* LAYER 2: Colored Image (about2.png) slightly bigger & shifted slightly right */}
              <image
                href="/about2.png"
                xlinkHref="/about2.png"
                x="-7"
                y="-26"
                width="1162"
                height="1394"
                preserveAspectRatio="xMidYMid meet"
                mask="url(#hanumanInkMask)"
              />
            </svg>
          </div>
        </div>

        {/* ========================================================== */}
        {/* RIGHT SIDE: Clean Info directly on screen (NO card/border) */}
        {/* Smaller heading, subtitle, and verbatim description text   */}
        {/* ========================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          {/* Temple Name Heading */}
          <h2 className="font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#742C25] leading-snug mb-1 sm:mb-2">
            {currentData.title}
          </h2>

          {/* Subtitle */}
          <p className="font-serif text-[11px] sm:text-xs md:text-sm text-[#C79A45] font-semibold tracking-wide mb-2 sm:mb-4 lg:mb-5">
            {currentData.subtitle}
          </p>

          {/* Temple Info Description: Cleanly displayed on screen without card or border */}
          <p className="font-serif text-xs sm:text-sm md:text-base text-[#3A2E28] leading-relaxed max-w-xl mx-auto lg:mx-0">
            {currentData.description}
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
