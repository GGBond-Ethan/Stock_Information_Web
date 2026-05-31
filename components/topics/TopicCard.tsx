import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import type { HotTopic } from "@/types/market";
import { SentimentBadge } from "./SentimentBadge";

export function TopicCard({ topic }: { topic: HotTopic }) {
  return (
    <Card>
      <CardBody className="space-y-3 p-3.5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="cyan">{topic.category}</Badge>
              <ImportanceBadge level={topic.importanceLevel} />
              <span className="text-xs text-terminal-muted">{topic.source}</span>
            </div>
            <h3 className="mt-2 text-base font-medium text-white">{topic.title}</h3>
          </div>
          <SentimentBadge score={topic.sentimentScore} />
        </div>

        <p className="text-sm leading-6 text-terminal-muted">{topic.summary}</p>

        <div className="grid gap-3 rounded-md border border-terminal-border/60 bg-terminal-bg/30 p-3 text-xs md:grid-cols-2">
          <div>
            <p className="mb-2 text-terminal-muted">相关板块</p>
            <div className="flex flex-wrap gap-2">
              {topic.relatedSectors.map((sector) => (
                <Badge key={sector}>{sector}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-terminal-muted">相关股票</p>
            <div className="flex flex-wrap gap-2">
              {topic.relatedStocks.length > 0 ? (
                topic.relatedStocks.map((stock) => (
                  <Badge key={stock.code} tone={stock.market === "A股" ? "red" : "green"}>
                    {stock.name} {stock.code}
                  </Badge>
                ))
              ) : (
                <span className="text-terminal-muted">暂无明确映射</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-terminal-border/70 pt-3 text-xs text-terminal-muted">
          <span>{new Date(topic.publishedAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}</span>
          <a href={topic.sourceUrl} target="_blank" rel="noreferrer" className="text-terminal-cyan/90 hover:text-white">
            查看来源
          </a>
        </div>
      </CardBody>
    </Card>
  );
}
