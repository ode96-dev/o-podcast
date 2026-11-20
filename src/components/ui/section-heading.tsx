import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker && (
        <p className="font-mono text-xs tracking-wider text-[#C83E1B] mb-2">
          {kicker}
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0E0E10] headline-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-[#52525B] leading-relaxed max-w-prose">
          {subtitle}
        </p>
      )}
    </div>
  );
}
