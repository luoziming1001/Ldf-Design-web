import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Update current time to show a real-time designer timezone (Beijing/Paris style)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Design clock in Beijing/Shanghai Time or local timezone
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Shanghai"
      };
      setCurrentTime(now.toLocaleTimeString("zh-CN", options) + " (GMT+8)");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "works"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "首页", id: "hero" },
    { label: "关于我", id: "about" },
    { label: "作品集", id: "works" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out py-4 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "translate-y-0" : "translate-y-2"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full" id="nav-wrapper">
          {/* Left Column: Logo Brand Title (Left-aligned via flex-1) */}
          <div className="flex-1 flex justify-start" id="nav-left-col">
            <div
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 cursor-pointer group"
              id="nav-logo-container"
            >
              <div className="w-8 h-8 rounded-full bg-moss-800 flex items-center justify-center border border-moss-600 shadow-sm transition-transform duration-500 group-hover:rotate-180">
                <span className="text-white font-serif text-sm font-bold tracking-tight">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-serif font-black tracking-wider text-sm select-none group-hover:text-moss-700 transition-colors uppercase">
                </span>
                <span className="text-[10px] text-moss-500 font-mono tracking-widest leading-none">
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Pill Navigation (Floating Capsule style, centered relative to the screen) */}
          <div className="hidden md:flex flex-initial justify-center" id="nav-center-col">
            <nav
              className="flex items-center gap-1 p-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-md"
              id="nav-pill-capsule"
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-stone-700 hover:text-stone-950"
                  }`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-moss-800 rounded-full -z-10 shadow-md shadow-moss-800/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column: Time Display or Mobile Trigger (Right-aligned via flex-1) */}
          <div className="flex-1 flex justify-end items-center" id="nav-right-col">
            {/* Desktop-only Beautiful Time Display */}
            <div className="hidden lg:flex items-center text-right font-mono" id="nav-info-badge">
              <div className="flex flex-col">
                <span className="text-[10px] text-stone-500 leading-tight flex items-center gap-1 justify-end">
                  <Globe className="w-3 h-3 text-stone-400 rotate-12" /> BEIJING TIME
                </span>
                <span className="text-[11px] text-stone-800 font-medium tracking-tight">
                  {currentTime || "00:00:00"}
                </span>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center" id="nav-mobile-trigger-container">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full bg-white/70 border border-stone-200/60 shadow-md text-stone-700 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-moss-400 transition-all"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-20 mx-4 p-5 z-40 rounded-3xl glassmorphic border border-white/50 shadow-2xl md:hidden"
            id="mobile-navigation-overlay"
          >
            <div className="flex flex-col gap-3">
              <p className="text-[10px] text-moss-600 font-mono tracking-widest uppercase mb-1 border-b border-stone-200 pb-1.5 font-bold">
                目录指南
              </p>
              {menuItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-between transition-all ${
                    activeSection === item.id
                      ? "bg-moss-800 text-white shadow-md shadow-moss-800/10"
                      : "text-stone-700 hover:bg-stone-200/50 hover:text-stone-950"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      activeSection === item.id ? "translate-x-0.5 -translate-y-0.5 text-white/80" : "text-stone-400"
                    }`}
                  />
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-stone-200/60 flex flex-col gap-2 font-mono text-[10px] text-stone-500">
                <div className="flex justify-between items-center px-2">
                  <span>设计协作状态</span>
                  <span className="font-semibold text-moss-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    进行中 / 接受预约
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span>微调响应时间区</span>
                  <span>{currentTime || "GMT+8"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
