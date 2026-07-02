import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import Contact from "./components/Contact";
import { ChevronUp, Eye, Compass, Heart, Settings, Palette } from "lucide-react";

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scrolling to paint the float Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-stone-900 bg-stone-100 flex flex-col relative" id="applet-viewport-root">
      
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Page Content Blocks */}
      <main className="flex-grow flex flex-col" id="applet-layout-main">
        {/* Core Sections */}
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>

      {/* 3. Luxury Editorial Designer Footer */}
      <footer className="hidden" id="page-footer" />

      {/* 4. Scroll to Top Floating Pill Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-stone-900 hover:bg-copper-600 text-white shadow-2xl border border-white/10 flex items-center justify-center transition-all cursor-pointer focus:ring-2 focus:ring-copper-400"
            style={{ touchAction: "none" }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
