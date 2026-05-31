import type { ImportanceLevel } from "@/types/market";

const importanceClass: Record<ImportanceLevel, string> = {
  高: "border-terminal-red/40 bg-terminal-red/10 text-red-100",
  中: "border-terminal-amber/40 bg-terminal-amber/10 text-amber-100",
  低: "border-terminal-cyan/40 bg-terminal-cyan/10 text-cyan-100"
};

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "red" | "amber" | "cyan" }) {
  const tones = {
    neutral: "border-terminal-border/70 bg-terminal-panel2/50 text-terminal-text",
    green: "border-terminal-green/40 bg-terminal-green/10 text-green-100",
    red: "border-terminal-red/40 bg-terminal-red/10 text-red-100",
    amber: "border-terminal-amber/40 bg-terminal-amber/10 text-amber-100",
    cyan: "border-terminal-cyan/40 bg-terminal-cyan/10 text-cyan-100"
  };

  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs ${tones[tone]}`}>{children}</span>;
}

export function ImportanceBadge({ level }: { level: ImportanceLevel }) {
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs ${importanceClass[level]}`}>{level}</span>;
}
