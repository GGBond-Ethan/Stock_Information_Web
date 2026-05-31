import { fail, ok } from "@/lib/api-response";
import type { HotTopicCreateInput } from "@/types/market";

const requiredFields: Array<keyof HotTopicCreateInput> = [
  "title",
  "source",
  "category",
  "marketImpact",
  "relatedStocks",
  "relatedSectors",
  "sentimentScore",
  "importanceLevel",
  "summary",
  "publishedAt",
  "sourceUrl"
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<HotTopicCreateInput>;
    const missing = requiredFields.filter((field) => body[field] === undefined || body[field] === "");

    if (missing.length > 0) {
      return fail(`缺少必要字段：${missing.join(", ")}`);
    }

    if (typeof body.sentimentScore !== "number" || body.sentimentScore < 0 || body.sentimentScore > 100) {
      return fail("sentimentScore 必须是 0-100 的数字");
    }

    return ok(
      {
        id: `topic-admin-${Date.now()}`,
        ...body
      },
      "热点信息已模拟创建，后续可替换为 Supabase 写入"
    );
  } catch {
    return fail("请求体不是合法 JSON");
  }
}
