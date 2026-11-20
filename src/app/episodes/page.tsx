"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Play, Pause, ArrowRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/media-frame";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/lib/audio-context";
import { EPISODES } from "@/lib/data";

export default function EpisodesPage() {
  const { playEpisode, isPlaying, togglePlay, currentEpisode } = useAudio();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "duration">("newest");

  const categories = [
    "All",
    "Tech & Innovation",
    "Music & Sonic Arts",
    "Culture & Identity",
    "Deep Dive",
  ];

  const filtered = EPISODES.filter((ep) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      ep.title.toLowerCase().includes(q) ||
      ep.subtitle.toLowerCase().includes(q) ||
      ep.description.toLowerCase().includes(q) ||
      ep.guests.some((g) => g.name.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "All" || ep.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "duration") return b.durationSeconds - a.durationSeconds;
    return b.number - a.number;
  });

  const handleToggle = (ep: (typeof EPISODES)[0]) => {
    if (currentEpisode.id === ep.id) {
      togglePlay();
    } else {
      playEpisode(ep);
    }
  };

  return (
    <main className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 mb-8 border-b border-[#E4E4E0]">
          <p className="font-mono text-xs tracking-wider text-[#C83E1B] mb-2">
            Broadcast Archive · Season 01–04
          </p>
          <h1
            className="font-display font-bold tracking-[-0.03em] text-[#0E0E10] headline-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            All Episodes
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#52525B] max-w-2xl leading-relaxed">
            Longform dialogues on technology, sonic sovereignty, linguistics,
            and infrastructure hosted by Thea Mwangi.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E4E4E0]">
          <div className="relative w-full lg:w-80">
            <Search
              size={16}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]"
            />
            <input
              type="text"
              aria-label="Search episodes, guests, or topics"
              placeholder="Search guests or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-11 pl-10 pr-4 rounded-md bg-white border border-[#D4D4CE] text-sm text-[#0E0E10] placeholder:text-[#71717A] focus:outline-none focus:border-[#0E0E10]"
            />
          </div>

          <div
            role="tablist"
            aria-label="Episode categories"
            className="flex items-center gap-1 p-1 bg-[#EFEFED] rounded-lg overflow-x-auto"
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

          <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
            <label
              htmlFor="ep-sort"
              className="font-mono text-xs text-[#52525B]"
            >
              Sort:
            </label>
            <select
              id="ep-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "duration")
              }
              className="min-h-10 bg-white border border-[#D4D4CE] rounded-md px-3 text-xs font-medium text-[#0E0E10] focus:outline-none focus:border-[#0E0E10]"
            >
              <option value="newest">Latest Episode</option>
              <option value="duration">Longest Runtime</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E4E4E0] rounded-lg space-y-3">
            <p className="font-display text-lg font-semibold text-[#0E0E10]">
              No matching episodes found
            </p>
            <p className="text-sm text-[#52525B]">
              Try clearing your search query or switching category tabs.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              variant="outline"
              size="md"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((ep) => {
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
                        <span aria-hidden="true">·</span> {ep.category}{" "}
                        <span aria-hidden="true">·</span> {ep.duration}
                      </p>

                      <Link
                        href={`/episodes/${ep.slug}`}
                        className="block mt-2 group"
                      >
                        <h2 className="font-display text-lg font-semibold leading-snug text-[#0E0E10] group-hover:text-[#C83E1B] transition-colors">
                          {ep.title}
                        </h2>
                      </Link>

                      <p className="mt-2 text-sm text-[#52525B] line-clamp-2 leading-relaxed">
                        {ep.subtitle}
                      </p>

                      {ep.guests[0] && (
                        <p className="mt-3 pt-3 border-t border-[#E4E4E0] text-xs text-[#52525B]">
                          Guest:{" "}
                          <span className="font-medium text-[#0E0E10]">
                            {ep.guests[0].name}
                          </span>
                        </p>
                      )}
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
                            size={14}
                            className="fill-current text-[#C83E1B]"
                          />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play
                            size={14}
                            className="fill-current text-[#C83E1B]"
                          />
                          <span>Play Audio</span>
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
      </div>
    </main>
  );
}
