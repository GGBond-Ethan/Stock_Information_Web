"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { getMarketOverview } from "@/lib/filters";
import type { HotTopic, MarketEvent } from "@/types/market";

export function MarketImpactOverview({ topics, events }: { topics: HotTopic[]; events: MarketEvent[] }) {
  const data = getMarketOverview(topics, events);

  return (
    <Card>
      <CardHeader title="市场影响概览" />
      <CardBody className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#1D2633" strokeOpacity={0.42} vertical={false} />
            <XAxis dataKey="market" stroke="#8993A3" tickLine={false} axisLine={false} />
            <YAxis stroke="#8993A3" allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#0B0F16", border: "1px solid #1D2633", color: "#E7EDF5", borderRadius: 6 }} />
            <Legend />
            <Bar dataKey="topics" name="热点数量" fill="#D46464" radius={[4, 4, 0, 0]} />
            <Bar dataKey="events" name="事件数量" fill="#53B987" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
