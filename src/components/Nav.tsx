"use client";
import { useState } from "react";
import Logo from "./Logo";

interface NavProps {
  textColor?: string;
  subColor?: string;
}

export default function Nav({ textColor = "#1e3a34", subColor = "#4a6e65" }: NavProps) {
  const links = ["Explore", "Testimonials", "Tutorials", "Pricing"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5">
      <a href="/">
        <Logo textColor={textColor} />
      </a>
      <div className="flex items-center gap-7">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-sm transition-colors duration-300 hover:opacity-80"
            style={{ color: subColor, fontFamily: "Segoe UI, sans-serif" }}
          >
            {l}
          </a>
        ))}
        <div style={{ width: 1, height: 20, background: subColor, opacity: 0.3 }} />
        <a
          href="/signin"
          className="text-sm transition-colors duration-300 hover:opacity-80"
          style={{ color: subColor, fontFamily: "Segoe UI, sans-serif" }}
        >
          Sign in
        </a>
        <a
          href="/signup"
          className="text-sm font-semibold px-5 py-1.5 rounded transition-all duration-300 hover:opacity-85"
          style={{
            border: `1.5px solid ${textColor}`,
            color: textColor,
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          Join
        </a>
      </div>
    </nav>
  );
}
