"use client";

import dynamic from "next/dynamic";

const ThreeProductRoom = dynamic(() => import("./ThreeProductRoom"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[560px] md:h-[620px] lg:h-[640px] rounded-3xl bg-[#071322] border border-slate-800 flex items-center justify-center text-white/50 font-mono text-sm">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-accent animate-ping" />
        <span>Initializing 3D Lighting Showroom...</span>
      </div>
    </div>
  ),
});

export default function ProductRoomWrapper() {
  return <ThreeProductRoom />;
}
