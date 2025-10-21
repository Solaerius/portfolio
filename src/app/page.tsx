"use client";
import { useState } from "react";


export default function Page() {
  const [tab, setTab] = useState("about");
  const githubUser = process.env.NEXT_PUBLIC_GITHUB_USER || "solaerius";
  const city = process.env.NEXT_PUBLIC_CITY || "Stockholm";
  const availability = " Availability for frelance work";

  return (
    <div className="min-h-[100vh] bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-50">
      
    </div>
  )
}