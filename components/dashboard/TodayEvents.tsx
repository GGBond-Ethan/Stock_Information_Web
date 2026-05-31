import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { MarketEvent } from "@/types/market";

export function TodayEvents({ events }: { events: MarketEvent[] }) {
  const items = [...events]
    .sort((a, b) => {
      const importance = { 高: 3, 中: 2, 低: 1 };
      return importance[b.importanceLevel] - importance[a.importanceLevel] || a.date.localeCompare(b.date);
    })
    .slice(0, 5);

  return (
    <Card>
      <CardHeader title="近期重点事件" />
      <CardBody className="space-y-3">
        {items.map((event) => (
          <div key={event.id} className="rounded-md border border-terminal-border/70 bg-terminal-panel2/50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-terminal-muted">{event.date}</span>
              <ImportanceBadge level={event.importanceLevel} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-white">{event.fullTitle}</h3>
            <p className="mt-2 text-xs leading-5 text-terminal-muted">{event.expectedImpact}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {event.market.map((market) => (
                <Badge key={market}>{market}</Badge>
              ))}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
