import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { HotTopic } from "@/types/market";

export function TodayHotTopics({ topics }: { topics: HotTopic[] }) {
  const items = [...topics]
    .sort((a, b) => b.sentimentScore - a.sentimentScore)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader title="今日重点热点" />
      <CardBody className="space-y-3">
        {items.map((topic) => (
          <div key={topic.id} className="rounded-md border border-terminal-border/70 bg-terminal-panel2/50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge tone="cyan">{topic.category}</Badge>
                <ImportanceBadge level={topic.importanceLevel} />
              </div>
              <span className="text-xs font-medium text-terminal-red">热度 {topic.sentimentScore}</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-white">{topic.title}</h3>
            <p className="mt-2 text-xs leading-5 text-terminal-muted">{topic.summary}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
