import { fail, ok } from "@/lib/api-response";
import { hotTopics } from "@/lib/mock/hotTopics";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = hotTopics.find((item) => item.id === id);

  if (!topic) {
    return fail("未找到对应热点信息", 404);
  }

  return ok(topic);
}
