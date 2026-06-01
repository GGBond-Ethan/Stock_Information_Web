import { fail, ok } from "@/lib/api-response";
import { getHotTopicById } from "@/lib/market-repository";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getHotTopicById(id);

  if (!result.data) {
    return fail("未找到对应热点信息", 404);
  }

  return ok(result.data, `数据来源：${result.source}`);
}
