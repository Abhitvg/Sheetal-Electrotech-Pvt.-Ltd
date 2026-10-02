"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

type Props = {
  candidates: string[];
  alt: string;
  className?: string;
  eager?: boolean;
};

export default function FacilityImage({
  candidates,
  alt,
  className = "",
  eager = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed || !candidates[index]) {
    return <div aria-hidden="true" className={`absolute inset-0 bg-[#0b192c] ${className}`} />;
  }

  return (
    // Facility imagery is sourced from approved company assets.
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (index < candidates.length - 1) setIndex(index + 1);
        else setFailed(true);
      }}
    />
  );
}
