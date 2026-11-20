import React from "react";
import { PodcastHero } from "@/components/home/podcast-hero";
import { LatestEpisodes } from "@/components/home/latest-episodes";
import { HostsAndTour } from "@/components/home/hosts-and-tour";

export default function HomePage() {
  return (
    <main>
      <PodcastHero />
      <LatestEpisodes />
      <HostsAndTour />
    </main>
  );
}
