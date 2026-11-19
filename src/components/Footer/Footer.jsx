import React, { useState } from 'react';
import { Mail, Phone, Send, Check } from 'lucide-react';
import { FOOTER_SILHOUETTE_PATH } from './footerSilhouette';
import HanumanCenterpiece from './HanumanCenterpiece';

const CURRENT_YEAR = new Date().getFullYear();

// -----------------------------------------------------------------------------
// CLEAN & ADJUSTED MULTILINGUAL CONTENT FOR FOOTER (Kannada: 0, English: 1, Hindi: 2)
// -----------------------------------------------------------------------------
const FOOTER_CONTENT = {
  leftCol: {
    appName: ['ಯತ್ನ', 'Yatna', 'यत्न'],
    tagline: [
      'ನಿಮ್ಮ ನಿತ್ಯ ಪೂರ್ಣಫಲ ಸಾಧನೆಯ ಡಿಜಿಟಲ್ ಸಂಗಾತಿ.',
      'Your digital companion on the sacred path of devotion.',
      'आपकी नित्य पूर्णफल साधना का डिजिटल साथी।',
    ],
    email: 'info@karyasiddhianjaneya.org',
    phone: '+91 80 2672 9057',
  },

  centerCol: {
    heading: [
      'ನಿಮ್ಮ ಅನಿಸಿಕೆ ಹಂಚಿಕೊಳ್ಳಿ',
      'Share Your Review',
      'अपने विचार साझा करें',
    ],
    placeholders: {
      name: ['*ನಿಮ್ಮ ಹೆಸರು (Name)', '*Full Name', '*नाम (Name)'],
      contact: ['*ಮೊಬೈಲ್ / ಇಮೇಲ್', '*Phone / Email', '*मोबाइल / ईमेल'],
      message: ['*ನಿಮ್ಮ ಸಂದೇಶ...', '*Your message / review...', '*आपका संदेश...'],
    },
    btnText: ['ಕಳುಹಿಸಿ', 'Submit', 'भेजें'],
    successTitle: [
      'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಅನಿಸಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.',
      'Thank you! Your review has been received.',
      'धन्यवाद! आपके विचार प्राप्त हुए।',
    ],
    resetText: ['ಮತ್ತೊಂದು ಸಂದೇಶ', 'Send another', 'एक और संदेश'],
  },

  rightCol: {
    heading: ['ತ್ವರಿತ ಕೊಂಡಿಗಳು', 'Quick Links', 'त्वरित कड़ियाँ'],
    // Menu items match navbar top hero section verbatim: Home, About, Poojas, Poornaphala
    menu: [
      {
        label: ['Home', 'Home', 'Home'],
        href: '#hero',
      },
      {
        label: ['About', 'About', 'About'],
        href: '#about',
      },
      {
        label: ['Poojas', 'Poojas', 'Poojas'],
        href: '#poojas',
      },
      {
        label: ['Poornaphala', 'Poornaphala', 'Poornaphala'],
        href: '#poornaphala',
      },
    ],
    playStoreUrl: 'https://play.google.com/store/apps',
  },

  bottomBar: {
    copyright: [
      `© ${CURRENT_YEAR} ಯತ್ನ (Yatna). ಸರ್ವ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.`,
      `© ${CURRENT_YEAR} Yatna. All Rights Reserved.`,
      `© ${CURRENT_YEAR} यत्न (Yatna). सर्वाधिकार सुरक्षित.`,
    ],
    shloka: 'ತ್ವಮಸ್ಮಿನ್ ಕಾರ್ಯನಿರ್ಯೋಗೇ ಪ್ರಮಾಣಂ ಹರಿಸತ್ತಮ |',
    privacy: ['ಗೌಪ್ಯತಾ ನೀತಿ', 'Privacy Policy', 'गोपनीयता नीति'],
  },
};

export default function Footer({ langIndex = 0, onOpenPrivacy }) {
  const lang = langIndex >= 0 && langIndex <= 2 ? langIndex : 0;
  const content = FOOTER_CONTENT;

  // Clean Review Form States
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({ name: '', contact: '', message: '' });
    setIsSubmitted(false);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '/privacy' || href === '#privacy') {
      if (onOpenPrivacy) {
        onOpenPrivacy();
      }
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="relative w-full bg-[#F7F0E3] select-none pt-14 sm:pt-20 md:pt-28 lg:pt-32">
      {/* ==================================================================== */}
      {/* 1. DEDICATED SACRED HANUMAN CHALISA CENTERPIECE                      */}
      {/* Sits comfortably in footer space, zero collision with above section  */}
      {/* ==================================================================== */}
      <div className="w-full flex justify-center items-end px-2 sm:px-4 relative z-20">
        <HanumanCenterpiece />
      </div>

      {/* ==================================================================== */}
      {/* 2. TOP SILHOUETTE BORDER                                             */}
      {/* Directly attached to the base of the rock in HanumanCenterpiece       */}
      {/* ==================================================================== */}
      <div className="w-full overflow-hidden leading-none -mt-[72px] sm:-mt-[100px] md:-mt-[130px] lg:-mt-[172px] xl:-mt-[177px] -mb-1 pointer-events-none select-none relative z-10">
        <svg
          viewBox="0 240 2047 487"
          className="w-full h-20 sm:h-28 md:h-36 lg:h-48 xl:h-56 block fill-[#742C25]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Main tree skyline silhouette */}
          <path d={FOOTER_SILHOUETTE_PATH} />
        </svg>
      </div>

      {/* ==================================================================== */}
      {/* 3. MAIN FOOTER BODY (Unified with top silhouette, no shadow/seam)    */}
      {/* ==================================================================== */}
      <div className="w-full bg-[#742C25] text-[#FFF9EE] pt-3 sm:pt-4 pb-4 sm:pb-5 px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-start">
            
            {/* -------------------------------------------------------------- */}
            {/* COLUMN 1 (LEFT): App Name, 1-Line About, Email & Phone        */}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-4 lg:pr-8 xl:pr-10 lg:border-r border-[#FFF9EE]/20 pb-4 lg:pb-0">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#FFF9EE] tracking-wide">
                {content.leftCol.appName[lang]}
              </h3>

              <p className="text-xs text-[#FFF9EE]/85 mt-1 leading-relaxed font-serif">
                {content.leftCol.tagline[lang]}
              </p>

              {/* Smaller Email & Phone block */}
              <div className="mt-2.5 space-y-1 text-xs text-[#FFF9EE]/80 font-serif">
                <a
                  href={`mailto:${content.leftCol.email}`}
                  className="flex items-center gap-2 hover:text-[#C79A45] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C79A45] shrink-0" />
                  <span className="truncate">{content.leftCol.email}</span>
                </a>
                <a
                  href={`tel:${content.leftCol.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 hover:text-[#C79A45] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C79A45] shrink-0" />
                  <span>{content.leftCol.phone}</span>
                </a>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* COLUMN 2 (MIDDLE): Review Form Adjusted to Compact Height      */}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-4 lg:px-8 xl:px-10 lg:border-r border-[#FFF9EE]/20 pb-4 lg:pb-0">
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#FFF9EE] tracking-wide mb-1.5">
                {content.centerCol.heading[lang]}
              </h4>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-2">
                  {/* Row 1: Full Name and Number side-by-side in smaller size */}
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={content.centerCol.placeholders.name[lang]}
                      className="w-full px-2.5 py-1.5 bg-black/20 border border-[#FFF9EE]/30 rounded text-xs text-[#FFF9EE] placeholder-[#FFF9EE]/60 focus:outline-none focus:border-[#C79A45] transition shadow-inner"
                      required
                    />
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder={content.centerCol.placeholders.contact[lang]}
                      className="w-full px-2.5 py-1.5 bg-black/20 border border-[#FFF9EE]/30 rounded text-xs text-[#FFF9EE] placeholder-[#FFF9EE]/60 focus:outline-none focus:border-[#C79A45] transition shadow-inner"
                    />
                  </div>

                  {/* Row 2: Message Box with Smaller Submit Button beside it */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={content.centerCol.placeholders.message[lang]}
                      className="flex-1 px-2.5 py-1.5 bg-black/20 border border-[#FFF9EE]/30 rounded text-xs text-[#FFF9EE] placeholder-[#FFF9EE]/60 focus:outline-none focus:border-[#C79A45] transition shadow-inner"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-3.5 py-1.5 bg-[#FFF9EE] text-[#742C25] font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-[#C79A45] hover:text-white transition cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <div className="w-3 h-3 border-2 border-[#742C25] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span>{content.centerCol.btnText[lang]}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmation card */
                <div className="p-2.5 rounded bg-black/20 border border-[#C79A45]/40 flex items-center justify-between gap-2 text-xs text-[#FFF9EE] animate-fade-in font-serif">
                  <span className="flex items-center gap-1.5 truncate">
                    <Check className="w-3.5 h-3.5 text-[#C79A45] shrink-0" />
                    <span>{content.centerCol.successTitle[lang]}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-[11px] text-[#C79A45] underline hover:text-[#FFF9EE] shrink-0 cursor-pointer"
                  >
                    {content.centerCol.resetText[lang]}
                  </button>
                </div>
              )}
            </div>

            {/* -------------------------------------------------------------- */}
            {/* COLUMN 3 (RIGHT SIDE): Menu in center & Play Store on far right*/}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-4 lg:pl-6 xl:pl-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 items-start">
              {/* Menu items placed in the center of the right side */}
              <div className="flex flex-col items-start sm:items-center">
                <div className="text-left">
                  <h4 className="text-xs font-serif font-bold tracking-widest uppercase text-[#FFF9EE]/75 mb-1.5">
                    {content.rightCol.heading[lang]}
                  </h4>

                  {/* Smaller Menu Items matching top navbar style and exact text words */}
                  <ul className="space-y-1 text-xs text-[#FFF9EE]/85 font-serif tracking-wider">
                    {content.rightCol.menu.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="hover:text-[#C79A45] transition-colors inline-block"
                        >
                          {item.label[lang] || item.label[1] || 'Home'}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Play Store download moved to the full right side (not below menu) */}
              <div className="flex justify-start sm:justify-end items-start pt-0.5">
                <a
                  href={content.rightCol.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/25 border border-[#FFF9EE]/25 hover:border-[#C79A45] hover:bg-black/40 transition-all cursor-pointer group shadow-sm"
                  title="Google Play Store"
                >
                  {/* Official Google Play Store Symbol */}
                  <svg
                    viewBox="0 0 512 512"
                    className="w-4 h-4 shrink-0 group-hover:scale-105 transition-transform"
                    aria-hidden="true"
                  >
                    <path
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9z"
                      fill="#EA4335"
                    />
                    <path
                      d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
                      fill="#4285F4"
                    />
                    <path
                      d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"
                      fill="#34A853"
                    />
                    <path
                      d="M486.5 233.1L385.4 175l-60.1 60.1 60.1 60.1 101.1-58.1c11.5-6.6 18.5-18.7 18.5-32s-7-25.4-18.5-32z"
                      fill="#FBBC04"
                    />
                  </svg>

                  {/* App Name & Google Play Label */}
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] uppercase tracking-wider text-[#FFF9EE]/60 font-sans leading-none">
                      Google Play
                    </span>
                    <span className="text-xs font-bold text-[#FFF9EE] font-serif leading-tight group-hover:text-[#C79A45] transition-colors mt-0.5">
                      {content.leftCol.appName[lang]}
                    </span>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* 3. BOTTOM BAR (Reduced height spacing)                          */}
          {/* Copyright (Yatna), Sacred Shloka & Privacy Policy (No Terms)   */}
          {/* ============================================================== */}
          <div className="mt-4 pt-2.5 border-t border-[#FFF9EE]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#FFF9EE]/75 font-serif">
            {/* Left: Yatna Copyright */}
            <div className="text-center sm:text-left">
              {content.bottomBar.copyright[lang]}
            </div>

            {/* Center: Shloka in Gold */}
            {/* <div className="italic text-[10.5px] text-[#C79A45] text-center tracking-wide">
              {content.bottomBar.shloka}
            </div> */}

            {/* Right: Privacy Policy (Terms removed as requested) */}
            <div>
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenPrivacy) {
                    onOpenPrivacy();
                  }
                }}
                className="hover:text-[#FFF9EE] transition cursor-pointer underline"
              >
                {content.bottomBar.privacy[lang]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
