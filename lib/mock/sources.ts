import type { Source } from "@/types/market";

export const sources: Source[] = [
  { id: "ndrc", name: "国家发改委", type: "政策", url: "https://www.ndrc.gov.cn/xwdt/" },
  { id: "cls", name: "财联社电报", type: "财经媒体", url: "https://www.cls.cn/" },
  { id: "ths", name: "同花顺题材库", type: "交易数据", url: "https://www.10jqka.com.cn/" },
  { id: "kpl", name: "开盘啦题材", type: "交易数据", url: "https://www.kaipanla.com/" },
  { id: "x-finance", name: "X财经观察", type: "社交媒体", url: "https://x.com/" },
  { id: "douyin", name: "抖音财经热榜", type: "社交媒体", url: "https://www.douyin.com/" },
  { id: "exchange", name: "交易所公告", type: "公司公告", url: "https://www.sse.com.cn/" },
  { id: "global", name: "全球宏观日历", type: "国际机构", url: "https://www.federalreserve.gov/" }
];
