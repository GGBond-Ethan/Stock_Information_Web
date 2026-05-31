import type { Sector } from "@/types/market";

export const sectors: Sector[] = [
  { id: "ai-compute", name: "AI算力", description: "GPU、服务器、光模块、数据中心和云基础设施。" },
  { id: "low-altitude", name: "低空经济", description: "eVTOL、无人机、空管系统和通航基础设施。" },
  { id: "robotics", name: "机器人", description: "人形机器人、工业自动化、减速器和传感器。" },
  { id: "semiconductor", name: "半导体", description: "晶圆制造、设备、材料、封测和国产替代。" },
  { id: "new-energy", name: "新能源", description: "动力电池、储能、光伏、风电和电网消纳。" },
  { id: "consumption", name: "消费", description: "食品饮料、旅游、免税、家电和新零售。" },
  { id: "medicine", name: "医药", description: "创新药、医疗器械、CXO 和中药。" },
  { id: "state-owned", name: "国企改革", description: "央国企估值重塑、并购重组和分红改善。" }
];
