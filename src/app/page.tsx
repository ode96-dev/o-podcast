import { PodcastHero } from "@/components/home/podcast-hero";
import { LatestEpisodes } from "@/components/home/latest-episodes";
import { HostsAndTour } from "@/components/home/hosts-and-tour";
import { MerchandisePreview } from "@/components/home/merchandise-preview";
import { DispatchSection } from "@/components/home/dispatch-section";

export default function HomePage() {
  return (
    <main>
      <PodcastHero />
      <LatestEpisodes />
      <HostsAndTour />
      <MerchandisePreview />
      <DispatchSection />
    </main>
  );
}
