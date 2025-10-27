import React from "react";

export default function Navbar() {
  return (
    <header className="text-center mb-6">
      <h1 className="text-3xl font-bold text-indigo-600">
        ☀️ Weather Analytics Dashboard
      </h1>
      <p className="text-gray-500 mt-2">
        Real-time weather monitoring and comprehensive analytics
      </p>
      <nav className="flex justify-center gap-6 mt-4 text-sm font-medium">
        <button className="text-indigo-600">🌦 Live Weather</button>
        <button>📊 Advanced Analytics</button>
        <button>📅 7-Day Forecast</button>
      </nav>
    </header>
  );
}
