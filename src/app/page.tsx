"use client";
import { useState } from "react";
import Hero from "./components/Hero";

export default function Page() {
  const [tab, setTab] = useState("about");
  const githubUser = process.env.NEXT_PUBLIC_GITHUB_USER || "solaerius";
  const city = process.env.NEXT_PUBLIC_CITY || "Stockholm";
  const availability = " Availability for frelance work";

  return (
    <div className="min-h-[100vh] bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-50">
      <header className="sticky top-0 z-30 backdrop-blur bg-zinc-950/60 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 relative">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded full bg-emerald-400 animate-pulse"/>
            <span className="font-mono text-sm text-zinc-300"> ~/eddie/dev-console</span>
          </div>

          {/* command palatte */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[260px] sm:w-[340px]"></div>
        </div>
      </header>

      <main className="relative z-10 px-4 pt-10 pb-28">
        {
        <Hero 
          name="Eddie Ervenius"
          role="Software Engineer"
          tagline="building immersive, data-driven experiences"
        />
        /* will be added later, EditorTabs.tsx
        <EditorTabs externalTab={tab} onTabChange={setTab} />
        */}
      </main>

      {/* will also be added later, StatusBar.tsx
      <StatusBar
        city={city}
        githubUser={githubUser}
        availabilityText={availability}
      />
      */}
    </div>
  );
}