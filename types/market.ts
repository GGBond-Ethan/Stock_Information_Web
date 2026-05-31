export type Market = "A股" | "港股" | "美股" | "全球";

export type ImportanceLevel = "低" | "中" | "高";

export type Stock = {
  code: string;
  name: string;
  market: Market;
};

export type Source = {
  id: string;
  name: string;
  type: "政策" | "财经媒体" | "交易数据" | "社交媒体" | "公司公告" | "国际机构";
  url: string;
};

export type Sector = {
  id: string;
  name: string;
  description: string;
};

export type HotTopic = {
  id: string;
  title: string;
  source: string;
  category: string;
  marketImpact: Market[];
  relatedStocks: Stock[];
  relatedSectors: string[];
  sentimentScore: number;
  importanceLevel: ImportanceLevel;
  summary: string;
  publishedAt: string;
  sourceUrl: string;
};

export type MarketEvent = {
  id: string;
  date: string;
  title: string;
  fullTitle: string;
  eventType: string;
  market: Market[];
  importanceLevel: ImportanceLevel;
  relatedSectors: string[];
  relatedStocks: Stock[];
  description: string;
  expectedImpact: string;
  source: string;
  sourceUrl: string;
};

export type HotTopicCreateInput = Omit<HotTopic, "id">;

export type MarketEventCreateInput = Omit<MarketEvent, "id">;
