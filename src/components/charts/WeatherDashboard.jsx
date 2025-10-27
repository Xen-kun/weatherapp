import React, { useEffect, useState } from "react";
import TemperatureHumidityChart from "./TemperatureHumidityChart";
import WeatherConditionsChart from "./WeatherConditionsChart";
import WeeklyOverviewChart from "./WeeklyOverviewChart";
import WeatherStats from "./WeatherStats";

export default function WeatherDashboard() {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        try {

          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );

          if (!forecastRes.ok) throw new Error("Failed to fetch forecast data.");

          const forecastData = await forecastRes.json();
          setForecast(forecastData);
        } catch (err) {
          setError("Failed to fetch weather data.");
        }
      },
      () => setError("Location access denied.")
    );
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!forecast) return <div>Loading weather data...</div>;

  return (
    <div className="space-y-8 p-6">

      <div className="grid md:grid-cols-2 gap-8">
        <TemperatureHumidityChart forecastData={forecast} />
        <WeatherConditionsChart forecastData={forecast} />
      </div>


      <div className="grid md:grid-cols-2 gap-8">
        <WeatherStats forecastData={forecast} />
        <WeeklyOverviewChart forecastData={forecast} />
      </div>
    </div>
  );
}
