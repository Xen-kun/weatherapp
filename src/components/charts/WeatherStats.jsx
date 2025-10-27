import React, { useMemo } from "react";

export default function WeatherStats({ forecastData }) {
  const stats = useMemo(() => {
    if (!forecastData) return [];

    const temps = forecastData.list.map((i) => i.main.temp);
    const humidity = forecastData.list.map((i) => i.main.humidity);
    const rain = forecastData.list
      .map((i) => i.rain?.["3h"] || 0)
      .reduce((a, b) => a + b, 0);

    return [
      { label: "Average Temperature", value: `${(temps.reduce((a, b) => a + b) / temps.length).toFixed(1)}°C` },
      { label: "Highest Temperature", value: `${Math.max(...temps).toFixed(1)}°C` },
      { label: "Lowest Temperature", value: `${Math.min(...temps).toFixed(1)}°C` },
      { label: "Total Rainfall", value: `${rain.toFixed(1)} mm` },
      { label: "Average Humidity", value: `${(humidity.reduce((a, b) => a + b) / humidity.length).toFixed(1)}%` },
    ];
  }, [forecastData]);

  return (
    <div className="space-y-2">
      {stats.map((item) => (
        <div
          key={item.label}
          className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2"
        >
          <span className="text-gray-600 text-sm">{item.label}</span>
          <span className="font-semibold text-gray-800">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
