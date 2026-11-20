"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MediaFrame } from "@/components/ui/media-frame";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function MerchStorePage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">(
    "featured",
  );

  const categories = ["All", "Apparel", "Audio Edition", "Objects"];

  const filtered = PRODUCTS.filter((p) =>
    selectedCategory === "All" ? true : p.category === selectedCategory,
  ).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <main className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 mb-8 border-b border-[#E4E4E0]">
          <p className="font-mono text-xs tracking-wider text-[#C83E1B] mb-2">
            Objects &amp; Editions
          </p>
          <h1
            className="font-display font-bold tracking-[-0.03em] text-[#0E0E10] headline-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            O Storefront
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#52525B] max-w-2xl leading-relaxed">
            480gsm organic French terry hoodies, garment-dyed cotton jersey,
            volcanic stoneware, and 180g amber vinyl pressings. Free shipping
            over $100.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E4E4E0]">
          <div
            role="tablist"
            aria-label="Merchandise categories"
            className="flex items-center gap-1 p-1 bg-[#EFEFED] rounded-lg overflow-x-auto"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-9.5 px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? "bg-white text-[#0E0E10] shadow-xs"
                      : "text-[#52525B] hover:text-[#0E0E10]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <label
              htmlFor="merch-sort"
              className="font-mono text-xs text-[#52525B]"
            >
              Sort:
            </label>
            <select
              id="merch-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "featured" | "price-asc" | "price-desc",
                )
              }
              className="min-h-10 bg-white border border-[#D4D4CE] rounded-md px-3 text-xs font-medium text-[#0E0E10] focus:outline-none focus:border-[#0E0E10]"
            >
              <option value="featured">Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((prod) => (
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
                    <h2 className="text-base font-semibold text-[#0E0E10] group-hover:text-[#C83E1B] transition-colors">
                      {prod.name}
                    </h2>
                  </Link>

                  <p className="text-xs text-[#52525B] mt-1">{prod.subtitle}</p>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-[#E4E4E0] flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono tabular-nums text-[15px] font-semibold text-[#0E0E10]">
                    ${prod.price.toFixed(2)}
                  </span>
                  {prod.originalPrice && (
                    <span className="font-mono tabular-nums text-xs text-[#71717A] line-through">
                      ${prod.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

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
    </main>
  );
}
