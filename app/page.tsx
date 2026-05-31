"use client";

import { useEffect, useState } from "react";
import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { GlassPanel, PanelBody, PanelHeader } from "@/components/ui/GlassPanel";
import { MetricCard } from "@/components/ui/MetricCard";
import { Sparkline } from "@/components/ui/Sparkline";
import { getMarketOverview, getSectorRanking } from "@/lib/filters";
import type { ApiResponse } from "@/types/api";
import type { HotTopic, MarketEvent } from "@/types/market";

export default function DashboardPage() {
  const [topics, setTopics] = useState<HotTopic[]>([]);
  const [events, setEvents] = useState<MarketEvent[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/hot-topics?sort=sentimentScore").then((res) => res.json() as Promise<ApiResponse<HotTopic[]>>),
      fetch("/api/events?month=2026-05").then((res) => res.json() as Promise<ApiResponse<MarketEvent[]>>)
    ])
      .then(([topicRes, eventRes]) => {
        if (!topicRes.success) throw new Error(topicRes.error);
        if (!eventRes.success) throw new Error(eventRes.error);
        setTopics(topicRes.data);
        setEvents(eventRes.data);
      })
      .catch((err: Error) => setError(err.message || "Dashboard 数据加载失败"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="rounded-md border border-terminal-border/75 bg-terminal-panel/80 p-6 text-terminal-muted">正在加载市场情报看板...</div>;
  }

  if (error) {
    return <div className="rounded-md border border-terminal-red/40 bg-terminal-red/10 p-4 text-red-100">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <section className="grid gap-3 md:grid-cols-4">
        <MetricCard label="热点总数" value={topics.length} sub="较昨日 +2" icon="🔥" tone="red" />
        <MetricCard label="事件总数" value={events.length} sub="较昨日 +1" icon="▤" tone="green" />
        <MetricCard label="高重要度热点" value={topics.filter((item) => item.importanceLevel === "高").length} sub="较昨日 +1" icon="★" tone="amber" />
        <MetricCard label="覆盖市场" value="4" sub="A股 / 港股 / 美股 / 全球" icon="◎" tone="blue" />
      </section>

      <div className="grid items-start gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.7fr)]">
        <GlassPanel>
          <PanelHeader title="今日重点热点" action={<span className="text-xs text-slate-400">更多 ›</span>} />
          <PanelBody className="overflow-x-auto p-3 terminal-scrollbar">
            <table className="terminal-table min-w-[860px]">
              <thead>
                <tr>
                  <th>#</th>
                  <th>热点标题</th>
                  <th>题材</th>
                  <th>热度</th>
                  <th>趋势(24h)</th>
                  <th>相关板块</th>
                  <th>相关股票</th>
                </tr>
              </thead>
              <tbody>
                {topics.slice(0, 5).map((topic, index) => (
                  <tr key={topic.id}>
                    <td className="text-lg font-semibold text-slate-200">{index + 1}</td>
                    <td className="max-w-72">
                      <p className="font-semibold text-slate-100">{topic.title}</p>
                      <p className="mt-1 truncate text-xs text-slate-500">{topic.summary}</p>
                    </td>
                    <td>
                      <Badge tone="cyan">{topic.category}</Badge>
                    </td>
                    <td className="text-lg font-semibold text-orange-400">{topic.sentimentScore}</td>
                    <td>
                      <Sparkline values={trendFor(index)} tone="blue" />
                    </td>
                    <td>
                      <div className="flex max-w-44 flex-wrap gap-1">
                        {topic.relatedSectors.slice(0, 3).map((sector) => (
                          <Badge key={sector}>{sector}</Badge>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex max-w-44 flex-wrap gap-1">
                        {topic.relatedStocks.slice(0, 2).map((stock) => (
                          <Badge key={stock.code}>{stock.name}</Badge>
                        ))}
                        {topic.relatedStocks.length > 2 && <Badge>+{topic.relatedStocks.length - 2}</Badge>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelBody>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader title="今日重点事件" action={<span className="text-xs text-slate-400">更多 ›</span>} />
          <PanelBody className="space-y-3 p-3">
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className="rounded-lg border border-white/8 bg-white/[0.035] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">{event.date}</span>
                  <ImportanceBadge level={event.importanceLevel} />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white">{event.fullTitle}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{event.expectedImpact}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {event.market.map((market) => (
                    <Badge key={market}>{market}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </PanelBody>
        </GlassPanel>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <GlassPanel>
          <PanelHeader title="热门题材排行" />
          <PanelBody className="p-3">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>排名</th>
                  <th>题材</th>
                  <th>热度</th>
                  <th>热度变化</th>
                  <th>资金关注度</th>
                </tr>
              </thead>
              <tbody>
                {getSectorRanking(topics).slice(0, 5).map((item, index) => (
                  <tr key={item.name}>
                    <td className="text-amber-300">{index + 1}</td>
                    <td className="font-semibold text-slate-100">{item.name}</td>
                    <td className="font-semibold text-orange-400">{item.score}</td>
                    <td className="text-orange-400">↑ +{index * 2 + 5}</td>
                    <td>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-orange-500" style={{ width: `${Math.min(100, item.score)}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-slate-500">注：热度综合资讯量、资金关注、舆情热度等多维度计算</p>
          </PanelBody>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader title="市场影响概览" />
          <PanelBody className="p-3">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>市场</th>
                  <th>短期影响（1-5日）</th>
                  <th>中期影响（1-4周）</th>
                  <th>影响方向</th>
                </tr>
              </thead>
              <tbody>
                {getMarketOverview(topics, events).map((item, index) => (
                  <tr key={item.market}>
                    <td className="font-semibold text-slate-100">{item.market}</td>
                    <td>
                      <ImpactBar value={58 + index * 8} label={index === 3 ? "偏空" : "偏多"} />
                    </td>
                    <td>
                      <ImpactBar value={42 + index * 10} label={index === 1 ? "中性" : "偏多"} />
                    </td>
                    <td className={index === 3 ? "text-amber-300" : "text-orange-400"}>{index === 3 ? "↓ 偏空" : "↑ 偏多"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-slate-500">注：基于事件驱动和宏观因子综合评估，仅供参考</p>
          </PanelBody>
        </GlassPanel>
      </div>
    </div>
  );
}

function trendFor(seed: number) {
  return Array.from({ length: 18 }, (_, index) => 30 + Math.sin(index * 0.8 + seed) * 8 + index * (seed % 2 ? 0.9 : 0.45) + ((index + seed) % 4) * 3);
}

function ImpactBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-blue-500" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-slate-300">{label}</span>
    </div>
  );
}
