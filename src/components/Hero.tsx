import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Image as ImageIcon, Upload, Link2, RotateCcw, SlidersHorizontal, Settings2, Check, X } from "lucide-react";

// Curated high-fidelity landscape & textured background presets for ZiMing.Design
const BACKGROUND_PRESETS = [
  {
    id: "moss-zen",
    name: "古树青苔 // Deep Moss",
    url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "mist-forest",
    name: "晨雾林境 // Misty Valley",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "warm-plaster",
    name: "极简光影 // Mineral Shadow",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "stone-wave",
    name: "水洗原石 // Basalt Texture",
    url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=2000"
  }
];

export default function Hero() {
  // Custom background controls
  const [bgImage, setBgImage] = useState<string>(() => {
    return localStorage.getItem("ziming_hero_bg") || BACKGROUND_PRESETS[0].url;
  });
  const [overlayOpacity, setOverlayOpacity] = useState<number>(() => {
    const saved = localStorage.getItem("ziming_hero_bg_overlay_opacity");
    return saved !== null ? parseInt(saved, 10) : 60; // 60% overlay by default for optimal readability
  });
  const [bgBlur, setBgBlur] = useState<number>(() => {
    const saved = localStorage.getItem("ziming_hero_bg_blur");
    return saved !== null ? parseInt(saved, 10) : 2; // 2px blur by default for premium glass aesthetics
  });

  const [panelOpen, setPanelOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parallax scrolling hooks using Framer Motion
  const { scrollY } = useScroll();
  const opacityTitle = useTransform(scrollY, [0, 300], [1, 0]);

  // Sync back options to localStorage
  useEffect(() => {
    localStorage.setItem("ziming_hero_bg_overlay_opacity", overlayOpacity.toString());
  }, [overlayOpacity]);

  useEffect(() => {
    localStorage.setItem("ziming_hero_bg_blur", bgBlur.toString());
  }, [bgBlur]);

  const triggerScroll = () => {
    const el = document.getElementById("works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePresetSelect = (url: string) => {
    setBgImage(url);
    localStorage.setItem("ziming_hero_bg", url);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setBgImage(customUrlInput.trim());
      localStorage.setItem("ziming_hero_bg", customUrlInput.trim());
      setCustomUrlInput("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
          try {
            setBgImage(dataUrl);
            localStorage.setItem("ziming_hero_bg", dataUrl);
          } catch (err) {
            console.error("Storage limit hit, saving locally only in memory", err);
            setBgImage(dataUrl);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetBackground = () => {
    const defaultUrl = BACKGROUND_PRESETS[0].url;
    setBgImage(defaultUrl);
    setOverlayOpacity(60);
    setBgBlur(2);
    localStorage.setItem("ziming_hero_bg", defaultUrl);
    localStorage.setItem("ziming_hero_bg_overlay_opacity", "60");
    localStorage.setItem("ziming_hero_bg_blur", "2");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-700"
      style={{ fontWeight: "normal" }}
    >
      {/* Background image & Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none transition-all duration-700">
        {bgImage ? (
          <img
            src={bgImage}
            alt="Nature aesthetics environment background"
            className="w-full h-full object-cover transition-all duration-500 scale-105"
            style={{ filter: `blur(${bgBlur}px)` }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-[#e6ebe3]" />
        )}
        {/* Soft, beautiful mist layer blending the background image seamlessly into the original aesthetic */}
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{ backgroundColor: `rgba(230, 235, 227, ${overlayOpacity / 100})` }}
        />
      </div>

      {/* Hero Internal Layout */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center text-center space-y-10"
      >
        {/* Typographic Focus */}
        <motion.div
          style={{ opacity: opacityTitle }}
          className="flex flex-col items-center text-center space-y-8 w-full"
          id="hero-typography-block"
        >
          {/* Heading with exquisite serif italic styling */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="font-serif italic font-semibold text-[3.5rem] sm:text-[5.5rem] lg:text-[6.8rem] leading-[1.05] tracking-tight text-stone-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.45)]">
              Design Portfolio
            </h1>
            <p
              className="font-serif text-stone-950 max-w-2xl mx-auto"
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                textDecorationLine: "none",
                textAlign: "center",
                fontSize: "20px",
                lineHeight: "29.25px"
              }}
            >
              这里是骆东方的作品集设计网站。主要专注3C数码产品的电商视觉设计，精通C4D、OC/KeyShot渲染及PS后期，擅长结合AIGC技术，将产品融入到各种场景。从视觉策划到材质精准还原，高效打磨极具质感与极简美学的卖点图，为产品注入视觉生命力。
            </p>
          </div>

          {/* Action Row - Clean and Minimalist */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full" id="hero-action-buttons">
            <button
              onClick={triggerScroll}
              className="relative px-10 py-4 bg-white/30 hover:bg-stone-900 hover:text-white text-stone-900 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md border border-white/50 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl hover:border-transparent cursor-pointer"
            >
              <span>查看作品集</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Background Customizer in bottom-right corner */}
      <div className="absolute bottom-6 right-6 z-30 font-sans" id="hero-bg-customizer">
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[11px] font-mono tracking-wider transition-all duration-300 shadow-md ${
            panelOpen
              ? "bg-stone-900 text-white border-stone-900"
              : "bg-white/70 backdrop-blur-md text-stone-800 border-stone-300 hover:bg-white"
          }`}
        >
          <Settings2 className={`w-3.5 h-3.5 ${panelOpen ? 'rotate-90' : ''} transition-transform duration-300`} />
          <span>{panelOpen ? "关闭设定 // CLOSE" : "更换背景 // BACKGROUND"}</span>
        </button>

        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 bottom-14 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-2xl shadow-2xl p-5 text-left text-stone-800 overflow-hidden flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-moss-600" />
                  背景视觉设定 // VISUAL PANEL
                </span>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Presets Grid */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider font-mono">
                  甄选自然风物 // Presets
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {BACKGROUND_PRESETS.map((preset) => {
                    const isSelected = bgImage === preset.url;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset.url)}
                        className={`relative aspect-video rounded-lg overflow-hidden border group text-left transition-all ${
                          isSelected ? "border-moss-600 ring-2 ring-moss-300/30" : "border-stone-200"
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/30 transition-colors" />
                        <span className="absolute bottom-1.5 left-2 text-[8px] font-mono font-semibold text-white tracking-widest break-all select-none">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-moss-700 text-white rounded-full p-1 shadow">
                            <Check className="w-2.5 h-2.5 stroke-[3px]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Upload custom & Custom link */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider font-mono">
                  自定义上传 // Custom uploads
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-stone-200 hover:border-stone-300 hover:bg-stone-50 rounded-lg text-[10px] font-semibold text-stone-700 transition-all font-mono"
                  >
                    <Upload className="w-3.5 h-3.5 text-moss-600" />
                    本地图片 // FILE
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                
                {/* External URL form */}
                <form onSubmit={handleUrlSubmit} className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      placeholder="外部图片 URL..."
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="w-full pl-7 pr-2 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-[10px] font-mono tracking-wide placeholder:text-stone-400 focus:outline-none focus:border-moss-500 transition-colors"
                    />
                    <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={!customUrlInput.trim()}
                    className="px-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-lg text-[10px] font-mono font-bold transition-all"
                  >
                    确定
                  </button>
                </form>
              </div>

              {/* Visual tuning parameters */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <p className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider font-mono flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-stone-500" />
                  画面融合度调节 // ADVANCED MIXING
                </p>
                
                {/* Slider 1: Overlay density */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-stone-500 font-semibold uppercase">
                    <span>背景纯度密度 // Overlay Density</span>
                    <span>{overlayOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(parseInt(e.target.value, 10))}
                    className="w-full accent-moss-700 bg-stone-200 h-1 rounded-full cursor-pointer"
                  />
                </div>

                {/* Slider 2: Background blur */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-stone-500 font-semibold uppercase">
                    <span>景深模糊 // Blur Depth</span>
                    <span>{bgBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={bgBlur}
                    onChange={(e) => setBgBlur(parseInt(e.target.value, 10))}
                    className="w-full accent-moss-700 bg-stone-200 h-1 rounded-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Revert / Reset panel buttons */}
              <div className="pt-2 border-t border-stone-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleResetBackground}
                  className="flex items-center gap-1 text-[10px] font-mono font-bold text-stone-400 hover:text-stone-700 transition-colors uppercase"
                >
                  <RotateCcw className="w-3 h-3" />
                  恢复默认设置 // Reset default
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
