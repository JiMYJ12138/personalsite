/* @jsxRuntime classic */
/* global React, window, document, navigator */

(function initSections() {
const { useState, useEffect, useRef } = React;
const {
  ACCENT_PRESETS, CANADA_PHOTOS, JOURNEY, CANADA_CITIES, PROVINCE_LABEL,
  CITY_META, WORK, NZ_CITIES, NZ_CITIES_ZH, COPY, PROFILE, LANG_OPTIONS,
  Reveal, ISO_DATE_LEN,
} = window;

const REVEAL_STEP_MS = 60;
const CA_CODE_PAD = 2;
const ROW_STEP_MS = 50;

/* === Journey === */
function Journey({ tweaks, lang }) {
  const t = COPY[lang].journey;
  return (
    <section id="journey" className="py-32 px-6 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--fg-dim)' }}>
              <span className="dot" style={{ background: 'var(--accent)', marginRight: 8 }} />
              {t.section}
            </div>
            <h2 className="display-section">{t.heading}</h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 pt-6">
            <p className="text-lg" style={{ color: 'var(--fg-muted)' }}>
              {t.intro}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {JOURNEY.map((j, i) => {
            const d = j[lang];
            const end = d.end || j.end;
            return (
              <Reveal key={j.chapter} delay={i * REVEAL_STEP_MS}>
                <div
                  className={`grid grid-cols-12 gap-6 p-6 md:p-8 border rounded-xl transition-all hover:border-white/20 ${j.feature ? 'relative overflow-hidden' : ''}`}
                  style={{
                    borderColor: 'var(--line)',
                    background: j.feature
                      ? 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(99,102,241,0.03))'
                      : 'var(--bg-elev)',
                  }}
                >
                  {j.feature && (
                    <div className="absolute top-0 right-0 bottom-0 w-80 opacity-20 pointer-events-none">
                      <img
                        src={CANADA_PHOTOS.rockies}
                        alt=""
                        className="w-full h-full object-cover"
                        style={{
                          maskImage: 'linear-gradient(90deg, transparent, black 80%)',
                          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 80%)',
                        }}
                      />
                    </div>
                  )}
                  <div className="col-span-12 md:col-span-2 font-mono text-xs" style={{ color: 'var(--fg-dim)' }}>
                    <div
                      className="text-2xl font-sans text-white font-light tracking-tight"
                      style={{ color: j.feature ? 'var(--accent)' : 'var(--fg-muted)' }}
                    >
                      {j.year}
                    </div>
                    <div className="mt-1">→ {end}</div>
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--line)' }}>{t.chapterLabel} {j.chapter}</div>
                  </div>
                  <div className="col-span-12 md:col-span-7 relative z-10">
                    <div className="text-micro mb-2" style={{ color: 'var(--fg-dim)' }}>{d.region}</div>
                    <h3 className="text-2xl font-medium tracking-tight mb-3">{d.title}</h3>
                    {tweaks.density !== 'minimal' && (
                      <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{d.body}</p>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-3 flex md:flex-col gap-2 flex-wrap md:items-end relative z-10">
                    {d.meta.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border rounded-full"
                        style={{ borderColor: 'var(--line)', color: 'var(--fg-muted)' }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* === Atlas === */
function Atlas({ tweaks, lang }) {
  const [active, setActive] = useState('Ontario');
  const total = Object.values(CANADA_CITIES).flat().length;
  const t = COPY[lang].atlas;
  const CITY_HERO_STYLE = { background: 'var(--bg-elev)' };
  const nzLabel = (c) => (lang === 'zh' && NZ_CITIES_ZH[c]) ? NZ_CITIES_ZH[c] : c;

  return (
    <section id="atlas" className="py-32 px-6 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--fg-dim)' }}>
              <span className="dot" style={{ background: 'var(--accent)', marginRight: 8 }} />
              {t.section}
            </div>
            <h2 className="display-section">
              {t.headingPre}<span className="gradient-accent">{t.headingAccent}</span>{t.headingPost}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 pt-6">
            <p className="text-lg mb-8" style={{ color: 'var(--fg-muted)' }}>
              {t.intro(total)}
            </p>
            <div className="font-mono text-xs flex items-center gap-6" style={{ color: 'var(--fg-dim)' }}>
              <span>{t.statProvinces}</span>
              <span>{t.statCities(total)}</span>
              <span>{t.statNz}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mb-16">
          <Reveal className="col-span-12 md:col-span-7">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border group" style={{ borderColor: 'var(--line-strong)' }}>
              <img src={CANADA_PHOTOS.moraine} alt="Moraine Lake, Banff National Park, Alberta" className="absolute inset-0 w-full h-full object-cover img-dim" loading="lazy" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.4), transparent 30%, transparent 60%, rgba(0,0,0,0.85))' }}>
                <div className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--fg-muted)' }}>{t.featuredCode}</div>
                <div>
                  <div className="font-mono text-xs mb-2" style={{ color: 'var(--fg-dim)' }}>51.3217°N · 116.1860°W</div>
                  <h3 className="text-3xl font-medium tracking-tight">{t.featuredTitle}</h3>
                  <div className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>{t.featuredSub}</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="col-span-6 md:col-span-5 grid grid-cols-1 gap-4">
            {[
              {
                src: CANADA_PHOTOS.jasperTown,
                alt: 'Jasper townsite seen from the Jasper Skytram, Alberta',
                code: t.jasperCode,
                title: t.jasperTitle,
              },
              {
                src: CANADA_PHOTOS.algonquin,
                alt: 'Autumn maple forest scenery, Algonquin Provincial Park, Ontario',
                code: t.algonquinCode,
                title: t.algonquinTitle,
              },
            ].map((card) => (
              <div key={card.code} className="relative aspect-[16/9] rounded-xl overflow-hidden border group" style={{ borderColor: 'var(--line-strong)' }}>
                <img src={card.src} alt={card.alt} className="absolute inset-0 w-full h-full object-cover img-dim" loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.85), transparent)' }}>
                  <div className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--fg-dim)' }}>{card.code}</div>
                  <h3 className="text-xl font-medium">{card.title}</h3>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="flex items-center gap-1 mb-8 border rounded-lg p-1 w-fit" style={{ borderColor: 'var(--line)', background: 'var(--bg-elev)' }}>
          {Object.keys(CANADA_CITIES).map((prov) => (
            <button
              type="button" key={prov} onClick={() => setActive(prov)}
              className="px-4 py-2 font-mono text-xs tracking-wide uppercase rounded-md transition-all"
              style={{
                background: active === prov ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : 'transparent',
                color: active === prov ? '#fff' : 'var(--fg-muted)',
              }}
            >
              {PROVINCE_LABEL[lang][prov]}<span className="opacity-50 ml-1">· {CANADA_CITIES[prov].length}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px border rounded-xl overflow-hidden" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
          {CANADA_CITIES[active].map((city, idx) => {
            const meta = CITY_META[city];
            const localized = meta?.[lang] || { name: city };
            return (
              <div key={city} className="p-5 group cursor-default transition-all hover:z-10 relative" style={CITY_HERO_STYLE}>
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--fg-dim)' }}>
                    {active.slice(0, CA_CODE_PAD).toUpperCase()}_{String(idx + 1).padStart(CA_CODE_PAD, '0')}
                  </div>
                  {meta?.hero && <span className="dot" style={{ background: 'var(--accent)' }} />}
                </div>
                <div className="text-lg font-medium tracking-tight mb-1 group-hover:text-white transition-colors">{localized.name}</div>
                {localized.note && tweaks.density !== 'minimal' && (
                  <div className="text-xs" style={{ color: 'var(--fg-dim)' }}>{localized.note}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-14 pt-10 border-t grid grid-cols-12 gap-6" style={{ borderColor: 'var(--line)' }}>
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-xs tracking-widest" style={{ color: 'var(--fg-dim)' }}>{t.appendixLabel}</div>
            <div className="text-xl font-medium mt-2">{t.appendixCount}</div>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-wrap gap-2">
            {NZ_CITIES.map((c) => (
              <span key={c} className="font-mono text-xs px-3 py-1.5 border rounded-full" style={{ borderColor: 'var(--line)', color: 'var(--fg-muted)' }}>{nzLabel(c)}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Work === */
function Work({ lang }) {
  const t = COPY[lang].work;
  const CURRENT_KEY = 'Current';
  return (
    <section id="work" className="py-32 px-6 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--fg-dim)' }}>
              <span className="dot" style={{ background: 'var(--accent)', marginRight: 8 }} />
              {t.section}
            </div>
            <h2 className="display-section">{t.heading}</h2>
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden" style={{ borderColor: 'var(--line)' }}>
          <div
            className="grid grid-cols-12 gap-4 px-6 py-3 border-b font-mono text-[10px] uppercase tracking-widest"
            style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)', background: 'var(--bg-elev)' }}
          >
            <div className="col-span-3">{t.col.org}</div>
            <div className="col-span-4">{t.col.role}</div>
            <div className="col-span-2">{t.col.period}</div>
            <div className="col-span-2">{t.col.focus}</div>
            <div className="col-span-1 text-right">{t.col.status}</div>
          </div>
          {WORK.map((w, i) => {
            const d = w[lang];
            return (
              <Reveal key={d.org + w.period} delay={i * ROW_STEP_MS}>
                <div
                  className="grid grid-cols-12 gap-4 px-6 py-6 border-b items-start hover:bg-white/[0.02] transition-colors group"
                  style={{
                    borderColor: 'var(--line)',
                    background: w.accent ? 'linear-gradient(90deg, rgba(139,92,246,0.05), transparent)' : 'transparent',
                  }}
                >
                  <div className="col-span-12 md:col-span-3">
                    <div className="text-lg font-medium">{d.org}</div>
                    <div className="font-mono text-xs mt-1" style={{ color: 'var(--fg-dim)' }}>{d.location}</div>
                  </div>
                  <div className="col-span-12 md:col-span-4" style={{ color: 'var(--fg-muted)' }}>{d.role}</div>
                  <div className="col-span-6 md:col-span-2 font-mono text-sm" style={{ color: 'var(--fg-muted)' }}>{d.periodLabel}</div>
                  <div className="col-span-6 md:col-span-2 flex flex-wrap gap-1">
                    {d.stack.map((s) => (
                      <span key={s} className="font-mono text-[10px] px-2 py-0.5 border rounded" style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)' }}>{s}</span>
                    ))}
                  </div>
                  <div className="col-span-12 md:col-span-1 md:text-right">
                    <span className="font-mono text-xs inline-flex items-center gap-1.5" style={{ color: w.status === CURRENT_KEY ? 'var(--success)' : 'var(--fg-dim)' }}>
                      {w.status === CURRENT_KEY && <span className="dot live" style={{ background: 'var(--success)' }} />}
                      {d.statusLabel}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* === Contact === */
function Contact({ lang, onOpenProfile }) {
  const t = COPY[lang].contact;
  const iso = new Date().toISOString().slice(0, ISO_DATE_LEN);
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--accent-glow), transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>
      <div className="max-w-[1360px] mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--fg-dim)' }}>
              <span className="dot" style={{ background: 'var(--accent)', marginRight: 8 }} />
              {t.section}
            </div>
            <h2 className="display-section mb-10">
              {t.heading1}<br />
              <span className="gradient-accent">{t.heading2}</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: 'var(--fg-muted)' }}>
              {t.body}
            </p>
            <div className="mt-12 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenProfile}
                aria-haspopup="dialog"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
              >
                <span>{t.sendBtn}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <a
                href="#journey"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollToSection('journey');
                }}
                className="font-mono text-sm px-6 py-3.5 rounded-lg border link-underline"
                style={{ borderColor: 'var(--line-strong)', color: 'var(--fg-muted)' }}
              >
                {t.cvBtn}
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 space-y-6 pt-4">
            <button type="button" onClick={onOpenProfile} aria-haspopup="dialog" className="locked-card group">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest" style={{ color: 'var(--fg-dim)' }}>
                <span className="flex items-center gap-2">
                  <span className="lock-badge" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </span>
                  {t.lockedLabel}
                </span>
                <span>0{t.lockedFields.length}</span>
              </div>
              <div className="mt-6 text-white text-lg font-medium tracking-tight text-left">{t.lockedTitle}</div>
              <p className="mt-2 text-sm text-left" style={{ color: 'var(--fg-muted)' }}>{t.lockedBody}</p>
              <div className="mt-6 space-y-3">
                {t.lockedFields.map((f, i) => (
                  <div key={f} className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--line)' }}>
                    <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--fg-dim)' }}>{f}</span>
                    <span className="redact" style={{ width: `${[64, 120, 92, 78, 70][i % 5]}px` }} />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="font-medium" style={{ color: 'var(--accent)' }}>{t.lockedCta}</span>
                <span className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent)' }}>→</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t flex flex-col md:flex-row justify-between items-start md:items-end gap-6 font-mono text-xs" style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)' }}>
          <div>
            <div className="text-white text-sm mb-1">{t.footerTitle}</div>
            <div>{t.footerMeta(iso)}</div>
          </div>
          <div className="flex items-center gap-6">
            <span>AKL → YYZ → PEK</span>
            <span className="dot live" style={{ background: 'var(--success)' }} />
            <span>{t.systemLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Tweaks Panel === */
function TweaksPanel({ tweaks, update, reset, lang }) {
  const [open, setOpen] = useState(false);
  const t = COPY[lang].tweaks;
  const densityOptions = [
    { k: 'minimal', label: t.densityOpts.minimal },
    { k: 'standard', label: t.densityOpts.standard },
    { k: 'detailed', label: t.densityOpts.detailed },
  ];
  if (!open) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999] font-sans">
        <button
          type="button" onClick={() => setOpen(true)}
          className="group flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full border backdrop-blur-xl font-mono text-xs"
          style={{ borderColor: 'var(--line-strong)', background: 'rgba(17,17,19,0.9)', color: 'var(--fg-muted)' }}
        >
          <span className="w-5 h-5 rounded-full" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }} />
          <span className="group-hover:text-white transition-colors">{t.trigger}</span>
        </button>
      </div>
    );
  }
  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <div className="w-[300px] rounded-xl border p-5 shadow-2xl backdrop-blur-xl" style={{ borderColor: 'var(--line-strong)', background: 'rgba(17,17,19,0.92)' }}>
        <div className="flex justify-between items-center mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--fg-dim)' }}>{t.heading}</div>
          <button type="button" onClick={() => setOpen(false)} className="text-xl leading-none opacity-50 hover:opacity-100">×</button>
        </div>

        <div className="mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--fg-dim)' }}>{t.accent}</div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(ACCENT_PRESETS).map(([key, p]) => (
              <button
                type="button" key={key} onClick={() => update({ accent: key })}
                className="aspect-square rounded-lg border transition-all"
                style={{
                  background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                  borderColor: tweaks.accent === key ? '#fff' : 'transparent',
                  outline: tweaks.accent === key ? '2px solid rgba(255,255,255,0.1)' : 'none',
                  outlineOffset: '2px',
                }}
                aria-label={p.label}
              />
            ))}
          </div>
          <div className="mt-2 font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{ACCENT_PRESETS[tweaks.accent].label}</div>
        </div>

        <div className="mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--fg-dim)' }}>{t.density}</div>
          <div className="flex gap-1 rounded-lg p-1 border" style={{ borderColor: 'var(--line)' }}>
            {densityOptions.map((o) => (
              <button
                type="button" key={o.k} onClick={() => update({ density: o.k })}
                className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                  background: tweaks.density === o.k ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: tweaks.density === o.k ? '#fff' : 'var(--fg-dim)',
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--fg-dim)' }}>{t.language}</div>
          <div className="flex gap-1 rounded-lg p-1 border" style={{ borderColor: 'var(--line)' }}>
            {LANG_OPTIONS.map((o) => (
              <button
                type="button" key={o.code} onClick={() => update({ lang: o.code })}
                className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                  background: tweaks.lang === o.code ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: tweaks.lang === o.code ? '#fff' : 'var(--fg-dim)',
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={reset} className="w-full py-2 border rounded-md text-xs font-mono hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--line)', color: 'var(--fg-muted)' }}>
          {t.reset}
        </button>
      </div>
    </div>
  );
}

/* === Profile Modal === */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@._/#*';
const SCRAMBLE_FRAMES = 14;
const SCRAMBLE_STEP_MS = 28;
const COPIED_RESET_MS = 1400;

// Decrypt-style reveal: characters resolve left → right after a per-row delay
function Scramble({ text, delay }) {
  const [out, setOut] = useState(() => text.replace(/\S/g, '•'));
  useEffect(() => {
    let frame = 0;
    let timer = null;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        frame += 1;
        const solved = Math.floor((frame / SCRAMBLE_FRAMES) * text.length);
        const next = text.split('').map((c, i) => {
          if (i < solved || c === ' ') {
            return c;
          }
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('');
        setOut(next);
        if (frame >= SCRAMBLE_FRAMES) {
          clearInterval(timer);
          setOut(text);
        }
      }, SCRAMBLE_STEP_MS);
    }, delay);
    return () => {
      clearTimeout(start);
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [text, delay]);
  return <span>{out}</span>;
}

function ProfileModal({ open, onClose, lang }) {
  const t = PROFILE.copy[lang];
  const [copied, setCopied] = useState('');
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) {
      closeRef.current.focus();
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const rows = [
    { k: 'name', v: PROFILE.name, mono: false, copy: false },
    { k: 'personalEmail', v: PROFILE.personalEmail, mono: true, copy: true },
    { k: 'based', v: t.based, mono: false, copy: false },
    { k: 'tz', v: t.tz, mono: false, copy: false },
  ];

  const doCopy = (k, v) => {
    const done = () => {
      setCopied(k);
      setTimeout(() => setCopied(''), COPIED_RESET_MS);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(v).then(done, done);
    } else {
      done();
    }
  };

  return (
    <div className="profile-overlay" role="presentation" onClick={onClose}>
      <div
        className="profile-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-glow" aria-hidden="true" />
        <div className="relative flex items-center justify-between px-6 h-12 border-b font-mono text-[11px] tracking-widest" style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)' }}>
          <span className="flex items-center gap-2">
            <span className="dot live" style={{ background: 'var(--success)' }} />
            {t.label}
          </span>
          <button ref={closeRef} type="button" onClick={onClose} className="profile-close" aria-label={t.close}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="relative px-6 pt-6 pb-5 flex items-center gap-4">
          <div className="profile-avatar" aria-hidden="true">
            <span>{PROFILE.handle.slice(0, 2).toUpperCase()}</span>
          </div>
          <div className="min-w-0">
            <div id="profile-title" className="text-white text-xl font-semibold tracking-tight truncate">
              <Scramble text={PROFILE.name} delay={60} />
            </div>
            <div className="text-sm mt-0.5" style={{ color: 'var(--fg-muted)' }}>{t.role}</div>
            <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--fg-dim)' }}>{t.edu}</div>
          </div>
        </div>

        <div className="relative px-6">
          {rows.map((r, i) => (
            <div key={r.k} className="profile-row" style={{ animationDelay: `${120 + i * 60}ms` }}>
              <span className="font-mono text-[11px] uppercase tracking-widest w-24 shrink-0" style={{ color: 'var(--fg-dim)' }}>{t.rows[r.k]}</span>
              <span className={`flex-1 min-w-0 truncate text-sm text-white ${r.mono ? 'font-mono' : ''}`}>
                <Scramble text={r.v} delay={160 + i * 90} />
              </span>
              {r.copy && (
                <button type="button" onClick={() => doCopy(r.k, r.v)} className={`profile-copy ${copied === r.k ? 'is-done' : ''}`}>
                  {copied === r.k ? t.copied : t.copy}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="relative px-6 py-5 mt-2 flex items-center justify-between gap-4">
          <span className="font-mono text-[11px]" style={{ color: 'var(--fg-dim)' }}>{t.hint}</span>
          <a
            href={`mailto:${PROFILE.personalEmail}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
          >
            {t.mail} <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Journey, Atlas, Work, Contact, TweaksPanel, ProfileModal });
}());
