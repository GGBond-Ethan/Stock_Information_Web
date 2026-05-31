import type { MarketEvent } from "@/types/market";

export function CalendarEventChip({ event, onClick }: { event: MarketEvent; onClick: (event: MarketEvent) => void }) {
  const tone =
    event.importanceLevel === "高"
      ? "border-terminal-amber/40 bg-terminal-amber/10 text-amber-100"
      : event.importanceLevel === "中"
        ? "border-terminal-cyan/40 bg-terminal-cyan/10 text-cyan-100"
        : "border-terminal-border/70 bg-terminal-panel2/50 text-terminal-muted";

  return (
    <button
      onClick={() => onClick(event)}
      className={`block w-full truncate whitespace-nowrap rounded-md border px-1.5 py-1 text-left text-[11px] leading-4 transition hover:border-terminal-cyan/70 hover:text-white md:px-2 ${tone}`}
      title={event.fullTitle}
    >
      {event.title}
    </button>
  );
}
