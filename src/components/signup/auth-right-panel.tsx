import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthRightPanel({ title, subtitle, children }: Props) {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      )}

      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}
