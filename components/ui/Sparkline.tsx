export function Sparkline({ values, tone = "orange" }: { values: number[]; tone?: "orange" | "blue" | "green" }) {
  const width = 92;
  const height = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke = tone === "orange" ? "#f97316" : tone === "green" ? "#34d399" : "#60a5fa";

  const areaPath = `M 0 ${height} L ${points.split(" ").join(" L ")} L ${width} ${height} Z`;

  return (
    <svg className="h-8 w-24" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline fill="none" stroke={stroke} strokeWidth="1.6" points={points} />
      <path d={areaPath} fill={stroke} opacity="0.1" />
    </svg>
  );
}
