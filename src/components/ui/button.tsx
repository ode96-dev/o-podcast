"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E1B] focus-visible:ring-offset-2 disabled:opacity-45 disabled:pointer-events-none active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0";

  const variants = {
    primary: "bg-[#0E0E10] text-[#FAFAFA] hover:bg-[#27272A]",
    accent: "bg-[#C83E1B] text-white hover:bg-[#A83214]",
    outline:
      "border border-[#D4D4CE] bg-white text-[#0E0E10] hover:border-[#0E0E10] hover:bg-[#F2F2EF]",
    ghost: "text-[#0E0E10] hover:bg-[#F2F2EF]",
  };

  const sizes = {
    sm: "min-h-[40px] px-4 py-2 text-xs",
    md: "min-h-[44px] px-5 py-2.5 text-sm",
    lg: "min-h-[48px] px-6 py-3 text-sm font-semibold",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
