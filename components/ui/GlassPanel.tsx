import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <section className={`glass-panel rounded-xl border border-white/12 bg-white/[0.045] shadow-terminal ${className}`}>
      {children}
    </section>
  );
}

export function PanelHeader({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
      <div>
        {eyebrow && <p className="text-[11px] uppercase tracking-[0.28em] text-sky-300/80">{eyebrow}</p>}
        <h2 className="text-base font-semibold text-slate-50">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function PanelBody({ children, className = "" }: GlassPanelProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
