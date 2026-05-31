import type { HotTopic, ImportanceLevel, Market, MarketEvent } from "@/types/market";

export type TopicFilters = {
  category?: string;
  importanceLevel?: string;
  source?: string;
  search?: string;
  sort?: "publishedAt" | "sentimentScore";
};

export type EventFilters = {
  month?: string;
  market?: string;
  importanceLevel?: string;
};

export function filterTopics(topics: HotTopic[], filters: TopicFilters) {
  const search = filters.search?.trim().toLowerCase();

  return topics
    .filter((topic) => !filters.category || topic.category === filters.category)
    .filter((topic) => !filters.importanceLevel || topic.importanceLevel === filters.importanceLevel)
    .filter((topic) => !filters.source || topic.source === filters.source)
    .filter((topic) => {
      if (!search) return true;
      const haystack = [
        topic.title,
        topic.summary,
        topic.category,
        topic.source,
        ...topic.relatedSectors,
        ...topic.relatedStocks.map((stock) => `${stock.code}${stock.name}`)
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    })
    .sort((a, b) => {
      if (filters.sort === "sentimentScore") {
        return b.sentimentScore - a.sentimentScore;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}

export function filterEvents(events: MarketEvent[], filters: EventFilters) {
  return events
    .filter((event) => !filters.month || event.date.startsWith(filters.month))
    .filter((event) => !filters.market || event.market.includes(filters.market as Market))
    .filter((event) => !filters.importanceLevel || event.importanceLevel === (filters.importanceLevel as ImportanceLevel))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getSectorRanking(topics: HotTopic[]) {
  const stats = topics.reduce<Record<string, { name: string; count: number; total: number }>>((acc, topic) => {
    acc[topic.category] ??= { name: topic.category, count: 0, total: 0 };
    acc[topic.category].count += 1;
    acc[topic.category].total += topic.sentimentScore;
    return acc;
  }, {});

  return Object.values(stats)
    .map((item) => ({
      name: item.name,
      count: item.count,
      score: Math.round(item.total / item.count)
    }))
    .sort((a, b) => b.score - a.score);
}

export function getMarketOverview(topics: HotTopic[], events: MarketEvent[]) {
  const markets: Market[] = ["A股", "港股", "美股", "全球"];
  return markets.map((market) => ({
    market,
    topics: topics.filter((topic) => topic.marketImpact.includes(market)).length,
    events: events.filter((event) => event.market.includes(market)).length
  }));
}
