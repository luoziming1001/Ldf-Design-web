import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Camera, Edit2, Save, Upload, User, Globe, Mail, Phone, MessageSquare, Copy, Check } from "lucide-react";
import { idbGet, idbSet } from "../lib/idb";

export default function About() {
  const [portrait, setPortrait] = useState<string>("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000");
  const isPortraitInitialized = useRef(false);

  useEffect(() => {
    async function loadPortrait() {
      let saved = await idbGet<string>("ziming_about_portrait");
      if (!saved) {
        try {
          saved = localStorage.getItem("ziming_about_portrait") || "";
          if (saved) {
            await idbSet("ziming_about_portrait", saved);
          }
        } catch {
          saved = "";
        }
      }
      if (saved) {
        setPortrait(saved);
      }
      isPortraitInitialized.current = true;
    }
    loadPortrait();
  }, []);

  useEffect(() => {
    if (!isPortraitInitialized.current) return;
    async function savePortrait() {
      await idbSet("ziming_about_portrait", portrait);
      try {
        localStorage.setItem("ziming_about_portrait", portrait);
      } catch (e) {
        // Suppress localStorage quota errors since IndexedDB succeeds
      }
    }
    savePortrait();
  }, [portrait]);

  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const [profile, setProfile] = useState(() => {
    const defaultProfile = {
      name: "骆子明 / Ziming",
      age: "25岁",
      gender: "男",
      education: "视觉传达设计 (本科)",
      phone: "159-8888-9999",
      email: "luoziming1001@gmail.com",
      wechat: "LuoZiming_Design",
      hobbies: "C4D三维精炼渲染、潮玩数码收集、AIGC创意生图、摄影与越野骑行",
      company: "知名3C数码配件电商大厂",
      time: "2024.03 - 至今",
      position: "高级视觉设计师",
      experience: "精通C4D/Octane/KeyShot及PS后期，深度结合AIGC工流，主要主导多款百万销量智能穿戴及潮玩首发主视觉、精细化材质打磨一站式视觉策划。",
      evaluation: "主张利用克制、大负空间美学降噪。具备像素级的三维写实场景塑造 and 物理高精度渲染工艺打磨能力，紧跟AIGC时代趋势赋能商业转化，为产品带来强烈情绪共鸣与高溢价心智。"
    };
    try {
      const saved = localStorage.getItem("ziming_about_profile_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultProfile, ...parsed };
      }
      return defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (key: keyof typeof profile, value: string) => {
    const updated = { ...profile, [key]: value };
    setProfile(updated);
    try {
      localStorage.setItem("ziming_about_profile_v2", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("图片大小不能超过 5MB // Image size should not exceed 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPortrait(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#f2f5f1] relative overflow-hidden"
    >
      {/* Decorative organic background blurs */}
      <div className="absolute right-[5%] top-[10%] w-[35vw] h-[35vw] rounded-full bg-radial from-[#d4e0d4]/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute left-[8%] bottom-[12%] w-[400px] h-[400px] rounded-full bg-[#cbd6cb]/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Editorial Header Section */}
        <div className="border-b border-stone-300 pb-8 mb-16 flex flex-col md:flex-row md:items-baseline justify-between">
          <div className="space-y-2">
            <h2 className="font-serif italic font-semibold text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] leading-none tracking-tight text-stone-950 drop-shadow-[0_2px_4px_rgba(255,255,255,0.45)]">
              关于我
            </h2>
          </div>
        </div>

        {/* Dynamic Editorial Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Dossier Information Grid */}
          <div className="lg:col-span-6 space-y-8" id="about-text-narrative">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#5c6e58] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#829e82] animate-pulse" />
                PERSONAL PROFILE DOSSIER // 简历档案
              </span>
            </div>

            {/* Profile Grid Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-4">
              {[
                { label: "姓名 // NAME", key: "name", placeholder: "姓名 (例如：骆子明)" },
                { label: "年龄 // AGE", key: "age", placeholder: "年龄 (例如：25岁)" },
                { label: "性别 // GENDER", key: "gender", placeholder: "性别 (例如：男)" },
                { label: "学历 // EDUCATION", key: "education", placeholder: "学历 (例如：高水平院校 · 视觉传达本科)" },
                { label: "电话 // PHONE", key: "phone", placeholder: "联系电话", type: "tel" },
                { label: "邮箱 // EMAIL", key: "email", placeholder: "电子邮箱", type: "email" },
                { label: "微信号 // WECHAT", key: "wechat", placeholder: "微信 ID" },
              ].map((item) => (
                <div key={item.key} className="space-y-1.5 pb-2 border-b border-[#e5eae3]">
                  <span className="text-xs text-stone-400 font-mono tracking-wider font-semibold uppercase block">
                    {item.label}
                  </span>
                  {isEditing ? (
                    <input
                      type={item.type || "text"}
                      value={profile[item.key as keyof typeof profile]}
                      onChange={(e) => handleProfileChange(item.key as keyof typeof profile, e.target.value)}
                      placeholder={item.placeholder}
                      className="w-full bg-white/70 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-stone-500"
                    />
                  ) : (
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-stone-900 font-medium text-base block font-sans truncate">
                        {profile[item.key as keyof typeof profile]}
                      </span>
                      {["phone", "email", "wechat"].includes(item.key) && (
                        <button
                          onClick={() => handleCopy(item.key, profile[item.key as keyof typeof profile])}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-all shrink-0 active:scale-95 border cursor-pointer ${
                            copiedStates[item.key]
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                              : "bg-white hover:bg-stone-900 border-stone-200 hover:border-stone-900 text-stone-600 hover:text-white"
                          }`}
                          title={`复制${item.label.split(" // ")[0]}`}
                        >
                          {copiedStates[item.key] ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>复制</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Multi-line fields for Experience and Evaluation */}
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <span className="text-xs text-stone-400 font-mono tracking-wider font-semibold uppercase block">
                  综合评价 // COMPREHENSIVE EVALUATION
                </span>
                {isEditing ? (
                  <textarea
                    value={profile.evaluation}
                    onChange={(e) => handleProfileChange("evaluation", e.target.value)}
                    rows={4}
                    className="w-full bg-white/70 border border-stone-300 rounded-lg px-2.5 py-2 text-xs text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-stone-500"
                    placeholder="输入综合评价..."
                  />
                ) : (
                  <div className="text-sm sm:text-base text-stone-800 leading-relaxed font-serif italic border-l-2 border-[#829e82] pl-4 py-1 text-justify">
                    "{profile.evaluation}"
                  </div>
                )}
              </div>


            </div>
          </div>

          {/* Right Column: Static Photo Composition */}
          <div className="lg:col-span-6 flex justify-center w-full" id="about-visual-editorial-panel">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] border border-stone-300/60 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl">
              
              <img 
                src={portrait}
                alt="骆子明 个人肖像"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle Linear Shadow Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-stone-900/5 pointer-events-none" />
              
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
