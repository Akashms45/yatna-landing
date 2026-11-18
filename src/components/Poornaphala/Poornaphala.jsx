import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// POORNAPHALA SAMARPANA DEEKSHA (16-DAY SACRED COCONUT VOW)
// Kannada (0), English (1), Hindi (2)
// Verbatim 5 Points provided by the User + Intro Description Paragraph
// -----------------------------------------------------------------------------
const POORNAPHALA_DATA = [
  // 0: Kannada / ಕನ್ನಡ
  {
    title: 'ಪೂರ್ಣಫಲ ಸಮರ್ಪಣೆ',
    subtitle: 'ಶ್ರೀ ಕಾರ್ಯ ಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ • ಗಿರಿನಗರ, ಬೆಂಗಳೂರು',
    intro:
      'ಶ್ರೀ ಕಾರ್ಯ ಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ ಸನ್ನಿಧಿಯಲ್ಲಿ ನಡೆಯುವ ೧೬ ದಿನಗಳ ಪೂರ್ಣಫಲ (ತೆಂಗಿನಕಾಯಿ) ಕಟ್ಟುವ ಪವಿತ್ರ ಆಚರಣೆಯು ಭಕ್ತರ ಸಕಲ ಕಷ್ಟ-ಕಾರ್ಪಣ್ಯಗಳನ್ನು ನಿವಾರಿಸಿ ಇಷ್ಟಾರ್ಥಗಳನ್ನು ಈಡೇರಿಸುವ ಜಗತ್ಪ್ರಸಿದ್ಧ ಆಧ್ಯಾತ್ಮಿಕ ಸಂಕಲ್ಪವಾಗಿದೆ.',
    steps: [
      {
        number: '01',
        title: 'ಸಂಕಲ್ಪ ಮತ್ತು ಕಟ್ಟುವುದು (೧ನೇ ದಿನ)',
        desc: 'ದೇವಸ್ಥಾನದ ಕೌಂಟರ್ನಲ್ಲಿ ತೆಂಗಿನಕಾಯಿ ಪಡೆದು, ನಿಮ್ಮ ಕೋರಿಕೆಯನ್ನು ಪ್ರಾರ್ಥಿಸಿ, ೧೬ ಪ್ರದಕ್ಷಿಣೆ ಹಾಕಿ ದೇವಸ್ಥಾನದಲ್ಲಿ ತೆಂಗಿನಕಾಯಿಯನ್ನು ಕಟ್ಟಬೇಕು ಮತ್ತು ಕೈಗೆ ಪವಿತ್ರ ದಾರವನ್ನು ಕಟ್ಟಿಸಿಕೊಳ್ಳಬೇಕು.',
      },
      {
        number: '02',
        title: 'ಮಂತ್ರ ಪಠಣೆ',
        desc: 'ವ್ರತದ ೧೬ ದಿನಗಳ ಅವಧಿಯಲ್ಲಿ ಪ್ರತಿದಿನ ಕನಿಷ್ಠ ೧೦೮ ಬಾರಿ "ತ್ವಮಸ್ಮಿನ್ ಕಾರ್ಯನಿರ್ಯೋಗೆ..." ಎಂಬ ಕಾರ್ಯ ಸಿದ್ಧಿ ಹನುಮಾನ್ ಮಂತ್ರವನ್ನು ಭಕ್ತಿಯಿಂದ ಜಪಿಸಬೇಕು.',
      },
      {
        number: '03',
        title: 'ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ',
        desc: '೧೬ ದಿನಗಳ ಅವಧಿಯಲ್ಲಿ ಮಧ್ಯದಲ್ಲಿ ಕನಿಷ್ಠ ೨ ಬಾರಿ ಮತ್ತು ಅಂತಿಮ ದಿನದಂದು ೧ ಬಾರಿ ದೇವಸ್ಥಾನಕ್ಕೆ ಬಂದು, ಪ್ರತಿ ಬಾರಿಯೂ ತಲಾ ೧೬ ಪ್ರದಕ್ಷಿಣೆಗಳನ್ನು ಮಾಡಬೇಕು.',
      },
      {
        number: '04',
        title: 'ನಿಯಮಗಳು',
        desc: 'ವ್ರತದ ಅವಧಿಯಲ್ಲಿ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಸಸ್ಯಾಹಾರವನ್ನು ಮಾತ್ರ ಸೇವಿಸಬೇಕು ಮತ್ತು ಯಾವುದೇ ರೀತಿಯ ಅಮಲು ಪದಾರ್ಥಗಳನ್ನು ಬಳಸಬಾರದು.',
      },
      {
        number: '05',
        title: 'ವ್ರತ ಮುಕ್ತಾಯ (೧೬ನೇ ದಿನ)',
        desc: 'ಕೊನೆಯ ದಿನ ೧೬ ಪ್ರದಕ್ಷಿಣೆ ಮುಗಿಸಿ, ನೀವು ಕಟ್ಟಿದ್ದ ತೆಂಗಿನಕಾಯಿಯನ್ನು ಬಿಚ್ಚಿ ಅರ್ಚಕರಿಗೆ ನೀಡಬೇಕು. ಅವರು ಪೂಜೆ ಮಾಡಿ ಕೊಡುವ ಆ ತೆಂಗಿನಕಾಯಿಯಿಂದ ಮನೆಯಲ್ಲಿ ಸಿಹಿ ಪ್ರಸಾದ ತಯಾರಿಸಿ ಸೇವಿಸಬೇಕು.',
      },
    ],
  },
  // 1: English
  {
    title: 'Poornaphala Samarpana',
    subtitle: 'Sri Karya Siddhi Anjaneya Swamy Temple • Girinagar, Bengaluru',
    intro:
      'The world-renowned 16-day wish-fulfilling coconut vow ritual at Girinagar is an extraordinary spiritual practice where devotees seek Lord Hanuman’s supreme grace to resolve difficulties and fulfill earnest prayers.',
    steps: [
      {
        number: '01',
        title: 'Sankalpa & Tying (Day 1)',
        desc: 'Obtain a sacred coconut from the temple counter, pray with your deepest wish, perform 16 pradakshinas, tie the coconut securely on the temple rack, and tie the consecrated sacred thread on your wrist.',
      },
      {
        number: '02',
        title: 'Mantra Chanting',
        desc: 'During the 16 days of the vow, chant the sacred Karya Siddhi Hanuman mantra "Tvamasmin Karya Niryoge..." at least 108 times daily with devotion.',
      },
      {
        number: '03',
        title: 'Temple Visits',
        desc: 'Visit the temple at least twice during the 16-day period and once on the final day, performing 16 pradakshinas on each visit.',
      },
      {
        number: '04',
        title: 'Vow Observances',
        desc: 'Strictly consume only pure vegetarian food during the entire vow period, and refrain from any intoxicants or harmful substances.',
      },
      {
        number: '05',
        title: 'Completion of Vow (Day 16)',
        desc: 'On the final day, complete 16 pradakshinas, untie your coconut, and offer it to the priest. With the blessed coconut returned after puja, prepare a sweet prasada at home and partake of it.',
      },
    ],
  },
  // 2: Hindi / हिंदी
  {
    title: 'पूर्णफल समर्पण',
    subtitle: 'श्री कार्य सिद्धि आंजनेय स्वामी मंदिर • गिरिनगर, बेंगलुरु',
    intro:
      'गिरिनगर के श्री कार्य सिद्धि आंजनेय स्वामी मंदिर में आयोजित 16 दिनों का नारियल संकल्प एक अत्यंत सिद्ध और चमत्कारी अनुष्ठान है, जिससे भक्तों के सभी कष्ट दूर होकर मनोकामनाएं पूर्ण होती हैं।',
    steps: [
      {
        number: '01',
        title: 'संकल्प एवं नारियल बांधना (पहला दिन)',
        desc: 'मंदिर के काउंटर से नारियल प्राप्त करें, अपनी मनोकामना की प्रार्थना करें, 16 प्रदक्षिणा करें, मंदिर में नारियल बांधें और कलाई पर पावन रक्षा-सूत्र (कलावा) बंधवाएं।',
      },
      {
        number: '02',
        title: 'मंत्र जाप',
        desc: 'दीक्षा के 16 दिनों के दौरान प्रतिदिन कम से कम 108 बार "त्वमस्मिन् कार्यनिर्योगे..." कार्य सिद्धि हनुमान मंत्र का श्रद्धापूर्वक जाप करें।',
      },
      {
        number: '03',
        title: 'मंदिर दर्शन',
        desc: '16 दिनों की अवधि के दौरान बीच में कम से कम 2 बार और अंतिम दिन 1 बार मंदिर आएं, और प्रत्येक बार 16 प्रदक्षिणाएं करें।',
      },
      {
        number: '04',
        title: 'नियम एवं संयम',
        desc: 'दीक्षा की पूरी अवधि के दौरान कड़ाई से केवल सात्विक शाकाहारी भोजन करें और किसी भी प्रकार के नशीले पदार्थों से पूर्णतः दूर रहें।',
      },
      {
        number: '05',
        title: 'व्रत पूर्णाहुति (16वां दिन)',
        desc: 'अंतिम दिन 16 प्रदक्षिणा पूरी कर अपना बंधा हुआ नारियल खोलें और पुजारी को दें। पूजा के पश्चात प्राप्त नारियल से घर में मीठा प्रसाद बनाएं और सपरिवार ग्रहण करें।',
      },
    ],
  },
];

export default function Poornaphala({ langIndex = 0 }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const data = POORNAPHALA_DATA[langIndex] || POORNAPHALA_DATA[0];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
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
      id="poornaphala"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F7F0E3] select-none text-[#30251F] py-8 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-16 overflow-hidden flex items-center"
    >
      {/* =================================================================== */}
      {/* BACKGROUND SACRED THREAD: Anchored to the bottom, flush left        */}
      {/* Placed strictly behind the info and content                        */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[85px] sm:w-[110px] md:w-[135px] lg:w-[155px] pointer-events-none z-0 select-none opacity-90 -translate-x-1"
      >
        <img
          src="/thread.png"
          alt=""
          className="w-full h-auto object-contain object-bottom-left block drop-shadow-[0_8px_20px_rgba(230,81,0,0.25)]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* ================================================================ */}
        {/* LEFT COLUMN: EXPLANATION / 5 POINTS                              */}
        {/* ================================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1">
          {/* Foreground Text Content */}
          <div ref={contentRef}>
            {/* Main Heading */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#742C25] leading-snug mb-1">
              {data.title}
            </h2>

            {/* Subtitle */}
            <p className="font-serif text-xs sm:text-sm text-[#76665A] font-semibold tracking-wide mb-3 sm:mb-4">
              {data.subtitle}
            </p>

            {/* Introductory Paragraph (Below heading, above the points) */}
            <p className="font-serif text-sm sm:text-base text-[#3A2E28] leading-relaxed mb-6 sm:mb-7 max-w-xl">
              {data.intro}
            </p>

            {/* 5 Sacred Points */}
            <div className="space-y-4 sm:space-y-5 max-w-xl">
              {data.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-4 transition-transform duration-200"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#C79A45] leading-tight flex-shrink-0 pt-0.5">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#742C25]">
                      {step.title}
                    </h3>
                    <p className="font-serif text-xs sm:text-sm text-[#3A2E28] leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN: TRANSPARENT IMAGE (poornapala.png)                 */}
        {/* Pure illustration on canvas without any border or box            */}
        {/* ================================================================ */}
        <div
          ref={imageRef}
          className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2"
        >
          <div className="w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[580px] flex items-center justify-center">
            <img
              src="/poornapala.png"
              alt="Poornaphala Seva - 16-Day Coconut Vow"
              className="w-full h-auto max-h-[82vh] object-contain block drop-shadow-[0_20px_45px_rgba(116,44,37,0.18)] select-none pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
