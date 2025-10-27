import React from "react";
import WeatherDashboard from "../components/charts/WeatherDashboard";

export default function Analytics() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Weather Analytics</h1>
      <WeatherDashboard />
    </div>
  );
}
