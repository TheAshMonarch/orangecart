"use client";

interface LogoProps {
  textColor?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 22, text: 14 },
  md: { icon: 28, text: 17 },
  lg: { icon: 34, text: 20 },
};

export default function Logo({ 
  textColor = "#1e3a34", 
  size = "md" 
}: LogoProps) {
  const s = sizes[size];
  
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-lg flex items-center justify-center"
        style={{
          width: s.icon,
          height: s.icon,
          background: "#F28C38",
        }}
      >
        <span style={{ fontSize: s.icon * 0.55, color: "#fff" }}>🐱</span>
      </div>
      <span 
        className="font-serif font-bold"
        style={{ fontSize: s.text, color: textColor }}
      >
        orange<span style={{ color: "#F28C38" }}>cat</span>
      </span>
    </div>
  );
}
