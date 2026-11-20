"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { HOSTS, TOUR_DATES } from "@/lib/data";
import { useTickets } from "@/lib/ticket-context";

export function HostsAndTour() {
  const { openTicketModal } = useTickets();

  return (
    <section className="py-14 sm:py-20 border-b border-[#E4E4E0] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionHeading
                kicker="The Hosts"
                title="Thea Mwangi"
                subtitle="Recorded from Nairobi with live tapings across London, New York, and Kigali."
              />

              <div className="mt-8 divide-y divide-[#E4E4E0] border-t border-b border-[#E4E4E0]">
                {HOSTS.map((host) => (
                  <div key={host.name} className="py-5 space-y-1.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-base font-semibold text-[#0E0E10]">
                        {host.name}
                      </h3>
                      <span className="font-mono text-xs text-[#52525B]">
                        {host.twitter}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#C83E1B]">
                      {host.role}
                    </p>
                    <p className="text-sm text-[#52525B] leading-relaxed pt-1">
                      {host.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-[#0E0E10] hover:text-[#C83E1B] transition-colors"
              >
                <span>Read the O Manifesto</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-end justify-between gap-4 mb-8">
                <SectionHeading
                  kicker="On Stage · 2026 / 2027"
                  title="Live World Tour"
                  subtitle="Unscripted stage tapings, guest panels, and audience floor debates."
                />
              </div>

              <div className="divide-y divide-[#E4E4E0] border-t border-b border-[#E4E4E0]">
                {TOUR_DATES.map((tour) => (
                  <div
                    key={tour.id}
                    className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <h3 className="font-display text-lg font-semibold text-[#0E0E10]">
                          {tour.city}, {tour.country}
                        </h3>
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
                      <p className="text-xs sm:text-sm text-[#52525B]">
                        {tour.venue} <span aria-hidden="true">·</span>{" "}
                        <span className="font-mono tabular-nums">
                          {tour.date}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <span className="font-mono tabular-nums text-sm font-semibold text-[#0E0E10]">
                        From ${tour.ticketPrice}
                      </span>
                      <button
                        onClick={() => openTicketModal(tour)}
                        className="min-h-11 px-4 py-2 rounded-md border border-[#D4D4CE] hover:border-[#0E0E10] bg-[#FAFAFA] hover:bg-[#0E0E10] text-[#0E0E10] hover:text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-start sm:justify-end">
              <Link
                href="/live"
                className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-[#0E0E10] hover:text-[#C83E1B] transition-colors"
              >
                <span>View All Tour Details &amp; VIP Passes</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
