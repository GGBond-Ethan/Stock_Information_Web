"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { HotTopic } from "@/types/market";
import { getSectorRanking } from "@/lib/filters";

export function SectorRanking({ topics }: { topics: HotTopic[] }) {
  const data = getSectorRanking(topics);

  return (
    <Card>
      <CardHeader title="热门题材排行" />
      <CardBody className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid stroke="#1D2633" strokeOpacity={0.42} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#8993A3" tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" width={76} stroke="#8993A3" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#0B0F16", border: "1px solid #1D2633", color: "#E7EDF5", borderRadius: 6 }}
              formatter={(value, name) => [value, name === "score" ? "平均热度" : name]}
            />
            <Bar dataKey="score" fill="#5AA7D6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
