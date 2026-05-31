"use client";

import { Button } from "@/components/ui/Button";

type AdminDataTableProps<T extends { id: string }> = {
  title: string;
  rows: T[];
  getName: (row: T) => string;
  getMeta: (row: T) => string;
  onDelete: (id: string) => void;
  onEdit: (row: T) => void;
};

export function AdminDataTable<T extends { id: string }>({ title, rows, getName, getMeta, onDelete, onEdit }: AdminDataTableProps<T>) {
  return (
    <div className="glass-panel rounded-xl border border-white/12 bg-white/[0.045] shadow-terminal">
      <div className="border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="divide-y divide-white/10">
        {rows.map((row) => (
          <div key={row.id} className="grid gap-3 px-4 py-3 transition hover:bg-blue-500/5 md:grid-cols-[minmax(0,1fr)_150px] md:items-center">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-100">{getName(row)}</p>
              <p className="mt-1 text-xs text-slate-500">{getMeta(row)}</p>
            </div>
            <div className="flex gap-2 md:justify-end">
              <Button type="button" onClick={() => onEdit(row)} className="px-2 py-1">
                标记编辑
              </Button>
              <Button type="button" onClick={() => onDelete(row.id)} className="border-red-400/40 px-2 py-1 text-red-200 hover:border-red-400/60">
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
