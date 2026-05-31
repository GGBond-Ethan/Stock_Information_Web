export function DonutStat({ value, label }: { value: number; label: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} stroke="#1e293b" strokeWidth="10" fill="none" />
        <circle cx="50" cy="50" r={radius} stroke="#60a5fa" strokeWidth="10" fill="none" strokeDasharray={strokeDasharray} strokeLinecap="round" />
        <circle cx="50" cy="50" r={radius} stroke="#f97316" strokeWidth="10" fill="none" strokeDasharray={`${circumference * 0.22} ${circumference}`} strokeLinecap="round" opacity="0.9" />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}
