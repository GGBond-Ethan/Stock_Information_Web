export type MarketTickerItem = {
  name: string;
  value: string;
  change: string;
  percent: string;
  direction: "up" | "down" | "flat";
};

export const marketTicker: MarketTickerItem[] = [
  { name: "上证指数", value: "3,118.81", change: "-6.12", percent: "-0.20%", direction: "down" },
  { name: "深证成指", value: "9,500.97", change: "+23.47", percent: "+0.25%", direction: "up" },
  { name: "创业板指", value: "1,856.18", change: "+8.37", percent: "+0.45%", direction: "up" },
  { name: "恒生指数", value: "18,627.16", change: "-124.95", percent: "-0.67%", direction: "down" },
  { name: "纳斯达克", value: "16,920.58", change: "+98.78", percent: "+0.59%", direction: "up" },
  { name: "美元指数", value: "104.32", change: "+0.11", percent: "+0.10%", direction: "flat" }
];
