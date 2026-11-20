"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaFrame } from "@/components/ui/media-frame";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export function MerchandisePreview() {
  const { addToCart } = useCart();
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <section className="py-14 sm:py-20 border-b border-[#E4E4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading
            kicker="Objects & Apparel"
            title="O Editions"
            subtitle="480gsm organic French terry, garment-dyed jersey, and 180g amber vinyl pressings produced in numbered runs."
          />

          <Link
            href="/merch"
            className="inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-[#0E0E10] hover:text-[#C83E1B] transition-colors shrink-0"
          >
            <span>Shop All Objects</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((prod) => (
            <article
              key={prod.id}
              className="group flex flex-col justify-between bg-white border border-[#E4E4E0] rounded-lg overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
            >
              <div>
                <Link
                  href={`/merch/${prod.slug}`}
                  className="block bg-[#ECECE8]"
                >
                  <MediaFrame
                    src={prod.images[0]}
                    alt={prod.name}
                    aspect="4/3"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    imgClassName="group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </Link>

                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#52525B]">
                    {prod.category}
                    {prod.availabilityNote ? ` · ${prod.availabilityNote}` : ""}
                  </p>

                  <Link href={`/merch/${prod.slug}`} className="block mt-1.5">
                    <h3 className="text-base font-semibold text-[#0E0E10] group-hover:text-[#C83E1B] transition-colors">
                      {prod.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#52525B] mt-1">{prod.subtitle}</p>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-[#E4E4E0] flex items-center justify-between">
                <span className="font-mono tabular-nums text-[15px] font-semibold text-[#0E0E10]">
                  ${prod.price.toFixed(2)}
                </span>

                <button
                  onClick={() => addToCart(prod, 1, prod.sizes?.[0])}
                  className="min-h-10 px-4 py-2 rounded-md bg-[#0E0E10] hover:bg-[#C83E1B] text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Add to Bag
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
