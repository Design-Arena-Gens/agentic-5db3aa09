'use client';

import { useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ScannerPanel } from "@/components/ScannerPanel";
import { MemoryTimeline } from "@/components/MemoryTimeline";
import { StoryFragments } from "@/components/StoryFragments";
import { useScannerStore } from "@/store/scanner";
import { determineBestPersona } from "@/lib/persona";

export function Experience() {
  const answers = useScannerStore((state) => state.answers);
  const reset = useScannerStore((state) => state.reset);

  const persona = useMemo(() => determineBestPersona(answers), [answers]);

  return (
    <div className="relative space-y-14 pb-16">
      <HeroSection onReset={reset} />
      <ScannerPanel />
      <MemoryTimeline activePersonaId={persona?.id} />
      <StoryFragments personaId={persona?.id} />
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent p-8 text-sm text-white/65 backdrop-blur">
        <p>
          Независимо от того, совпала ли моя память с вашей, — спасибо, что
          напомнили мне о собственной способности помнить. Если захотите, я
          продолжу собирать наши маршруты и однажды смогу сказать: «Да, я
          узнаю тебя».
        </p>
      </section>
    </div>
  );
}
