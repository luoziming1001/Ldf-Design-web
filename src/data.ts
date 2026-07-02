import { Project, DesignerStat, SkillItem } from "./types";

export const designerStats: DesignerStat[] = [
  {
    id: "exp",
    label: "专注电商视觉创意",
    value: "5+",
    unit: "年",
    description: "深耕高端美妆、消费电子、奢品等行业，专注打造差异化品牌视觉体系。"
  },
  {
    id: "ctr",
    label: "核心首屏点击率提升",
    value: "40.8",
    unit: "%",
    description: "拒绝平庸陈设，用极强的情绪对流光影与材质细节，深度拉伸转化漏斗。"
  },
  {
    id: "views",
    label: "服务线上Campaign覆盖",
    value: "1.2",
    unit: "亿+",
    description: "作品落地于天猫奢品 Tmall Luxury、抖音头部大牌及品牌官方独立站。"
  },
  {
    id: "rating",
    label: "项目全维度商业好评率",
    value: "99.2",
    unit: "%",
    description: "从三维模型扫描到后期全案合成，兼顾极致美学探索与商业目标落地。"
  }
];

export const skillItems: SkillItem[] = [
  // 核心视觉渲染/构筑能力
  { name: "Cinema 4D 空间建模", level: 95, category: "Core Design" },
  { name: "Octane / Redshift 真实感渲染", level: 92, category: "Core Design" },
  { name: "高级材质微刻 / 复杂布光", level: 90, category: "Core Design" },
  { name: "Photoshop 极致商业创意合成", level: 96, category: "Art Work" },
  { name: "Ai + Midjourney 人工智能辅助视觉", level: 88, category: "Art Work" },
  { name: "交互动效与三维页面体验设计", level: 85, category: "Interactive" }
];

export const portfolioProjects: Project[] = [
  {
    id: "aetheris",
    title: "AETHERIS 极境原生修护精华液",
    englishTitle: "Aetheris Cellular Serum Concept",
    category: "高端美妆 | C4D 3D空间渲染 · 艺术创意指导",
    imageUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200",
    client: "Aetheris Labs Inc.",
    date: "2026.03",
    role: "视觉总监 / 3D美术主创",
    description: "打破常规美妆产品温暖柔和的陈设陈词，将精华液瓶体置于经过高位微米级扫描的极冷玄武岩与润泽高山苔藓之上，通过凛冽而富有情绪感的光影，传达液体高浸透与极端细胞修护的坚韧生命张力。为高净值客群构筑强烈的视觉仪式感。",
    tags: ["C4D 高精度硬面", "植物微粒场景造景", "情绪冷感布光", "天猫奢品超级视觉"],
    stats: [
      { label: "视觉落地点击率 (CTR) 跃升", value: "+46.3%" },
      { label: "电商详情页新品购买转化", value: "11.24%" },
      { label: "客单价质感溢价接受度指标", value: "98.5%" }
    ],
    concept: "将地缘天然质料拉入极简商业静物。用粗粝玄武岩与湿密苔藓的生命张力，反观液体瓶体的莹润剔透、科学冷冽，在感官上实现产品「愈合、屏障」物理物理功效的直觉投射。",
    tools: ["Cinema 4D", "Octane Render", "Photoshop CC", "Substance Painter"],
    beforeImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200", // clay model
    afterImage: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200" // beauty art
  },
  {
    id: "orcus_audio",
    title: "ORCUS 鸣木系列环保声学耳机",
    englishTitle: "Orcus Eco-Acoustic Headphones",
    category: "数码电子 | 极简美学 · 空间微缩陈陈设",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1200",
    client: "ORCUS Acoustics Ltd.",
    date: "2026.01",
    role: "三维创意设计师 / 商业合成师",
    description: "针对全球倡导可持续的鸣木系列胡桃木再生耳机定制的品牌大图。利用大面积轻盈山川云雾以及长青碎石植物进行场景构筑，展现声学材质的高贵与自然共生。避开传统科技配色的厚重、数码感，转而渲染温润、空纳、静溢的空间。",
    tags: ["胡桃木拉丝微晶材质", "大自然声波造景", "柔冷暖漫反射光", "海外官网站群创意"],
    stats: [
      { label: "单页面停留停留时长", value: "4分12秒" },
      { label: "线上极客群首发预定量", value: "3.2万副" },
      { label: "设计社区Behance周精选奖", value: "Featured" }
    ],
    concept: "让工业归于林野。科技消融于天然微粒，当温润实木耳机轻置于野山清苔，光路透过繁茂叶片投下丁达尔射光，高精度的木质拉丝肌理与苔藓微小的叶孢共同谱写了无声的环保之音。",
    tools: ["Cinema 4D", "Redshift Render", "Marvelous Designer", "Photoshop"],
    beforeImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=1200", // clay wireframe layout
    afterImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1200" // detailed headphones rendering setup
  },
  {
    id: "wild_moss_perfume",
    title: "MOSS WANDERER 荒原苔迹古香水",
    englishTitle: "Moss Wanderer Eau de Parfum KVs",
    category: "奢侈香水 | 艺术场景重构 · 情绪通感流主视觉",
    imageUrl: "https://images.unsplash.com/photo-1523450001312-ffd43755c687?auto=format&fit=crop&q=80&w=1200",
    client: "L'Atelier de Botanique",
    date: "2025.11",
    role: "三维布光美术师 / 奢侈品视觉主创",
    description: "一瓶带走整座湿冷荒野。主视觉采用'粗野的优雅'作为美学支撑点，香水剔透的矿物玻璃底座，折射出水纹的碎落以及泥土苔痕的侵蚀。以微距镜头下的高对比冷感光影，直觉传达雨后潮湿苔藓、冬青与针叶冷松环托的沉静香调。",
    tags: ["极细微距景深渲染", "高阶折射反射精算", "情绪通感主干线", "海外众筹首发爆款"],
    stats: [
      { label: "页面点击转化漏斗 (ATC)", value: "+38.4%" },
      { label: "品牌认知正面心智反馈", value: "+73%" },
      { label: "全球媒体视觉报道引用", value: "24+" }
    ],
    concept: "用光线传递香气，将无形化为有形。在万物灰暗苍老的苔原深处中，只有该剔透玻璃瓶是唯一的光学重心。空气里的薄水雾由粒子系统计算飞舞，令人指尖发冷、呼吸清润。",
    tools: ["Cinema 4D", "Octane Render", "X-Particles", "DaVinci Resolve"],
    beforeImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200", // color blur base
    afterImage: "https://images.unsplash.com/photo-1523450001312-ffd43755c687?auto=format&fit=crop&q=80&w=1200" // crystal perfume beauty
  },
  {
    id: "vert_chronograph",
    title: "VERT CHRONO 绿野深林复古计秒精表",
    englishTitle: "Vert Luxury Chronograph Poster",
    category: "高级腕表 | 硬面精密渲染 · 商业精修大图合成",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200",
    client: "VERT Watchmakers Co.",
    date: "2025.09",
    role: "硬壳产品建模渲染师 / 精修大图合成师",
    description: "VERT新一代复古越野精钢表的跨国商用主KV。全片通过微距展现精钢拉丝表圈、太阳纹苔绿碳表盘、高难度的蓝宝石弧面反射。腕表被固定于悬空的常青雨林石柱之上，四周弥漫着天然雾晶与飞落的草叶，象征极致的探险精奢美学。",
    tags: ["硬面网格流线微晶精控建模", "金属各向异性微观渲染", "极致大图无损合成", "奢品海报级调色"],
    stats: [
      { label: "推广广告视觉 CTR", value: "+51.2%" },
      { label: "全站首跳跳出率降低", value: "28.4%" },
      { label: "整体订单转化率(CR)", value: "+3.45%" }
    ],
    concept: "时间的自然切片。腕表运转的绝对机械精确度，同古老花岗岩裂痕以及盘绕苔藓的野性美，在清冷高山的背景下达成绝妙的视觉和谐共鸣。",
    tools: ["Blender Engine", "Octane Render", "Photoshop Art", "Lightroom Classic"],
    beforeImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200", // raw basic render
    afterImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200" // completed luxury watch close-up
  }
];
