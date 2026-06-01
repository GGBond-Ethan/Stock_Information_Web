import { fail, ok } from "@/lib/api-response";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { createHotTopic } from "@/lib/market-repository";
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
  if (!verifyAdminRequest(request)) {
    return fail("管理员口令无效", 401);
  }

  try {
    const body = (await request.json()) as Partial<HotTopicCreateInput>;
    const missing = requiredFields.filter((field) => body[field] === undefined || body[field] === "");

    if (missing.length > 0) {
      return fail(`缺少必要字段：${missing.join(", ")}`);
    }

    if (typeof body.sentimentScore !== "number" || body.sentimentScore < 0 || body.sentimentScore > 100) {
      return fail("sentimentScore 必须是 0-100 的数字");
    }

    const result = await createHotTopic(body as HotTopicCreateInput);

    return ok(result.data, result.source === "supabase" ? "热点信息已写入 Supabase" : "热点信息已模拟创建，当前环境缺少 Supabase 写入配置");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "请求体不是合法 JSON");
  }
}
