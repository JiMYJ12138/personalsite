/* @jsxRuntime classic */
/* global window */

const TWEAK_DEFAULTS = {
  accent: 'mist',
  density: 'standard',
  lang: 'en',
};

const ACCENT_PRESETS = {
  mist: { from: '#9bafb9', to: '#8198a5', glow: 'rgba(145,165,178,0.14)', label: '雾霾蓝 · Mist Blue' },
  violet: { from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139,92,246,0.35)', label: 'Violet' },
  blue:   { from: '#3b82f6', to: '#0ea5e9', glow: 'rgba(59,130,246,0.35)',  label: 'Signal Blue' },
  green:  { from: '#10b981', to: '#059669', glow: 'rgba(16,185,129,0.35)',  label: 'Emerald' },
};

/*
 * Canadian landscape imagery — every URL is a direct CDN link whose source page
 * explicitly tags the location. No people, no stock-looking placeholders.
 *
 *   moraine     Pexels 32371667 · "Serene View of Moraine Lake in Banff National Park"
 *   jasperTown  Wikimedia · "Town of Jasper" by Nikky D2 · CC BY-SA 4.0
 *   algonquin   Wikimedia · "A scenery from Algonquin Provincial Park"
 *               Autumn maple forest scenery · CC BY-SA 4.0
 *               https://commons.wikimedia.org/wiki/File:A_scenery_from_Algonquin_Provincial_Park.jpg
 *   algonquinAlt Wikimedia · "Algonquin Provincial Park- Fall Colour-View from Visitor Centre"
 *               https://commons.wikimedia.org/wiki/File:Algonquin_Provincial_Park-_Fall_Colour-View_from_Visitor_Centre_%E2%80%93Ontario.jpg
 *   rockies    Pexels 29188538 · Canadian Rockies
 *   canadaLake Pexels 34149168 · Moraine Lake sunrise
 */
const CANADA_PHOTOS = {
  moraine:
    'https://images.pexels.com/photos/32371667/pexels-photo-32371667.jpeg?auto=compress&cs=tinysrgb&w=1920',
  jasperTown:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Town_of_Jasper.jpg/1920px-Town_of_Jasper.jpg',
  algonquin:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/A_scenery_from_Algonquin_Provincial_Park.jpg/1920px-A_scenery_from_Algonquin_Provincial_Park.jpg',
  algonquinAlt:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Algonquin_Provincial_Park-_Fall_Colour-View_from_Visitor_Centre_%E2%80%93Ontario.jpg/1920px-Algonquin_Provincial_Park-_Fall_Colour-View_from_Visitor_Centre_%E2%80%93Ontario.jpg',
  rockies:
    'https://images.pexels.com/photos/29188538/pexels-photo-29188538.jpeg?auto=compress&cs=tinysrgb&w=1920',
  canadaLake:
    'https://images.pexels.com/photos/34149168/pexels-photo-34149168.jpeg?auto=compress&cs=tinysrgb&w=1920',
};

/* ============================================================
 *  JOURNEY DATA — bilingual
 *  Each entry has shared keys (year/end/chapter) + { zh, en } blocks.
 * ============================================================ */
const JOURNEY = [
  {
    year: '2016', end: '2019', chapter: '01',
    en: {
      region: 'New Zealand',
      title: 'IB Diploma, Auckland',
      body: 'Boarded the IB programme. First real reckoning with distance: 10,500 km from home, 17 hours ahead of a parent still asleep.',
      meta: ['North Island', 'South Island', 'IB Candidate'],
    },
    zh: {
      region: '新西兰',
      title: 'IB 文凭 · 奥克兰',
      body: '登上 IB 课程。第一次真正地理解"距离"：离家 10,500 公里，比还在熟睡的父母快 17 个小时。',
      meta: ['北岛', '南岛', 'IB 候选人'],
    },
  },
  {
    year: '2019', end: '2020', chapter: '02',
    en: {
      region: 'Ontario, Canada',
      title: 'OSSD · IELTS 7.0',
      body: 'Reset. One year in the Ontario Secondary School Diploma system, cracked the IELTS at 7.0, and started scouting Canadian universities.',
      meta: ['London, ON', 'IELTS Overall 7.0', 'OSSD'],
    },
    zh: {
      region: '加拿大 安大略',
      title: 'OSSD · 雅思 7.0',
      body: '重启一年。进入安省高中文凭体系，雅思 7.0 分，开始筛选加拿大的大学。',
      meta: ['安省 London', '雅思总分 7.0', 'OSSD'],
    },
  },
  {
    year: '2020', end: '2025', chapter: '03',
    feature: true,
    en: {
      region: 'Waterloo, ON',
      title: 'University of Waterloo · ERS',
      body: 'Environment, Resources and Sustainability — a program obsessed with carrying capacity, policy, and the real cost of resources. Co-op culture pushed me to think like an operator.',
      meta: ['BES Candidate', 'Faculty of Environment', 'Co-op Stream'],
    },
    zh: {
      region: '安省 滑铁卢',
      title: '滑铁卢大学 · 环境资源与可持续',
      body: '环境、资源与可持续专业——一个专注于承载力、政策和资源真实成本的学位。Co-op 文化让我开始像一个操盘手一样思考。',
      meta: ['环境学士在读', '环境学院', 'Co-op 带薪实习方向'],
    },
  },
  {
    year: '2025', end: 'Jul', chapter: '04',
    en: {
      region: 'Shenzhen',
      title: 'TikTok Shop · Cross-Border Full-Service Operator',
      body: 'First role after returning: ran end-to-end cross-border e-commerce accounts on TikTok Shop. Compressed everything I knew about audience, logistics, and content into one shipping lane.',
      meta: ['Full-Service Ops', 'Cross-border'],
    },
    zh: {
      region: '深圳',
      title: 'TikTok Shop · 跨境全托管运营',
      body: '回国后的第一份工作：在 TikTok Shop 做端到端的跨境电商账号运营，把对受众、物流、内容的理解全部压缩进一条履约链路。',
      meta: ['全托管运营', '跨境电商'],
    },
  },
  {
    year: '2025', chapter: '05',
    en: {
      end: 'Now',
      region: 'Beijing',
      title: 'ByteDance · Product Operations (Contractor)',
      body: 'Currently embedded on a ByteDance product operations team. Still learning the house style: ship weekly, measure obsessively, keep ambition in the roadmap.',
      meta: ['Product Ops', 'Contractor'],
    },
    zh: {
      end: '至今',
      region: '北京',
      title: '字节跳动 · 产品运营（外包）',
      body: '目前在字节跳动的产品运营团队。还在学习这里的工作方式：周更迭代、极致度量、把野心留在路线图里。',
      meta: ['产品运营', '外包'],
    },
  },
];

/* ============================================================
 *  CITIES & CITY META — bilingual
 * ============================================================ */
const CANADA_CITIES = {
  Ontario: [
    'Waterloo', 'Toronto', 'Ottawa', 'Niagara', 'London', 'Sarnia',
    'Bruce Peninsula', 'North York', 'Richmond Hill', 'Huntsville',
    'Algonquin Park', 'Barrie', 'Owen Sound',
  ],
  Quebec: ['Montreal', 'Quebec City'],
  Alberta: ['Banff', 'Calgary', 'Jasper'],
};

const PROVINCE_LABEL = {
  en: { Ontario: 'Ontario', Quebec: 'Quebec', Alberta: 'Alberta' },
  zh: { Ontario: '安大略省', Quebec: '魁北克省', Alberta: '阿尔伯塔省' },
};

const CITY_META = {
  'Waterloo':        { en: { name: 'Waterloo',        note: 'University home · 5 yrs' },
                       zh: { name: '滑铁卢',          note: '大学所在地 · 5 年' }, hero: true },
  'Banff':           { en: { name: 'Banff',           note: 'National Park · Moraine Lake' },
                       zh: { name: '班夫',            note: '国家公园 · 梦莲湖' }, hero: true },
  'Jasper':          { en: { name: 'Jasper',          note: 'Mountain townsite · Canadian Rockies' },
                       zh: { name: '贾斯珀',          note: '落基山小镇 · 加拿大落基山' }, hero: true },
  'Algonquin Park':  { en: { name: 'Algonquin Park',  note: 'Autumn drive · Lake of Two Rivers' },
                       zh: { name: '阿冈昆公园',      note: '秋日自驾 · 双河湖' }, hero: true },
  'Toronto':         { en: { name: 'Toronto',         note: 'Downtown core · CN Tower' },
                       zh: { name: '多伦多',          note: '市中心 · CN 塔' } },
  'Niagara':         { en: { name: 'Niagara',         note: 'Horseshoe Falls' },
                       zh: { name: '尼亚加拉',        note: '马蹄瀑布' } },
  'Quebec City':     { en: { name: 'Quebec City',     note: 'Vieux-Québec · UNESCO' },
                       zh: { name: '魁北克城',        note: '老城 · 世界遗产' } },
  'Montreal':        { en: { name: 'Montreal',        note: 'Plateau · Mont-Royal' },
                       zh: { name: '蒙特利尔',        note: '高原区 · 皇家山' } },
  'Ottawa':          { en: { name: 'Ottawa',          note: 'Capital · 45.4215°N' },
                       zh: { name: '渥太华',          note: '首都 · 45.4215°N' } },
  'Calgary':         { en: { name: 'Calgary',         note: 'Gateway to the Rockies' },
                       zh: { name: '卡尔加里',        note: '通往落基山的门户' } },
  'London':          { en: { name: 'London' },        zh: { name: '伦敦（安省）' } },
  'Sarnia':          { en: { name: 'Sarnia' },        zh: { name: '萨尼亚' } },
  'Bruce Peninsula': { en: { name: 'Bruce Peninsula' }, zh: { name: '布鲁斯半岛' } },
  'North York':      { en: { name: 'North York' },    zh: { name: '北约克' } },
  'Richmond Hill':   { en: { name: 'Richmond Hill' }, zh: { name: '列治文山' } },
  'Huntsville':      { en: { name: 'Huntsville' },    zh: { name: '亨茨维尔' } },
  'Barrie':          { en: { name: 'Barrie' },        zh: { name: '巴里' } },
  'Owen Sound':      { en: { name: 'Owen Sound' },    zh: { name: '欧文桑德' } },
};

const WORK = [
  {
    period: '2025 → Now', status: 'Current', accent: true,
    en: {
      org: 'ByteDance',
      role: 'Product Operations · Contractor',
      location: 'Beijing',
      stack: ['Internal product tooling', 'Operations analytics', 'A/B workflows'],
      statusLabel: 'Current',
      periodLabel: '2025 → Now',
    },
    zh: {
      org: '字节跳动',
      role: '产品运营 · 外包',
      location: '北京',
      stack: ['内部产品工具', '运营数据分析', 'A/B 实验流'],
      statusLabel: '进行中',
      periodLabel: '2025 → 至今',
    },
  },
  {
    period: '2025 Jul → 2025', status: 'Shipped',
    en: {
      org: 'TikTok Shop',
      role: 'Cross-border E-commerce · Full-Service Operator',
      location: 'Shenzhen · Remote',
      stack: ['Account build-out', 'Content localization', 'Shipping-lane ops'],
      statusLabel: 'Shipped',
      periodLabel: '2025 Jul → 2025',
    },
    zh: {
      org: 'TikTok Shop',
      role: '跨境电商 · 全托管运营',
      location: '深圳 · 远程',
      stack: ['店铺从 0 到 1', '内容本地化', '履约链路运营'],
      statusLabel: '已交付',
      periodLabel: '2025.07 → 2025',
    },
  },
  {
    period: '2020 → 2025 Jul', status: 'Graduated',
    en: {
      org: 'University of Waterloo',
      role: 'Environment, Resources & Sustainability · Undergrad',
      location: 'Waterloo, ON',
      stack: ['Carrying-capacity models', 'Policy analysis', 'Co-op placements'],
      statusLabel: 'Graduated',
      periodLabel: '2020 → 2025.07',
    },
    zh: {
      org: '滑铁卢大学',
      role: '环境、资源与可持续 · 本科',
      location: '安省 滑铁卢',
      stack: ['环境承载力模型', '政策分析', 'Co-op 带薪实习'],
      statusLabel: '已毕业',
      periodLabel: '2020 → 2025.07',
    },
  },
];

const NZ_CITIES = ['Auckland', 'Rotorua', 'Devonport', 'Queenstown'];
const NZ_CITIES_ZH = {
  Auckland: '奥克兰', Rotorua: '罗托鲁瓦', Devonport: '德文波特', Queenstown: '皇后镇',
};

/* ============================================================
 *  UI COPY — all static strings, bilingual
 * ============================================================ */
const COPY = {
  en: {
    nav: {
      about: 'About', journey: 'Journey', atlas: 'Atlas', work: 'Work', contact: 'Contact',
      available: 'Available for 2026',
      langLabel: 'Language',
      profile: 'Profile',
    },
    hero: {
      kicker: 'PORTFOLIO · V2.0 · UPDATED',
      // The display headline is intentionally English in both modes
      titleLine1Pre: 'From New Zealand to ',
      titleAccent: 'Canada',
      titleLine1Post: ',',
      titleLine2: 'then back to China.',
      lede: 'Eight years of study and life abroad taught me to read environments, cities, and cultures — and led me into cross-border commerce and product operations.',
      stat1Label: 'YRS IN CANADA',
      stat2Label: 'CA CITIES ROADTRIPPED',
      stat3Label: 'IELTS · OSSD',
      marquee: [
        '· Environment Resources Sustainability',
        '· University of Waterloo · ON · Canada',
        '· Cross-border e-commerce · TikTok Shop',
        '· Product Operations · ByteDance',
        '· IB diploma · OSSD · IELTS 7.0',
      ],
      heroCardCode: 'HOME_01 · 51.3217°N 116.1860°W',
      heroCardTitle: 'Moraine Lake · Banff, AB',
    },
    about: {
      section: 'SECTION_01 / ABOUT',
      heading: 'The long arc of a working education.',
      p1Parts: [
        'I grew up moving. Three years of secondary school in ',
        'Auckland, New Zealand',
        ' on the IB diploma track taught me how to be new in a place. Five years in ',
        'Canada',
        ' — OSSD, an IELTS of 7.0, and an undergraduate degree in Environment, Resources & Sustainability from the ',
        'University of Waterloo',
        ' — taught me how to stay.',
      ],
      p2Parts: [
        'Today I work in ',
        'Beijing',
        ', where I bring that outsider\u2019s attention to cross-border commerce: first full-service TikTok Shop operations, then product operations at ByteDance. I\u2019m interested in the places where ecological logic and consumer logic argue, and in the operators who have to translate between them.',
      ],
    },
    journey: {
      section: 'SECTION_02 / TIMELINE',
      heading: 'Journey, by hemisphere.',
      intro: 'A near-decade of moves across three countries. Each chapter is a bet on where I thought I could learn fastest.',
      chapterLabel: 'CH.',
    },
    atlas: {
      section: 'SECTION_03 / ATLAS',
      headingPre: '',
      headingAccent: 'Canada',
      headingPost: ', by road.',
      intro: (total) => `Five years with a driver\u2019s license and a tank of regular. ${total} places logged across three provinces — from the Icefields Parkway to the limestone edge of Georgian Bay.`,
      statProvinces: 'CA_PROVINCES: 3',
      statCities: (t) => `CA_CITIES: ${t}`,
      statNz: 'NZ_CITIES: 4',
      featuredCode: 'FEATURED · AB_01',
      featuredTitle: 'Moraine Lake',
      featuredSub: 'Banff National Park · Alberta',
      jasperCode: 'AB_02',
      jasperTitle: 'Jasper · mountain town',
      algonquinCode: 'ON_01',
      algonquinTitle: 'Algonquin · autumn maples',
      appendixLabel: 'APPENDIX · NEW ZEALAND',
      appendixCount: '2016–2019 · 4 cities',
    },
    work: {
      section: 'SECTION_04 / WORK',
      heading: 'Where the hours go.',
      col: {
        org: 'Organization', role: 'Role', period: 'Period', focus: 'Focus', status: 'Status',
      },
    },
    contact: {
      section: 'SECTION_05 / CONTACT',
      heading1: 'Say hello.',
      heading2: 'Let\u2019s build something that lasts.',
      body: 'Open to full-time product operations, cross-border commerce, or any role at the intersection of sustainability and consumer platforms.',
      sendBtn: 'Send email',
      cvBtn: 'Download CV ↓',
      lockedLabel: 'CONTACT_CARD · PRIVATE',
      lockedTitle: 'Contact details are kept private.',
      lockedBody: 'View my name and personal email in the contact card.',
      lockedFields: ['Name', 'Personal email', 'Timezone'],
      lockedCta: 'View personal info',
      footerTitle: 'Welcome to My Site',
      footerMeta: (iso) => `© 2026 · Built with React · Deployed from Beijing · Last updated ${iso}`,
      systemLabel: 'SYSTEM NOMINAL',
    },
    tweaks: {
      trigger: 'PERSONALIZE',
      heading: 'Tweaks · personalize',
      accent: 'Accent',
      density: 'Content Density',
      densityOpts: { minimal: 'Spare', standard: 'Standard', detailed: 'Dense' },
      language: 'Language',
      reset: 'Reset to defaults',
    },
  },

  zh: {
    nav: {
      about: '关于', journey: '轨迹', atlas: '地图', work: '工作', contact: '联系',
      available: '2026 可入职',
      langLabel: '语言',
      profile: '个人信息',
    },
    hero: {
      kicker: '作品集 · V2.0 · 更新于',
      // Display headline stays English — "大标题要英文"
      titleLine1Pre: 'From New Zealand to ',
      titleAccent: 'Canada',
      titleLine1Post: ',',
      titleLine2: 'then back to China.',
      lede: '八年海外学习与生活让我学会理解环境、城市与不同文化，也把我带到跨境电商和产品运营的现场。',
      stat1Label: '在加拿大的年数',
      stat2Label: '自驾过的加国城市',
      stat3Label: '雅思 · OSSD',
      marquee: [
        '· 环境、资源与可持续',
        '· 滑铁卢大学 · 加拿大 安省',
        '· 跨境电商 · TikTok Shop',
        '· 产品运营 · 字节跳动',
        '· IB 文凭 · OSSD · 雅思 7.0',
      ],
      heroCardCode: 'HOME_01 · 51.3217°N 116.1860°W',
      heroCardTitle: '梦莲湖 · 班夫，阿尔伯塔',
    },
    about: {
      section: 'SECTION_01 / 关于',
      heading: '一段很长的在读与在做。',
      p1Parts: [
        '我是在搬家中长大的。在 ',
        '新西兰 奥克兰',
        ' 读了三年 IB 高中，教会我如何在一个新地方从零开始；之后在 ',
        '加拿大',
        ' 的五年——OSSD 高中、雅思 7.0，以及 ',
        '滑铁卢大学',
        ' 的环境、资源与可持续本科——教会我如何真正留下来。',
      ],
      p2Parts: [
        '现在我在 ',
        '北京',
        ' 工作，把那种外来者的敏感带进跨境生意：先是 TikTok Shop 的全托管运营，然后是字节跳动的产品运营。我关心生态逻辑和消费逻辑互相争辩的地方，以及必须在两种语言之间翻译的操盘者。',
      ],
    },
    journey: {
      section: 'SECTION_02 / 时间线',
      heading: '按半球划分的轨迹。',
      intro: '近十年、三个国家、五次搬家。每一章都是一次赌注——赌我能在哪里学得最快。',
      chapterLabel: 'CH.',
    },
    atlas: {
      section: 'SECTION_03 / 地图',
      headingPre: '把 ',
      headingAccent: '加拿大',
      headingPost: ' 开成一条路。',
      intro: (total) => `五年手握加拿大驾照和一箱 regular 汽油。走过了三个省的 ${total} 个地方——从冰原大道一直到乔治安湾的石灰岩海岸。`,
      statProvinces: '加国省份：3',
      statCities: (t) => `加国城市：${t}`,
      statNz: '新西兰城市：4',
      featuredCode: 'FEATURED · AB_01',
      featuredTitle: '梦莲湖 Moraine Lake',
      featuredSub: '班夫国家公园 · 阿尔伯塔',
      jasperCode: 'AB_02',
      jasperTitle: 'Jasper · 落基山小镇',
      algonquinCode: 'ON_01',
      algonquinTitle: '阿冈昆 · 秋日枫林',
      appendixLabel: 'APPENDIX · 新西兰',
      appendixCount: '2016–2019 · 4 座城市',
    },
    work: {
      section: 'SECTION_04 / 工作',
      heading: '时间都花在哪里。',
      col: {
        org: '机构', role: '角色', period: '时间', focus: '方向', status: '状态',
      },
    },
    contact: {
      section: 'SECTION_05 / 联系',
      heading1: '打个招呼。',
      heading2: '一起做一些能留下来的东西。',
      body: '欢迎关于全职产品运营、跨境电商，以及任何处在可持续与消费平台交界处的角色。',
      sendBtn: '发送邮件',
      cvBtn: '下载简历 ↓',
      lockedLabel: 'CONTACT_CARD · 私密',
      lockedTitle: '联系方式默认隐藏。',
      lockedBody: '点击查看姓名和个人邮箱。',
      lockedFields: ['姓名', '个人邮箱', '时区'],
      lockedCta: '查看个人信息',
      footerTitle: 'Welcome to My Site',
      footerMeta: (iso) => `© 2026 · 基于 React 构建 · 在北京部署 · 最近更新 ${iso}`,
      systemLabel: '系统正常',
    },
    tweaks: {
      trigger: '个性化',
      heading: '个性化 · 设计偏好',
      accent: '主色',
      density: '内容密度',
      densityOpts: { minimal: '简约', standard: '标准', detailed: '密集' },
      language: '语言',
      reset: '恢复默认',
    },
  },
};

/* Personal info — only rendered inside the on-demand ProfileModal */
const PROFILE = {
  name: '焦志超',
  handle: 'jiaozhichao.cxtk',
  personalEmail: 'jiaozzzccc@163.com',
  copy: {
    en: {
      label: 'PERSONAL_INFO · UNLOCKED',
      role: 'Product Operations · Cross-border Commerce',
      edu: 'University of Waterloo · ERS',
      rows: { name: 'Name', personalEmail: 'Personal email', based: 'Based', tz: 'Timezone' },
      based: 'Beijing, CN',
      tz: 'UTC+8 · daytime',
      copy: 'Copy',
      copied: 'Copied',
      mail: 'Send email',
      close: 'Close',
      hint: 'ESC to close',
    },
    zh: {
      label: 'PERSONAL_INFO · 已解锁',
      role: '产品运营 · 跨境电商',
      edu: '滑铁卢大学 · 环境资源与可持续',
      rows: { name: '姓名', personalEmail: '个人邮箱', based: '所在地', tz: '时区' },
      based: '中国 · 北京',
      tz: 'UTC+8 · 白天',
      copy: '复制',
      copied: '已复制',
      mail: '发送邮件',
      close: '关闭',
      hint: 'ESC 关闭',
    },
  },
};

const LANG_OPTIONS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文',    short: '中' },
];

Object.assign(window, {
  TWEAK_DEFAULTS,
  ACCENT_PRESETS,
  CANADA_PHOTOS,
  JOURNEY,
  CANADA_CITIES,
  PROVINCE_LABEL,
  CITY_META,
  WORK,
  NZ_CITIES,
  NZ_CITIES_ZH,
  COPY,
  PROFILE,
  LANG_OPTIONS,
});
