"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useTickets } from "@/lib/ticket-context";

export function PodcastNavbar() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { openTicketModal } = useTickets();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Episodes", href: "/episodes" },
    { name: "Live", href: "/live" },
    { name: "Merch", href: "/merch" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-30 h-14 md:h-16 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#E4E4E0]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="font-display text-lg md:text-xl font-bold tracking-[-0.03em] text-[#0E0E10] hover:text-[#C83E1B] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-11 flex items-center"
        >
          O Podcast
        </Link>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7"
        >
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-[#0E0E10] font-semibold"
                    : "text-[#52525B] hover:text-[#0E0E10]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#C83E1B]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={openCart}
            aria-label={`Open shopping bag, ${totalItems} items`}
            className="inline-flex items-center justify-center gap-2 min-h-11 px-4 py-2 rounded-md bg-[#0E0E10] hover:bg-[#27272A] text-[#FAFAFA] text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E1B] focus-visible:ring-offset-2"
          >
            <ShoppingBag size={14} aria-hidden="true" />
            <span className="font-mono tabular-nums">Bag ({totalItems})</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center min-w-11 min-h-11 rounded-md border border-[#E4E4E0] bg-white text-[#0E0E10] hover:bg-[#F2F2EF] transition-colors duration-150 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bg-[#FAFAFA] border-b border-[#E4E4E0] shadow-lg z-40">
          <nav
            aria-label="Mobile Navigation"
            className="px-4 py-3 divide-y divide-[#E4E4E0]"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between min-h-12 text-sm font-medium ${
                pathname === "/"
                  ? "text-[#C83E1B] font-semibold"
                  : "text-[#0E0E10]"
              }`}
            >
              <span>Home</span>
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between min-h-12 text-sm font-medium ${
                    isActive ? "text-[#C83E1B] font-semibold" : "text-[#0E0E10]"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 pb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTicketModal();
                }}
                className="w-full min-h-11 rounded-md bg-[#C83E1B] text-white text-sm font-medium hover:bg-[#A83214] transition-colors cursor-pointer"
              >
                Reserve Live Tour Tickets
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
