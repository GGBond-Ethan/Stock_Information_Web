import type { HotTopic, ImportanceLevel, Market, MarketEvent, Stock } from "@/types/market";

type StockRow = {
  code: string;
  name: string;
  market: Market;
};

type TopicStockRelationRow = {
  stocks: StockRow | StockRow[] | null;
};

type EventStockRelationRow = {
  stocks: StockRow | StockRow[] | null;
};

export type HotTopicRow = {
  id: string;
  title: string;
  source_name: string;
  category: string;
  market_impact: Market[];
  related_sectors: string[];
  sentiment_score: number;
  importance_level: ImportanceLevel;
  summary: string;
  published_at: string;
  source_url: string;
  topic_stock_relations?: TopicStockRelationRow[] | null;
};

export type MarketEventRow = {
  id: string;
  event_date: string;
  title: string;
  full_title: string;
  event_type: string;
  market: Market[];
  importance_level: ImportanceLevel;
  related_sectors: string[];
  description: string;
  expected_impact: string;
  source_name: string;
  source_url: string;
  event_stock_relations?: EventStockRelationRow[] | null;
};

function normalizeStocks(relations?: Array<TopicStockRelationRow | EventStockRelationRow> | null): Stock[] {
  if (!relations) return [];

  return relations.flatMap((relation) => {
    const stocks = relation.stocks;
    if (!stocks) return [];
    return Array.isArray(stocks) ? stocks : [stocks];
  });
}

export function mapHotTopicRow(row: HotTopicRow): HotTopic {
  return {
    id: row.id,
    title: row.title,
    source: row.source_name,
    category: row.category,
    marketImpact: row.market_impact ?? [],
    relatedStocks: normalizeStocks(row.topic_stock_relations),
    relatedSectors: row.related_sectors ?? [],
    sentimentScore: row.sentiment_score,
    importanceLevel: row.importance_level,
    summary: row.summary,
    publishedAt: row.published_at,
    sourceUrl: row.source_url
  };
}

export function mapMarketEventRow(row: MarketEventRow): MarketEvent {
  return {
    id: row.id,
    date: row.event_date,
    title: row.title,
    fullTitle: row.full_title,
    eventType: row.event_type,
    market: row.market ?? [],
    importanceLevel: row.importance_level,
    relatedSectors: row.related_sectors ?? [],
    relatedStocks: normalizeStocks(row.event_stock_relations),
    description: row.description,
    expectedImpact: row.expected_impact,
    source: row.source_name,
    sourceUrl: row.source_url
  };
}
