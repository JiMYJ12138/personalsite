/* @jsxRuntime classic */
/* global React, window */

(function initComponents() {
const { useState, useEffect, useRef } = React;
const { CANADA_PHOTOS, COPY, LANG_OPTIONS } = window;

const REVEAL_THRESHOLD = 0.12;
const COUNT_FRAME_START = null;
const DEFAULT_COUNT_DURATION = 1200;
const EASING_POW = 3;
const ISO_DATE_LEN = 10;
const COUNTUP_THRESHOLD = 0.5;

/* === Scroll-triggered reveal === */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
      }
    }), { threshold: REVEAL_THRESHOLD });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`fade-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* === Count-up number === */
function CountUp({ to, suffix = '', duration = DEFAULT_COUNT_DURATION }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }
    let raf;
    let start = COUNT_FRAME_START;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const step = (ts) => {
          if (!start) {
            start = ts;
          }
          const p = Math.min(1, (ts - start) / duration);
          const eased = 1 - Math.pow(1 - p, EASING_POW);
          setVal(Math.round(eased * to));
          if (p < 1) {
            raf = requestAnimationFrame(step);
          }
        };
        raf = requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: COUNTUP_THRESHOLD });
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* === Language switcher (nav right-side dropdown) === */
function LangSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const current = LANG_OPTIONS.find((o) => o.code === lang) || LANG_OPTIONS[0];
  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 px-3 h-8 rounded-md border font-mono text-[11px] tracking-wide hover:border-white/30 transition-colors"
        style={{ borderColor: 'var(--line-strong)', color: 'var(--fg-muted)', background: 'rgba(17,17,19,0.6)' }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm text-[9px] font-semibold"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
          {current.short}
        </span>
        <span className="group-hover:text-white transition-colors">{current.label}</span>
        <span className="opacity-50 text-[9px]">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] w-[150px] rounded-lg border p-1 shadow-2xl backdrop-blur-xl z-[60]"
          style={{ borderColor: 'var(--line-strong)', background: 'rgba(14,14,16,0.96)' }}
        >
          {LANG_OPTIONS.map((o) => {
            const active = o.code === lang;
            return (
              <li key={o.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLang(o.code);
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-xs transition-colors hover:bg-white/5"
                  style={{ color: active ? '#fff' : 'var(--fg-muted)' }}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm font-mono text-[10px] font-semibold"
                      style={{
                        background: active ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : 'rgba(255,255,255,0.06)',
                        color: active ? '#fff' : 'var(--fg-muted)',
                      }}>
                      {o.short}
                    </span>
                    <span>{o.label}</span>
                  </span>
                  {active && <span style={{ color: 'var(--accent)' }}>●</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* === Section scrolling (JS-driven; works inside sandboxed preview iframes) === */
const NAV_OFFSET = 56;
const SECTION_IDS = ['about', 'journey', 'atlas', 'work', 'contact'];
const ACTIVE_PROBE = 0.35;

function scrollToSection(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const probe = window.innerHeight * ACTIVE_PROBE;
      let current = null;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - probe <= 0) {
          current = id;
        }
      });
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? 'contact' : current);
    };
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);
  return active;
}

/* === Nav === */
function Nav({ lang, setLang, onOpenProfile }) {
  const t = COPY[lang].nav;
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const rowRef = useRef(null);
  const links = SECTION_IDS.map((id, i) => ({ id, label: t[id], idx: String(i + 1).padStart(2, '0') }));

  // Sliding indicator follows the active link
  useEffect(() => {
    const row = rowRef.current;
    const btn = row && active ? row.querySelector(`[data-id="${active}"]`) : null;
    if (!btn) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ left: btn.offsetLeft, width: btn.offsetWidth, visible: true });
  }, [active, lang]);

  const go = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-14 z-50 border-b" style={{ borderColor: 'var(--line)', background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1360px] mx-auto h-full px-6 flex items-center justify-between">
        <button type="button" onClick={go('top')} className="flex items-center gap-3 cursor-pointer" aria-label="Back to top">
          <div className="w-6 h-6 rounded-md" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }} />
          <span className="font-mono text-sm font-medium tracking-tight">
            Welcome to My Site
          </span>
        </button>

        <div ref={rowRef} className="nav-row hidden md:flex items-center gap-1 text-sm relative">
          <span
            className="nav-pill"
            style={{ transform: `translateX(${pill.left}px)`, width: pill.width, opacity: pill.visible ? 1 : 0 }}
          />
          {links.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.id}
                data-id={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={on ? 'true' : undefined}
                className={`nav-link ${on ? 'is-active' : ''}`}
              >
                <span className="nav-idx">{l.idx}</span>
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--fg-dim)' }}>
            <span className="dot live" />
            <span>{t.available}</span>
          </div>
          <button
            type="button"
            onClick={onOpenProfile}
            className="profile-trigger"
            aria-haspopup="dialog"
            aria-label={t.profile}
          >
            <span className="profile-trigger-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" /></svg>
            </span>
            <span className="hidden sm:inline">{t.profile}</span>
          </button>
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            type="button"
            className="md:hidden w-8 h-8 rounded-md border flex flex-col items-center justify-center gap-[3px]"
            style={{ borderColor: 'var(--line-strong)' }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`burger-bar ${menuOpen ? 'b1' : ''}`} />
            <span className={`burger-bar ${menuOpen ? 'b2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-b px-6 py-3 mobile-menu" style={{ borderColor: 'var(--line)', background: 'rgba(10,10,10,0.96)' }}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className="flex items-center justify-between py-3 border-b last:border-b-0 text-base"
              style={{ borderColor: 'var(--line)', color: active === l.id ? '#fff' : 'var(--fg-muted)' }}
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[11px]" style={{ color: active === l.id ? 'var(--accent)' : 'var(--fg-dim)' }}>{l.idx}</span>
                {l.label}
              </span>
              <span style={{ color: 'var(--fg-dim)' }}>→</span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* === Hero === */
function Hero({ lang }) {
  const t = COPY[lang].hero;
  return (
    <section className="relative pt-40 pb-32 px-6 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-[1360px] mx-auto grid grid-cols-12 gap-6 relative z-10">
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-center gap-3 mb-10 text-meta">
            <span className="dot" />
            <span>{t.kicker} {new Date().toISOString().slice(0, ISO_DATE_LEN)}</span>
          </div>
          {/* Display headline — ALWAYS English per spec */}
          <h1 className="display-hero mb-10">
            {t.titleLine1Pre}<span className="gradient-accent">{t.titleAccent}</span>{t.titleLine1Post}<br />
            {t.titleLine2}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            {t.lede}
          </p>
          <div className="mt-14 flex items-center gap-8 font-mono text-xs" style={{ color: 'var(--fg-dim)' }}>
            <div><div className="text-3xl font-sans text-white font-medium"><CountUp to={5} /></div><div className="mt-1">{t.stat1Label}</div></div>
            <div className="w-px h-10" style={{ background: 'var(--line)' }} />
            <div><div className="text-3xl font-sans text-white font-medium"><CountUp to={13} />+</div><div className="mt-1">{t.stat2Label}</div></div>
            <div className="w-px h-10" style={{ background: 'var(--line)' }} />
            <div><div className="text-3xl font-sans text-white font-medium">7.0</div><div className="mt-1">{t.stat3Label}</div></div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:pl-6">
          <div className="spotlight relative aspect-[4/5] overflow-hidden rounded-lg border" style={{ borderColor: 'var(--line-strong)' }}>
            <img src={CANADA_PHOTOS.moraine} alt="Moraine Lake, Banff National Park, Alberta" className="absolute inset-0 w-full h-full object-cover img-dim z-10" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.85), transparent)' }}>
              <div className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--fg-dim)' }}>{t.heroCardCode}</div>
              <div className="text-sm mt-1 font-medium">{t.heroCardTitle}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-28 overflow-hidden border-t border-b py-5" style={{ borderColor: 'var(--line)' }}>
        <div className="marquee-track flex items-center gap-10 font-mono text-xs uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--fg-dim)' }}>
          {[0, 1].map((dup) => (
            <React.Fragment key={dup}>
              {t.marquee.map((item) => (
                <React.Fragment key={item}>
                  <span>{item}</span>
                  <span style={{ color: 'var(--accent)' }}>→</span>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === About === */
function About({ lang }) {
  const t = COPY[lang].about;
  // p1Parts & p2Parts alternate plain / highlighted text.
  const renderPara = (parts) => parts.map((seg, i) => (
    i % 2 === 1
      ? <span key={i} className="text-white">{seg}</span>
      : <React.Fragment key={i}>{seg}</React.Fragment>
  ));
  return (
    <section id="about" className="py-32 px-6 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-[1360px] mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--fg-dim)' }}>
            <span className="dot" style={{ background: 'var(--accent)', marginRight: 8 }} />
            {t.section}
          </div>
          <h2 className="display-section">{t.heading}</h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-lg" style={{ color: 'var(--fg-muted)' }}>
          <p>{renderPara(t.p1Parts)}</p>
          <p>{renderPara(t.p2Parts)}</p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Reveal, CountUp, Nav, Hero, About, LangSwitcher, ISO_DATE_LEN, scrollToSection,
});
}());
