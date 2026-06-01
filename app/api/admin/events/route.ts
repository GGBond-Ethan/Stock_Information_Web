import { fail, ok } from "@/lib/api-response";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { createMarketEvent } from "@/lib/market-repository";
import type { MarketEventCreateInput } from "@/types/market";

const requiredFields: Array<keyof MarketEventCreateInput> = [
  "date",
  "title",
  "fullTitle",
  "eventType",
  "market",
  "importanceLevel",
  "relatedSectors",
  "relatedStocks",
  "description",
  "expectedImpact",
  "source",
  "sourceUrl"
];

export async function POST(request: Request) {
  if (!verifyAdminRequest(request)) {
    return fail("管理员口令无效", 401);
  }

  try {
    const body = (await request.json()) as Partial<MarketEventCreateInput>;
    const missing = requiredFields.filter((field) => body[field] === undefined || body[field] === "");

    if (missing.length > 0) {
      return fail(`缺少必要字段：${missing.join(", ")}`);
    }

    const result = await createMarketEvent(body as MarketEventCreateInput);

    return ok(result.data, result.source === "supabase" ? "事件已写入 Supabase" : "事件已模拟创建，当前环境缺少 Supabase 写入配置");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "请求体不是合法 JSON");
  }
}
