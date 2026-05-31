import type { Stock } from "@/types/market";

export const stocks: Stock[] = [
  { code: "300750", name: "宁德时代", market: "A股" },
  { code: "002230", name: "科大讯飞", market: "A股" },
  { code: "688981", name: "中芯国际", market: "A股" },
  { code: "002415", name: "海康威视", market: "A股" },
  { code: "09868", name: "小鹏汽车-W", market: "港股" },
  { code: "00700", name: "腾讯控股", market: "港股" },
  { code: "NVDA", name: "英伟达", market: "美股" },
  { code: "TSLA", name: "特斯拉", market: "美股" },
  { code: "MSFT", name: "微软", market: "美股" },
  { code: "AAPL", name: "苹果", market: "美股" }
];
