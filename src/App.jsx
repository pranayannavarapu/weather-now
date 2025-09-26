import React, { useState } from "react";
import "./App.css";

async function fetchCoordinates(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1`
  );
  if (!response.ok) throw new Error("Failed to fetch coordinates");
  const data = await response.json();
  if (!data.results || data.results.length === 0)
    throw new Error("City not found");
  return data.results[0];
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const location = await fetchCoordinates(city);
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
      );
      if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
      const weatherData = await weatherResponse.json();
      setWeather({
        city: location.name,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
        time: weatherData.current_weather.time,
      });
    } catch (err) {
      setError(err.message || "Failed to get weather.");
    }
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return (
    <div className="app">
      <h2 className="title">🌤 Weather Now</h2>
      <div className="search-bar">
        <input
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading">Loading current weather...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h3>{weather.city}</h3>
          <p>
            <strong>Temperature:</strong> {weather.temperature}°C
          </p>
          <p>
            <strong>Condition:</strong>{" "}
            {weatherDescriptions[weather.weathercode] || "Unknown"}
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.windspeed} km/h
          </p>
          <p className="time">
            Last updated: {new Date(weather.time).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
