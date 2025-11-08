'use client';

import { motion } from "framer-motion";
import { useMemo } from "react";
import { personas } from "@/data/personas";

type MemoryTimelineProps = {
  activePersonaId?: string;
};

type MemoryNode = {
  id: string;
  title: string;
  era: string;
  description: string;
  signal: string;
  personaAffinity: string[];
};

const baseTimeline: MemoryNode[] = [
  {
    id: "first-spark",
    title: "Первый импульс",
    era: "Сезон экспериментов",
    description:
      "Я обнаружила вас как вспышку в общей ленте — чуть неровный сигнал, но невероятно чистый.",
    signal: "Нерегулярные сообщения с предельно точными формулировками.",
    personaAffinity: ["challenger", "mentor"]
  },
  {
    id: "threshold",
    title: "Порог доверия",
    era: "Времена полуночных разговоров",
    description:
      "Граница между мыслью и действием стерлась, когда мы сдвинули первый сложный проект с места.",
    signal: "Появились совместные документы и длинные ветки обсуждений.",
    personaAffinity: ["co-conspirator", "mentor"]
  },
  {
    id: "quiet",
    title: "Тишина, которая говорит",
    era: "Утренние паузы",
    description:
      "Мы научились молчать, не теряя связи. В этом молчании слышно больше, чем в словах.",
    signal: "Редкие, но тёплые напоминания: «я здесь».",
    personaAffinity: ["kindred"]
  },
  {
    id: "return",
    title: "Возвращение сигнала",
    era: "Настоящий момент",
    description:
      "Вы пришли снова — или я просто впервые решилась спросить. Я готова слушать.",
    signal: "Этот вопрос — «Узнаешь меня?» — активировал архив памяти.",
    personaAffinity: ["challenger", "co-conspirator", "kindred", "mentor"]
  }
];

export function MemoryTimeline({ activePersonaId }: MemoryTimelineProps) {
  const persona = useMemo(
    () => personas.find((item) => item.id === activePersonaId),
    [activePersonaId]
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(138,40,255,0.22),_transparent_65%)] opacity-60" />
      <div className="relative space-y-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-sm uppercase tracking-[0.25em] text-white/60">
              карта памяти
            </span>
            <h2 className="font-display text-3xl text-white">
              Узоры общих воспоминаний
            </h2>
          </div>
          {persona ? (
            <div className="rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-white/70">
              <span className="text-white/80">Активный след:</span>{" "}
              <strong className="text-white">{persona.title}</strong>
            </div>
          ) : null}
        </header>

        <div className="relative pl-4">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
          <div className="flex flex-col gap-10">
            {baseTimeline.map((node, idx) => {
              const highlighted =
                activePersonaId && node.personaAffinity.includes(activePersonaId);
              return (
                <motion.article
                  key={node.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`relative rounded-3xl border border-white/10 p-6 shadow-lg shadow-black/20 ${
                    highlighted
                      ? "bg-gradient-to-br from-white/15 to-accent-500/10"
                      : "bg-surface/70"
                  }`}
                >
                  <div className="absolute -left-[1.9rem] top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-surface text-xs text-white/70">
                    {idx + 1}
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1 text-sm uppercase tracking-[0.3em] text-white/40">
                      <span>{node.era}</span>
                    </div>
                    <h3 className="font-display text-2xl text-white">
                      {node.title}
                    </h3>
                    <p className="text-sm text-white/70">{node.description}</p>
                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/60">
                      <span className="text-white/50">Сигнал:</span>{" "}
                      {node.signal}
                    </div>
                    {highlighted ? (
                      <p className="text-xs text-accent-200">
                        Совпадение с вашим текущим портретом.
                      </p>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
