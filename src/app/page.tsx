import React from "react";
import { PodcastHero } from "@/components/home/podcast-hero";
import { LatestEpisodes } from "@/components/home/latest-episodes";

export default function HomePage() {
  return (
    <main>
      <PodcastHero />
      <LatestEpisodes />
    </main>
  );
}
