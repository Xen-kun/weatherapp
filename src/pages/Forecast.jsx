import React, { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

export default function Forecast() {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );
          const data = await res.json();

          const daily = {};
          data.list.forEach((item) => {
            const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });
            if (!daily[date]) daily[date] = [];
            daily[date].push(item);
          });

          const formatted = Object.entries(daily).map(([date, values]) => {
            const temps = values.map((v) => v.main.temp);
            const humidity = Math.round(
              values.reduce((a, b) => a + b.main.humidity, 0) / values.length
            );
            const condition = values[0].weather[0].main;
            const icon = getIcon(condition);
            const color = getColor(condition);

            return {
              date,
              high: Math.max(...temps),
              low: Math.min(...temps),
              humidity,
              condition,
              icon,
              color,
            };
          });

          setForecast(formatted.slice(0, 7));
        } catch (err) {
          setError("Failed to fetch forecast data.");
        }
      },
      () => setError("Location access denied.")
    );
  }, []);

  const getIcon = (condition) => {
    switch (condition) {
      case "Rain":
        return <CloudRain className="text-blue-500" />;
      case "Clouds":
        return <Cloud className="text-gray-400" />;
      case "Thunderstorm":
        return <CloudLightning className="text-yellow-500" />;
      case "Snow":
        return <CloudSnow className="text-blue-300" />;
      default:
        return <Sun className="text-yellow-400" />;
    }
  };

  const getColor = (condition) => {
    switch (condition) {
      case "Rain":
        return "from-blue-400/90 to-blue-600/90";
      case "Clouds":
        return "from-gray-300/90 to-gray-500/90";
      case "Thunderstorm":
        return "from-yellow-400/90 to-orange-500/90";
      case "Snow":
        return "from-blue-100/90 to-blue-300/90";
      default:
        return "from-yellow-300/90 to-orange-400/90";
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!forecast.length) return <div>Loading forecast...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🌤️ 7-Day Weather Forecast
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${day.color} text-white 
                       p-6 rounded-2xl shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold text-lg">{day.date}</p>
                <p className="text-sm opacity-80">{day.condition}</p>
              </div>
              <div className="text-3xl">{day.icon}</div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-2xl font-bold">
                {Math.round(day.high)}° / {Math.round(day.low)}°
              </p>
              <p className="text-sm opacity-90">Humidity: {day.humidity}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
