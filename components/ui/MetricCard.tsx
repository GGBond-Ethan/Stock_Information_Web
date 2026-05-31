import type { ReactNode } from "react";

const toneClass = {
  red: "text-orange-400 border-orange-400/25 bg-orange-400/10",
  green: "text-emerald-300 border-emerald-300/25 bg-emerald-300/10",
  amber: "text-amber-300 border-amber-300/25 bg-amber-300/10",
  blue: "text-blue-300 border-blue-300/25 bg-blue-300/10"
};

export function MetricCard({
  label,
  value,
  sub,
  icon,
  tone
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: ReactNode;
  tone: keyof typeof toneClass;
}) {
  return (
    <div className="glass-panel rounded-xl border border-white/12 bg-white/[0.055] p-4 shadow-terminal">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${toneClass[tone]}`}>{icon}</div>
        <div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className={`mt-1 text-3xl font-semibold ${toneClass[tone].split(" ")[0]}`}>{value}</p>
          <p className="mt-1 text-xs text-slate-400">{sub}</p>
        </div>
      </div>
    </div>
  );
}
