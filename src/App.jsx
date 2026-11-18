import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Poojas from './components/Poojas';
import Poornaphala from './components/Poornaphala';
import YatnaApp from './components/YatnaApp';
import Footer from './components/Footer';
import CurtainReveal from './components/CurtainReveal';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  // Shared language state across the application
  // 0: Kannada, 1: English, 2: Hindi
  const [langIndex, setLangIndex] = useState(0);

  // Screen state: 'landing' | 'privacy'
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#privacy') {
      return 'privacy';
    }
    return 'landing';
  });

  // Synchronize hash with currentScreen (supports browser Back / Forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#privacy') {
        setCurrentScreen('privacy');
      } else if (currentScreen === 'privacy' && window.location.hash !== '#privacy') {
        setCurrentScreen('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentScreen]);

  const handleOpenPrivacy = () => {
    window.location.hash = '#privacy';
    setCurrentScreen('privacy');
  };

  const handleClosePrivacy = () => {
    if (window.location.hash === '#privacy') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setCurrentScreen('landing');
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F0E3] relative text-[#30251F] selection:bg-[#C79A45]/30">
      {/* Landing Page Content */}
      <CurtainReveal>
        <Hero langIndex={langIndex} setLangIndex={setLangIndex} />
      </CurtainReveal>
      <About langIndex={langIndex} />
      <Poojas langIndex={langIndex} />
      <Poornaphala langIndex={langIndex} />
      <YatnaApp langIndex={langIndex} />
      <Footer langIndex={langIndex} onOpenPrivacy={handleOpenPrivacy} />

      {/* Dedicated Themed Privacy Policy Screen */}
      {currentScreen === 'privacy' && (
        <PrivacyPolicy
          langIndex={langIndex}
          setLangIndex={setLangIndex}
          onBack={handleClosePrivacy}
        />
      )}
    </div>
  );
}
