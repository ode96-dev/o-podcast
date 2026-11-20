"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { HOSTS, PODCAST_INFO } from "@/lib/data";
import { useTickets } from "@/lib/ticket-context";

export default function AboutPage() {
  const { openTicketModal } = useTickets();

  return (
    <main className="py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 mb-10 border-b border-[#E4E4E0]">
          <p className="font-mono text-xs tracking-wider text-[#C83E1B] mb-2">
            Editorial Ethos · Est. Nairobi 2023
          </p>
          <h1
            className="font-display font-bold tracking-[-0.03em] text-[#0E0E10] headline-balance max-w-3xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Stories told with our own cadence and sovereignty.
          </h1>
          <p className="mt-4 text-base text-[#52525B] max-w-2xl leading-relaxed">
            In Swahili, <em>O</em> Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Obcaecati beatae, distinctio minima maiores velit
            blanditiis voluptates odit cumque! Natus sit ipsam illo temporibus
            ducimus error ut libero rerum perspiciatis quasi..
          </p>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-[#E4E4E0] items-stretch">
          <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4 max-w-prose">
              <h2 className="font-display text-2xl font-semibold text-[#0E0E10]">
                Why O Exists
              </h2>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Founded in Nairobi by Thea Mwangi, Nzige began as a direct
                rejection of flattened, outsider-led narratives about African
                innovation, music, and society.
              </p>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Each week, we bring engineers wiring off-grid energy, producers
                sculpting Amapiano basslines, computational linguists archiving
                indigenous languages, and coffee agronomists into one unhurried
                room.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/episodes">
                <Button variant="primary" size="md">
                  Browse All 58 Episodes
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <MediaFrame
              src={"/assets/images/O_studio_session_1795139000889.jpg"}
              alt="Thea Mwangi inside the Nairobi recording studio"
              aspect="4/3"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-lg lg:h-full border border-[#E4E4E0]"
            />
          </div>
        </section>

        <section className="py-10 border-b border-[#E4E4E0] grid grid-cols-2 lg:grid-cols-4 gap-8">
          {PODCAST_INFO.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-mono tabular-nums text-3xl font-semibold text-[#0E0E10]">
                {m.value}
              </p>
              <p className="text-xs sm:text-sm text-[#52525B] mt-1">
                {m.label}
              </p>
            </div>
          ))}
        </section>

        <section className="py-14 border-b border-[#E4E4E0]">
          <p className="font-mono text-xs tracking-wider text-[#C83E1B] mb-2">
            The Producers
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0E0E10] mb-8">
            Voices Behind The Mic
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOSTS.map((host) => (
              <div
                key={host.name}
                className="p-6 bg-white border border-[#E4E4E0] rounded-lg space-y-2"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-[#0E0E10]">
                    {host.name}
                  </h3>
                  <span className="font-mono text-xs text-[#52525B]">
                    {host.twitter}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#C83E1B]">
                  {host.role} · {host.city}
                </p>
                <p className="text-sm text-[#52525B] leading-relaxed pt-2">
                  {host.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 p-6 sm:p-10 rounded-lg bg-[#0E0E10] text-[#F4F4F2] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-wider text-[#C83E1B]">
              Press &amp; Sponsorships
            </p>
            <h2 className="font-display text-2xl font-semibold text-white">
              Partner With O Podcast
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Reach us at{" "}
              <a
                href={`mailto:${PODCAST_INFO.businessEmail}`}
                className="text-white underline hover:text-[#C83E1B]"
              >
                {PODCAST_INFO.businessEmail}
              </a>{" "}
              for sponsorships, or{" "}
              <a
                href={`mailto:${PODCAST_INFO.email}`}
                className="text-white underline hover:text-[#C83E1B]"
              >
                {PODCAST_INFO.email}
              </a>{" "}
              for guest pitches.
            </p>
          </div>

          <Button onClick={() => openTicketModal()} variant="accent" size="lg">
            Reserve Tour Passes
          </Button>
        </section>
      </div>
    </main>
  );
}
