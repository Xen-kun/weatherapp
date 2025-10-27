import React from "react";

export default function TabMenu({ activeTab, setActiveTab }) {
  const tabs = ["Current Weather", "Analytics", "Forecast", "Locations"];

  return (
    <div className="flex bg-gray-200 p-2 rounded-full mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-1 rounded-full transition ${
            activeTab === tab
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-gray-500 hover:text-indigo-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
