"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel, PanelBody, PanelHeader } from "@/components/ui/GlassPanel";
import { Select } from "@/components/ui/Select";
import { formatDate, formatMonth, getMonthMatrix } from "@/lib/dates";
import type { ApiResponse } from "@/types/api";
import type { MarketEvent } from "@/types/market";

export default function CalendarPage() {
  const [cursor, setCursor] = useState(new Date(2026, 4, 1));
  const [market, setMarket] = useState("");
  const [importanceLevel, setImportanceLevel] = useState("");
  const [events, setEvents] = useState<MarketEvent[]>([]);
  const [selected, setSelected] = useState<MarketEvent | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const month = useMemo(() => formatMonth(cursor), [cursor]);

  useEffect(() => {
    const params = new URLSearchParams({ month });
    if (market) params.set("market", market);
    if (importanceLevel) params.set("importanceLevel", importanceLevel);

    setLoading(true);
    fetch(`/api/events?${params.toString()}`)
      .then((res) => res.json() as Promise<ApiResponse<MarketEvent[]>>)
      .then((res) => {
        if (!res.success) throw new Error(res.error);
        setEvents(res.data);
        setSelected(res.data[0] ?? null);
        setError("");
      })
      .catch((err: Error) => setError(err.message || "事件数据加载失败"))
      .finally(() => setLoading(false));
  }, [month, market, importanceLevel]);

  function changeMonth(offset: number) {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_365px]">
      <GlassPanel>
        <PanelBody className="space-y-4 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-sky-300/80">Global Event Calendar</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">全球市场事件日历</h2>
            </div>
            <div className="text-sm text-slate-400">
              当前月份：<span className="font-semibold text-blue-300">{month}</span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-4">
            <Button onClick={() => changeMonth(-1)}>‹ 上一月</Button>
            <Button onClick={() => changeMonth(1)}>下一月 ›</Button>
            <Select value={market} onChange={(event) => setMarket(event.target.value)}>
              <option value="">全部市场</option>
              <option value="A股">A股</option>
              <option value="港股">港股</option>
              <option value="美股">美股</option>
              <option value="全球">全球</option>
            </Select>
            <Select value={importanceLevel} onChange={(event) => setImportanceLevel(event.target.value)}>
              <option value="">全部重要度</option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </Select>
          </div>

          {error && <div className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-red-100">{error}</div>}
          {loading && <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-slate-400">正在加载事件日历...</div>}
          {!loading && !error && (
            <CalendarMatrix year={cursor.getFullYear()} monthIndex={cursor.getMonth()} events={events} selected={selected} onSelect={setSelected} />
          )}
        </PanelBody>
      </GlassPanel>

      <aside className="space-y-4">
        <GlassPanel>
          <PanelHeader title="本月重点事件" action={<span className="text-xs text-slate-400">全部事件 ›</span>} />
          <PanelBody className="space-y-2 p-4">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelected(event)}
                className={`grid w-full grid-cols-[64px_1fr_18px] items-center gap-3 rounded-lg border p-3 text-left transition ${
                  selected?.id === event.id ? "border-blue-400/70 bg-blue-500/12" : "border-white/10 bg-white/[0.035] hover:border-blue-400/40"
                }`}
              >
                <span className="rounded-lg border border-white/10 bg-white/[0.035] p-2 text-center">
                  <span className="block text-lg text-slate-100">{event.date.slice(5)}</span>
                  <span className="text-xs text-slate-500">周{["日", "一", "二", "三", "四", "五", "六"][new Date(event.date).getDay()]}</span>
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <ImportanceBadge level={event.importanceLevel} />
                    <span className="font-semibold text-white">{event.title}</span>
                  </span>
                  <span className="mt-2 block text-xs text-slate-400">{event.eventType} · {event.market.join(" / ")}</span>
                </span>
                <span className="text-slate-400">›</span>
              </button>
            ))}
          </PanelBody>
        </GlassPanel>

        <GlassPanel>
          <PanelBody className="p-4">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selected.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <ImportanceBadge level={selected.importanceLevel} />
                      <Badge tone="cyan">{selected.eventType}</Badge>
                    </div>
                  </div>
                  <button className="text-xl text-slate-400">×</button>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>◷ {selected.date} 20:30（北京时间）</p>
                  <p>◎ {selected.market.join(" / ")}</p>
                  <p>▣ {selected.source}</p>
                </div>
                <section>
                  <h4 className="text-sm font-semibold text-white">事件说明</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{selected.description}</p>
                </section>
                <section>
                  <h4 className="text-sm font-semibold text-white">可能影响</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{selected.expectedImpact}</p>
                </section>
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="block rounded-lg border border-blue-400/50 py-2 text-center text-sm text-blue-200">
                  查看来源
                </a>
              </div>
            ) : (
              <p className="text-sm text-slate-400">选择一个事件查看详情</p>
            )}
          </PanelBody>
        </GlassPanel>
      </aside>
    </div>
  );
}

function CalendarMatrix({
  year,
  monthIndex,
  events,
  selected,
  onSelect
}: {
  year: number;
  monthIndex: number;
  events: MarketEvent[];
  selected: MarketEvent | null;
  onSelect: (event: MarketEvent) => void;
}) {
  const days = getMonthMatrix(year, monthIndex);
  const byDate = events.reduce<Record<string, MarketEvent[]>>((acc, event) => {
    acc[event.date] = [...(acc[event.date] ?? []), event];
    return acc;
  }, {});

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.035]">
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <div key={day} className="px-3 py-3 text-center text-sm text-slate-300">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const iso = formatDate(day);
          const currentMonth = day.getMonth() === monthIndex;
          const dayEvents = byDate[iso] ?? [];
          const isSelected = dayEvents.some((event) => event.id === selected?.id);
          return (
            <div
              key={iso}
              className={`min-h-28 border-b border-r border-white/10 p-3 md:min-h-32 ${
                isSelected ? "ring-2 ring-blue-400" : ""
              } ${currentMonth ? "bg-white/[0.015]" : "bg-black/15 text-slate-600"}`}
            >
              <p className={`mb-4 text-sm ${currentMonth ? "text-slate-100" : "text-slate-600"}`}>{day.getDate()}</p>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onSelect(event)}
                    className={`block max-w-full rounded border px-2 py-1 text-left text-xs ${
                      event.importanceLevel === "高"
                        ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
                        : event.importanceLevel === "中"
                          ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-100"
                          : "border-blue-300/35 bg-blue-300/10 text-blue-100"
                    }`}
                  >
                    <span className="mr-1">•</span>
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
