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

  // Helper to determine if URL path indicates the privacy screen
  const isPrivacyRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.replace(/\/+$/, '');
    const hash = window.location.hash;
    return path === '/privacy' || hash === '#privacy' || hash === '#/privacy';
  };

  // Screen state: 'landing' | 'privacy'
  const [currentScreen, setCurrentScreen] = useState(() => {
    return isPrivacyRoute() ? 'privacy' : 'landing';
  });

  // Handle direct navigation and auto-scrolling to section from URL
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keep browser URL clean: ensure NO '#' exists in the URL, only clean paths
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      const isPrivacy = isPrivacyRoute();

      // If legacy hash was present, strip it
      if (window.location.hash) {
        const cleanPath = isPrivacy ? '/privacy' : (path || '/');
        window.history.replaceState(null, '', cleanPath);
      }

      // If opening an in-page section directly (e.g. from Google Search), scroll smoothly to it
      if (path === '/about') {
        setTimeout(() => scrollToSection('about'), 400);
      } else if (path === '/poojas') {
        setTimeout(() => scrollToSection('poojas'), 400);
      } else if (path === '/poornaphala') {
        setTimeout(() => scrollToSection('poornaphala'), 400);
      }
    }

    // Handle browser Back / Forward buttons (popstate)
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      const isPrivacy = path === '/privacy';
      setCurrentScreen(isPrivacy ? 'privacy' : 'landing');
      if (window.location.hash) {
        window.history.replaceState(null, '', path);
      }

      if (!isPrivacy) {
        if (path === '/about') {
          setTimeout(() => scrollToSection('about'), 100);
        } else if (path === '/poojas') {
          setTimeout(() => scrollToSection('poojas'), 100);
        } else if (path === '/poornaphala') {
          setTimeout(() => scrollToSection('poornaphala'), 100);
        } else if (path === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    // If an accidental hashchange ever occurs, strip '#' immediately
    const handleHashChange = () => {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      window.history.replaceState(null, '', path);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleOpenPrivacy = () => {
    window.history.pushState(null, '', '/privacy');
    setCurrentScreen('privacy');
  };

  const handleClosePrivacy = () => {
    window.history.pushState(null, '', '/');
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
