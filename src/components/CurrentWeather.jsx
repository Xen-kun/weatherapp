import React, { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import { Cloud, Droplets, Wind, Eye, Gauge } from "lucide-react";

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mangala kenni user's location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );

          if (!res.ok) throw new Error("Failed to fetch weather data");

          const data = await res.json();

          // Map API feedback/response mapan kenni Card
          const formattedData = {
            location: `${data.name}, ${data.sys.country}`,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            condition: data.weather[0].main,
            details: [
              {
                icon: <Droplets size={18} />,
                label: "Humidity",
                value: `${data.main.humidity}%`,
              },
              {
                icon: <Wind size={18} />,
                label: "Wind",
                value: `${data.wind.speed} m/s`,
              },
              {
                icon: <Eye size={18} />,
                label: "Visibility",
                value: `${data.visibility / 1000} km`,
              },
              {
                icon: <Gauge size={18} />,
                label: "Pressure",
                value: `${data.main.pressure} hPa`,
              },
            ],
          };

          setWeatherData(formattedData);
        } catch (err) {
          setError(err.message);
        }
      },
      () => setError("Location access denied.")
    );
  }, []);

  if (error)
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center text-red-500">
        {error}
      </div>
    );

  if (!weatherData)
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        Loading current weather...
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">{weatherData.location}</h2>
          <p className="text-sm text-gray-500">{weatherData.condition}</p>
        </div>
        <p className="text-sm text-gray-500">Current Weather</p>
      </div>

      <div className="flex items-center gap-4">
        <Cloud className="text-gray-600" size={50} />
        <h1 className="text-4xl font-bold">{weatherData.temperature}°C</h1>
        <div className="ml-auto text-right">
          <p className="text-gray-500 text-sm">Feels like</p>
          <p className="text-xl font-semibold">{weatherData.feelsLike}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {weatherData.details.map((info, i) => (
          <WeatherInfo key={i} {...info} />
        ))}
      </div>
    </div>
  );
}
