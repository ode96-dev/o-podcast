import { Suspense } from "react";
import { notFound } from "next/navigation";
import { EPISODES } from "@/lib/data";
import EpisodeView from "./_components/episode-detail-view";

export function generateStaticParams() {
  return EPISODES.map((episode) => ({
    slug: episode.slug,
  }));
}

async function EpisodeViewPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = EPISODES.find((e) => e.slug === slug);

  if (!episode) {
    notFound();
  }

  const relatedEpisodes = EPISODES.filter((e) => e.id !== episode.id).slice(
    0,
    3,
  );

  return <EpisodeView episode={episode} relatedEpisodes={relatedEpisodes} />;
}

export default function EpisodeViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <article className="py-8 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-6 w-36 rounded bg-[#E4E4E0]/60 animate-pulse mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#E4E4E0]">
              <div className="lg:col-span-5 aspect-4/3 rounded-lg bg-[#E4E4E0]/60 animate-pulse" />
              <div className="lg:col-span-7 space-y-4">
                <div className="h-4 w-56 rounded bg-[#E4E4E0]/60 animate-pulse" />
                <div className="h-12 w-4/5 rounded bg-[#E4E4E0]/60 animate-pulse" />
                <div className="h-5 w-full rounded bg-[#E4E4E0]/60 animate-pulse" />
              </div>
            </div>
          </div>
        </article>
      }
    >
      <EpisodeViewPageContent params={params} />
    </Suspense>
  );
}
