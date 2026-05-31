import type { SelectHTMLAttributes } from "react";

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-400/70 focus:bg-white/[0.04] focus:ring-1 focus:ring-blue-400/25 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
