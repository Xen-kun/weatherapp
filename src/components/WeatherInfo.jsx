import React from "react";

export default function WeatherInfo({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 text-gray-700">
      {icon}
      <div>
        <p className="text-sm">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
