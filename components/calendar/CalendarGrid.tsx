import { formatDate, getMonthMatrix } from "@/lib/dates";
import type { MarketEvent } from "@/types/market";
import { CalendarEventChip } from "./CalendarEventChip";

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

export function CalendarGrid({
  year,
  monthIndex,
  events,
  onSelectEvent
}: {
  year: number;
  monthIndex: number;
  events: MarketEvent[];
  onSelectEvent: (event: MarketEvent) => void;
}) {
  const days = getMonthMatrix(year, monthIndex);
  const byDate = events.reduce<Record<string, MarketEvent[]>>((acc, event) => {
    acc[event.date] = [...(acc[event.date] ?? []), event];
    return acc;
  }, {});

  return (
    <div className="overflow-hidden rounded-md border border-terminal-border/75 bg-terminal-panel/90">
      <div className="grid grid-cols-7 border-b border-terminal-border/70 bg-terminal-panel2/60">
        {weekdays.map((day) => (
          <div key={day} className="px-2 py-2 text-center text-xs text-terminal-muted">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const iso = formatDate(day);
          const currentMonth = day.getMonth() === monthIndex;
          const dayEvents = byDate[iso] ?? [];
          return (
            <div
              key={iso}
              className={`min-h-28 border-b border-r border-terminal-border/50 p-2 last:border-r-0 md:min-h-32 ${
                currentMonth ? "bg-terminal-panel/50" : "bg-terminal-bg/50 text-terminal-muted"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-xs ${currentMonth ? "text-terminal-text" : "text-terminal-muted"}`}>{day.getDate()}</span>
                {dayEvents.some((event) => event.importanceLevel === "高") && <span className="h-1.5 w-1.5 rounded-full bg-terminal-amber" />}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <CalendarEventChip key={event.id} event={event} onClick={onSelectEvent} />
                ))}
                {dayEvents.length > 3 && <p className="text-[11px] text-terminal-muted">+{dayEvents.length - 3} 更多</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
