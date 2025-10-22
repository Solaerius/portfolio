"use client";
import { useEffect, useState } from "react";

export default function useWeather(city: string) {
  const [state, setState] = useState({
    tempC: null as number | null,
    desc: "—",
    icon: null as string | null,
    loading: true,
    error: undefined as string | undefined,
  });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const key = process.env.NEXT_PUBLIC_OWM_KEY;
        if (!key) throw new Error("Missing NEXT_PUBLIC_OWM_KEY");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${key}&units=metric`;
        const r = await fetch(url);
        if (!r.ok) throw new Error(`Weather API status ${r.status}`);
        const j = await r.json();
        if (!cancelled)
          setState({
            tempC: j.main.temp,
            desc: j.weather?.[0]?.main ?? "—",
            icon: j.weather?.[0]?.icon ?? null,
            loading: false,
          });
      } catch (e: any) {
        if (!cancelled)
          setState({
            tempC: null,
            desc: "Weather unavailable",
            icon: null,
            loading: false,
            error: e?.message || "weather error",
          });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [city]);

  return state;
}
