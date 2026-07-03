import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioProjects } from "../data";
import { Project } from "../types";
import { ChevronRight, X, Compass, Sparkles, ArrowLeft, ArrowRight, Grid, Image as ImageIcon, Upload, RotateCcw } from "lucide-react";

// Interactive Before / After Sliders Component
function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("pointerup", handleGlobalUp);
    return () => window.removeEventListener("pointerup", handleGlobalUp);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
      className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden cursor-ew-resize select-none border border-stone-250 bg-stone-200 shadow-sm group/slider"
      id={`slider-container-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* "Before" Image - Raw wireframe / clay */}
      <img
        src={before}
        alt="Clay wireframe"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />
      
      {/* Before Badge Label */}
      <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-stone-900/80 text-white font-mono text-[9px] tracking-widest uppercase rounded-full select-none">
        CLAY FRAME // 拓扑白模
      </div>

      {/* "After" Image Overlay with clip-path */}
      <div
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img
          src={after}
          alt="Final beauty render"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* After Badge Label */}
      <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-moss-650 text-white font-mono text-[9px] tracking-widest uppercase rounded-full select-none">
        FINAL // 高定渲染
      </div>

      {/* Thin elegant dividing line */}
      <div
        className="absolute inset-y-0 z-30 w-[1.5px] bg-[#e6ebe3]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Sleek moss drag circle button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-stone-900 border border-[#e6ebe3] shadow-md flex items-center justify-center text-white scale-100 group-hover/slider:scale-105 transition-all">
          <span className="text-[10px] font-mono leading-none font-bold">⇄</span>
        </div>
      </div>

      {/* Help prompt banner */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-stone-900/80 backdrop-blur-md rounded-full text-[9px] text-stone-200 font-mono tracking-widest uppercase pointer-events-none transition-opacity group-hover/slider:opacity-0 font-medium">
        ↔ 滑动对比工艺质感
      </div>
    </div>
  );
}

const displayHeaders: Record<string, { main: string; location: string }> = {
  aetheris: { main: "AETHERIS", location: "AETHERIS LABS // 美妆" },
  orcus_audio: { main: "ORCUS AUDIO", location: "ORCUS CO. // 数码" },
  wild_moss_perfume: { main: "MOSS WANDERER", location: "BOTANIQUE // 香芬" },
  vert_chronograph: { main: "VERT CHRONO", location: "VERT WATCHMAKERS // 奢品" },
};

const elegantChTitles: Record<string, string> = {
  aetheris: "三维渲染",
  orcus_audio: "AIGC赋能",
  wild_moss_perfume: "主图设计",
  vert_chronograph: "详情页设计",
};

const getGalleryImages = (projectId: string): { url: string; title: string }[] => {
  let folderName = "3C";
  let themePrefix = "AETHERIS";
  let limit = 20; // 3D rendering limited to 20 images

  if (projectId === "orcus_audio") {
    folderName = "AIGC";
    themePrefix = "ORCUS";
    limit = 15; // AIGC limited to 15 images
  } else if (projectId === "wild_moss_perfume") {
    folderName = "main-visual";
    themePrefix = "MOSS";
    limit = 30;
  } else if (projectId === "vert_chronograph") {
    folderName = "xqysj";
    themePrefix = "VERT";
    limit = 13; // Details page design limited to 13 images
  }

  return Array.from({ length: limit }, (_, index) => {
    const zeroPadded = String(index + 1).padStart(2, '0');
    let itemTitle = `${themePrefix} // 渲染细节 ${zeroPadded}`;
    if (index === 0) itemTitle = `${themePrefix} // 主视觉高定渲染`;
    if (index === 1) itemTitle = `${themePrefix} // C4D 骨架拓扑线框图`;
    if (index === 2) itemTitle = `${themePrefix} // 主光源漫反射渲染通道`;
    if (index === 3) itemTitle = `${themePrefix} // 表面微晶噪点肌理图`;
    if (index === 4) itemTitle = `${themePrefix} // 容积丁达尔散射环境图`;

    return {
      url: `/${folderName}/${index + 1}.jpg`,
      title: itemTitle
    };
  });
};
export default function Works() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({
    aetheris: 0,
    orcus_audio: 0,
    wild_moss_perfume: 0,
    vert_chronograph: 0,
  });
  const [cardCustomImages, setCardCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("cardCustomImages");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [projectCustomGallery, setProjectCustomGallery] = useState<Record<string, Record<number, string>>>(() => {
    try {
      const saved = localStorage.getItem("projectCustomGallery");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const lastWheelTime = useRef<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem("cardCustomImages", JSON.stringify(cardCustomImages));
    } catch (e) {
      console.error("Failed to save cardCustomImages to localStorage:", e);
    }
  }, [cardCustomImages]);

  useEffect(() => {
    try {
      localStorage.setItem("projectCustomGallery", JSON.stringify(projectCustomGallery));
    } catch (e) {
      console.error("Failed to save projectCustomGallery to localStorage:", e);
    }
  }, [projectCustomGallery]);

  const getProjectImagesWithCustom = (projectId: string) => {
    const rawList = getGalleryImages(projectId);
    const customGallery = projectCustomGallery[projectId] || {};
    const customIndices = Object.keys(customGallery).map(Number).sort((a, b) => a - b);

    if (customIndices.length > 0) {
      return customIndices.map((idx, index) => {
        const customUrl = customGallery[idx];
        const zeroPadded = String(index + 1).padStart(2, '0');
        let title = "本地上传细节";
        if (projectId === "aetheris") title = `三维渲染细节 ${zeroPadded}`;
        else if (projectId === "orcus_audio") title = `AIGC 细节 ${zeroPadded}`;
        else if (projectId === "vert_chronograph") title = `详情页设计细节 ${zeroPadded}`;
        return {
          url: customUrl,
          title: title,
          isCustomized: true,
        };
      });
    }

    return rawList.map((img) => {
      return {
        ...img,
        isCustomized: false,
      };
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!selectedProject || isGridView) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 250) return;

    const list = getProjectImagesWithCustom(selectedProject.id);

    if (!list.length) return;

    if (e.deltaY > 0) {
      // scroll down -> next image
      setActiveImageIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
      lastWheelTime.current = now;
    } else if (e.deltaY < 0) {
      // scroll up -> previous image
      setActiveImageIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
      lastWheelTime.current = now;
    }
  };

  useEffect(() => {
    setActiveImageIndex(0);
    setIsGridView(false);
  }, [selectedProject]);

  const filteredProjects = portfolioProjects.filter((project) => project.id !== "wild_moss_perfume");

  return (
    <section
      id="works"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#f8faf7] relative overflow-hidden"
    >
      {/* Decorative organic background blurs */}
      <div className="absolute left-[3%] top-[25%] w-[450px] h-[450px] rounded-full bg-radial from-[#cedacd]/25 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute right-[5%] bottom-[15%] w-[35vw] h-[35vw] rounded-full bg-radial from-[#d4dfd4]/25 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Section Header */}
        <div className="flex justify-start mb-14 text-left">
          <h2 className="font-serif italic text-4xl sm:text-[64px] lg:text-[80px] lg:leading-[80px] sm:leading-[70px] font-bold text-stone-900 tracking-tight">
            作品集
          </h2>
        </div>

        {/* Expanded Portfolio Grid representing the zoomed-in preview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-4" id="portfolio-expanded-grid">
          {filteredProjects.map((project, index) => {
            const chTitle = elegantChTitles[project.id] || "作品展示";
            const customCover = cardCustomImages[project.id];
            const presetList = getProjectImagesWithCustom(project.id);
            const currentIdx = cardImageIndices[project.id] || 0;
            const cardBgSrc = customCover || (presetList[currentIdx]?.url || project.beforeImage || project.imageUrl);

            return (
              <motion.div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveImageIndex(customCover ? 0 : currentIdx);
                }}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[9/13.5] rounded-[2.2rem] overflow-hidden cursor-pointer border border-stone-800/45 shadow-xl bg-stone-950 transition-all duration-500"
              >
                {/* Background image & zoom (using the first image, i.e. beforeImage) */}
                <div className="absolute inset-0 z-0">
                  <motion.img
                    layoutId={`work-img-${project.id}`}
                    src={cardBgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle bottom-only gradient to ensure text readability without dimming the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-all duration-500" />
                </div>



                {/* Big Low-Opacity Index Number on Card top-right */}
                <span className="absolute top-6 right-6 font-mono text-3.5xl font-extrabold text-white/10 select-none group-hover:text-white/20 transition-colors duration-300">
                  0{index + 1}
                </span>

                {/* Bottom-Left Content: Pure Elegant Italian Italic Title (All bottom items removed) */}
                <div className="absolute inset-0 flex items-end justify-start p-8 sm:p-10 z-10">
                  <span className="font-serif not-italic font-bold text-2.5xl sm:text-3xl lg:text-3.5xl text-white tracking-widest text-left select-none transition-transform duration-500 group-hover:translate-x-2">
                    {chTitle}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </motion.div>

      {/* Immersive Fullscreen Details Overlay */}
      <AnimatePresence>
        {selectedProject && (() => {
          const selectedChTitle = elegantChTitles[selectedProject.id] || "作品详情";
          const list = getProjectImagesWithCustom(selectedProject.id);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-stone-950 z-50 overflow-y-auto"
              id="works-detail-modal-overlay"
            >
              <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 relative animate-fade-in">
                
                {/* Left Section: Immersive high-definition zoom screen + Before/After comparer */}
                <div 
                  className="lg:col-span-12 relative h-screen w-full flex items-center justify-center bg-stone-900 overflow-hidden"
                  onWheel={handleWheel}
                >
                  
                  {/* Switcher & Progress in Top Left Corner */}
                  <div className="absolute top-6 left-6 z-40 flex items-center gap-3 select-none">
                    {/* Selected View Info Label */}
                    <span className="hidden md:inline-block font-mono text-[10px] text-stone-300 tracking-wider bg-stone-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-full border border-stone-700">
                      {isGridView ? "GRID INDEX VIEW" : `PASS 进度: ${String(activeImageIndex + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`}
                    </span>
 
                    {/* Switch Buttons */}
                    <div className="flex bg-stone-900/90 backdrop-blur-md border border-stone-700 p-1 rounded-full text-stone-400">
                      <button
                        onClick={() => setIsGridView(false)}
                        className={`p-1.5 px-3 rounded-full text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 transition-all ${!isGridView ? "bg-stone-800 text-white font-bold" : "hover:text-stone-200"}`}
                        title="Slideshow View"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span className="hidden xs:inline">单张</span>
                      </button>
                      <button
                        onClick={() => setIsGridView(true)}
                        className={`p-1.5 px-3 rounded-full text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 transition-all ${isGridView ? "bg-stone-800 text-white font-bold" : "hover:text-stone-200"}`}
                        title="Grid Index View"
                      >
                        <Grid className="w-3 h-3" />
                        <span className="hidden xs:inline">网格</span>
                      </button>
                    </div>
                  </div>
 
                  {/* Floating Close Button in Top Right */}
                  <div className="absolute top-6 right-6 z-40">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="group flex items-center gap-2 select-none px-5 py-2.5 bg-stone-900/90 border border-stone-700 backdrop-blur-md hover:bg-stone-850 text-white rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                      aria-label="Close modal"
                    >
                      <span>返回</span>
                    </button>
                  </div>

                  {/* Top-Center Gallery Customization Control */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex flex-wrap items-center justify-center gap-2 bg-stone-900/95 backdrop-blur-md border border-stone-700/80 p-1.5 px-3 rounded-full shadow-2xl select-none max-w-[90vw]">
                    {!isGridView && (
                      <>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 border-r border-stone-800 pr-2.5 mr-1 font-bold">
                          图层 #{String(activeImageIndex + 1).padStart(2, '0')}
                        </span>
                        {/* Replace Button */}
                        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-900/40 hover:border-emerald-500/40 text-emerald-300 rounded-full text-[10px] font-bold tracking-wide transition-all cursor-pointer hover:scale-102 active:scale-98">
                          <Upload className="w-3.5 h-3.5" />
                          <span>更换当前图片</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    const base64Src = event.target.result as string;
                                    setProjectCustomGallery((prev) => {
                                      const currentProjectCustoms = prev[selectedProject.id] || {};
                                      return {
                                        ...prev,
                                        [selectedProject.id]: {
                                          ...currentProjectCustoms,
                                          [activeImageIndex]: base64Src
                                        }
                                      };
                                    });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                        {/* Restore This Image Button */}
                        {list[activeImageIndex]?.isCustomized && (
                          <button
                            onClick={() => {
                              setProjectCustomGallery((prev) => {
                                const currentProjectCustoms = { ...(prev[selectedProject.id] || {}) };
                                delete currentProjectCustoms[activeImageIndex];
                                return {
                                  ...prev,
                                  [selectedProject.id]: currentProjectCustoms
                                };
                              });
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/45 hover:bg-rose-900/45 border border-rose-900/35 hover:border-rose-500/30 text-rose-300 rounded-full text-[10px] font-bold tracking-wide transition-all hover:scale-102 active:scale-98"
                            title="还原这张为原设"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>恢复原图</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* Batch Replace All Images Button */}
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-950/40 hover:bg-sky-900/40 border border-sky-900/40 hover:border-sky-500/40 text-sky-300 rounded-full text-[10px] font-bold tracking-wide transition-all cursor-pointer hover:scale-102 active:scale-98">
                      <Upload className="w-3.5 h-3.5" />
                      <span>一次性替换全部 ({list.length}张)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            const fileArray = Array.from(files) as File[];
                            const promises = fileArray.map((file) => {
                              return new Promise<string>((resolve) => {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  resolve(event.target?.result as string || "");
                                };
                                reader.readAsDataURL(file);
                              });
                            });
                            Promise.all(promises).then((results) => {
                              const validResults = results.filter(Boolean);
                              if (validResults.length > 0) {
                                setProjectCustomGallery((prev) => {
                                  const currentProjectCustoms = { ...(prev[selectedProject.id] || {}) };
                                  validResults.forEach((base64Src, index) => {
                                    if (index < list.length) {
                                      currentProjectCustoms[index] = base64Src;
                                    }
                                  });
                                  return {
                                    ...prev,
                                    [selectedProject.id]: {
                                      ...currentProjectCustoms
                                    }
                                  };
                                });
                              }
                            });
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* Reset All Gallery Customized Images for this project */}
                    {Object.keys(projectCustomGallery[selectedProject.id] || {}).length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm(`确定要恢复这 ${list.length} 张图片的所有默认渲染原图吗？`)) {
                            setProjectCustomGallery((prev) => {
                              const copy = { ...prev };
                              delete copy[selectedProject.id];
                              return copy;
                            });
                          }
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-800/85 hover:bg-stone-700/85 border border-stone-700/60 text-stone-300 rounded-full text-[10px] font-medium tracking-wide transition-all active:scale-95"
                        title={`恢复本套作品的 ${list.length} 张图片为默认原图`}
                      >
                        <span>重置整套</span>
                      </button>
                    )}
                  </div>
 
                  {/* Clean solid dark background without any blur effects */}
                  <div className="absolute inset-0 z-0 bg-stone-950" />
 
                  {/* Gallery Viewer Interface with Up to 30 Images */}
                  <div className="absolute inset-0 w-full h-full flex flex-col justify-between">
                    
                    {/* Main Workspace Frame */}
                    <div className="flex-1 w-full h-full relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        {!isGridView ? (
                          /* Slideshow Mode - Edge-to-edge adaptive view */
                          <motion.div
                            key={activeImageIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full bg-stone-900 flex items-center justify-center group/viewer select-none"
                          >
                            <img
                              src={list[activeImageIndex]?.url}
                              alt={list[activeImageIndex]?.title}
                              className="w-full h-full object-contain pointer-events-none transition-all duration-300"
                              referrerPolicy="no-referrer"
                            />
                            {/* Center interactive navigation pads (visible on hover or tap) */}
                            <div className="absolute inset-y-0 left-0 w-1/4 flex items-center pl-6 opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
                                }}
                                className="p-3.5 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:bg-stone-800 transition-all hover:scale-105 shadow-xl"
                                aria-label="Previous image"
                              >
                                <ArrowLeft className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end pr-6 opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
                                }}
                                className="p-3.5 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:bg-stone-800 transition-all hover:scale-105 shadow-xl"
                                aria-label="Next image"
                              >
                                <ArrowRight className="w-5 h-5" />
                              </button>
                            </div>
 
                          </motion.div>
                        ) : (
                          /* Grid Index Mode or Long Details View Mode */
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0 w-full h-full overflow-y-auto px-6 sm:px-12 pt-24 pb-32 text-left bg-stone-950/98 z-10"
                          >
                            {selectedProject.id === "vert_chronograph" ? (
                              /* 详情页长图观看 - Beautiful stacked long details page style */
                              <div className="max-w-xl mx-auto space-y-2 pb-12">
                                <div className="text-center mb-8">
                                  <p className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase font-bold">
                                    LONG DETAILS PAGE DESIGN // 详情页长图全景
                                  </p>
                                  <h3 className="font-serif italic text-2xl sm:text-3xl text-stone-200 mt-2">
                                    头戴式耳机·全案视觉详情
                                  </h3>
                                </div>

                                <div className="rounded-2xl overflow-hidden border border-stone-850 shadow-2xl bg-stone-900 divide-y divide-stone-850">
                                  {list.map((img, idx) => (
                                    <div
                                      key={idx}
                                      className="relative group/longimg w-full overflow-hidden"
                                    >
                                      <img
                                        src={img.url}
                                        alt={img.title}
                                        className="w-full h-auto object-contain block transition-transform duration-700"
                                        referrerPolicy="no-referrer"
                                      />

                                      {/* Information Label */}
                                      <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md border border-stone-800 px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-stone-200 select-none">
                                        模块 {String(idx + 1).padStart(2, '0')} // {img.title.split("//")[1] || "精修细节"}
                                      </div>

                                      {/* Quick controls on hover */}
                                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 opacity-0 group-hover/longimg:opacity-100 transition-opacity">
                                        <button
                                          onClick={() => {
                                            setActiveImageIndex(idx);
                                            setIsGridView(false);
                                          }}
                                          className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-white rounded-md text-[9px] font-mono tracking-wider transition-all cursor-pointer shadow-md"
                                        >
                                          <span>单张观看</span>
                                        </button>

                                        <label
                                          onClick={(e) => e.stopPropagation()}
                                          className="flex p-1.5 bg-stone-900/90 hover:bg-emerald-900/90 border border-stone-700 hover:border-emerald-500/50 rounded-md text-stone-300 hover:text-emerald-300 cursor-pointer active:scale-90 transition-all shadow-md"
                                          title="更换此张图片"
                                        >
                                          <Upload className="w-3.5 h-3.5" />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                  if (event.target?.result) {
                                                    const base64Src = event.target.result as string;
                                                    setProjectCustomGallery((prev) => {
                                                      const currentProjectCustoms = prev[selectedProject.id] || {};
                                                      return {
                                                        ...prev,
                                                        [selectedProject.id]: {
                                                          ...currentProjectCustoms,
                                                          [idx]: base64Src
                                                        }
                                                      };
                                                    });
                                                  }
                                                };
                                                reader.readAsDataURL(file);
                                              }
                                            }}
                                            className="hidden"
                                          />
                                        </label>

                                        {img.isCustomized && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setProjectCustomGallery((prev) => {
                                                const currentProjectCustoms = { ...(prev[selectedProject.id] || {}) };
                                                delete currentProjectCustoms[idx];
                                                return {
                                                  ...prev,
                                                  [selectedProject.id]: currentProjectCustoms
                                                };
                                              });
                                            }}
                                            className="flex p-1.5 bg-rose-950/90 hover:bg-rose-900/90 border border-rose-900/50 rounded-md text-rose-300 hover:text-rose-100 active:scale-90 transition-all shadow-md"
                                            title="还原此张图片"
                                          >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              /* Grid Index Mode - Shows all custom render frames in an overlay grid */
                              <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-6">
                                {list.map((img, idx) => (
                                  <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                      setActiveImageIndex(idx);
                                      setIsGridView(false);
                                    }}
                                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 bg-stone-900 group/thumbnail ${activeImageIndex === idx ? "border-emerald-500 shadow-lg shadow-emerald-500/10" : img.isCustomized ? "border-emerald-500/40 hover:border-emerald-500" : "border-stone-700 hover:border-stone-500"}`}
                                  >
                                    <img
                                      src={img.url}
                                      alt={img.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumbnail:scale-110 pointer-events-none"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-60 group-hover/thumbnail:opacity-90 transition-opacity" />
                                    
                                    {/* Left side level index badge */}
                                    <div className={`absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm border px-1.5 py-0.5 rounded text-[8px] font-mono ${img.isCustomized ? "border-emerald-500/50 text-emerald-400 font-bold" : "border-stone-850 text-stone-300"}`}>
                                      {String(idx + 1).padStart(2, '0')}{img.isCustomized && " ● 已换"}
                                    </div>

                                    {/* Right side hover actions */}
                                    <div className="absolute top-2 right-2 z-20 flex items-center gap-1 opacity-0 group-hover/thumbnail:opacity-100 transition-opacity">
                                      <label
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex p-1.5 bg-stone-900/90 hover:bg-emerald-900/90 border border-stone-700 hover:border-emerald-500/50 rounded-md text-stone-300 hover:text-emerald-300 cursor-pointer active:scale-90 transition-all shadow-md"
                                        title="更换此张图片"
                                      >
                                        <Upload className="w-3 h-3" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onload = (event) => {
                                                if (event.target?.result) {
                                                  const base64Src = event.target.result as string;
                                                  setProjectCustomGallery((prev) => {
                                                    const currentProjectCustoms = prev[selectedProject.id] || {};
                                                    return {
                                                      ...prev,
                                                      [selectedProject.id]: {
                                                        ...currentProjectCustoms,
                                                        [idx]: base64Src
                                                      }
                                                    };
                                                  });
                                                }
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                          className="hidden"
                                        />
                                      </label>
                                      
                                      {img.isCustomized && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setProjectCustomGallery((prev) => {
                                              const currentProjectCustoms = { ...(prev[selectedProject.id] || {}) };
                                              delete currentProjectCustoms[idx];
                                              return {
                                                ...prev,
                                                [selectedProject.id]: currentProjectCustoms
                                              };
                                            });
                                          }}
                                          className="flex p-1.5 bg-rose-950/90 hover:bg-rose-900/90 border border-rose-900/50 rounded-md text-rose-300 hover:text-rose-100 active:scale-90 transition-all shadow-md"
                                          title="还原此张图片"
                                        >
                                          <RotateCcw className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>

                                    <div className="absolute bottom-2 left-2 right-2 z-10 opacity-0 group-hover/thumbnail:opacity-100 transition-opacity duration-300">
                                      <p className="font-mono text-[7px] text-stone-300 tracking-wider truncate uppercase">
                                        {img.title.split("//")[1] || "渲染细节"}
                                      </p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
 
                    {/* Bottom slider layout controller floating above Slide Mode */}
                    <AnimatePresence>
                      {!isGridView && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-4xl w-[90%] bg-stone-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-700 z-20 select-none shadow-2xl"
                        >
                          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent snap-x">
                            {list.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 snap-center ${activeImageIndex === idx ? "border-emerald-500 ring-1 ring-emerald-500/30 scale-105" : "border-stone-850 opacity-40 hover:opacity-85 hover:scale-102"}`}
                              >
                                <img
                                  src={img.url}
                                  alt={img.title}
                                  className="w-full h-full object-cover pointer-events-none"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                                <span className="absolute bottom-0.5 right-1 z-10 font-mono text-[7px] text-white/80">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
 
                  </div>
 
                  {/* Elegant floating watermark */}
                  <div className="absolute bottom-6 left-6 z-20 hidden md:block select-none pointer-events-none text-left">
                    <h4 className="font-serif italic text-white/20 text-5xl font-light tracking-wider uppercase leading-none">
                      {selectedChTitle}
                    </h4>
                  </div>
 
                </div>
 
                {/* Right Section: Empty to fulfill user request of removing content */}
                <div className="hidden lg:block lg:col-span-0 w-0 h-0 overflow-hidden" />
 
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>


    </section>
  );
}
