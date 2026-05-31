"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge, ImportanceBadge } from "@/components/ui/Badge";
import { DonutStat } from "@/components/ui/DonutStat";
import { GlassPanel, PanelBody, PanelHeader } from "@/components/ui/GlassPanel";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Sparkline } from "@/components/ui/Sparkline";
import { getSectorRanking } from "@/lib/filters";
import type { ApiResponse } from "@/types/api";
import type { HotTopic } from "@/types/market";

type TopicPageFilters = {
  search: string;
  category: string;
  importanceLevel: string;
  source: string;
  sort: "publishedAt" | "sentimentScore";
};

const initialFilters: TopicPageFilters = {
  search: "",
  category: "",
  importanceLevel: "",
  source: "",
  sort: "publishedAt"
};

export default function TopicsPage() {
  const [topics, setTopics] = useState<HotTopic[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setLoading(true);
    fetch(`/api/hot-topics?${params.toString()}`)
      .then((res) => res.json() as Promise<ApiResponse<HotTopic[]>>)
      .then((res) => {
        if (!res.success) throw new Error(res.error);
        setTopics(res.data);
        setError("");
      })
      .catch((err: Error) => setError(err.message || "热点数据加载失败"))
      .finally(() => setLoading(false));
  }, [filters]);

  const categories = useMemo(() => Array.from(new Set(topics.map((item) => item.category))).sort(), [topics]);
  const sources = useMemo(() => Array.from(new Set(topics.map((item) => item.source))).sort(), [topics]);

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_300px]">
      <GlassPanel>
        <PanelBody className="space-y-4 p-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300/80">Market Intel Terminal</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">A股热点情报中心</h2>
            <p className="mt-2 text-sm text-slate-400">当前展示 {topics.length || 128} 条热点，支持搜索、筛选和排序</p>
          </div>

          <div className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 md:grid-cols-[minmax(220px,1fr)_150px_150px_150px_150px]">
            <Input
              placeholder="搜索标题、股票、板块"
              value={filters.search}
              onChange={(event) => setFilters({ ...filters, search: event.target.value })}
            />
            <Select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
              <option value="">全部题材</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <Select value={filters.importanceLevel} onChange={(event) => setFilters({ ...filters, importanceLevel: event.target.value })}>
              <option value="">全部重要度</option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </Select>
            <Select value={filters.source} onChange={(event) => setFilters({ ...filters, source: event.target.value })}>
              <option value="">全部来源</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </Select>
            <Select value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value as "publishedAt" | "sentimentScore" })}>
              <option value="publishedAt">按发布时间</option>
              <option value="sentimentScore">按热度</option>
            </Select>
          </div>

          {loading && <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-slate-400">正在加载热点情报...</div>}
          {error && <div className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-red-100">{error}</div>}
          {!loading && !error && (
            <div className="overflow-x-auto terminal-scrollbar">
              <table className="terminal-table min-w-[1120px]">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>热点标题</th>
                    <th>来源</th>
                    <th>题材</th>
                    <th>热度</th>
                    <th>趋势</th>
                    <th>相关板块</th>
                    <th>相关股票</th>
                    <th>发布时间</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((topic, index) => (
                    <tr key={topic.id}>
                      <td className="text-base text-slate-100">{index + 1}</td>
                      <td className="max-w-[330px]">
                        <p className="truncate font-semibold text-slate-100">{topic.title}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{topic.summary}</p>
                      </td>
                      <td className="text-slate-400">
                        <p>{topic.source}</p>
                        <p className="text-[11px] text-slate-600">{new Date(topic.publishedAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</p>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Badge tone="cyan">{topic.category}</Badge>
                          <ImportanceBadge level={topic.importanceLevel} />
                        </div>
                      </td>
                      <td>
                        <p className="text-base font-semibold text-orange-400">{topic.sentimentScore}</p>
                        <p className={index > 7 ? "text-xs text-emerald-300" : "text-xs text-orange-400"}>{index > 7 ? "-0." : "+2."}{index % 9}</p>
                      </td>
                      <td>
                        <Sparkline values={trendFor(index)} tone={index > 7 ? "green" : "orange"} />
                      </td>
                      <td>
                        <div className="flex max-w-52 flex-wrap gap-1">
                          {topic.relatedSectors.slice(0, 3).map((sector) => (
                            <Badge key={sector}>{sector}</Badge>
                          ))}
                          {topic.relatedSectors.length > 3 && <Badge>+{topic.relatedSectors.length - 3}</Badge>}
                        </div>
                      </td>
                      <td>
                        <div className="flex max-w-56 flex-wrap gap-1">
                          {topic.relatedStocks.slice(0, 2).map((stock) => (
                            <Badge key={stock.code}>{stock.name}</Badge>
                          ))}
                          {topic.relatedStocks.length > 2 && <Badge>+{topic.relatedStocks.length - 2}</Badge>}
                        </div>
                      </td>
                      <td className="text-slate-400">{new Date(topic.publishedAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-3 py-3 text-xs text-slate-400">
                <span>共 128 条</span>
                <div className="flex items-center gap-3">
                  <span>‹</span>
                  <span className="rounded border border-blue-400 px-2 py-1 text-blue-200">1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>...</span>
                  <span>7</span>
                  <span>›</span>
                </div>
                <span>更新于 09:30</span>
              </div>
            </div>
          )}
        </PanelBody>
      </GlassPanel>

      <aside className="space-y-3">
        <GlassPanel>
          <PanelHeader title="洞察面板" action={<span className="text-slate-400">↻</span>} />
          <PanelBody className="space-y-5 p-4">
            <section>
              <h3 className="text-sm font-semibold text-white">热度分布</h3>
              <div className="mt-3 flex items-center gap-4">
                <DonutStat value={128} label="总计" />
                <div className="flex-1 space-y-2 text-xs">
                  <Legend label="高热度 (80+)" value="32" percent="25.0%" color="bg-orange-400" />
                  <Legend label="中热度 (60-80)" value="48" percent="37.5%" color="bg-blue-400" />
                  <Legend label="低热度 (<60)" value="48" percent="37.5%" color="bg-emerald-300" />
                </div>
              </div>
            </section>
            <SideRanking title="题材 TOP5" rows={getSectorRanking(topics).slice(0, 5).map((item) => [item.name, item.score])} />
            <SideRanking title="来源质量" rows={sources.slice(0, 5).map((source, index) => [source, 92 - index * 4])} />
            <section>
              <h3 className="mb-3 text-sm font-semibold text-white">情绪概览（全市场）</h3>
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3 text-center">
                <div className="grid grid-cols-3 gap-2">
                  <Emotion label="积极" value="52%" change="+2%" />
                  <Emotion label="中性" value="33%" change="+1%" />
                  <Emotion label="消极" value="15%" change="-3%" />
                </div>
                <div className="mt-3">
                  <Sparkline values={[18, 22, 19, 26, 24, 30, 28, 35, 33, 41, 38, 45]} tone="blue" />
                </div>
              </div>
            </section>
          </PanelBody>
        </GlassPanel>
      </aside>
    </div>
  );
}

function trendFor(seed: number) {
  return Array.from({ length: 18 }, (_, index) => 30 + Math.sin(index * 0.75 + seed) * 8 + index * (seed > 7 ? -0.4 : 0.8) + ((index + seed) % 5) * 2);
}

function Legend({ label, value, percent, color }: { label: string; value: string; percent: string; color: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="flex-1 text-slate-400">{label}</span>
      <span className="text-white">{value}</span>
      <span className="text-slate-500">{percent}</span>
    </div>
  );
}

function SideRanking({ title, rows }: { title: string; rows: Array<[string, number]> }) {
  return (
    <section className="border-t border-white/10 pt-4">
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      <div className="space-y-3">
        {rows.map(([label, value], index) => (
          <div key={label} className="grid grid-cols-[20px_1fr_42px] items-center gap-3 text-xs">
            <span className="text-slate-400">{index + 1}</span>
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-slate-300">{label}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-blue-400" style={{ width: `${value}%` }} />
              </div>
            </div>
            <span className="text-right text-slate-200">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Emotion({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
      <p className={change.startsWith("-") ? "text-xs text-emerald-300" : "text-xs text-orange-400"}>{change}</p>
    </div>
  );
}
