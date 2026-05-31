import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section className={`rounded-md border border-terminal-border/75 bg-terminal-panel/90 shadow-panel ${className}`}>
      {children}
    </section>
  );
}

export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-terminal-border/70 px-4 py-3">
      <h2 className="text-sm font-medium text-terminal-text">{title}</h2>
      {action}
    </div>
  );
}

export function CardBody({ children, className = "" }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
