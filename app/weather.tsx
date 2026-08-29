"use client";

import { useEffect, useState } from "react";

type WeatherState = {
  temperature: number;
  code: number;
  isDay: boolean;
};

const cities = [
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Monaco", latitude: 43.7384, longitude: 7.4246 },
  { name: "Amsterdam", latitude: 52.3676, longitude: 4.9041 },
  { name: "South Beach", latitude: 25.7907, longitude: -80.13 },
  { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  { name: "Springfield", latitude: 39.7817, longitude: -89.6501 },
];

const descriptions: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorms",
  96: "Thunderstorms",
  99: "Thunderstorms",
};

function weatherSymbol(code: number, isDay: boolean) {
  if (code === 0) return isDay ? "☀" : "☾";
  if (code <= 3) return isDay ? "☀︎" : "☾";
  if (code === 45 || code === 48) return "≋";
  if (code >= 71 && code <= 75) return "❄";
  if (code >= 95) return "ϟ";
  return "☂";
}

export default function WorldWeather() {
  const [weather, setWeather] = useState<Record<string, WeatherState>>({});
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    Promise.allSettled(
      cities.map((city) =>
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=auto`,
          { signal: controller.signal },
        )
          .then((response) => {
            if (!response.ok) throw new Error("Weather request failed");
            return response.json();
          })
          .then((data) => ({
            name: city.name,
            current: {
              temperature: Math.round(data.current.temperature_2m),
              code: data.current.weather_code,
              isDay: data.current.is_day === 1,
            },
          })),
      ),
    ).then((results) => {
      const nextWeather: Record<string, WeatherState> = {};
      results.forEach((result) => {
        if (result.status === "fulfilled") nextWeather[result.value.name] = result.value.current;
      });
      setWeather(nextWeather);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setCityIndex((index) => (index + 1) % cities.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const city = cities[cityIndex];
  const current = weather[city.name];

  return (
    <p className="weather-gadget" aria-label={`Current weather in ${city.name}`}>
      <span aria-hidden="true">{current ? weatherSymbol(current.code, current.isDay) : "◌"}</span>
      <strong>{city.name}</strong>
      {current ? (
        <>
          <span>{current.temperature}°F</span>
          <span className="weather-condition">{descriptions[current.code] ?? "Current weather"}</span>
        </>
      ) : (
        <span>Weather</span>
      )}
    </p>
  );
}
