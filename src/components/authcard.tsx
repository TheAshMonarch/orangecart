"use client";

import { ReactNode } from "react";

export default function AuthCard({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="relative z-10 flex h-[720px] w-[min(860px,95vw)] overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      <div className="hidden md:flex w-[42%] bg-[#1e3a34] text-white">
        {left}
      </div>

      <div className="flex w-full md:w-[58%] px-8 py-10 overflow-y-auto">
        {right}
      </div>
    </div>
  );
}
