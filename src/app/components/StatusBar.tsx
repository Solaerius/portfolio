"use client";

import { useEffect, useState } from "react";
import { Cloud, Clock, GitHub } from 'lucide-react'
import useClock from "./hooks/useClock"
import useGithub from "./hooks/useGithub"
import useWeather from "./hooks/useWeather"
import Availability from "./Availability"

export default function StatusBar({
    city,
    githubUser,
    availabilityText,
}: {
    city: string;
    githubUser: string;
    availabilityText: string;
}) {
    const { hhmmss } = useClock();
    const weather = useWeather(city);
    const gh = useGithub(githubUser);

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 h-10 bg-zinc-900/80 backdrop-blur border-t border-zinc-800 text-zinc-300 text-sm flex items-centered justify-between px-3">
            <Availability text={availabilityText}/>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4"/>
                    {hydrated && <span className="tabular-nums">{hhmmss}</span>}
                </div>

                <div className="flex items-center gap-1 min-w-[120px]">
                    <Cloud className="w-4 h-4"/>
                    <span>
                        {weather.loading
                            ? "..."
                            : weather.error
                            ? "Weather unavailable"
                            : `${weather.desc} ${Math.round(weather.tempC!)} °C`}
                    </span>
                </div>

                <div className="flex items-center gap-1 min-w-[160px]">
                    <GitHub className="w-4 h-4"/>
                    <span>
                        {gh.loading
                            ? "..."
                            : gh.error
                            ? "github n/a"
                            : `${gh.publicRepos} repos / ${gh.stars}★ / ${gh.followers} followers`}
                    </span>
                </div>
            </div>
        </div>
    );
}