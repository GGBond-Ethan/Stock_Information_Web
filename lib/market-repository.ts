import { filterEvents, filterTopics, type EventFilters, type TopicFilters } from "@/lib/filters";
import { marketEvents } from "@/lib/mock/events";
import { hotTopics } from "@/lib/mock/hotTopics";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { mapHotTopicRow, mapMarketEventRow, type HotTopicRow, type MarketEventRow } from "@/lib/supabase-mappers";
import type { HotTopic, HotTopicCreateInput, MarketEvent, MarketEventCreateInput } from "@/types/market";

const topicSelect = `
  *,
  topic_stock_relations (
    stocks (
      code,
      name,
      market
    )
  )
`;

const eventSelect = `
  *,
  event_stock_relations (
    stocks (
      code,
      name,
      market
    )
  )
`;

export async function listHotTopics(filters: TopicFilters): Promise<{ data: HotTopic[]; source: "supabase" | "mock" }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return { data: filterTopics(hotTopics, filters), source: "mock" };
  }

  const { data, error } = await supabase.from("hot_topics").select(topicSelect).order("published_at", { ascending: false });

  if (error || !data) {
    console.error("Supabase hot_topics query failed:", error?.message);
    return { data: filterTopics(hotTopics, filters), source: "mock" };
  }

  return { data: filterTopics((data as HotTopicRow[]).map(mapHotTopicRow), filters), source: "supabase" };
}

export async function getHotTopicById(id: string): Promise<{ data: HotTopic | null; source: "supabase" | "mock" }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return { data: hotTopics.find((item) => item.id === id) ?? null, source: "mock" };
  }

  const { data, error } = await supabase.from("hot_topics").select(topicSelect).eq("id", id).maybeSingle();

  if (error) {
    console.error("Supabase hot_topic detail query failed:", error.message);
    return { data: hotTopics.find((item) => item.id === id) ?? null, source: "mock" };
  }

  return { data: data ? mapHotTopicRow(data as HotTopicRow) : null, source: "supabase" };
}

export async function createHotTopic(input: HotTopicCreateInput): Promise<{ data: HotTopic; source: "supabase" | "mock" }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      data: {
        id: `topic-admin-${Date.now()}`,
        ...input
      },
      source: "mock"
    };
  }

  const insertPayload = {
    title: input.title,
    source_name: input.source,
    category: input.category,
    market_impact: input.marketImpact,
    related_sectors: input.relatedSectors,
    sentiment_score: input.sentimentScore,
    importance_level: input.importanceLevel,
    summary: input.summary,
    published_at: input.publishedAt,
    source_url: input.sourceUrl
  };

  const { data, error } = await supabase.from("hot_topics").insert(insertPayload).select(topicSelect).single();

  if (error || !data) {
    throw new Error(error?.message || "热点信息写入失败");
  }

  return { data: mapHotTopicRow(data as HotTopicRow), source: "supabase" };
}

export async function listMarketEvents(filters: EventFilters): Promise<{ data: MarketEvent[]; source: "supabase" | "mock" }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return { data: filterEvents(marketEvents, filters), source: "mock" };
  }

  const { data, error } = await supabase.from("market_events").select(eventSelect).order("event_date", { ascending: true });

  if (error || !data) {
    console.error("Supabase market_events query failed:", error?.message);
    return { data: filterEvents(marketEvents, filters), source: "mock" };
  }

  return { data: filterEvents((data as MarketEventRow[]).map(mapMarketEventRow), filters), source: "supabase" };
}

export async function getMarketEventById(id: string): Promise<{ data: MarketEvent | null; source: "supabase" | "mock" }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return { data: marketEvents.find((item) => item.id === id) ?? null, source: "mock" };
  }

  const { data, error } = await supabase.from("market_events").select(eventSelect).eq("id", id).maybeSingle();

  if (error) {
    console.error("Supabase event detail query failed:", error.message);
    return { data: marketEvents.find((item) => item.id === id) ?? null, source: "mock" };
  }

  return { data: data ? mapMarketEventRow(data as MarketEventRow) : null, source: "supabase" };
}

export async function createMarketEvent(input: MarketEventCreateInput): Promise<{ data: MarketEvent; source: "supabase" | "mock" }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      data: {
        id: `event-admin-${Date.now()}`,
        ...input
      },
      source: "mock"
    };
  }

  const insertPayload = {
    event_date: input.date,
    title: input.title,
    full_title: input.fullTitle,
    event_type: input.eventType,
    market: input.market,
    importance_level: input.importanceLevel,
    related_sectors: input.relatedSectors,
    description: input.description,
    expected_impact: input.expectedImpact,
    source_name: input.source,
    source_url: input.sourceUrl
  };

  const { data, error } = await supabase.from("market_events").insert(insertPayload).select(eventSelect).single();

  if (error || !data) {
    throw new Error(error?.message || "市场事件写入失败");
  }

  return { data: mapMarketEventRow(data as MarketEventRow), source: "supabase" };
}
