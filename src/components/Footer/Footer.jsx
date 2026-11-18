import React, { useState } from 'react';
import {
  Mail,
  Star,
  CheckCircle2,
  Smartphone,
  Send,
  Sparkles,
} from 'lucide-react';
import { FOOTER_SILHOUETTE_PATH } from './footerSilhouette';
import { LOGO_PATH } from '../../assets/logoData';

// -----------------------------------------------------------------------------
// MULTILINGUAL CONTENT FOR FOOTER (Kannada: 0, English: 1, Hindi: 2)
// -----------------------------------------------------------------------------
const FOOTER_CONTENT = {
  leftCol: {
    topTag: [
      'ಶ್ರೀ ಕ್ಷೇತ್ರ ಸಂಪರ್ಕ & ಸಹಾಯವಾಣಿ',
      'Sri Kshetra Contact & Helpline',
      'श्री क्षेत्र संपर्क एवं हेल्पलाइन',
    ],
    phone: '+91 80 2672 9057',
    timings: [
      'ನಿತ್ಯ ಬೆಳಿಗ್ಗೆ ೮:೦೦ ರಿಂದ ರಾತ್ರಿ ೮:೩೦ (ದೇವಸ್ಥಾನ ವಿಚಾರಣೆ)',
      'Daily 8:00 AM to 8:30 PM (Temple Inquiries)',
      'प्रतिदिन प्रातः 8:00 से रात्रि 8:30 (मंदिर पूछताछ)',
    ],
    templeName: [
      'ಶ್ರೀ ಕಾರ್ಯಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ',
      'Sri Karya Siddhi Anjaneya Swamy Temple',
      'श्री कार्यसिद्धि आंजनेय स्वामी मंदिर',
    ],
    addressLines: [
      [
        '೩ನೇ ಕ್ರಾಸ್, ಗಿರಿನಗರ, ಅವಲಹಳ್ಳಿ,',
        'ಬಿಎಸ್‌ಕೆ ೩ನೇ ಹಂತ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ - ೫೬೦೦೮೫',
      ],
      [
        '3rd Cross, Girinagar, Avalahalli,',
        'BSK 3rd Stage, Bengaluru, Karnataka - 560085',
      ],
      [
        'तीसरी क्रॉस, गिरिनगर, अवलाहल्ली,',
        'बीएसके 3rd स्टेज, बेंगलुरु, कर्नाटक - 560085',
      ],
    ],
    email: 'info@karyasiddhianjaneya.org',
    sealTextTop: ['ಶ್ರೀ ಕ್ಷೇತ್ರ ಗಿರಿನಗರ', 'SRI KSHETRA', 'श्री क्षेत्र गिरिनगर'],
    sealTextSub: ['ಕಾರ್ಯಸಿದ್ಧಿ', 'KARYA SIDDHI', 'कार्यसिद्धि'],
  },

  centerCol: {
    heading: [
      'ನಿಮ್ಮ ಅನಿಸಿಕೆ ಹಂಚಿಕೊಳ್ಳಿ',
      'Share Your Review',
      'अपने विचार साझा करें',
    ],
    subtitle: [
      'ದೇವಸ್ಥಾನದ ದರ್ಶನ, ಪೂರ್ಣಫಲ ಸಂಕಲ್ಪ ಅಥವಾ ನಿಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವವನ್ನು ನಮ್ಮೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ.',
      'Share your temple visit, Poornaphala vow experience, or devotional feedback.',
      'मंदिर दर्शन, पूर्णफल संकल्प या अपना पावन आध्यात्मिक अनुभव हमारे साथ साझा करें।',
    ],
    ratingLabels: [
      [
        'ಅತ್ಯುತ್ತಮ ದರ್ಶನ & ಅನುಭವ (೫/೫)',
        'ತುಂಬಾ ಉತ್ತಮ (೪/೫)',
        'ಉತ್ತಮ (೩/೫)',
        'ಸಾಧಾರಣ (೨/೫)',
        'ಅಭಿಪ್ರಾಯ (೧/೫)',
      ],
      [
        'Divine Experience (5/5)',
        'Very Good (4/5)',
        'Good (3/5)',
        'Fair (2/5)',
        'Feedback (1/5)',
      ],
      [
        'दिव्य दर्शन एवं अनुभव (5/5)',
        'बहुत अच्छा (4/5)',
        'अच्छा (3/5)',
        'सामान्य (2/5)',
        'सुझाव (1/5)',
      ],
    ],
    placeholders: {
      name: [
        '*ನಿಮ್ಮ ಹೆಸರು (Full Name)',
        '*Your Full Name',
        '*आपका पूरा नाम (Full Name)',
      ],
      contact: [
        '*ಇಮೇಲ್ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
        '*Email or Mobile Number',
        '*ईमेल या मोबाइल नंबर',
      ],
      message: [
        '*ನಿಮ್ಮ ಅನಿಸಿಕೆ ಅಥವಾ ಪ್ರಾರ್ಥನಾ ಸಂದೇಶ...',
        '*Your review or prayer message...',
        '*आपके विचार या प्रार्थना संदेश...',
      ],
    },
    btnText: ['ಕಳುಹಿಸಿ (SUBMIT)', 'SUBMIT REVIEW', 'भेजें (SUBMIT)'],
    successTitle: [
      'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಅನಿಸಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.',
      'Thank you! Your review has been received.',
      'धन्यवाद! आपके विचार प्राप्त हुए।',
    ],
    successSubtitle: [
      'ಶ್ರೀ ಕಾರ್ಯಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಕೃಪಾಶೀರ್ವಾದ ಸದಾ ನಿಮ್ಮ ಮೇಲಿರಲಿ.',
      'May Lord Sri Karya Siddhi Anjaneya Swamy bless you and your family.',
      'श्री कार्यसिद्धि आंजनेय स्वामी की पावन कृपा सदैव आप पर बनी रहे।',
    ],
    anotherBtn: [
      'ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ',
      'Send another review',
      'एक और संदेश भेजें',
    ],
  },

  rightCol: {
    heading: [
      'ತ್ವರಿತ ಕೊಂಡಿಗಳು',
      'Quick Navigation',
      'त्वरित नेविगेशन',
    ],
    menu: [
      {
        label: ['ಮುಖಪುಟ', 'Home', 'मुखपृष्ठ'],
        href: '#hero',
      },
      {
        label: ['ಶ್ರೀ ಕ್ಷೇತ್ರದ ಮಹಿಮೆ', 'About Sri Kshetra', 'श्री क्षेत्र महिमा'],
        href: '#about',
      },
      {
        label: ['ನಿತ್ಯ ಪೂಜೆಗಳು & ಸೇವೆಗಳು', 'Daily Poojas & Sevas', 'नित्य पूजा व सेवाएँ'],
        href: '#poojas',
      },
      {
        label: ['೧೬ ದಿನಗಳ ಪೂರ್ಣಫಲ ಸಂಕಲ್ಪ', '16-Day Poornaphala', '16 दिवसीय पूर्णफल संकल्प'],
        href: '#poornaphala',
      },
      {
        label: ['ಯತ್ನ ಮೊಬೈಲ್ ಆ್ಯಪ್', 'Yatna Mobile App', 'यत्न मोबाइल ऐप'],
        href: '#yatna-app',
      },
      {
        label: ['ಗೌಪ್ಯತಾ ನೀತಿ', 'Privacy Policy', 'गोपनीयता नीति'],
        href: '#privacy',
      },
    ],
    appBoxTitle: [
      'ಯತ್ನ ಮೊಬೈಲ್ ಆ್ಯಪ್',
      'Yatna Mobile App',
      'यत्न मोबाइल ऐप',
    ],
    appBoxSubtitle: [
      'ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ನಿತ್ಯ ಪೂರ್ಣಫಲ ಸಾಧನೆ',
      'Your pocket companion for daily Poornaphala vows',
      'अपने मोबाइल पर नित्य पूर्णफल साधना',
    ],
    getBtnText: ['ಡೌನ್‌ಲೋಡ್', 'Download', 'डाउनलोड'],
  },

  bottomBar: {
    copyright: [
      `© ${new Date().getFullYear()} ಶ್ರೀ ಕಾರ್ಯಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ ಟ್ರಸ್ಟ್. ಸರ್ವ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.`,
      `© ${new Date().getFullYear()} Sri Karya Siddhi Anjaneya Swamy Temple Trust. All Rights Reserved.`,
      `© ${new Date().getFullYear()} श्री कार्यसिद्धि आंजनेय स्वामी मंदिर ट्रस्ट. सर्वाधिकार सुरक्षित.`,
    ],
    shloka: 'ತ್ವಮಸ್ಮಿನ್ ಕಾರ್ಯನಿರ್ಯೋಗೇ ಪ್ರಮಾಣಂ ಹರಿಸತ್ತಮ |',
    privacy: ['ಗೌಪ್ಯತಾ ನೀತಿ', 'Privacy Policy', 'गोपनीयता नीति'],
    terms: ['ನಿಯಮಗಳು & ಷರತ್ತುಗಳು', 'Terms of Service', 'नियम व शर्तें'],
  },
};

export default function Footer({ langIndex = 0, onOpenPrivacy }) {
  // Safe language fallback
  const lang = langIndex >= 0 && langIndex <= 2 ? langIndex : 0;
  const content = FOOTER_CONTENT;

  // Review Form States
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form field change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      alert(
        lang === 0
          ? 'ದಯವಿಟ್ಟು ಹೆಸರು ಮತ್ತು ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ.'
          : lang === 2
          ? 'कृपया नाम और संदेश दर्ज करें।'
          : 'Please enter your name and message.'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  // Reset form to send another review
  const handleResetForm = () => {
    setFormData({ name: '', contact: '', message: '' });
    setRating(5);
    setIsSubmitted(false);
  };

  // Smooth scroll handler for quick links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '#privacy') {
      if (onOpenPrivacy) {
        onOpenPrivacy();
      } else {
        window.location.hash = '#privacy';
      }
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="relative w-full bg-[#F7F0E3] select-none">
      {/* ==================================================================== */}
      {/* 1. TOP SILHOUETTE BORDER (Cuts into #F7F0E3 background above)         */}
      {/* SVG Path provided by user with red brick fill #742C25                */}
      {/* ==================================================================== */}
      <div className="w-full overflow-hidden leading-none -mb-px pointer-events-none select-none">
        <svg
          viewBox="0 240 2047 487"
          className="w-full h-20 sm:h-32 md:h-44 lg:h-52 xl:h-60 block fill-[#742C25]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={FOOTER_SILHOUETTE_PATH} />
        </svg>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN FOOTER BODY (Solid Red Brick #742C25 with soft cream text)   */}
      {/* ==================================================================== */}
      <div className="w-full bg-[#742C25] text-[#FFF9EE] pt-8 sm:pt-10 pb-12 px-4 sm:px-6 lg:px-12 relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto">
          {/* 3-Column Editorial Grid (Divided by subtle vertical borders) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
            
            {/* -------------------------------------------------------------- */}
            {/* COLUMN 1 (LEFT): Temple Contact, Helpline & Stamp Emblem       */}
            {/* (Moved from reference right column per user instruction)       */}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-4 lg:pr-8 xl:pr-10 lg:border-r border-[#FFF9EE]/20 pb-8 lg:pb-0">
              {/* Top Action Heading */}
              <a
                href="tel:+918026729057"
                className="inline-flex items-center gap-2 group text-sm sm:text-base font-serif font-bold tracking-wide text-[#FFF9EE] hover:text-[#C79A45] transition-colors"
              >
                <span>{content.leftCol.topTag[lang]}</span>
                <span className="text-[#C79A45] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>

              {/* Large Prominent Phone Number */}
              <a
                href="tel:+918026729057"
                className="block mt-3 text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#FFF9EE] hover:text-[#C79A45] transition-colors"
              >
                {content.leftCol.phone}
              </a>
              <p className="text-xs text-[#FFF9EE]/75 mt-1 font-serif">
                {content.leftCol.timings[lang]}
              </p>

              {/* Address Block */}
              <div className="mt-5 space-y-1 text-xs sm:text-sm text-[#FFF9EE]/85 leading-relaxed font-serif">
                <p className="font-bold text-[#FFF9EE] text-sm">
                  {content.leftCol.templeName[lang]}
                </p>
                {content.leftCol.addressLines[lang].map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
                <p className="text-[#FFF9EE]/70 pt-1 text-xs flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C79A45]" />
                  <span>{content.leftCol.email}</span>
                </p>
              </div>

              {/* Social Media Circular Buttons & Temple Stamp Badge */}
              <div className="mt-7 flex items-center justify-between gap-4 pt-2 border-t border-[#FFF9EE]/15">
                {/* Outlined Circular Social Icons */}
                <div className="flex items-center gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full border border-[#FFF9EE]/40 flex items-center justify-center text-xs font-bold text-[#FFF9EE] hover:bg-[#FFF9EE] hover:text-[#742C25] hover:border-[#FFF9EE] transition duration-200"
                  >
                    f
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full border border-[#FFF9EE]/40 flex items-center justify-center text-xs font-bold text-[#FFF9EE] hover:bg-[#FFF9EE] hover:text-[#742C25] hover:border-[#FFF9EE] transition duration-200"
                  >
                    in
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-full border border-[#FFF9EE]/40 flex items-center justify-center text-xs font-bold text-[#FFF9EE] hover:bg-[#FFF9EE] hover:text-[#742C25] hover:border-[#FFF9EE] transition duration-200"
                  >
                    yt
                  </a>
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918026729057"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="w-9 h-9 rounded-full border border-[#FFF9EE]/40 flex items-center justify-center text-xs font-bold text-[#FFF9EE] hover:bg-[#FFF9EE] hover:text-[#742C25] hover:border-[#FFF9EE] transition duration-200"
                  >
                    wa
                  </a>
                </div>

                {/* Circular Temple Stamp Seal (matching reference round stamp badge) */}
                <div className="w-20 h-20 rounded-full border border-[#FFF9EE]/40 p-1 flex items-center justify-center shrink-0 group hover:border-[#C79A45] transition-colors">
                  <div className="w-full h-full rounded-full border border-dashed border-[#FFF9EE]/40 flex flex-col items-center justify-center text-center p-1 relative overflow-hidden bg-black/10">
                    <span className="text-[7.5px] font-bold tracking-widest text-[#FFF9EE]/90 uppercase leading-none">
                      {content.leftCol.sealTextTop[lang]}
                    </span>
                    {/* Mini Hanuman Emblem from LOGO_PATH */}
                    <div className="w-6 h-4 my-0.5 flex items-center justify-center">
                      <svg
                        viewBox="320 160 1410 320"
                        className="w-full h-full overflow-visible"
                      >
                        <path d={LOGO_PATH} fill="#C79A45" />
                      </svg>
                    </div>
                    <span className="text-[7px] tracking-tight text-[#FFF9EE]/75 leading-none">
                      {content.leftCol.sealTextSub[lang]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* COLUMN 2 (MIDDLE): Review & Message Sending Form               */}
            {/* (Centerpiece requested by user with star ratings & feedback)   */}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-4 lg:px-8 xl:px-10 lg:border-r border-[#FFF9EE]/20 pb-8 lg:pb-0 text-center">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-[#FFF9EE]">
                {content.centerCol.heading[lang]}
              </h3>
              <p className="italic text-xs sm:text-sm text-[#FFF9EE]/80 mt-1.5 mb-5 max-w-sm mx-auto leading-relaxed font-serif">
                {content.centerCol.subtitle[lang]}
              </p>

              {!isSubmitted ? (
                <>
                  {/* Interactive Devotional Star Rating */}
                  <div className="flex flex-col items-center justify-center gap-1 mb-4">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isFilled =
                          (hoverRating || rating) >= starVal;
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setRating(starVal)}
                            onMouseEnter={() => setHoverRating(starVal)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-[#C79A45] hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                            aria-label={`Rate ${starVal} stars`}
                          >
                            <Star
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                isFilled
                                  ? 'fill-[#C79A45] text-[#C79A45]'
                                  : 'text-[#FFF9EE]/40'
                              } transition-colors`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[11px] text-[#FFF9EE]/75 font-serif italic">
                      {
                        content.centerCol.ratingLabels[lang][
                          Math.max(0, 5 - (hoverRating || rating))
                        ]
                      }
                    </span>
                  </div>

                  {/* Review / Feedback Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 max-w-sm mx-auto text-left"
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={content.centerCol.placeholders.name[lang]}
                        className="w-full px-3.5 py-2.5 bg-black/20 border border-[#FFF9EE]/30 rounded-md text-xs sm:text-sm text-[#FFF9EE] placeholder-[#FFF9EE]/60 focus:outline-none focus:border-[#C79A45] focus:bg-black/30 transition shadow-inner"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder={
                          content.centerCol.placeholders.contact[lang]
                        }
                        className="w-full px-3.5 py-2.5 bg-black/20 border border-[#FFF9EE]/30 rounded-md text-xs sm:text-sm text-[#FFF9EE] placeholder-[#FFF9EE]/60 focus:outline-none focus:border-[#C79A45] focus:bg-black/30 transition shadow-inner"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder={
                          content.centerCol.placeholders.message[lang]
                        }
                        className="w-full px-3.5 py-2 bg-black/20 border border-[#FFF9EE]/30 rounded-md text-xs sm:text-sm text-[#FFF9EE] placeholder-[#FFF9EE]/60 focus:outline-none focus:border-[#C79A45] focus:bg-black/30 transition shadow-inner resize-none"
                        required
                      />
                    </div>
                    <div className="pt-1 flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-6 bg-[#FFF9EE] text-[#742C25] font-bold text-xs uppercase tracking-wider rounded-md shadow hover:bg-[#C79A45] hover:text-white transition duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-[#742C25] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>{content.centerCol.btnText[lang]}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success Card after submitting review */
                <div className="p-6 bg-black/20 border border-[#C79A45]/50 rounded-xl text-center space-y-3 max-w-sm mx-auto animate-fade-in">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#C79A45]/20 border border-[#C79A45] flex items-center justify-center text-[#C79A45]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#FFF9EE]">
                    {content.centerCol.successTitle[lang]}
                  </h4>
                  <p className="text-xs text-[#FFF9EE]/80 leading-relaxed font-serif">
                    {content.centerCol.successSubtitle[lang]}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs text-[#C79A45] underline hover:text-[#FFF9EE] transition cursor-pointer font-serif"
                    >
                      {content.centerCol.anotherBtn[lang]}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* -------------------------------------------------------------- */}
            {/* COLUMN 3 (RIGHT): Navigation Menu & Yatna Mobile App Download  */}
            {/* (Moved from reference left column per user instruction)        */}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-4 lg:pl-8 xl:pl-10">
              <h4 className="text-sm font-serif font-bold tracking-widest uppercase text-[#FFF9EE]/75 mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C79A45]" />
                <span>{content.rightCol.heading[lang]}</span>
              </h4>

              {/* Navigation Menu Links */}
              <ul className="space-y-3 text-sm text-[#FFF9EE]/90 font-serif">
                {content.rightCol.menu.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="hover:text-[#C79A45] transition-colors flex items-center gap-2.5 group"
                    >
                      <span className="text-[#C79A45] text-xs transition-transform group-hover:translate-x-1">
                        ◆
                      </span>
                      <span className="group-hover:underline underline-offset-4">
                        {item.label[lang]}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Yatna Mobile App Download Banner */}
              <div className="mt-7 p-3.5 rounded-lg bg-black/20 border border-[#FFF9EE]/25 flex items-center justify-between gap-3 group hover:border-[#C79A45] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#C79A45]/20 border border-[#C79A45]/50 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-[#C79A45]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#FFF9EE] font-serif">
                      {content.rightCol.appBoxTitle[lang]}
                    </p>
                    <p className="text-[10.5px] text-[#FFF9EE]/70 font-serif leading-tight">
                      {content.rightCol.appBoxSubtitle[lang]}
                    </p>
                  </div>
                </div>
                <a
                  href="#yatna-app"
                  onClick={(e) => handleNavClick(e, '#yatna-app')}
                  className="px-3 py-1.5 bg-[#C79A45] text-white rounded text-[11px] font-bold hover:bg-[#FFF9EE] hover:text-[#742C25] transition-colors shrink-0 shadow"
                >
                  {content.rightCol.getBtnText[lang]}
                </a>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* 3. BOTTOM BAR (Copyright, Sacred Shloka & Terms)               */}
          {/* ============================================================== */}
          <div className="mt-12 pt-6 border-t border-[#FFF9EE]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFF9EE]/75 font-serif">
            {/* Copyright */}
            <div className="text-center md:text-left">
              {content.bottomBar.copyright[lang]}
            </div>

            {/* Sacred Shloka in Gold */}
            <div className="italic text-[11.5px] text-[#C79A45] tracking-wide text-center">
              {content.bottomBar.shloka}
            </div>

            {/* Devotional / Legal Links */}
            <div className="flex items-center gap-4 text-[11px] text-[#FFF9EE]/70">
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenPrivacy) {
                    onOpenPrivacy();
                  } else {
                    window.location.hash = '#privacy';
                  }
                }}
                className="hover:text-[#FFF9EE] transition cursor-pointer"
              >
                {content.bottomBar.privacy[lang]}
              </a>
              <span>•</span>
              <a href="#terms" className="hover:text-[#FFF9EE] transition">
                {content.bottomBar.terms[lang]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
