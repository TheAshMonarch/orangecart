
import { useState, useEffect } from "react";

/* ─── THEME ──────────────────────────────────────────── */
const SCENES = [
  {
    bg: "#dfe8e3",          // soft sage
    heroText: "#1e3a34",
    sub: "#4a6e65",
    inputBg: "#fff",
    btnBg: "#1e3a34",
    btnText: "#fff",
    credit: "#4a6e65",
    accent: "#2A6259",
  },
  {
    bg: "#fdf0e3",          // warm peach
    heroText: "#3d2410",
    sub: "#7a5a3c",
    inputBg: "#fff",
    btnBg: "#3d2410",
    btnText: "#fff",
    credit: "#7a5a3c",
    accent: "#F28C38",
  },
  {
    bg: "#1e2e3a",          // deep slate
    heroText: "#f5efe8",
    sub: "#8ca3af",
    inputBg: "rgba(255,255,255,0.08)",
    btnBg: "#f5efe8",
    btnText: "#1e2e3a",
    credit: "#8ca3af",
    accent: "#F28C38",
  },
];

/* ─── MOCKUP DATA ────────────────────────────────────── */
// Each scene's set of floating product cards
const SCENE_MOCKUPS = [
  // Scene 0 – sage / organic
  [
    { id: 0, top: "8%",  left: "52%", rotate: "-6deg", w: 170, label: "Herbal Co.", sub: "Organic Blends", bg: "#2A6259", text: "#e8f5f0", shape: "leaf" },
    { id: 1, top: "4%",  left: "72%", rotate: "4deg",  w: 190, label: "Grove & Leaf", sub: "Natural Care", bg: "#f5efe8", text: "#2A6259", shape: "box" },
    { id: 2, top: "42%", left: "60%", rotate: "-3deg", w: 150, label: "Pura", sub: "Wellness", bg: "#fff", text: "#2A6259", shape: "bottle" },
    { id: 3, top: "55%", left: "78%", rotate: "7deg",  w: 140, label: "Bloom", sub: "Beauty", bg: "#e8f5f0", text: "#1e3a34", shape: "jar" },
  ],
  // Scene 1 – peach / lifestyle
  [
    { id: 0, top: "6%",  left: "50%", rotate: "3deg",  w: 160, label: "Sunrise", sub: "Morning Ritual", bg: "#fff", text: "#3d2410", shape: "phone" },
    { id: 1, top: "2%",  left: "73%", rotate: "-5deg", w: 185, label: "Glow Studio", sub: "Skincare", bg: "#f28c38", text: "#fff", shape: "box" },
    { id: 2, top: "44%", left: "58%", rotate: "5deg",  w: 145, label: "Rose & Co", sub: "Essentials", bg: "#fdf0e3", text: "#3d2410", shape: "bottle" },
    { id: 3, top: "58%", left: "76%", rotate: "-4deg", w: 155, label: "Dew", sub: "Hydrate", bg: "#fff5ee", text: "#7a5a3c", shape: "jar" },
  ],
  // Scene 2 – dark slate / bold
  [
    { id: 0, top: "7%",  left: "51%", rotate: "-4deg", w: 175, label: "NightOwl", sub: "Gaming Gear", bg: "#2c3e50", text: "#f28c38", shape: "box" },
    { id: 1, top: "3%",  left: "74%", rotate: "6deg",  w: 180, label: "Bolt Play", sub: "Tech", bg: "#f28c38", text: "#1e2e3a", shape: "phone" },
    { id: 2, top: "43%", left: "61%", rotate: "-2deg", w: 150, label: "Ember", sub: "Drinks", bg: "#3a4f5e", text: "#f5efe8", shape: "bottle" },
    { id: 3, top: "56%", left: "77%", rotate: "5deg",  w: 145, label: "Vault", sub: "Premium", bg: "#1a2530", text: "#c9a96e", shape: "jar" },
  ],
];

/* ─── SECTION DATA ───────────────────────────────────── */
const HOW_IT_WORKS = [
  { n: "01", title: "Tell us about your brand", desc: "Share your brand name, industry and the vibe you're going for — we handle the rest." },
  { n: "02", title: "Browse curated designs", desc: "We surface the best matches from thousands of professionally designed assets." },
  { n: "03", title: "Customize & launch", desc: "Tweak colors, fonts and layouts inside our editor, then download or go live instantly." },
];

const CREATORS = [
  { name: "lirandesign", avatar: "L", specialty: "Packaging", works: 340 },
  { name: "budaart", avatar: "B", specialty: "Branding", works: 520 },
  { name: "skydesigner", avatar: "S", specialty: "Product Pages", works: 280 },
  { name: "novacraft", avatar: "N", specialty: "Illustration", works: 410 },
];

const TESTIMONIALS = [
  { name: "Sarah M.", avatar: "S", text: "OrangeCat made our packaging redesign painless. The quality blew away what we had before.", stars: 5 },
  { name: "James K.", avatar: "J", text: "Honestly shocked at how polished everything came out. Worth every cent.", stars: 5 },
  { name: "Priya N.", avatar: "P", text: "The editor is so intuitive. I had our new product page live in under an hour.", stars: 5 },
  { name: "Marco R.", avatar: "M", text: "Great selection of creators. Found exactly the style we needed for our launch.", stars: 4 },
];

const PRICING = [
  { tier: "Starter", price: 0, features: ["Access to 500+ templates", "Basic editor tools", "PNG download", "OrangeCat watermark"], cta: "Get Started", highlight: false },
  { tier: "Pro",     price: 29, features: ["Unlimited templates", "Advanced editor", "SVG & PDF export", "No watermark", "Priority support"], cta: "Go Pro", highlight: true },
  { tier: "Business", price: 79, features: ["Everything in Pro", "Team collaboration", "Brand kit storage", "Commercial licence", "Dedicated account manager"], cta: "Contact Sales", highlight: false },
];

/* ─── TINY SVG MOCKUP SHAPES ─────────────────────────── */
function MockupShape({ shape, label, sub, bg, text }) {
  const shared = { width: "100%", height: "100%" };
  if (shape === "box") {
    return (
      <div style={{ ...shared, borderRadius: 12, background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: text, opacity: 0.18 }} />
        <span style={{ color: text, fontWeight: 700, fontSize: 13, letterSpacing: 0.5 }}>{label}</span>
        <span style={{ color: text, opacity: 0.6, fontSize: 10 }}>{sub}</span>
      </div>
    );
  }
  if (shape === "phone") {
    return (
      <div style={{ ...shared, borderRadius: 16, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
        <div style={{ flex: 1, height: "100%", borderRadius: 12, background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: text, opacity: 0.22 }} />
          <span style={{ color: text, fontWeight: 700, fontSize: 12 }}>{label}</span>
          <span style={{ color: text, opacity: 0.55, fontSize: 9 }}>{sub}</span>
        </div>
      </div>
    );
  }
  if (shape === "bottle") {
    return (
      <div style={{ ...shared, borderRadius: 14, background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <div style={{ width: 28, height: 52, borderRadius: "14px 14px 8px 8px", background: text, opacity: 0.15 }} />
        <span style={{ color: text, fontWeight: 600, fontSize: 11 }}>{label}</span>
        <span style={{ color: text, opacity: 0.5, fontSize: 9 }}>{sub}</span>
      </div>
    );
  }
  // jar
  return (
    <div style={{ ...shared, borderRadius: 14, background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
      <div style={{ width: 38, height: 30, borderRadius: "6px 6px 12px 12px", background: text, opacity: 0.14 }} />
      <span style={{ color: text, fontWeight: 600, fontSize: 11 }}>{label}</span>
      <span style={{ color: text, opacity: 0.5, fontSize: 9 }}>{sub}</span>
    </div>
  );
}

/* ─── COMPONENTS ─────────────────────────────────────── */
function Nav({ scene }) {
  const isDark = scene === SCENES[2];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", transition: "background 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "#F28C38", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 16 }}>🐱</span>
        </div>
        <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 18, color: scene.heroText, transition: "color 0.8s" }}>
          orange<span style={{ color: "#F28C38" }}>cat</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {["Explore", "Testimonials", "Tutorials", "Pricing"].map(l => (
          <a key={l} href="#" style={{ color: scene.sub, fontSize: 14, textDecoration: "none", transition: "color 0.8s", fontFamily: "'Segoe UI', sans-serif" }}
            onMouseEnter={e => e.target.style.color = scene.heroText}
            onMouseLeave={e => e.target.style.color = scene.sub}>{l}</a>
        ))}
        <div style={{ width: 1, height: 20, background: scene.sub, opacity: 0.3 }} />
        <a href="#" style={{ color: scene.sub, fontSize: 14, textDecoration: "none", transition: "color 0.8s", fontFamily: "'Segoe UI', sans-serif" }}>Sign in</a>
        <button style={{ border: `1.5px solid ${scene.heroText}`, borderRadius: 6, padding: "6px 18px", background: "transparent", color: scene.heroText, fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.3s", fontFamily: "'Segoe UI', sans-serif" }}
          onMouseEnter={e => { e.currentTarget.style.background = scene.heroText; e.currentTarget.style.color = scene.btnText; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = scene.heroText; }}>Join</button>
      </div>
    </nav>
  );
}

function Hero({ scene, mockups, sceneIndex }) {
  const [brand, setBrand] = useState("");
  const designers = ["lirandesign", "budaart", "skydesigner"];

  return (
    <section style={{ position: "relative", minHeight: "100vh", background: scene.bg, transition: "background 1.2s ease", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Left content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 520, marginLeft: "8%", display: "flex", flexDirection: "column", gap: 0 }}>
        <span style={{ color: scene.sub, fontSize: 15, fontWeight: 500, fontFamily: "'Georgia', serif", transition: "color 0.8s", marginBottom: 10 }}>Logo Maker</span>
        <h1 style={{ color: scene.heroText, fontSize: 48, fontWeight: 700, lineHeight: 1.15, fontFamily: "'Georgia', serif", letterSpacing: "-1px", transition: "color 0.8s", margin: 0 }}>
          Make a professional<br />logo in a few clicks
        </h1>
        {/* Input */}
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 0 }}>
          <input type="text" placeholder="Type your brand name" value={brand} onChange={e => setBrand(e.target.value)}
            style={{ background: scene.inputBg, border: "none", borderBottom: `2px solid ${scene.heroText}`, outline: "none", padding: "12px 2px", fontSize: 16, color: scene.heroText, fontFamily: "'Segoe UI', sans-serif", transition: "all 0.8s", width: "100%", maxWidth: 380 }} />
        </div>
        {/* CTA button */}
        <button style={{ marginTop: 22, background: scene.btnBg, color: scene.btnText, border: "none", borderRadius: 6, padding: "12px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", width: "fit-content", fontFamily: "'Segoe UI', sans-serif", transition: "all 0.3s, background 0.8s, color 0.8s", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
          Make Your Logo
        </button>
        {/* Rating */}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 17, letterSpacing: 1 }}>★★★★☆</span>
            <span style={{ color: scene.heroText, fontWeight: 700, fontSize: 22, fontFamily: "'Georgia', serif", transition: "color 0.8s" }}>4.7</span>
            <span style={{ color: scene.sub, fontSize: 13, transition: "color 0.8s" }}>/5 from 8,384 ratings</span>
          </div>
          <a href="#" style={{ color: scene.sub, fontSize: 13, textDecoration: "none", transition: "color 0.8s", fontFamily: "'Segoe UI', sans-serif" }}
            onMouseEnter={e => e.target.style.color = scene.heroText}
            onMouseLeave={e => e.target.style.color = scene.sub}>Check out our customers stories →</a>
        </div>
      </div>

      {/* Right — floating mockups */}
      <div style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", pointerEvents: "none" }}>
        {mockups.map((m, i) => (
          <div key={m.id} style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: m.w,
            height: m.w * 1.1,
            transform: `rotate(${m.rotate})`,
            borderRadius: 14,
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            overflow: "hidden",
            animation: `float${i} 4s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
            pointerEvents: "auto",
            cursor: "pointer",
            transition: "box-shadow 0.3s",
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 18px 50px rgba(0,0,0,0.25)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)"}>
            <MockupShape {...m} />
          </div>
        ))}
      </div>

      {/* Designer credit */}
      <div style={{ position: "absolute", bottom: 40, right: 60, zIndex: 2, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: scene.credit, fontSize: 13, fontFamily: "'Segoe UI', sans-serif", transition: "color 0.8s" }}>Logo designed by</span>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#F28C38", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{designers[sceneIndex][0].toUpperCase()}</span>
        </div>
        <span style={{ color: scene.heroText, fontWeight: 600, fontSize: 14, fontFamily: "'Segoe UI', sans-serif", transition: "color 0.8s" }}>{designers[sceneIndex]}</span>
      </div>

      {/* Down arrow */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${scene.sub}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.8s, transform 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateX(-50%) translateY(4px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateX(-50%) translateY(0)"}>
          <span style={{ color: scene.sub, fontSize: 16, transition: "color 0.8s" }}>↓</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ background: "#fff", padding: "100px 8%", textAlign: "center" }}>
      <span style={{ color: "#F28C38", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, fontFamily: "'Segoe UI', sans-serif" }}>The Process</span>
      <h2 style={{ color: "#1e3a34", fontSize: 38, fontWeight: 700, fontFamily: "'Georgia', serif", letterSpacing: "-0.5px", marginTop: 12, marginBottom: 14 }}>
        Create stunning logos<br />for your brand with ease
      </h2>
      <p style={{ color: "#6b7f76", fontSize: 16, maxWidth: 540, margin: "0 auto 64px", lineHeight: 1.6, fontFamily: "'Segoe UI', sans-serif" }}>
        Everything you need to go from idea to a polished brand identity — no design experience required.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, maxWidth: 960, margin: "0 auto", position: "relative" }}>
        {/* Connecting line */}
        <div style={{ position: "absolute", top: 28, left: "16%", right: "16%", height: 2, background: "linear-gradient(90deg, #F28C38, #2A6259)", zIndex: 0, borderRadius: 1 }} />
        {HOW_IT_WORKS.map((s, i) => (
          <div key={i} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Circle number */}
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: i === 1 ? "#F28C38" : "#2A6259", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", marginBottom: 24 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, fontFamily: "'Georgia', serif" }}>{s.n}</span>
            </div>
            <h3 style={{ color: "#1e3a34", fontSize: 18, fontWeight: 700, fontFamily: "'Georgia', serif", marginBottom: 10, margin: "0 0 10px" }}>{s.title}</h3>
            <p style={{ color: "#6b7f76", fontSize: 14, lineHeight: 1.6, fontFamily: "'Segoe UI', sans-serif", maxWidth: 240 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Creators() {
  return (
    <section style={{ background: "#f7f3ef", padding: "90px 8%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <span style={{ color: "#F28C38", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, fontFamily: "'Segoe UI', sans-serif" }}>The Creators</span>
        <h2 style={{ color: "#1e3a34", fontSize: 36, fontWeight: 700, fontFamily: "'Georgia', serif", marginTop: 12, marginBottom: 12 }}>Meet the talented minds behind<br />your next brand identity</h2>
        <p style={{ color: "#6b7f76", fontSize: 15, maxWidth: 520, margin: "0 auto 56px", lineHeight: 1.6, fontFamily: "'Segoe UI', sans-serif" }}>
          Real designers. Real work. Every template you see was hand-crafted by a professional creator.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {CREATORS.map((c, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", textAlign: "center", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #F28C38, #2A6259)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}>{c.avatar}</span>
              </div>
              <div style={{ color: "#1e3a34", fontWeight: 700, fontSize: 15, fontFamily: "'Georgia', serif" }}>{c.name}</div>
              <div style={{ color: "#F28C38", fontSize: 12, fontWeight: 600, marginTop: 4 }}>{c.specialty}</div>
              <div style={{ color: "#6b7f76", fontSize: 12, marginTop: 6 }}>{c.works} designs</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ background: "#fff", padding: "90px 8%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <span style={{ color: "#F28C38", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, fontFamily: "'Segoe UI', sans-serif" }}>Testimonials</span>
        <h2 style={{ color: "#1e3a34", fontSize: 36, fontWeight: 700, fontFamily: "'Georgia', serif", marginTop: 12, marginBottom: 52 }}>What our customers say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: "#faf8f5", borderRadius: 16, padding: 32, textAlign: "left", border: "1px solid #efe9e2", transition: "box-shadow 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                {"★".repeat(t.stars).split("").map((s, j) => <span key={j} style={{ color: "#F28C38", fontSize: 16 }}>{s}</span>)}
                {"☆".repeat(5 - t.stars).split("").map((s, j) => <span key={`e${j}`} style={{ color: "#ccc", fontSize: 16 }}>{s}</span>)}
              </div>
              <p style={{ color: "#3d3d3d", fontSize: 15, lineHeight: 1.7, fontFamily: "'Segoe UI', sans-serif", margin: "0 0 20px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #F28C38, #2A6259)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{t.avatar}</span>
                </div>
                <span style={{ color: "#1e3a34", fontWeight: 600, fontSize: 14, fontFamily: "'Segoe UI', sans-serif" }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section style={{ background: "#1e3a34", padding: "100px 8%" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <span style={{ color: "#F28C38", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, fontFamily: "'Segoe UI', sans-serif" }}>Pricing</span>
        <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 700, fontFamily: "'Georgia', serif", marginTop: 12, marginBottom: 12 }}>Simple, transparent pricing</h2>
        <p style={{ color: "#8cb5a8", fontSize: 15, maxWidth: 480, margin: "0 auto 56px", lineHeight: 1.6, fontFamily: "'Segoe UI', sans-serif" }}>
          Pick the plan that fits your needs. Upgrade or downgrade at any time.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }}>
          {PRICING.map((p, i) => (
            <div key={i} style={{
              borderRadius: 20,
              background: p.highlight ? "#F28C38" : "rgba(255,255,255,0.06)",
              border: p.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
              padding: "36px 28px",
              display: "flex", flexDirection: "column",
              position: "relative",
              boxShadow: p.highlight ? "0 12px 48px rgba(242,140,56,0.3)" : "none",
              transition: "transform 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              {p.highlight && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#1e3a34", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, border: "2px solid #F28C38", letterSpacing: 1, textTransform: "uppercase" }}>Most Popular</div>
              )}
              <div style={{ color: p.highlight ? "#fff" : "#c9ddd5", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, fontFamily: "'Segoe UI', sans-serif" }}>{p.tier}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                <span style={{ color: "#fff", fontSize: 42, fontWeight: 700, fontFamily: "'Georgia', serif" }}>${p.price}</span>
                <span style={{ color: p.highlight ? "rgba(255,255,255,0.7)" : "#8cb5a8", fontSize: 14 }}>/mo</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "24px 0", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: p.highlight ? "#fff" : "#F28C38", fontSize: 16, marginTop: 1 }}>✓</span>
                    <span style={{ color: p.highlight ? "rgba(255,255,255,0.88)" : "#c9ddd5", fontSize: 14, fontFamily: "'Segoe UI', sans-serif" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button style={{
                marginTop: "auto",
                background: p.highlight ? "#fff" : "rgba(255,255,255,0.1)",
                color: p.highlight ? "#F28C38" : "#fff",
                border: "none", borderRadius: 8, padding: "12px 0", width: "100%",
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                transition: "background 0.3s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = p.highlight ? "#f5efe8" : "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = p.highlight ? "#fff" : "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "OrangeCat", items: ["About Us", "Careers", "Press", "Blog"] },
    { title: "Product", items: ["Logo Maker", "Brand Kit", "Templates", "Pricing"] },
    { title: "Support", items: ["Help Center", "Contact Us", "Terms of Service", "Privacy Policy"] },
    { title: "Follow Us", items: ["Twitter", "Instagram", "LinkedIn", "YouTube"] },
  ];
  return (
    <footer style={{ background: "#141e1a", padding: "72px 8% 36px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {cols.map((c, i) => (
            <div key={i}>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Georgia', serif", marginBottom: 18 }}>{c.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.items.map((item, j) => (
                  <a key={j} href="#" style={{ color: "#7a9e8e", fontSize: 13, textDecoration: "none", fontFamily: "'Segoe UI', sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#F28C38"}
                    onMouseLeave={e => e.target.style.color = "#7a9e8e"}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28 }}>
          <span style={{ color: "#4a6b5c", fontSize: 13, fontFamily: "'Segoe UI', sans-serif" }}>© 2026 OrangeCat. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "#F28C38", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 11 }}>🐱</span>
            </div>
            <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>orange<span style={{ color: "#F28C38" }}>cat</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN ───────────────────────────────────────────── */
export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % SCENES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scene    = SCENES[sceneIndex];
  const mockups  = SCENE_MOCKUPS[sceneIndex];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>
      {/* Inject keyframes */}
      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        input::placeholder { color: inherit; opacity: 0.45; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <Nav scene={scene} />
      <Hero scene={scene} mockups={mockups} sceneIndex={sceneIndex} />
      <HowItWorks />
      <Creators />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}
