import { fail, ok } from "@/lib/api-response";
import { marketEvents } from "@/lib/mock/events";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = marketEvents.find((item) => item.id === id);

  if (!event) {
    return fail("未找到对应事件", 404);
  }

  return ok(event);
}
