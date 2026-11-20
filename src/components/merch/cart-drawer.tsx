"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    freeShippingThreshold,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "O" || code === "SWARM15") {
      setDiscountPercent(0.15);
      setPromoMessage("15% discount applied.");
    } else {
      setDiscountPercent(0);
      setPromoMessage("Code not recognized. Try SWARM15.");
    }
  };

  const discountAmount = subtotal * discountPercent;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/50 transition-opacity"
      />

      <div
        role="dialog"
        aria-label="Shopping Bag"
        className="relative w-full max-w-md bg-[#FAFAFA] text-[#0E0E10] shadow-2xl z-10 flex flex-col h-full border-l border-[#E4E4E0]"
      >
        <div className="px-5 h-16 border-b border-[#E4E4E0] flex items-center justify-between bg-white">
          <div className="flex items-baseline gap-2">
            <h2 className="font-display text-lg font-semibold">Bag</h2>
            <span className="font-mono text-xs tabular-nums text-[#52525B]">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-md text-[#52525B] hover:text-[#0E0E10] hover:bg-[#F2F2EF] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-2.5 bg-[#F2F2EF] border-b border-[#E4E4E0] text-xs text-[#52525B] flex items-center justify-between">
          {subtotal >= freeShippingThreshold ? (
            <span className="font-medium text-[#0E0E10]">
              Free express shipping unlocked
            </span>
          ) : (
            <span>
              Add ${(freeShippingThreshold - subtotal).toFixed(0)} more for free
              shipping
            </span>
          )}
          <span className="font-mono tabular-nums text-[11px]">
            ${subtotal.toFixed(0)} / ${freeShippingThreshold}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 divide-y divide-[#E4E4E0]">
          {checkoutComplete ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 bg-[#0E0E10] text-white rounded-full flex items-center justify-center mx-auto">
                <Check size={20} />
              </div>
              <h3 className="font-display text-xl font-semibold">
                Order Demo Confirmed
              </h3>
              <p className="text-sm text-[#52525B] max-w-xs mx-auto leading-relaxed">
                This storefront runs a simulated checkout preview. No real
                payment method was charged.
              </p>
              <Button
                onClick={() => {
                  setCheckoutComplete(false);
                  closeCart();
                }}
                variant="primary"
                size="md"
              >
                Continue Exploring
              </Button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <h3 className="font-display text-lg font-semibold">
                Your bag is empty
              </h3>
              <p className="text-sm text-[#52525B] max-w-xs mx-auto">
                Explore milled heavyweight cotton garments, stoneware, and 180g
                amber vinyl pressings.
              </p>
              <Link href="/merch" onClick={closeCart}>
                <Button variant="outline" size="md">
                  Browse Storefront
                </Button>
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="py-4 flex gap-4"
              >
                <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-[#ECECE8] shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#0E0E10] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#52525B] mt-0.5">
                        {[item.selectedSize, item.selectedColor]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(idx)}
                      aria-label={`Remove ${item.product.name}`}
                      className="min-w-9 min-h-9 inline-flex items-center justify-center text-[#71717A] hover:text-[#C83E1B] cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-[#D4D4CE] rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(idx, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 inline-flex items-center justify-center text-[#52525B] hover:text-[#0E0E10] cursor-pointer"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="font-mono tabular-nums text-xs font-medium w-7 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(idx, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-9 h-9 inline-flex items-center justify-center text-[#52525B] hover:text-[#0E0E10] cursor-pointer"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="font-mono tabular-nums text-sm font-semibold text-[#0E0E10]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!checkoutComplete && cart.length > 0 && (
          <div className="p-5 border-t border-[#E4E4E0] bg-white space-y-4">
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code (SWARM15)"
                aria-label="Promo code"
                className="flex-1 min-h-10 px-3 text-xs bg-[#FAFAFA] border border-[#D4D4CE] rounded-md text-[#0E0E10] focus:outline-none focus:border-[#0E0E10]"
              />
              <Button type="submit" variant="outline" size="sm">
                Apply
              </Button>
            </form>
            {promoMessage && (
              <p className="text-xs text-[#C83E1B] font-medium">
                {promoMessage}
              </p>
            )}

            <div className="space-y-1.5 text-xs text-[#52525B] pt-2 border-t border-[#E4E4E0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#0E0E10]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C83E1B]">
                  <span>Discount (15%)</span>
                  <span className="font-mono tabular-nums">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums text-[#0E0E10]">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#0E0E10] pt-2 border-t border-[#E4E4E0]">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleSimulateCheckout}
              disabled={isCheckingOut}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <span>
                {isCheckingOut ? "Confirming Demo..." : "Checkout (Demo)"}
              </span>
              <ArrowRight size={15} />
            </Button>
            <p className="text-[11px] text-center text-[#71717A]">
              Simulated storefront checkout · Payment provider not connected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
