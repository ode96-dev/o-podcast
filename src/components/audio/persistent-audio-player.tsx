"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  ListMusic,
  ChevronDown,
} from "lucide-react";
import { useAudio } from "@/lib/audio-context";
import { EPISODES } from "@/lib/data";

function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function PersistentAudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    togglePlay,
    seek,
    skipBy,
    setSpeed,
    setVolumeLevel,
    toggleMute,
    playEpisode,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);

  const speedOptions = [1.0, 1.25, 1.5, 2.0];
  const cycleSpeed = () => {
    const idx = speedOptions.indexOf(playbackRate);
    const next = speedOptions[(idx + 1) % speedOptions.length];
    setSpeed(next);
  };

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {isExpanded && (
        <>
          <div
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/40 z-30"
          />
          <div className="relative z-40 bg-[#0E0E10] border-t border-[#27272A] text-[#F4F4F2] max-w-4xl mx-auto rounded-t-2xl shadow-2xl max-h-[65vh] flex flex-col">
            <div className="pt-2.5 pb-1 flex justify-center md:hidden">
              <span className="w-10 h-1 bg-[#3F3F46] rounded-full" />
            </div>
            <div className="px-4 sm:px-6 py-3.5 border-b border-[#27272A] flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA]">
                Episode Queue · {EPISODES.length} Episodes
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Close queue"
                className="min-h-10 min-w-10 inline-flex items-center justify-center text-[#A1A1AA] hover:text-white cursor-pointer"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            <div className="overflow-y-auto divide-y divide-[#1E1E22] px-4 sm:px-6">
              {EPISODES.map((ep) => {
                const isSelected = ep.id === currentEpisode.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => playEpisode(ep)}
                    className="w-full min-h-16 py-3 flex items-center justify-between gap-4 text-left hover:bg-white/3 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-sm overflow-hidden shrink-0 bg-[#18181B]">
                        <Image
                          src={ep.artwork}
                          alt={ep.title}
                          fill
                          sizes="44px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] text-[#A1A1AA]">
                          EP. {String(ep.number).padStart(3, "0")} ·{" "}
                          {ep.category}
                        </p>
                        <p
                          className={`text-sm font-medium truncate ${
                            isSelected ? "text-[#C83E1B]" : "text-white"
                          }`}
                        >
                          {ep.title}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums text-xs text-[#A1A1AA] shrink-0">
                      {ep.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="relative z-40 bg-[#0E0E10] border-t border-[#27272A] text-[#F4F4F2]">
        <div className="relative h-1 w-full bg-[#27272A]">
          <div
            className="h-full bg-[#C83E1B] transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            aria-label="Seek episode timeline"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="absolute inset-0 w-full h-3 -top-1 opacity-0 cursor-pointer"
          />
        </div>

        <div className="max-w-7xl mx-auto h-14 md:h-16 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1 max-w-md">
            <Link
              href={`/episodes/${currentEpisode.slug}`}
              className="relative w-9 h-9 md:w-10 md:h-10 rounded-sm overflow-hidden shrink-0 bg-[#18181B]"
            >
              <Image
                src={currentEpisode.artwork}
                alt={currentEpisode.title}
                fill
                sizes="40px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="min-w-0">
              <Link
                href={`/episodes/${currentEpisode.slug}`}
                className="block text-xs sm:text-sm font-semibold text-white truncate hover:text-[#C83E1B] transition-colors"
              >
                {currentEpisode.title}
              </Link>
              <p className="font-mono tabular-nums text-[11px] text-[#A1A1AA] truncate">
                EP. {String(currentEpisode.number).padStart(3, "0")} ·{" "}
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => skipBy(-15)}
              aria-label="Rewind 15 seconds"
              className="hidden sm:inline-flex min-w-11 min-h-11 items-center justify-center rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause episode" : "Play episode"}
              className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-md bg-[#C83E1B] hover:bg-[#A83214] text-white transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={17} className="fill-current" />
              ) : (
                <Play size={17} className="fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => skipBy(15)}
              aria-label="Fast forward 15 seconds"
              className="hidden sm:inline-flex min-w-11 min-h-11 items-center justify-center rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RotateCw size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <button
              onClick={cycleSpeed}
              aria-label={`Playback speed ${playbackRate}x`}
              className="hidden md:inline-flex min-h-10 px-2.5 items-center justify-center rounded-md font-mono tabular-nums text-xs text-[#E4E4E7] hover:bg-white/5 border border-[#27272A] cursor-pointer"
            >
              {playbackRate}x
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="min-w-10 min-h-10 inline-flex items-center justify-center text-[#A1A1AA] hover:text-white cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>
              <input
                type="range"
                aria-label="Audio volume"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolumeLevel(Number(e.target.value))}
                className="w-20 h-1 bg-[#27272A] rounded-full appearance-none cursor-pointer accent-[#C83E1B]"
              />
            </div>

            <button
              onClick={() => setIsExpanded((p) => !p)}
              aria-label="Toggle episode queue"
              className={`min-w-11 min-h-11 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                isExpanded
                  ? "bg-white text-[#0E0E10]"
                  : "text-[#E4E4E7] hover:bg-white/5"
              }`}
            >
              <ListMusic size={16} />
              <span className="hidden sm:inline">Queue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
