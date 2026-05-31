"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { Market, MarketEvent } from "@/types/market";

const empty = {
  date: "2026-06-30",
  title: "",
  fullTitle: "",
  eventType: "产业会议",
  market: "A股",
  importanceLevel: "中",
  relatedSectors: "AI算力",
  relatedStocks: "",
  description: "",
  expectedImpact: "",
  source: "人工录入",
  sourceUrl: "https://example.com"
};

export function EventForm({ onCreated }: { onCreated: (event: MarketEvent) => void }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      ...form,
      market: form.market.split(",").map((item) => item.trim()) as Market[],
      relatedSectors: form.relatedSectors.split(",").map((item) => item.trim()).filter(Boolean),
      relatedStocks: [],
      importanceLevel: form.importanceLevel as "低" | "中" | "高"
    };

    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const json = await res.json();

    if (!json.success) {
      setStatus(json.error || "创建失败");
      return;
    }

    onCreated(json.data);
    setStatus(json.message || "已创建");
    setForm(empty);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <Input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
        <Input placeholder="日历短标题" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
        <Input placeholder="完整事件标题" value={form.fullTitle} onChange={(event) => setForm({ ...form, fullTitle: event.target.value })} required />
        <Input placeholder="事件类型" value={form.eventType} onChange={(event) => setForm({ ...form, eventType: event.target.value })} required />
        <Input placeholder="影响市场，逗号分隔" value={form.market} onChange={(event) => setForm({ ...form, market: event.target.value })} required />
        <Select value={form.importanceLevel} onChange={(event) => setForm({ ...form, importanceLevel: event.target.value })}>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </Select>
        <Input placeholder="相关板块，逗号分隔" value={form.relatedSectors} onChange={(event) => setForm({ ...form, relatedSectors: event.target.value })} required />
        <Input placeholder="来源链接" value={form.sourceUrl} onChange={(event) => setForm({ ...form, sourceUrl: event.target.value })} required />
      </div>
      <Textarea placeholder="事件说明" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
      <Textarea placeholder="可能影响" value={form.expectedImpact} onChange={(event) => setForm({ ...form, expectedImpact: event.target.value })} required />
      <Button type="submit" className="border-terminal-cyan/60 bg-terminal-cyan/10">
        新增事件
      </Button>
      {status && <p className="text-sm text-terminal-muted">{status}</p>}
    </form>
  );
}
