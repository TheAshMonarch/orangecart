"use client";
import AuthOverlay from "@/components/authoverlay";
import { useState, useMemo } from "react";
import AuthCard from "@/components/authcard";
import Logo from "@/components/Logo";
import OAuthButton from "@/components/OAuthButtons";

/* ─── LEFT PANEL (reused brand panel) ──────────────────── */
function LeftPanel({ currentStep }: { currentStep: number }) {
  const perks = [
    "Over 700 categories to explore",
    "Quality designs done faster",
    "Access to talent and brands across the globe",
  ];

  return (
    <div className="relative flex flex-col text-pretty justify-between h-full px-10 py-12" style={{ background: "#F28C38" }}>
      <Logo textColor="#fff" size="lg" />

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

        {/* Illustration */}
        <div className="mt-6 flex justify-center">
          <svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <rect x="30" y="148" width="200" height="8" rx="4" fill="rgba(255,255,255,0.25)" />
            <rect x="70" y="110" width="120" height="40" rx="6" fill="rgba(255,255,255,0.18)" />
            <rect x="75" y="60" width="110" height="52" rx="5" fill="rgba(255,255,255,0.28)" />
            <rect x="85" y="72" width="40" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="85" y="80" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
            <rect x="85" y="86" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
            <rect x="85" y="95" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
            <ellipse cx="50" cy="125" rx="18" ry="28" fill="rgba(255,255,255,0.22)" />
            <circle cx="50" cy="88" r="14" fill="rgba(255,255,255,0.3)" />
            <path d="M38 82 Q50 68 62 82" fill="rgba(255,255,255,0.45)" />
            <path d="M60 115 Q75 108 78 112" stroke="rgba(255,255,255,0.35)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <rect x="195" y="138" width="18" height="22" rx="3" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="204" cy="138" rx="9" ry="3" fill="rgba(255,255,255,0.3)" />
            <path d="M213 143 Q222 145 213 152" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="28" y="140" width="10" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="33" cy="137" rx="7" ry="5" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="29" cy="134" rx="5" ry="4" fill="rgba(255,255,255,0.25)" />
          </svg>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 justify-center mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className="transition-all duration-300"
              style={{
                width: step === currentStep ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: step <= currentStep ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
        By joining, you agree to the{" "}
        <a href="#" className="underline underline-offset-2 hover:opacity-80 transition-opacity">Terms of Service</a> and to
        occasionally receive emails from us. Please read our{" "}
        <a href="#" className="underline underline-offset-2 hover:opacity-80 transition-opacity">Privacy Policy</a> to learn how we use your personal data.
      </p>
    </div>
  );
}

/* ─── PASSWORD STRENGTH ────────────────────────────────── */
function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score: 1, label: "Weak",   color: "#e74c3c" };
  if (score === 2) return { score: 2, label: "Fair",   color: "#F28C38" };
  if (score === 3) return { score: 3, label: "Good",   color: "#27ae60" };
  return             { score: 4, label: "Strong", color: "#2A6259" };
}

/* ─── STEP 1: Name & Email ────────────────────────────── */
function Step1({ data, onChange, onNext }: any) {
  const inputStyle: React.CSSProperties = {
    border: "1px solid #ddd8d2",
    padding: "10px 14px",
    background: "#fff",
    color: "#1e3a34",
    fontFamily: "Segoe UI, sans-serif",
    fontSize: 14,
    borderRadius: 8,
  };

  return (
    <div className="flex flex-col gap-0 w-full max-w-[340px] mx-auto">
      <h2 className="font-bold mb-1" style={{ color: "#1e3a34", fontSize: 24, fontFamily: "Georgia, serif" }}>
        Create your account
      </h2>
      <p className="text-sm mb-5" style={{ color: "#6b7f76" }}>
        Already have an account?{" "}
        <a href="/signin" className="font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "#1e3a34" }}>
          Sign in
        </a>
      </p>

      {/* Quick OAuth row */}
      <div className="flex flex-col gap-2.5 mb-4">
        <OAuthButton provider="google" />
        <div className="grid grid-cols-2 gap-2.5">
          <OAuthButton provider="apple" />
          <OAuthButton provider="facebook" />
        </div>
      </div>

      {/* OR divider */}
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px" style={{ background: "#e2ddd8" }} />
        <span className="text-xs font-semibold" style={{ color: "#9e9590" }}>OR</span>
        <div className="flex-1 h-px" style={{ background: "#e2ddd8" }} />
      </div>

      {/* Full Name */}
      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#1e3a34" }}>Full Name</label>
      <input
        name="name"
        type="text"
        placeholder="Jane Doe"
        value={data.name}
        onChange={onChange}
        className="w-full outline-none focus:ring-2 focus:ring-[#F28C38] transition-shadow duration-200"
        style={inputStyle}
      />

      {/* Email */}
      <label className="text-xs font-semibold mt-4 mb-1.5 block" style={{ color: "#1e3a34" }}>Email</label>
      <input
        name="email"
        type="email"
        placeholder="jane@example.com"
        value={data.email}
        onChange={onChange}
        className="w-full outline-none focus:ring-2 focus:ring-[#F28C38] transition-shadow duration-200"
        style={inputStyle}
      />

      {/* Continue button */}
      <button
        onClick={onNext}
        disabled={!data.name || !data.email}
        className="w-full mt-6 rounded-lg text-sm font-bold transition-all duration-200 active:scale-[0.97]"
        style={{
          background: "#F28C38",
          color: "#fff",
          padding: "13px 0",
          fontFamily: "Segoe UI, sans-serif",
          opacity: data.name && data.email ? 1 : 0.5,
          cursor: data.name && data.email ? "pointer" : "not-allowed",
        }}
      >
        Continue
      </button>
    </div>
  );
}

/* ─── STEP 2: Email Verification Code ──────────────────── */
function Step2({ data, onChange, onNext, onBack }: any) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="flex flex-col gap-0 w-full max-w-[340px] mx-auto">
      <button
        onClick={onBack}
        className="text-sm mb-4 flex items-center gap-1 hover:opacity-70 transition-opacity"
        style={{ color: "#6b7f76" }}
      >
        ← Back
      </button>

      <h2 className="font-bold mb-1" style={{ color: "#1e3a34", fontSize: 24, fontFamily: "Georgia, serif" }}>
        Verify your email
      </h2>
      <p className="text-sm mb-8" style={{ color: "#6b7f76" }}>
        We've sent a verification code to <span className="font-semibold" style={{ color: "#1e3a34" }}>{data.email}</span>
      </p>

      <label className="text-xs font-semibold mb-3 block" style={{ color: "#1e3a34" }}>Enter 6-digit code</label>
      <div className="flex gap-2 mb-6">
        {code.map((digit, i) => (
          <input
            key={i}
            id={`code-${i}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-full h-14 text-center text-xl font-bold outline-none focus:ring-2 focus:ring-[#F28C38] transition-shadow duration-200"
            style={{
              border: "1px solid #ddd8d2",
              background: "#fff",
              color: "#1e3a34",
              borderRadius: 8,
            }}
          />
        ))}
      </div>

      <p className="text-xs mb-6" style={{ color: "#6b7f76" }}>
        Didn't receive the code?{" "}
        <button className="font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "#F28C38" }}>
          Resend code
        </button>
      </p>

      <button
        onClick={onNext}
        disabled={!isCodeComplete}
        className="w-full rounded-lg text-sm font-bold transition-all duration-200 active:scale-[0.97]"
        style={{
          background: "#F28C38",
          color: "#fff",
          padding: "13px 0",
          fontFamily: "Segoe UI, sans-serif",
          opacity: isCodeComplete ? 1 : 0.5,
          cursor: isCodeComplete ? "pointer" : "not-allowed",
        }}
      >
        Verify Email
      </button>
    </div>
  );
}

/* ─── STEP 3: User Type Selection ──────────────────────── */
function Step3({ data, setData, onNext, onBack }: any) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelected(type);
    setData({ ...data, userType: type });
  };

  return (
    <div className="flex flex-col gap-0 w-full max-w-[420px] mx-auto">
      <button
        onClick={onBack}
        className="text-sm mb-4 flex items-center gap-1 hover:opacity-70 transition-opacity"
        style={{ color: "#6b7f76" }}
      >
        ← Back
      </button>

      <h2 className="font-bold mb-1" style={{ color: "#1e3a34", fontSize: 24, fontFamily: "Georgia, serif" }}>
        What brings you to OrangeCat?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#6b7f76" }}>
        Choose the option that best describes you
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Seller Card */}
        <button
          onClick={() => handleSelect("seller")}
          className="flex flex-col items-center p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            border: selected === "seller" ? "2px solid #F28C38" : "1px solid #ddd8d2",
            background: selected === "seller" ? "rgba(242, 140, 56, 0.05)" : "#fff",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: selected === "seller" ? "#F28C38" : "#f5f3f0",
            }}
          >
            <span className="text-3xl">{selected === "seller" ? "🛍️" : "🏪"}</span>
          </div>
          <h3 className="font-bold mb-2" style={{ color: "#1e3a34", fontSize: 16 }}>
            I want to sell
          </h3>
          <p className="text-xs text-center" style={{ color: "#6b7f76" }}>
            Start your own store and reach customers worldwide
          </p>
        </button>

        {/* Buyer Card */}
        <button
          onClick={() => handleSelect("buyer")}
          className="flex flex-col items-center p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            border: selected === "buyer" ? "2px solid #F28C38" : "1px solid #ddd8d2",
            background: selected === "buyer" ? "rgba(242, 140, 56, 0.05)" : "#fff",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: selected === "buyer" ? "#F28C38" : "#f5f3f0",
            }}
          >
            <span className="text-3xl">{selected === "buyer" ? "🛒" : "🎁"}</span>
          </div>
          <h3 className="font-bold mb-2" style={{ color: "#1e3a34", fontSize: 16 }}>
            I want to buy
          </h3>
          <p className="text-xs text-center" style={{ color: "#6b7f76" }}>
            Discover amazing products from sellers around the world
          </p>
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full rounded-lg text-sm font-bold transition-all duration-200 active:scale-[0.97]"
        style={{
          background: "#F28C38",
          color: "#fff",
          padding: "13px 0",
          fontFamily: "Segoe UI, sans-serif",
          opacity: selected ? 1 : 0.5,
          cursor: selected ? "pointer" : "not-allowed",
        }}
      >
        Continue
      </button>
    </div>
  );
}

/* ─── STEP 4: Complete Profile ─────────────────────────── */
function Step4({ data, onChange, onComplete, onBack }: any) {
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const strength = useMemo(() => getStrength(data.password || ""), [data.password]);
  const pwMatch = data.password && data.confirmPassword && data.password === data.confirmPassword;

  const inputStyle: React.CSSProperties = {
    border: "1px solid #ddd8d2",
    padding: "10px 14px",
    background: "#fff",
    color: "#1e3a34",
    fontFamily: "Segoe UI, sans-serif",
    fontSize: 14,
    borderRadius: 8,
  };

  const isComplete = data.phone && data.username && data.password && pwMatch;

  return (
    <div className="flex flex-col gap-0 w-full max-w-[340px] mx-auto">
      <button
        onClick={onBack}
        className="text-sm mb-4 flex items-center gap-1 hover:opacity-70 transition-opacity"
        style={{ color: "#6b7f76" }}
      >
        ← Back
      </button>

      <h2 className="font-bold mb-1" style={{ color: "#1e3a34", fontSize: 24, fontFamily: "Georgia, serif" }}>
        Complete your profile
      </h2>
      <p className="text-sm mb-6" style={{ color: "#6b7f76" }}>
        Just a few more details to get started
      </p>

      {/* Phone Number */}
      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#1e3a34" }}>Phone Number</label>
      <input
        name="phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={data.phone}
        onChange={onChange}
        className="w-full outline-none focus:ring-2 focus:ring-[#F28C38] transition-shadow duration-200"
        style={inputStyle}
      />

      {/* Username */}
      <label className="text-xs font-semibold mt-4 mb-1.5 block" style={{ color: "#1e3a34" }}>Username</label>
      <input
        name="username"
        type="text"
        placeholder="@janedoe"
        value={data.username}
        onChange={onChange}
        className="w-full outline-none focus:ring-2 focus:ring-[#F28C38] transition-shadow duration-200"
        style={inputStyle}
      />

      {/* Password */}
      <label className="text-xs font-semibold mt-4 mb-1.5 block" style={{ color: "#1e3a34" }}>Password</label>
      <div className="relative">
        <input
          name="password"
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          value={data.password}
          onChange={onChange}
          className="w-full outline-none focus:ring-2 focus:ring-[#F28C38] transition-shadow duration-200 pr-10"
          style={inputStyle}
        />
        <button
          onClick={() => setShowPw(!showPw)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPw ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {/* Strength bar */}
      {data.password && (
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-1 flex-1">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-1 flex-1 rounded-full transition-colors duration-300"
                style={{ background: n <= strength.score ? strength.color : "#e2ddd8" }}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold" style={{ color: strength.color }}>
            {strength.label}
          </span>
        </div>
      )}

      {/* Confirm Password */}
      <label className="text-xs font-semibold mt-4 mb-1.5 block" style={{ color: "#1e3a34" }}>Confirm Password</label>
      <div className="relative">
        <input
          name="confirmPassword"
          type={showCpw ? "text" : "password"}
          placeholder="••••••••"
          value={data.confirmPassword}
          onChange={onChange}
          className="w-full outline-none focus:ring-2 focus:ring-[#F28C38] transition-shadow duration-200 pr-10"
          style={{
            ...inputStyle,
            borderColor: data.confirmPassword ? (pwMatch ? "#27ae60" : "#e74c3c") : "#ddd8d2",
          }}
        />
        <button
          onClick={() => setShowCpw(!showCpw)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showCpw ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {data.confirmPassword && !pwMatch && (
        <span className="text-xs mt-1" style={{ color: "#e74c3c" }}>
          Passwords don't match
        </span>
      )}

      {/* Complete button */}
      <button
        onClick={onComplete}
        disabled={!isComplete}
        className="w-full mt-6 rounded-lg text-sm font-bold transition-all duration-200 active:scale-[0.97]"
        style={{
          background: "#F28C38",
          color: "#fff",
          padding: "13px 0",
          fontFamily: "Segoe UI, sans-serif",
          opacity: isComplete ? 1 : 0.5,
          cursor: isComplete ? "pointer" : "not-allowed",
        }}
      >
        Create Account
      </button>
    </div>
  );
}

/* ─── MAIN COMPONENT WITH STEP FLOW ────────────────────── */
function RightPanel({ currentStep, setCurrentStep }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleComplete = () => {
    console.log("Account created:", formData);
    // Handle account creation
  };

  return (
    <>
      {currentStep === 1 && (
        <Step1 data={formData} onChange={handleChange} onNext={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <Step2 data={formData} onChange={handleChange} onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />
      )}
      {currentStep === 3 && (
        <Step3 data={formData} setData={setFormData} onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />
      )}
      {currentStep === 4 && (
        <Step4 data={formData} onChange={handleChange} onComplete={handleComplete} onBack={() => setCurrentStep(3)} />
      )}
    </>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <AuthOverlay left={<LeftPanel currentStep={currentStep} />} right={<RightPanel currentStep={currentStep} setCurrentStep={setCurrentStep} />} />
  );
}
