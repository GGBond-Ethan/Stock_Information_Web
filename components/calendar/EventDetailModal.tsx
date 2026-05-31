"use client";

import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import type { MarketEvent } from "@/types/market";

export function EventDetailModal({ event, onClose }: { event: MarketEvent | null; onClose: () => void }) {
  return (
    <Modal open={Boolean(event)} title={event?.fullTitle ?? "事件详情"} onClose={onClose}>
      {event && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <ImportanceBadge level={event.importanceLevel} />
            <Badge tone="cyan">{event.eventType}</Badge>
            {event.market.map((market) => (
              <Badge key={market}>{market}</Badge>
            ))}
          </div>

          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div className="rounded-md border border-terminal-border/70 bg-terminal-panel2/60 p-3">
              <p className="text-xs text-terminal-muted">日期</p>
              <p className="mt-1 text-terminal-text">{event.date}</p>
            </div>
            <div className="rounded-md border border-terminal-border/70 bg-terminal-panel2/60 p-3">
              <p className="text-xs text-terminal-muted">来源</p>
              <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 block text-terminal-cyan/90 hover:text-white">
                {event.source}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white">事件说明</h4>
            <p className="mt-2 text-sm leading-6 text-terminal-muted">{event.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white">可能影响</h4>
            <p className="mt-2 text-sm leading-6 text-terminal-muted">{event.expectedImpact}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm text-terminal-text">相关板块</p>
              <div className="flex flex-wrap gap-2">
                {event.relatedSectors.map((sector) => (
                  <Badge key={sector}>{sector}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-terminal-text">相关股票</p>
              <div className="flex flex-wrap gap-2">
                {event.relatedStocks.map((stock) => (
                  <Badge key={stock.code} tone={stock.market === "A股" ? "red" : "green"}>
                    {stock.name} {stock.code}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
