import React, { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";

export default function Locations() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY || "7306f1ed188f4a4197570317251610";

  const popularLocations = [
    "New York",
    "London",
    "Tokyo",
    "Sydney",
    "Paris",
    "Toronto",
  ];

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();

      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      setError("City not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchWeather(city);
  const handlePopularClick = (loc) => {
    setCity(loc);
    fetchWeather(loc);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin /> Location Search
          </h2>


          <div className="flex mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-grow p-2 border rounded-l-lg outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-4 bg-gray-700 text-white rounded-r-lg hover:bg-gray-800 flex items-center gap-2"
            >
              <Search size={16} /> Search
            </button>
          </div>


          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Star className="text-yellow-400" /> Popular Locations
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {popularLocations.map((loc, i) => (
              <button
                key={i}
                onClick={() => handlePopularClick(loc)}
                className="border rounded-lg py-2 hover:bg-gray-100 transition"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>


        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center">
          {loading && <p className="text-gray-600">Fetching weather...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && weather && (
            <>
              <div className="text-5xl mb-2">
                {weather.weather[0].main === "Clear"
                  ? "☀️"
                  : weather.weather[0].main === "Clouds"
                  ? "☁️"
                  : weather.weather[0].main === "Rain"
                  ? "🌧️"
                  : "🌦️"}
              </div>
              <h3 className="text-xl font-bold mb-1">
                {weather.name}, {weather.sys.country}
              </h3>
              <p className="text-3xl font-semibold">{Math.round(weather.main.temp)}°C</p>
              <p className="text-gray-500 mb-4">{weather.weather[0].description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 w-full">
                <div className="bg-gray-100 p-3 rounded-xl text-center">
                  <p>💧 Humidity</p>
                  <p className="font-semibold">{weather.main.humidity}%</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl text-center">
                  <p>🌬️ Wind</p>
                  <p className="font-semibold">{weather.wind.speed} m/s</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl text-center">
                  <p>👁️ Visibility</p>
                  <p className="font-semibold">{weather.visibility / 1000} km</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl text-center">
                  <p>🌡️ Pressure</p>
                  <p className="font-semibold">{weather.main.pressure} hPa</p>
                </div>
              </div>
            </>
          )}

          {!loading && !error && !weather && (
            <p className="text-gray-500">Search for a city to view weather data.</p>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-center mt-8 text-sm">
        Real-time weather data provided by OpenWeatherMap API.
      </p>
    </div>
  );
}
