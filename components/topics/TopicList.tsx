import type { HotTopic } from "@/types/market";
import { TopicCard } from "./TopicCard";

export function TopicList({ topics }: { topics: HotTopic[] }) {
  if (topics.length === 0) {
    return <div className="rounded-md border border-terminal-border/75 bg-terminal-panel/80 p-8 text-center text-terminal-muted">没有匹配的热点信息</div>;
  }

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
