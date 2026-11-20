"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Pause, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaFrame } from "@/components/ui/media-frame";
import { useAudio } from "@/lib/audio-context";
import { EPISODES } from "@/lib/data";

export function LatestEpisodes() {
  const { playEpisode, isPlaying, togglePlay, currentEpisode } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Tech & Innovation",
    "Music & Sonic Arts",
    "Culture & Identity",
    "Deep Dive",
  ];

  const filteredEpisodes =
    selectedCategory === "All"
      ? EPISODES
      : EPISODES.filter((ep) => ep.category === selectedCategory);

  const leadEpisode = filteredEpisodes[0];
  const secondaryEpisodes = filteredEpisodes.slice(1);

  const handleToggle = (ep: (typeof EPISODES)[0]) => {
    if (currentEpisode.id === ep.id) {
      togglePlay();
    } else {
      playEpisode(ep);
    }
  };

  return (
    <section className="py-14 sm:py-20 border-b border-[#E4E4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SectionHeading
            kicker="Audio Archive"
            title="Recent Broadcasts"
            subtitle="Conversations recorded in Nairobi and across the global diaspora on capital, sound systems, language, and craft."
          />

          <div
            role="tablist"
            aria-label="Filter episodes by category"
            className="flex items-center gap-1 p-1 bg-[#EFEFED] rounded-lg overflow-x-auto max-w-full"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-9.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? "bg-white text-[#0E0E10] shadow-xs"
                      : "text-[#52525B] hover:text-[#0E0E10]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {leadEpisode && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pb-10 mb-10 border-b border-[#E4E4E0] items-stretch">
            <div className="lg:col-span-6">
              <MediaFrame
                src={leadEpisode.artwork}
                alt={leadEpisode.title}
                aspect="4/3"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-lg h-full"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between py-1">
              <div>
                <p className="font-mono text-xs text-[#52525B]">
                  EP. {String(leadEpisode.number).padStart(3, "0")}{" "}
                  <span aria-hidden="true">·</span> {leadEpisode.category}{" "}
                  <span aria-hidden="true">·</span> {leadEpisode.duration}{" "}
                  <span aria-hidden="true">·</span> {leadEpisode.publishedAt}
                </p>

                <Link
                  href={`/episodes/${leadEpisode.slug}`}
                  className="block mt-3 group"
                >
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0E0E10] group-hover:text-[#C83E1B] transition-colors headline-balance">
                    {leadEpisode.title}
                  </h3>
                </Link>

                <p className="mt-3 text-sm sm:text-base text-[#52525B] leading-relaxed max-w-prose">
                  {leadEpisode.description}
                </p>

                {leadEpisode.guests[0] && (
                  <p className="mt-4 text-xs font-medium text-[#0E0E10]">
                    Featuring {leadEpisode.guests[0].name}{" "}
                    <span className="text-[#52525B] font-normal">
                      — {leadEpisode.guests[0].role}
                    </span>
                  </p>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E4E4E0] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleToggle(leadEpisode)}
                  className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-md bg-[#0E0E10] hover:bg-[#27272A] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {isPlaying && currentEpisode.id === leadEpisode.id ? (
                    <>
                      <Pause
                        size={14}
                        className="fill-current text-[#C83E1B]"
                      />
                      <span>Pause Episode</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} className="fill-current text-[#C83E1B]" />
                      <span>Play Episode</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/episodes/${leadEpisode.slug}`}
                  className="inline-flex items-center gap-1.5 min-h-11 text-xs font-semibold text-[#0E0E10] hover:text-[#C83E1B] transition-colors"
                >
                  <span>Read Show Notes &amp; Timestamps</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {secondaryEpisodes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {secondaryEpisodes.map((ep) => {
              const isThisPlaying = isPlaying && currentEpisode.id === ep.id;
              return (
                <article
                  key={ep.id}
                  className="flex flex-col justify-between bg-white border border-[#E4E4E0] rounded-lg overflow-hidden hover:border-[#0E0E10]/30 transition-colors"
                >
                  <div>
                    <Link href={`/episodes/${ep.slug}`} className="block">
                      <MediaFrame
                        src={ep.artwork}
                        alt={ep.title}
                        aspect="4/3"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </Link>

                    <div className="p-5">
                      <p className="font-mono text-[11px] text-[#52525B]">
                        EP. {String(ep.number).padStart(3, "0")}{" "}
                        <span aria-hidden="true">·</span> {ep.duration}{" "}
                        <span aria-hidden="true">·</span> {ep.publishedAt}
                      </p>

                      <Link
                        href={`/episodes/${ep.slug}`}
                        className="block mt-2 group"
                      >
                        <h3 className="font-display text-lg font-semibold leading-snug text-[#0E0E10] group-hover:text-[#C83E1B] transition-colors line-clamp-2">
                          {ep.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-sm text-[#52525B] line-clamp-2 leading-relaxed">
                        {ep.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-[#E4E4E0] flex items-center justify-between">
                    <button
                      onClick={() => handleToggle(ep)}
                      className="inline-flex items-center gap-1.5 min-h-10 text-xs font-semibold text-[#0E0E10] hover:text-[#C83E1B] transition-colors cursor-pointer"
                    >
                      {isThisPlaying ? (
                        <>
                          <Pause
                            size={13}
                            className="fill-current text-[#C83E1B]"
                          />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play
                            size={13}
                            className="fill-current text-[#C83E1B]"
                          />
                          <span>Listen</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/episodes/${ep.slug}`}
                      className="inline-flex items-center gap-1 min-h-10 text-xs font-medium text-[#52525B] hover:text-[#0E0E10] transition-colors"
                    >
                      <span>Show Notes</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 flex justify-start sm:justify-end">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-[#0E0E10] hover:text-[#C83E1B] transition-colors"
          >
            <span>Explore Full Episode Archive</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
