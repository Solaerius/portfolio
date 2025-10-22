"use client";
import { useEffect, useState } from "react";

export default function useGithub(username: string) {
  const [state, setState] = useState({
    followers: null as number | null,
    publicRepos: null as number | null,
    stars: null as number | null,
    loading: true,
    error: undefined as string | undefined,
  });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error(`GitHub user ${userRes.status}`);
        const uj = await userRes.json();

        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );
        if (!repoRes.ok) throw new Error(`GitHub repos ${repoRes.status}`);
        const repos = await repoRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce(
              (sum: number, it: any) => sum + (it.stargazers_count || 0),
              0
            )
          : null;

        if (!cancelled)
          setState({
            followers: uj.followers,
            publicRepos: uj.public_repos,
            stars,
            loading: false,
          });
      } catch (e: any) {
        if (!cancelled)
          setState({
            followers: null,
            publicRepos: null,
            stars: null,
            loading: false,
            error: e?.message || "github error",
          });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
