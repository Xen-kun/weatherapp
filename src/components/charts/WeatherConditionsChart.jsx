import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function WeatherConditionsChart({ forecastData }) {
  const data = useMemo(() => {
    if (!forecastData) return [];
    const summary = {};

    forecastData.list.forEach((item) => {
      const condition = item.weather[0].main;
      summary[condition] = (summary[condition] || 0) + 1;
    });

    return Object.entries(summary).map(([name, value]) => ({
      name,
      value,
      color:
        name === "Clear"
          ? "#facc15"
          : name === "Clouds"
          ? "#9ca3af"
          : name === "Rain"
          ? "#3b82f6"
          : "#ef4444",
    }));
  }, [forecastData]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
