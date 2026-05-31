import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-100 transition hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-400/40 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
