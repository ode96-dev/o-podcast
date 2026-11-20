"use client";

import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DispatchSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <p className="font-mono text-xs tracking-wider text-[#C83E1B]">
              Weekly Editorial Note
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0E0E10] headline-balance">
              The Swarm Dispatch
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] max-w-lg leading-relaxed">
              Full episode transcripts, field-recording notes from Nairobi, and
              early tour release windows sent every Tuesday.
            </p>
          </div>

          <div className="lg:col-span-6">
            {submitted ? (
              <div className="p-4 rounded-md border border-[#E4E4E0] bg-[#FAFAFA] flex items-center gap-3 text-sm font-medium text-[#0E0E10]">
                <Check size={18} className="text-[#C83E1B] shrink-0" />
                <span>
                  Subscribed. Look out for Tuesday’s issue of The Swarm
                  Dispatch.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="dispatch-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="dispatch-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="flex-1 min-h-12 px-4 rounded-md bg-[#FAFAFA] border border-[#D4D4CE] text-sm text-[#0E0E10] placeholder:text-[#71717A] focus:outline-none focus:border-[#0E0E10]"
                />
                <Button type="submit" variant="primary" size="lg">
                  <span>Subscribe</span>
                  <ArrowRight size={15} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
