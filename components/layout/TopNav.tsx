export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050b14]/90 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-8 w-8 items-center justify-center rounded bg-blue-500/20 text-lg font-black text-blue-300 sm:flex">M</div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-white md:text-base">A股热点情报与全球事件日历系统</h1>
            <p className="hidden text-[11px] text-slate-400 sm:block">Market Intel Terminal</p>
          </div>
        </div>
        <nav className="hidden flex-1 items-center justify-center gap-10 text-sm text-slate-400 lg:flex">
          {["自选", "个股", "行情", "资产", "选股器"].map((item, index) => (
            <span key={item} className={index === 0 ? "border-b-2 border-blue-400 px-5 py-5 text-slate-100" : ""}>
              {item}
            </span>
          ))}
          <span className="rounded border border-white/12 px-2 py-1 text-lg leading-none text-slate-300">+</span>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden h-8 w-72 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs text-slate-500 md:flex">
            <span>⌕</span>
            <span>代码/拼音/名称</span>
          </div>
          <span className="hidden text-lg text-slate-400 sm:inline">▦</span>
          <span className="hidden text-lg text-slate-400 sm:inline">♧</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">N</span>
        </div>
      </div>
    </header>
  );
}
