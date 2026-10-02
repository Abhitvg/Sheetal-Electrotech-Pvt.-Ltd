"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  candidates: string[];
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
};

export default function FacilityImage({
  candidates,
  alt,
  className = "",
  eager = false,
  sizes = "100vw",
}: Props) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed || !candidates[index]) {
    return <div aria-hidden="true" className={`absolute inset-0 bg-[#0b192c] ${className}`} />;
  }

  return (
    <Image
      src={candidates[index]}
      alt={alt}
      fill
      sizes={sizes}
      priority={eager}
      className={className}
      onError={() => {
        if (index < candidates.length - 1) setIndex(index + 1);
        else setFailed(true);
      }}
    />
  );
}
