"use client";

import { useEffect, useState } from "react";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { EventForm } from "@/components/admin/EventForm";
import { HotTopicForm } from "@/components/admin/HotTopicForm";
import { Button } from "@/components/ui/Button";
import { GlassPanel, PanelBody, PanelHeader } from "@/components/ui/GlassPanel";
import { Input } from "@/components/ui/Input";
import type { ApiResponse } from "@/types/api";
import type { HotTopic, MarketEvent } from "@/types/market";

export default function AdminPage() {
  const [topics, setTopics] = useState<HotTopic[]>([]);
  const [events, setEvents] = useState<MarketEvent[]>([]);
  const [note, setNote] = useState("第一版后台使用本地状态模拟编辑和删除，新增时会调用 POST API 做字段校验。");
  const [adminToken, setAdminToken] = useState("");

  useEffect(() => {
    setAdminToken(window.localStorage.getItem("admin-api-token") ?? "");
    Promise.all([
      fetch("/api/hot-topics").then((res) => res.json() as Promise<ApiResponse<HotTopic[]>>),
      fetch("/api/events").then((res) => res.json() as Promise<ApiResponse<MarketEvent[]>>)
    ]).then(([topicRes, eventRes]) => {
      if (topicRes.success) setTopics(topicRes.data);
      if (eventRes.success) setEvents(eventRes.data);
    });
  }, []);

  function saveAdminToken(value: string) {
    setAdminToken(value);
    window.localStorage.setItem("admin-api-token", value);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300/80">Admin Console</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">数据采集与管理后台</h2>
          <p className="mt-2 text-sm text-slate-400">{note}</p>
        </div>

        <GlassPanel>
          <PanelBody className="grid gap-3 p-4 md:grid-cols-[1fr_260px] md:items-center">
            <div>
              <h3 className="text-sm font-semibold text-white">管理员写入口令</h3>
              <p className="mt-1 text-xs text-slate-500">线上环境需要和 Vercel 的 `ADMIN_API_TOKEN` 一致；口令仅保存在当前浏览器 localStorage。</p>
            </div>
            <Input
              type="password"
              placeholder="输入 ADMIN_API_TOKEN"
              value={adminToken}
              onChange={(event) => saveAdminToken(event.target.value)}
            />
          </PanelBody>
        </GlassPanel>

        <div className="grid gap-3 xl:grid-cols-2">
          <GlassPanel>
            <PanelHeader title="新增热点信息" />
            <PanelBody>
              <HotTopicForm adminToken={adminToken} onCreated={(topic) => setTopics((prev) => [topic, ...prev])} />
            </PanelBody>
          </GlassPanel>
          <GlassPanel>
            <PanelHeader title="新增市场事件" />
            <PanelBody>
              <EventForm adminToken={adminToken} onCreated={(event) => setEvents((prev) => [event, ...prev])} />
            </PanelBody>
          </GlassPanel>
        </div>

        <div className="grid gap-3 xl:grid-cols-2">
          <AdminDataTable
            title={`已有热点 ${topics.length || 128} 条`}
            rows={topics.slice(0, 8)}
            getName={(row) => row.title}
            getMeta={(row) => `${row.source} / ${row.importanceLevel} / 热度 ${row.sentimentScore}`}
            onDelete={(id) => setTopics((prev) => prev.filter((item) => item.id !== id))}
            onEdit={(row) => setNote(`已选择编辑热点：${row.title}。第一版先作为交互演示，接 Supabase 后可写入更新接口。`)}
          />
          <AdminDataTable
            title={`已有事件 ${events.length || 64} 条`}
            rows={events.slice(0, 8)}
            getName={(row) => row.fullTitle}
            getMeta={(row) => `${row.date} / ${row.source} / ${row.importanceLevel}`}
            onDelete={(id) => setEvents((prev) => prev.filter((item) => item.id !== id))}
            onEdit={(row) => setNote(`已选择编辑事件：${row.fullTitle}。第一版先作为交互演示，接 Supabase 后可写入更新接口。`)}
          />
        </div>
      </div>

      <aside className="space-y-3">
        <GlassPanel>
          <PanelHeader title="数据接入状态" action={<span className="text-xs text-slate-400">更多 ›</span>} />
          <PanelBody className="space-y-3 p-4">
            {[
              ["财联社电报", "正常", "12,458"],
              ["证券时报", "正常", "8,732"],
              ["发改委政策", "正常", "1,126"],
              ["题材库", "正常", "3,445"],
              ["X/Twitter", "正常", "22,115"],
              ["抖音热榜", "正常", "7,893"]
            ].map(([name, status, count]) => (
              <div key={name} className="grid grid-cols-[1fr_48px_64px] items-center gap-2 text-sm">
                <span className="flex items-center gap-2 text-slate-300"><span className="h-2 w-2 rounded-full bg-emerald-400" />{name}</span>
                <span className="text-emerald-300">{status}</span>
                <span className="text-right text-slate-200">{count}</span>
              </div>
            ))}
          </PanelBody>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader title="Mock 数据状态" action={<span className="text-slate-400">↻</span>} />
          <PanelBody className="space-y-4 p-4 text-sm">
            <StatusLine title="市场情报看板" status="已启用" />
            <StatusLine title="事件日历看板" status="已启用" />
            <p className="text-xs text-slate-500">最后更新 05/30 09:30</p>
          </PanelBody>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader title="校验日志" action={<span className="text-xs text-slate-400">更多 ›</span>} />
          <PanelBody className="space-y-3 p-4 text-xs">
            {[
              "新增热点：AI算力...",
              "编辑事件：美联储...",
              "新增热点：低空经济...",
              "新增事件：CPI数据...",
              "编辑热点：半导体..."
            ].map((item, index) => (
              <div key={item} className="flex items-center justify-between gap-3">
                <span className="text-slate-400">09:30:{21 - index * 3}</span>
                <span className="flex-1 truncate text-slate-300">{item}</span>
                <span className="text-emerald-300">校验通过</span>
              </div>
            ))}
          </PanelBody>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader title="快捷操作" />
          <PanelBody className="space-y-2 p-4">
            {["导入热点 (CSV)", "导入事件 (CSV)", "导出数据 (CSV)", "清理失效数据", "系统配置"].map((item) => (
              <Button key={item} className="w-full justify-start text-left">
                {item}
              </Button>
            ))}
          </PanelBody>
        </GlassPanel>
      </aside>
    </div>
  );
}

function StatusLine({ title, status }: { title: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{title}</span>
      <span className="text-emerald-300">{status}</span>
    </div>
  );
}
