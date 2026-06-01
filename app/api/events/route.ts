import { ok } from "@/lib/api-response";
import { listMarketEvents } from "@/lib/market-repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await listMarketEvents({
    month: searchParams.get("month") || undefined,
    market: searchParams.get("market") || undefined,
    importanceLevel: searchParams.get("importanceLevel") || undefined
  });

  return ok(result.data, `数据来源：${result.source}`);
}
