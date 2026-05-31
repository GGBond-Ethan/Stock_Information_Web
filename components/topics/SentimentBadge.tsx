export function SentimentBadge({ score }: { score: number }) {
  const tone =
    score >= 85
      ? "border-terminal-red/40 bg-terminal-red/10 text-red-100"
      : score >= 70
        ? "border-terminal-amber/40 bg-terminal-amber/10 text-amber-100"
        : "border-terminal-green/40 bg-terminal-green/10 text-green-100";

  return (
    <span className={`inline-flex min-w-16 self-start justify-center rounded-md border px-2 py-1 text-xs font-medium ${tone}`}>
      热度 {score}
    </span>
  );
}
