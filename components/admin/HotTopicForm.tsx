"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { HotTopic, Market } from "@/types/market";

const empty = {
  title: "",
  source: "人工录入",
  category: "AI算力",
  marketImpact: "A股",
  relatedSectors: "AI算力",
  relatedStocks: "",
  sentimentScore: 70,
  importanceLevel: "中",
  summary: "",
  sourceUrl: "https://example.com"
};

export function HotTopicForm({ onCreated }: { onCreated: (topic: HotTopic) => void }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      ...form,
      marketImpact: form.marketImpact.split(",").map((item) => item.trim()) as Market[],
      relatedSectors: form.relatedSectors.split(",").map((item) => item.trim()).filter(Boolean),
      relatedStocks: [],
      sentimentScore: Number(form.sentimentScore),
      importanceLevel: form.importanceLevel as "低" | "中" | "高",
      publishedAt: new Date().toISOString()
    };

    const res = await fetch("/api/admin/hot-topics", {
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
        <Input placeholder="热点标题" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
        <Input placeholder="来源" value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} required />
        <Select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
          {["AI算力", "低空经济", "机器人", "半导体", "新能源", "消费", "医药", "国企改革"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select value={form.importanceLevel} onChange={(event) => setForm({ ...form, importanceLevel: event.target.value })}>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </Select>
        <Input placeholder="影响市场，逗号分隔" value={form.marketImpact} onChange={(event) => setForm({ ...form, marketImpact: event.target.value })} required />
        <Input
          type="number"
          min={0}
          max={100}
          placeholder="热度分数"
          value={form.sentimentScore}
          onChange={(event) => setForm({ ...form, sentimentScore: Number(event.target.value) })}
          required
        />
        <Input placeholder="相关板块，逗号分隔" value={form.relatedSectors} onChange={(event) => setForm({ ...form, relatedSectors: event.target.value })} required />
        <Input placeholder="来源链接" value={form.sourceUrl} onChange={(event) => setForm({ ...form, sourceUrl: event.target.value })} required />
      </div>
      <Textarea placeholder="简短摘要" value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} required />
      <Button type="submit" className="border-terminal-cyan/60 bg-terminal-cyan/10">
        新增热点
      </Button>
      {status && <p className="text-sm text-terminal-muted">{status}</p>}
    </form>
  );
}
