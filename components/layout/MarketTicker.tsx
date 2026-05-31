import { marketTicker } from "@/lib/mock/marketTicker";

export function MarketTicker() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#07101b]/92 px-4 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-8 overflow-x-auto whitespace-nowrap text-xs terminal-scrollbar">
        {marketTicker.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span className="text-slate-400">{item.name}</span>
            <span className={item.direction === "down" ? "text-emerald-300" : item.direction === "up" ? "text-red-400" : "text-slate-300"}>{item.value}</span>
            <span className={item.direction === "down" ? "text-emerald-300" : item.direction === "up" ? "text-red-400" : "text-slate-300"}>{item.change}</span>
            <span className={item.direction === "down" ? "text-emerald-300" : item.direction === "up" ? "text-red-400" : "text-slate-300"}>{item.percent}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
