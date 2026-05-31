import { fail, ok } from "@/lib/api-response";
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
  try {
    const body = (await request.json()) as Partial<MarketEventCreateInput>;
    const missing = requiredFields.filter((field) => body[field] === undefined || body[field] === "");

    if (missing.length > 0) {
      return fail(`缺少必要字段：${missing.join(", ")}`);
    }

    return ok(
      {
        id: `event-admin-${Date.now()}`,
        ...body
      },
      "事件已模拟创建，后续可替换为 Supabase 写入"
    );
  } catch {
    return fail("请求体不是合法 JSON");
  }
}
