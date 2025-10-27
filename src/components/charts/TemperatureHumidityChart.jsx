import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TemperatureHumidityChart({ forecastData }) {
  const data = useMemo(() => {
    if (!forecastData) return [];
    return forecastData.list.slice(0, 8).map((item) => ({
      time: item.dt_txt.split(" ")[1].slice(0, 5),
      temp: item.main.temp,
      humidity: item.main.humidity,
    }));
  }, [forecastData]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} />
        <Line type="monotone" dataKey="temp" stroke="#f87171" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
