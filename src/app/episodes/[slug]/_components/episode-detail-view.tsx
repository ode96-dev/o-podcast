"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Share2,
  ArrowLeft,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { useAudio } from "@/lib/audio-context";
import { PODCAST_INFO } from "@/lib/data";
import type { Episode } from "@/types/podcast";

interface EpisodeViewProps {
  episode: Episode;
  relatedEpisodes: Episode[];
}

export default function EpisodeView({
  episode,
  relatedEpisodes,
}: EpisodeViewProps) {
  const { playEpisode, isPlaying, togglePlay, currentEpisode, seek } =
    useAudio();
  const [copied, setCopied] = useState(false);

  const isThisPlaying = isPlaying && currentEpisode.id === episode.id;

  const handlePlayToggle = () => {
    if (currentEpisode.id === episode.id) {
      togglePlay();
    } else {
      playEpisode(episode);
    }
  };

  const handleTimestampClick = (seconds: number) => {
    if (currentEpisode.id !== episode.id) {
      playEpisode(episode);
      setTimeout(() => seek(seconds), 150);
    } else {
      seek(seconds);
      if (!isPlaying) togglePlay();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="py-8 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/episodes"
          className="inline-flex items-center gap-2 min-h-11 text-xs font-medium text-[#52525B] hover:text-[#0E0E10] transition-colors mb-6"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Episodes</span>
        </Link>

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#E4E4E0] items-stretch">
          <div className="lg:col-span-5">
            <MediaFrame
              src={episode.artwork}
              alt={episode.title}
              aspect="4/3"
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="rounded-lg lg:h-full"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs text-[#52525B]">
                Season {String(episode.season).padStart(2, "0")}{" "}
                <span aria-hidden="true">·</span> EP.{" "}
                {String(episode.number).padStart(3, "0")}{" "}
                <span aria-hidden="true">·</span> {episode.category}{" "}
                <span aria-hidden="true">·</span> {episode.duration}{" "}
                <span aria-hidden="true">·</span> {episode.publishedAt}
              </p>

              <h1
                className="mt-3 font-display font-bold tracking-[-0.03em] leading-[1.08] text-[#0E0E10] headline-balance"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 3rem)" }}
              >
                {episode.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#52525B] leading-relaxed max-w-prose">
                {episode.subtitle}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={handlePlayToggle} variant="primary" size="lg">
                {isThisPlaying ? (
                  <>
                    <Pause size={15} className="fill-current text-[#C83E1B]" />
                    <span>Pause Episode</span>
                  </>
                ) : (
                  <>
                    <Play size={15} className="fill-current text-[#C83E1B]" />
                    <span>Play Full Audio</span>
                  </>
                )}
              </Button>

              <Button onClick={handleCopyLink} variant="outline" size="lg">
                {copied ? (
                  <Check size={15} className="text-[#C83E1B]" />
                ) : (
                  <Share2 size={15} />
                )}
                <span>{copied ? "Copied Link" : "Share"}</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
          <div className="lg:col-span-8 space-y-10">
            <section className="max-w-prose space-y-4">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[#52525B]">
                Editorial Notes
              </h2>
              <p className="text-base text-[#0E0E10] leading-[1.75] first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                {episode.description}
              </p>
              <p className="text-base text-[#52525B] leading-[1.75]">
                {episode.showNotes.intro}
              </p>
            </section>

            {episode.quote && (
              <blockquote className="py-8 border-y border-[#E4E4E0] max-w-prose">
                <p className="font-display text-xl sm:text-2xl italic text-[#0E0E10] leading-snug">
                  &ldquo;{episode.quote.text}&rdquo;
                </p>
                <footer className="mt-3 font-mono text-xs text-[#52525B]">
                  — {episode.quote.author}
                </footer>
              </blockquote>
            )}

            <section className="max-w-prose">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#52525B]">
                  Chapters &amp; Timestamps
                </h2>
                <span className="text-xs text-[#71717A]">Select to seek</span>
              </div>

              <div className="divide-y divide-[#E4E4E0] border-y border-[#E4E4E0]">
                {episode.showNotes.timestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTimestampClick(ts.seconds)}
                    className="w-full min-h-13 py-3 flex items-center justify-between gap-4 text-left hover:bg-[#F2F2EF] px-2 -mx-2 rounded-md transition-colors cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="font-mono tabular-nums text-xs font-medium text-[#C83E1B] shrink-0">
                        {ts.time}
                      </span>
                      <span className="text-sm font-medium text-[#0E0E10]">
                        {ts.title}
                      </span>
                    </div>
                    <Play
                      size={13}
                      className="text-[#52525B] shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </section>

            <section className="max-w-prose">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[#52525B] mb-4">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {episode.showNotes.takeaways.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-sm sm:text-base text-[#0E0E10] leading-relaxed flex gap-3"
                  >
                    <span className="font-mono text-xs text-[#C83E1B] pt-1 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            {episode.guests[0] && (
              <div className="p-6 bg-white border border-[#E4E4E0] rounded-lg space-y-2">
                <p className="font-mono text-xs uppercase tracking-wider text-[#52525B]">
                  Featured Guest
                </p>
                <h3 className="font-display text-lg font-semibold text-[#0E0E10]">
                  {episode.guests[0].name}
                </h3>
                <p className="text-xs font-medium text-[#C83E1B]">
                  {episode.guests[0].role}
                </p>
                <p className="text-sm text-[#52525B] leading-relaxed pt-2">
                  {episode.guests[0].bio}
                </p>
              </div>
            )}

            <div className="p-6 bg-white border border-[#E4E4E0] rounded-lg space-y-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[#52525B]">
                External Streams
              </p>
              <div className="divide-y divide-[#E4E4E0]">
                <a
                  href={PODCAST_INFO.socials.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-11 flex items-center justify-between text-sm font-medium text-[#0E0E10] hover:text-[#C83E1B]"
                >
                  <span>Spotify</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <a
                  href={PODCAST_INFO.socials.apple}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-11 flex items-center justify-between text-sm font-medium text-[#0E0E10] hover:text-[#C83E1B]"
                >
                  <span>Apple Podcasts</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <a
                  href={PODCAST_INFO.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-11 flex items-center justify-between text-sm font-medium text-[#0E0E10] hover:text-[#C83E1B]"
                >
                  <span>YouTube Video</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            {episode.showNotes.resources.length > 0 && (
              <div className="p-6 bg-white border border-[#E4E4E0] rounded-lg space-y-3">
                <p className="font-mono text-xs uppercase tracking-wider text-[#52525B]">
                  Referenced Literature
                </p>
                <div className="divide-y divide-[#E4E4E0]">
                  {episode.showNotes.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      className="min-h-11 py-2 flex items-center justify-between gap-2 text-xs font-medium text-[#0E0E10] hover:text-[#C83E1B]"
                    >
                      <span>{res.title}</span>
                      <ArrowUpRight
                        size={13}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        <section className="mt-16 pt-12 border-t border-[#E4E4E0]">
          <h2 className="font-display text-2xl font-semibold text-[#0E0E10] mb-6">
            Continue Listening
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEpisodes.map((rel) => (
              <Link
                key={rel.id}
                href={`/episodes/${rel.slug}`}
                className="group bg-white border border-[#E4E4E0] rounded-lg overflow-hidden hover:border-[#0E0E10]/40 transition-colors"
              >
                <MediaFrame
                  src={rel.artwork}
                  alt={rel.title}
                  aspect="4/3"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-4">
                  <p className="font-mono text-[11px] text-[#52525B]">
                    EP. {String(rel.number).padStart(3, "0")} · {rel.duration}
                  </p>
                  <h3 className="font-display text-base font-semibold text-[#0E0E10] group-hover:text-[#C83E1B] mt-1 line-clamp-2">
                    {rel.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
