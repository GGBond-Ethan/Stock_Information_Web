import { ok } from "@/lib/api-response";
import { filterEvents } from "@/lib/filters";
import { marketEvents } from "@/lib/mock/events";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = filterEvents(marketEvents, {
    month: searchParams.get("month") || undefined,
    market: searchParams.get("market") || undefined,
    importanceLevel: searchParams.get("importanceLevel") || undefined
  });

  return ok(data);
}
