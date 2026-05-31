"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type TopicFiltersProps = {
  categories: string[];
  sources: string[];
  filters: {
    search: string;
    category: string;
    importanceLevel: string;
    source: string;
    sort: "publishedAt" | "sentimentScore";
  };
  onChange: (next: TopicFiltersProps["filters"]) => void;
};

export function TopicFilters({ categories, sources, filters, onChange }: TopicFiltersProps) {
  return (
    <div className="grid gap-2 rounded-md border border-terminal-border/75 bg-terminal-panel/70 p-3 md:grid-cols-5">
      <Input
        placeholder="搜索标题、股票、板块"
        value={filters.search}
        onChange={(event) => onChange({ ...filters, search: event.target.value })}
        className="md:col-span-2"
      />
      <Select value={filters.category} onChange={(event) => onChange({ ...filters, category: event.target.value })}>
        <option value="">全部题材</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Select value={filters.importanceLevel} onChange={(event) => onChange({ ...filters, importanceLevel: event.target.value })}>
        <option value="">全部重要度</option>
        <option value="高">高</option>
        <option value="中">中</option>
        <option value="低">低</option>
      </Select>
      <Select value={filters.source} onChange={(event) => onChange({ ...filters, source: event.target.value })}>
        <option value="">全部来源</option>
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </Select>
      <Select value={filters.sort} onChange={(event) => onChange({ ...filters, sort: event.target.value as "publishedAt" | "sentimentScore" })}>
        <option value="publishedAt">按发布时间</option>
        <option value="sentimentScore">按热度分数</option>
      </Select>
    </div>
  );
}
