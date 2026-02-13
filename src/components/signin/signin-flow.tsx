"use client";
import { useState, Dispatch, SetStateAction } from "react";
import AuthCard from "@/components/authcard";
import Logo from "@/components/Logo";
import OAuthButton, { EmailButton } from "@/components/OAuthButtons";
import AuthOverlay from "../authoverlay";

interface signInProps{
  onClose: () => void;
  setShowSign: Dispatch<SetStateAction<boolean>>;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}
interface rightPanelProps{
  setShowSign: Dispatch<SetStateAction<boolean>>;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}

/* ─── LEFT PANEL — branded perks + illustration ────── */
function LeftPanel() {
  const perks = [
    "Over 700 categories to explore",
    "Quality designs done faster",
    "Access to talent and brands across the globe",
  ];

  return (
    <div className="relative flex flex-col justify-between h-full px-10 py-12" style={{ background: "#F28C38" }}>
      {/* Logo */}
      <Logo textColor="#fff" size="lg" />

      {/* Middle content */}
      <div className="flex-1 flex flex-col justify-center gap-6">
        <h2 className="text-white font-bold leading-tight" style={{ fontFamily: "Georgia, serif", fontSize: 34 }}>
          Success<br />starts here
        </h2>
        <ul className="flex flex-col gap-3">
          {perks.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-white mt-0.5 text-lg leading-none">✓</span>
              <span className="text-white text-[15px] leading-relaxed" style={{ opacity: 0.92 }}>{p}</span>
            </li>
          ))}
        </ul>

        {/* Decorative illustration — a person at a desk with a laptop */}
        <div className="mt-6 flex justify-center">
          <svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            {/* desk */}
            <rect x="30" y="148" width="200" height="8" rx="4" fill="rgba(255,255,255,0.25)" />
            {/* laptop base */}
            <rect x="70" y="110" width="120" height="40" rx="6" fill="rgba(255,255,255,0.18)" />
            {/* laptop screen */}
            <rect x="75" y="60" width="110" height="52" rx="5" fill="rgba(255,255,255,0.28)" />
            {/* screen content lines */}
            <rect x="85" y="72" width="40" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="85" y="80" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
            <rect x="85" y="86" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
            <rect x="85" y="95" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
            {/* person body */}
            <ellipse cx="50" cy="125" rx="18" ry="28" fill="rgba(255,255,255,0.22)" />
            {/* person head */}
            <circle cx="50" cy="88" r="14" fill="rgba(255,255,255,0.3)" />
            {/* hair */}
            <path d="M38 82 Q50 68 62 82" fill="rgba(255,255,255,0.45)" />
            {/* arm reaching to laptop */}
            <path d="M60 115 Q75 108 78 112" stroke="rgba(255,255,255,0.35)" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* coffee cup on desk */}
            <rect x="195" y="138" width="18" height="22" rx="3" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="204" cy="138" rx="9" ry="3" fill="rgba(255,255,255,0.3)" />
            <path d="M213 143 Q222 145 213 152" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* small plant */}
            <rect x="28" y="140" width="10" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="33" cy="137" rx="7" ry="5" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="29" cy="134" rx="5" ry="4" fill="rgba(255,255,255,0.25)" />
          </svg>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
        By joining, you agree to the{" "}
        <a href="#" className="underline underline-offset-2 hover:opacity-80 transition-opacity">Terms of Service</a> and to
        occasionally receive emails from us. Please read our{" "}
        <a href="#" className="underline underline-offset-2 hover:opacity-80 transition-opacity">Privacy Policy</a> to learn how we use your personal data.
      </p>
    </div>
  );
}

/* ─── RIGHT PANEL — auth forms ───────────────────────── */
function RightPanel({ setShowAuth, setShowSign }: rightPanelProps) {
  // view: "methods" | "email"
  const [view, setView] = useState<"methods" | "email">("methods");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /* ── OAuth selection screen ── */
  if (view === "methods") {
    return (
      <div className="flex flex-col gap-0 w-full max-w-[340px] mx-auto">
        <h2 className="font-bold mb-1" style={{ color: "#1e3a34", fontSize: 26, fontFamily: "Georgia, serif" }}>
          Sign in to your account
        </h2>
        <p className="text-sm mb-6" style={{ color: "#6b7f76" }}>
          Don't have an account?{" "}
          <span onClick={() => {
            setShowSign(false)
            setShowAuth(true)}} 
            className="font-semibold cursor-pointer underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "#1e3a34" }}>
            Join here
          </span>
        </p>

        {/* Google + Email */}
        <div className="flex flex-col gap-3">
          <OAuthButton provider="google" />
          <EmailButton onClick={() => setView("email")} />
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "#e2ddd8" }} />
          <span className="text-xs font-semibold" style={{ color: "#9e9590" }}>OR</span>
          <div className="flex-1 h-px" style={{ background: "#e2ddd8" }} />
        </div>

        {/* Apple + Facebook side by side */}
        <div className="grid grid-cols-2 gap-3">
          <OAuthButton provider="apple" />
          <OAuthButton provider="facebook" />
        </div>
      </div>
    );
  }

  /* ── Email / password form ── */
  return (
    <div className="flex flex-col gap-0 w-full max-w-[340px] mx-auto">
      {/* Back */}
      <button onClick={() => setView("methods")} className="self-start flex items-center gap-1.5 text-sm font-semibold mb-5 hover:opacity-70 transition-opacity" style={{ color: "#1e3a34" }}>
        ← Back
      </button>

      <h2 className="font-bold mb-5" style={{ color: "#1e3a34", fontSize: 24, fontFamily: "Georgia, serif", lineHeight: 1.3 }}>
        Continue with your email<br />or username
      </h2>

      {/* Email field */}
      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#1e3a34" }}>Email or username</label>
      <input
        name="email"
        type="text"
        value={form.email}
        onChange={change}
        autoFocus
        className="w-full outline-none rounded-lg text-sm transition-shadow duration-200 focus:ring-2 focus:ring-[#F28C38]"
        style={{ border: "1px solid #ddd8d2", padding: "11px 14px", background: "#fff", color: "#1e3a34", fontFamily: "Segoe UI, sans-serif" }}
      />

      {/* Password field */}
      <label className="text-xs font-semibold mt-4 mb-1.5 block" style={{ color: "#1e3a34" }}>Password</label>
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={change}
          className="w-full outline-none rounded-lg text-sm transition-shadow duration-200 focus:ring-2 focus:ring-[#F28C38] pr-10"
          style={{ border: "1px solid #ddd8d2", padding: "11px 14px", background: "#fff", color: "#1e3a34", fontFamily: "Segoe UI, sans-serif" }}
        />
        {/* eye toggle */}
        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          {showPassword ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>

      {/* Forgot password */}
      <a href="#" className="text-xs self-end mt-2 underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "#6b7f76" }}>
        Forgot password?
      </a>

      {/* Sign In button */}
      <button
        className="w-full mt-8 rounded-lg text-sm font-bold transition-all duration-200 hover:opacity-85 active:scale-[0.97]"
        style={{ background: "#e2ddd8", color: "#1e3a34", padding: "13px 0", fontFamily: "Segoe UI, sans-serif" }}
      >
        Sign In
      </button>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function SignInPage({ onClose, setShowAuth, setShowSign }: signInProps ) {

  return (
    <AuthOverlay left={<LeftPanel />} right={<RightPanel setShowAuth={ setShowAuth } setShowSign={setShowSign} />} onClose={onClose} />
  );
}
