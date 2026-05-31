import { ok } from "@/lib/api-response";
import { filterTopics } from "@/lib/filters";
import { hotTopics } from "@/lib/mock/hotTopics";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = filterTopics(hotTopics, {
    category: searchParams.get("category") || undefined,
    importanceLevel: searchParams.get("importanceLevel") || undefined,
    source: searchParams.get("source") || undefined,
    search: searchParams.get("search") || undefined,
    sort: (searchParams.get("sort") as "publishedAt" | "sentimentScore" | null) || "publishedAt"
  });

  return ok(data);
}
