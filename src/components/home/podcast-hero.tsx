"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/lib/audio-context";
import { EPISODES, PODCAST_INFO } from "@/lib/data";

export function PodcastHero() {
  const { playEpisode, isPlaying, togglePlay, currentEpisode } = useAudio();
  const flagshipEpisode = EPISODES[0];
  const isThisPlaying = isPlaying && currentEpisode.id === flagshipEpisode.id;

  const handlePlayToggle = () => {
    if (currentEpisode.id === flagshipEpisode.id) {
      togglePlay();
    } else {
      playEpisode(flagshipEpisode);
    }
  };

  return (
    <section className="border-b border-[#E4E4E0] bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <p className="font-mono text-xs tracking-wider text-[#52525B] mb-4">
                Season 04 <span aria-hidden="true">·</span> Nairobi &amp; Global
                Diaspora <span aria-hidden="true">·</span>{" "}
                <span className="text-[#C83E1B] font-medium">
                  Ep. 058 Out Now
                </span>
              </p>

              <h1
                className="font-display font-bold text-[#0E0E10] tracking-[-0.035em] leading-[1.05] headline-balance max-w-2xl"
                style={{ fontSize: "clamp(2.25rem, 4.6vw, 4rem)" }}
              >
                Swarms of ideas. Unfiltered sonic culture.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
                Hosted by Thea Mwangi, O Podcast documents the founders, sound
                architects, and cultural thinkers shaping Africa and its global
                diaspora.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handlePlayToggle}
                  variant="primary"
                  size="lg"
                  className="bg-[#0E0E10] hover:bg-[#27272A]"
                >
                  {isThisPlaying ? (
                    <>
                      <Pause
                        size={16}
                        className="fill-current text-[#C83E1B]"
                      />
                      <span>Pause Ep. 058</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} className="fill-current text-[#C83E1B]" />
                      <span>Listen to Ep. 058</span>
                    </>
                  )}
                </Button>

                <Link href="/episodes">
                  <Button variant="outline" size="lg">
                    Browse 58 Episodes
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#52525B] pt-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  Subscribe:
                </span>
                <a
                  href={PODCAST_INFO.socials.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0E0E10] hover:text-[#C83E1B] transition-colors min-h-9"
                >
                  Spotify <ArrowUpRight size={12} aria-hidden="true" />
                </a>
                <a
                  href={PODCAST_INFO.socials.apple}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0E0E10] hover:text-[#C83E1B] transition-colors min-h-9"
                >
                  Apple Podcasts <ArrowUpRight size={12} aria-hidden="true" />
                </a>
                <a
                  href={PODCAST_INFO.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0E0E10] hover:text-[#C83E1B] transition-colors min-h-9"
                >
                  YouTube <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 lg:aspect-auto lg:h-full min-h-70 rounded-lg overflow-hidden bg-[#ECECE8] border border-[#E4E4E0]">
              <Image
                src={"/assets/images/O_studio_session_1795139000889.jpg"}
                alt="Thea Mwangi recording O Podcast in Nairobi"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-white/75">
                    Nairobi Studio · Ep. 058 · 68 min
                  </p>
                  <Link
                    href={`/episodes/${flagshipEpisode.slug}`}
                    className="block text-sm sm:text-base font-semibold text-white hover:underline truncate mt-0.5"
                  >
                    {flagshipEpisode.title}
                  </Link>
                </div>
                <button
                  onClick={handlePlayToggle}
                  aria-label={
                    isThisPlaying
                      ? "Pause latest episode"
                      : "Play latest episode"
                  }
                  className="min-w-11 min-h-11 rounded-md bg-[#C83E1B] hover:bg-[#A83214] text-white inline-flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  {isThisPlaying ? (
                    <Pause size={18} className="fill-current" />
                  ) : (
                    <Play size={18} className="fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-8 border-t border-[#E4E4E0] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PODCAST_INFO.metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0E0E10]">
                {metric.value}
              </p>
              <p className="text-xs sm:text-sm text-[#52525B]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
