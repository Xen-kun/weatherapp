import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyOverviewChart({ forecastData }) {
  const data = useMemo(() => {
    if (!forecastData) return [];

    const days = {};
    forecastData.list.forEach((item) => {
      const day = new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!days[day]) days[day] = { temp: [], rain: [] };

      days[day].temp.push(item.main.temp);
      days[day].rain.push(item.rain?.["3h"] || 0);
    });

    return Object.entries(days).map(([day, vals]) => ({
      day,
      temp: vals.temp.reduce((a, b) => a + b) / vals.temp.length,
      rain: vals.rain.reduce((a, b) => a + b, 0),
    }));
  }, [forecastData]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="temp" fill="#fb923c" radius={[4, 4, 0, 0]} />
        <Bar dataKey="rain" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
