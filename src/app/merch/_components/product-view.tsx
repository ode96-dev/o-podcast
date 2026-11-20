"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types/podcast";

interface ProductViewProps {
  product: Product;
  related: Product[];
}

export default function ProductView({ product, related }: ProductViewProps) {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0],
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]?.name,
  );
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  return (
    <main className="py-8 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/merch"
          className="inline-flex items-center gap-2 min-h-11 text-xs font-medium text-[#52525B] hover:text-[#0E0E10] transition-colors mb-6"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Storefront</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-[#E4E4E0]">
          <div className="lg:col-span-6 lg:sticky lg:top-24 self-start">
            <MediaFrame
              src={product.images[0]}
              alt={product.name}
              aspect="4/3"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-lg border border-[#E4E4E0]"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="pb-6 border-b border-[#E4E4E0]">
              <p className="font-mono text-xs uppercase tracking-wider text-[#52525B]">
                {product.category}
                {product.availabilityNote
                  ? ` · ${product.availabilityNote}`
                  : ""}
              </p>

              <h1
                className="mt-2 font-display font-bold tracking-tight text-[#0E0E10] headline-balance"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                {product.name}
              </h1>

              <p className="mt-1.5 text-sm text-[#52525B]">
                {product.subtitle}
              </p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-2xl font-semibold text-[#0E0E10]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono tabular-nums text-sm text-[#71717A] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-mono uppercase tracking-wider text-[#52525B]">
                    Color
                  </span>
                  <span className="font-medium text-[#0E0E10]">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => {
                    const active = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        aria-label={`Select color ${c.name}`}
                        className={`w-10 h-10 rounded-md border-2 transition-transform cursor-pointer ${
                          active
                            ? "border-[#0E0E10] scale-105"
                            : "border-[#D4D4CE] hover:border-[#0E0E10]"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-mono uppercase tracking-wider text-[#52525B]">
                    Size
                  </span>
                  <span className="font-medium text-[#0E0E10]">
                    {selectedSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const active = selectedSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-12 min-h-11 px-4 rounded-md font-mono text-xs font-medium border transition-colors cursor-pointer ${
                          active
                            ? "bg-[#0E0E10] text-white border-[#0E0E10]"
                            : "bg-white text-[#0E0E10] border-[#D4D4CE] hover:border-[#0E0E10]"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center border border-[#D4D4CE] rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-12 inline-flex items-center justify-center text-[#52525B] hover:text-[#0E0E10] cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="font-mono tabular-nums text-sm font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-12 inline-flex items-center justify-center text-[#52525B] hover:text-[#0E0E10] cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                <span className="font-mono tabular-nums">
                  {addedFeedback
                    ? "Added to Bag"
                    : `Add to Bag · $${(product.price * quantity).toFixed(2)}`}
                </span>
              </Button>
            </div>

            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed pt-2">
              {product.description}
            </p>

            <div className="pt-4 border-t border-[#E4E4E0]">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[#52525B] mb-3">
                Specifications
              </h2>
              <ul className="space-y-2 text-sm text-[#0E0E10]">
                {product.details.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="text-[#C83E1B]" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="pt-12">
          <h2 className="font-display text-2xl font-semibold text-[#0E0E10] mb-6">
            More Editions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/merch/${item.slug}`}
                className="group bg-white border border-[#E4E4E0] rounded-lg overflow-hidden hover:border-[#0E0E10]/40 transition-colors"
              >
                <MediaFrame
                  src={item.images[0]}
                  alt={item.name}
                  aspect="4/3"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-4">
                  <p className="font-mono text-[11px] uppercase text-[#52525B]">
                    {item.category}
                  </p>
                  <h3 className="text-base font-semibold text-[#0E0E10] group-hover:text-[#C83E1B] mt-1">
                    {item.name}
                  </h3>
                  <p className="font-mono tabular-nums text-sm font-medium text-[#0E0E10] mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
