import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { MarketEvent } from "@/types/market";

export function MonthlyKeyEvents({ events, onSelect }: { events: MarketEvent[]; onSelect: (event: MarketEvent) => void }) {
  const keyEvents = [...events]
    .sort((a, b) => {
      const importance = { 高: 3, 中: 2, 低: 1 };
      return importance[b.importanceLevel] - importance[a.importanceLevel] || a.date.localeCompare(b.date);
    })
    .slice(0, 8);

  return (
    <Card>
      <CardHeader title="本月重点事件" />
      <CardBody className="space-y-3">
        {keyEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => onSelect(event)}
            className="w-full rounded-md border border-terminal-border/70 bg-terminal-panel2/50 p-3 text-left transition hover:border-terminal-cyan/70 hover:bg-terminal-panel2/60"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-terminal-muted">{event.date}</span>
              <ImportanceBadge level={event.importanceLevel} />
            </div>
            <p className="mt-2 text-sm font-medium text-white">{event.title}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {event.market.map((market) => (
                <Badge key={market}>{market}</Badge>
              ))}
            </div>
          </button>
        ))}
      </CardBody>
    </Card>
  );
}
