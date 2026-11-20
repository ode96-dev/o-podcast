"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PODCAST_INFO } from "@/lib/data";
import { useTickets } from "@/lib/ticket-context";

export function PodcastFooter() {
  const { openTicketModal } = useTickets();

  return (
    <footer className="bg-[#0E0E10] text-[#F4F4F2] border-t border-[#27272A] pt-14 pb-24 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#27272A]">
          <div className="lg:col-span-5 space-y-3">
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-[-0.02em] text-white inline-block"
            >
              O Podcast
            </Link>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm tracking-[0.01em]">
              {PODCAST_INFO.description}
            </p>
            <p className="font-mono text-xs text-[#71717A] pt-1">
              {PODCAST_INFO.location} · Independent Audio Broadcast
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA]">
              Index
            </h3>
            <ul className="space-y-2 text-sm text-[#E4E4E7]">
              <li>
                <Link
                  href="/episodes"
                  className="hover:text-[#C83E1B] transition-colors"
                >
                  Episodes
                </Link>
              </li>
              <li>
                <Link
                  href="/live"
                  className="hover:text-[#C83E1B] transition-colors"
                >
                  Live Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/merch"
                  className="hover:text-[#C83E1B] transition-colors"
                >
                  Merch Store
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C83E1B] transition-colors"
                >
                  Hosts & Story
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA]">
              Listen
            </h3>
            <ul className="space-y-2 text-sm text-[#E4E4E7]">
              <li>
                <a
                  href={PODCAST_INFO.socials.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C83E1B] transition-colors"
                >
                  Spotify <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PODCAST_INFO.socials.apple}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C83E1B] transition-colors"
                >
                  Apple Podcasts <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PODCAST_INFO.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C83E1B] transition-colors"
                >
                  YouTube <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PODCAST_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C83E1B] transition-colors"
                >
                  Instagram <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA]">
              Inquiries
            </h3>
            <div className="space-y-2 text-sm text-[#E4E4E7]">
              <p>
                <a
                  href={`mailto:${PODCAST_INFO.email}`}
                  className="hover:text-[#C83E1B] transition-colors"
                >
                  {PODCAST_INFO.email}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${PODCAST_INFO.businessEmail}`}
                  className="hover:text-[#C83E1B] transition-colors"
                >
                  {PODCAST_INFO.businessEmail}
                </a>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openTicketModal()}
                  className="min-h-10 px-4 py-2 rounded-md border border-[#3F3F46] hover:border-[#C83E1B] text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  Reserve Tour Passes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#71717A]">
          <p>© 2026 O Podcast. Produced by Thea Mwangi.</p>
          <p className="font-mono tabular-nums">Season 04 · Nairobi</p>
        </div>
      </div>
    </footer>
  );
}
