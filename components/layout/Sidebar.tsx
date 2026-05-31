"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", desc: "综合看板", icon: "⌂" },
  { href: "/topics", label: "Hot Topics", desc: "热点题材", icon: "◆" },
  { href: "/calendar", label: "Calendar", desc: "事件日历", icon: "▣" },
  { href: "/admin", label: "Admin", desc: "后台管理", icon: "⚙" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative border-b border-white/10 bg-[#06101c]/70 backdrop-blur-xl lg:sticky lg:top-14 lg:min-h-[calc(100vh-3.5rem-2.5rem)] lg:w-60 lg:border-b-0 lg:border-r">
      <div className="hidden p-5 lg:block">
        <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300/80">Market Intel Terminal</p>
        <h2 className="mt-3 text-base font-semibold leading-6 text-white">A股热点情报与全球事件日历系统</h2>
      </div>
      <nav className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 lg:grid-cols-1 lg:px-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg border px-3 py-3 transition ${
                active
                  ? "border-blue-400/50 bg-blue-500/12 text-blue-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "border-transparent bg-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.045] hover:text-slate-100"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035]">{item.icon}</span>
              <span>
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="mt-0.5 block text-xs">{item.desc}</span>
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="hidden border-t border-white/10 p-5 text-xs leading-6 text-slate-400 lg:block">
        <p className="font-semibold text-white">数据接入预留</p>
        <p>发改委政策、财联社电报、题材库、X/Twitter、抖音热榜。</p>
      </div>
      <div className="absolute bottom-5 left-5 right-5 hidden items-center gap-3 text-xs text-slate-400 lg:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white">N</span>
        <span className="flex-1">市场情报组</span>
        <span>⌄</span>
      </div>
    </aside>
  );
}
