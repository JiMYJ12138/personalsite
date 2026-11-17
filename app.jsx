/* @jsxRuntime classic */
/* global React, ReactDOM, window, document */

(function initApp() {
const { useState, useEffect, useCallback } = React;
const {
  TWEAK_DEFAULTS,
  ACCENT_PRESETS,
  Nav,
  Hero,
  About,
  Journey,
  Atlas,
  Work,
  Contact,
  TweaksPanel,
  ProfileModal,
} = window;

const STORAGE_KEY = 'design-tweaks-mist-portfolio-v9';
const SUPPORTED_LANGS = ['en', 'zh'];

function useTweaks() {
  const [tweaks, setTweaks] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const parsed = { ...TWEAK_DEFAULTS, ...JSON.parse(s) };
        if (!SUPPORTED_LANGS.includes(parsed.lang)) {
          parsed.lang = TWEAK_DEFAULTS.lang;
        }
        return parsed;
      }
      return TWEAK_DEFAULTS;
    } catch {
      return TWEAK_DEFAULTS;
    }
  });

  const persist = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    persist(next);
  };

  const reset = () => {
    setTweaks(TWEAK_DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return { tweaks, update, reset };
}

function App() {
  const { tweaks, update, reset } = useTweaks();
  const preset = ACCENT_PRESETS[tweaks.accent];
  const { lang } = tweaks;
  const setLang = (code) => update({ lang: code });
  const [profileOpen, setProfileOpen] = useState(false);
  const openProfile = useCallback(() => setProfileOpen(true), []);
  const closeProfile = useCallback(() => setProfileOpen(false), []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  return (
    <div
      className="grain min-h-screen"
      style={{
        '--accent': preset.from,
        '--accent-2': preset.to,
        '--accent-glow': preset.glow,
      }}
    >
      <Nav lang={lang} setLang={setLang} onOpenProfile={openProfile} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Journey tweaks={tweaks} lang={lang} />
      <Atlas tweaks={tweaks} lang={lang} />
      <Work lang={lang} />
      <Contact lang={lang} onOpenProfile={openProfile} />
      <TweaksPanel tweaks={tweaks} update={update} reset={reset} lang={lang} />
      <ProfileModal open={profileOpen} onClose={closeProfile} lang={lang} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}());
