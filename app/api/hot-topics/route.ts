import { ok } from "@/lib/api-response";
import { listHotTopics } from "@/lib/market-repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await listHotTopics({
    category: searchParams.get("category") || undefined,
    importanceLevel: searchParams.get("importanceLevel") || undefined,
    source: searchParams.get("source") || undefined,
    search: searchParams.get("search") || undefined,
    sort: (searchParams.get("sort") as "publishedAt" | "sentimentScore" | null) || "publishedAt"
  });

  return ok(result.data, `数据来源：${result.source}`);
}
