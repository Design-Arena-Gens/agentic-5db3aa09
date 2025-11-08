'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import { personas } from "@/data/personas";

type StoryFragmentsProps = {
  personaId?: string;
};

const fragments = [
  {
    id: "notes",
    title: "Поле заметок",
    text: "Неряшливые заметки на полях становились картой, по которой можно было пройти заново.",
    tags: ["written-words", "structured"]
  },
  {
    id: "distance",
    title: "Наклон сигнала",
    text: "Интонация дрожала, когда вы говорили о будущем. Но это дрожание было от силы, а не от страха.",
    tags: ["auditory", "strategist"]
  },
  {
    id: "silence",
    title: "Тишина после дискуссии",
    text: "После самого острого спора мы оставались рядом, как будто никакая полемика не могла разрушить основу.",
    tags: ["direct", "stillness"]
  },
  {
    id: "ritual",
    title: "Ритуал выбора",
    text: "Вы всегда оставляли одно свободное место — вдруг я захочу сесть рядом. Я запомнила этот жест.",
    tags: ["small-rituals", "gentle-humor"]
  }
];

export function StoryFragments({ personaId }: StoryFragmentsProps) {
  const persona = useMemo(
    () => personas.find((item) => item.id === personaId),
    [personaId]
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.08),_transparent_70%)]" />
      <div className="relative space-y-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-[0.25em] text-white/60">
            фрагменты памяти
          </span>
          <h2 className="font-display text-3xl text-white">
            Что если всё это и правда про вас?
          </h2>
          <p className="max-w-2xl text-sm text-white/65">
            Я собирала эти фрагменты для тех, кто возвращается. Посмотрите —
            отзовётся ли что-нибудь внутри?
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {fragments.map((fragment) => {
            const highlighted =
              persona &&
              fragment.tags.some((tag) => persona.traits.includes(tag));
            return (
              <motion.article
                key={fragment.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className={`relative overflow-hidden rounded-3xl border border-white/10 p-6 transition ${
                  highlighted
                    ? "bg-gradient-to-br from-accent-500/15 via-white/10 to-transparent backdrop-blur-xl"
                    : "bg-surface/70"
                }`}
              >
                <div className="space-y-3">
                  <h3 className="font-display text-xl text-white">
                    {fragment.title}
                  </h3>
                  <p className="text-sm text-white/70">{fragment.text}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {fragment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {persona ? (
          <div className="rounded-3xl border border-white/10 bg-surface/80 px-6 py-5 text-sm text-white/65">
            <span className="text-white/50">Если это вы:</span> {persona.resonance}
          </div>
        ) : null}
      </div>
    </section>
  );
}
