"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  src: StaticImageData | string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  aspect?: "4/3" | "16/9" | "1/1" | "auto";
}

export function MediaFrame({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className,
  imgClassName,
  aspect = "4/3",
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "16/9"
        ? "aspect-video"
        : aspect === "1/1"
          ? "aspect-square"
          : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#ECECE8]",
        aspectClass,
        className,
      )}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-[#EFEFED] to-[#E2E2DC] p-4 text-center">
          <Radio size={24} className="text-[#71717A]" />
          <span className="text-xs font-medium text-[#52525B] line-clamp-2">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
