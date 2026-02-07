"use client";

import { ReactNode, useEffect } from "react";
import AuthCard from "./authcard";

interface AuthOverlayProps {
  left: ReactNode;
  right: ReactNode;
  onClose?: () => void;
}

export default function AuthOverlay({ left, right, onClose = () => {} }: AuthOverlayProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={() => onClose?.()}
      />

      {/* card */}
      <AuthCard left={left} right={right} />
    </div>
  );
}
