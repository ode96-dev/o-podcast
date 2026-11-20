"use client";

import React, { useState } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { useTickets } from "@/lib/ticket-context";
import { TOUR_DATES } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function TicketModal() {
  const { isTicketModalOpen, closeTicketModal, selectedTour, selectTour } =
    useTickets();
  const [ticketType, setTicketType] = useState<"standard" | "vip">("standard");
  const [quantity, setQuantity] = useState(2);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  if (!isTicketModalOpen) return null;

  const basePrice = selectedTour.ticketPrice;
  const pricePerTicket = ticketType === "vip" ? basePrice + 35 : basePrice;
  const totalPrice = pricePerTicket * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    closeTicketModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 overflow-y-auto">
      <div onClick={closeTicketModal} className="fixed inset-0 bg-black/50" />

      <div
        role="dialog"
        aria-label="Reserve Live Tour Tickets"
        className="relative w-full max-w-lg bg-[#FAFAFA] border border-[#E4E4E0] rounded-t-2xl sm:rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10"
      >
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-white">
          <span className="w-10 h-1 bg-[#D4D4CE] rounded-full" />
        </div>

        <div className="px-6 py-4 bg-white border-b border-[#E4E4E0] flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-[#0E0E10]">
              O Live Stage Passes
            </h3>
            <p className="font-mono text-xs text-[#52525B]">
              2026 / 2027 World Tour · Demo Reservation
            </p>
          </div>
          <button
            onClick={closeTicketModal}
            aria-label="Close ticket modal"
            className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-md text-[#52525B] hover:text-[#0E0E10] hover:bg-[#F2F2EF] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 bg-[#0E0E10] text-white rounded-full flex items-center justify-center mx-auto">
                <Check size={20} />
              </div>
              <h4 className="font-display text-xl font-semibold text-[#0E0E10]">
                Demo Pass Hold Confirmed
              </h4>
              <p className="text-sm text-[#52525B] max-w-sm mx-auto">
                Reserved {quantity}x{" "}
                {ticketType === "vip" ? "VIP" : "General Admission"} for{" "}
                <strong className="text-[#0E0E10]">
                  {selectedTour.city} ({selectedTour.date})
                </strong>
                . Box office integration is running in preview mode.
              </p>
              <Button
                onClick={handleReset}
                variant="primary"
                size="md"
                className="w-full"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#52525B] mb-2">
                  Select City
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TOUR_DATES.map((t) => {
                    const isSelected = selectedTour.id === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => selectTour(t)}
                        className={`p-3 rounded-md border text-left transition-colors cursor-pointer min-h-14 ${
                          isSelected
                            ? "bg-[#0E0E10] text-white border-[#0E0E10]"
                            : "bg-white text-[#0E0E10] border-[#E4E4E0] hover:border-[#0E0E10]"
                        }`}
                      >
                        <span className="text-sm font-semibold block">
                          {t.city}
                        </span>
                        <span
                          className={`font-mono text-[11px] block ${
                            isSelected ? "text-[#A1A1AA]" : "text-[#52525B]"
                          }`}
                        >
                          {t.date}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="py-3 border-y border-[#E4E4E0] text-xs text-[#52525B] flex flex-wrap justify-between gap-2">
                <span className="font-medium text-[#0E0E10]">
                  {selectedTour.venue}
                </span>
                <span className="font-mono tabular-nums">
                  {selectedTour.time}
                </span>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#52525B] mb-2">
                  Pass Tier
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTicketType("standard")}
                    className={`p-3 rounded-md border text-left cursor-pointer ${
                      ticketType === "standard"
                        ? "border-[#0E0E10] bg-white ring-1 ring-[#0E0E10]"
                        : "border-[#E4E4E0] bg-white"
                    }`}
                  >
                    <span className="text-sm font-semibold block text-[#0E0E10]">
                      General Admission
                    </span>
                    <span className="font-mono tabular-nums text-xs text-[#52525B]">
                      ${basePrice}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTicketType("vip")}
                    className={`p-3 rounded-md border text-left cursor-pointer ${
                      ticketType === "vip"
                        ? "border-[#0E0E10] bg-white ring-1 ring-[#0E0E10]"
                        : "border-[#E4E4E0] bg-white"
                    }`}
                  >
                    <span className="text-sm font-semibold block text-[#0E0E10]">
                      VIP + Q&A Reception
                    </span>
                    <span className="font-mono tabular-nums text-xs text-[#52525B]">
                      ${basePrice + 35}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#52525B] mb-2">
                  Quantity
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 6].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`min-h-11 rounded-md font-mono tabular-nums text-xs font-medium border cursor-pointer ${
                        quantity === q
                          ? "bg-[#0E0E10] text-white border-[#0E0E10]"
                          : "bg-white text-[#0E0E10] border-[#E4E4E0] hover:border-[#0E0E10]"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#52525B] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Nyambura K."
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full min-h-11 bg-white border border-[#D4D4CE] rounded-md px-3 text-sm text-[#0E0E10] focus:outline-none focus:border-[#0E0E10]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#52525B] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full min-h-11 bg-white border border-[#D4D4CE] rounded-md px-3 text-sm text-[#0E0E10] focus:outline-none focus:border-[#0E0E10]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E4E4E0] flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] uppercase text-[#52525B] block">
                    Total
                  </span>
                  <span className="font-mono tabular-nums text-2xl font-semibold text-[#0E0E10]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button type="submit" variant="accent" size="lg">
                  <span>Hold Passes</span>
                  <ArrowRight size={15} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
