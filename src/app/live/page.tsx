"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TOUR_DATES } from "@/lib/data";
import { useTickets } from "@/lib/ticket-context";
import { tourFaqs } from "./_data/faq";

export default function LiveTourPage() {
  const { openTicketModal } = useTickets();

  return (
    <main className="py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 mb-10 border-b border-[#E4E4E0]">
          <p className="font-mono text-xs tracking-wider text-[#C83E1B] mb-2">
            Live Stage Residency · 2026 / 2027
          </p>
          <h1
            className="font-display font-bold tracking-[-0.03em] text-[#0E0E10] headline-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            O World Tour
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#52525B] max-w-2xl leading-relaxed">
            Unscripted stage conversations, live percussion collaborations, and
            open-floor Q&amp;A across Nairobi, London, New York, and Kigali.
          </p>
        </div>

        <section className="mb-16">
          <div className="divide-y divide-[#E4E4E0] border-t border-b border-[#E4E4E0]">
            {TOUR_DATES.map((tour) => (
              <div
                key={tour.id}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#0E0E10]">
                      {tour.city}, {tour.country}
                    </h2>
                    <span
                      className={`font-mono text-xs ${
                        tour.status === "Limited"
                          ? "text-[#C83E1B] font-medium"
                          : "text-[#52525B]"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#52525B]">
                    {tour.venue} <span aria-hidden="true">·</span>{" "}
                    <span className="font-mono tabular-nums">
                      {tour.date} · {tour.time}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="font-mono text-[11px] uppercase text-[#71717A] block">
                      From
                    </span>
                    <span className="font-mono tabular-nums text-lg font-semibold text-[#0E0E10]">
                      ${tour.ticketPrice}
                    </span>
                  </div>

                  <Button
                    onClick={() => openTicketModal(tour)}
                    variant="primary"
                    size="md"
                  >
                    Reserve Passes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 sm:p-10 rounded-lg bg-[#0E0E10] text-[#F4F4F2] mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-wider text-[#C83E1B]">
              Backstage Access
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              VIP Swarm Pass
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed tracking-[0.01em]">
              Includes front-three-row reserved seating, the 45-minute post-show
              reception with Thea Mwangi, and the Live in Nairobi 2LP Vinyl.
            </p>
          </div>
          <Button
            onClick={() => openTicketModal()}
            variant="accent"
            size="lg"
            className="shrink-0"
          >
            Select VIP Tier
          </Button>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-[#0E0E10] mb-6">
            Tour Notes &amp; Questions
          </h2>
          <div className="divide-y divide-[#E4E4E0] border-t border-b border-[#E4E4E0]">
            {tourFaqs.map((faq, idx) => (
              <div key={idx} className="py-5 space-y-1.5">
                <h3 className="text-base font-semibold text-[#0E0E10]">
                  {faq.q}
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed max-w-prose">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
