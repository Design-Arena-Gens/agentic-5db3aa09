'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useScannerStore } from "@/store/scanner";
import { scannerQuestions, ScannerOption } from "@/data/questions";
import { aggregatePersonaMatches, determineBestPersona } from "@/lib/persona";

const buttonTone: Record<ScannerOption["tone"], string> = {
  warm: "from-accent-500/70 to-pink-500/70",
  cool: "from-cyan-500/70 to-blue-500/70",
  bright: "from-amber-400/70 to-red-500/70"
};

const buttonRing: Record<ScannerOption["tone"], string> = {
  warm: "ring-accent-300/80",
  cool: "ring-sky-300/80",
  bright: "ring-amber-300/80"
};

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * idx }
  })
};

function resolveOption(questionId: string, trait?: string) {
  const question = scannerQuestions.find((q) => q.id === questionId);
  if (!question) return undefined;
  return question.options.find((option) => option.trait === trait);
}

export function ScannerPanel() {
  const answers = useScannerStore((state) => state.answers);
  const setAnswer = useScannerStore((state) => state.setAnswer);

  const personaMatches = useMemo(() => aggregatePersonaMatches(answers), [answers]);
  const bestMatch = useMemo(() => personaMatches[0], [personaMatches]);
  const decodedPersona = useMemo(() => determineBestPersona(answers), [answers]);

  const saturation =
    Object.keys(answers).length / Math.max(scannerQuestions.length, 1);

  return (
    <section className="flex flex-col gap-10">
      <div className="grid gap-6 md:grid-cols-2">
        {scannerQuestions.map((question, idx) => {
          const answeredTrait = answers[question.id];
          return (
            <motion.article
              key={question.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              custom={idx}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              </div>
              <div className="relative space-y-4">
                <header className="space-y-2">
                  <h2 className="font-display text-xl text-white">
                    {question.prompt}
                  </h2>
                  <p className="text-sm text-white/60">{question.hint}</p>
                </header>
                <div className="grid gap-3">
                  {question.options.map((option) => {
                    const isActive = answeredTrait === option.trait;
                    return (
                      <button
                        key={option.trait}
                        onClick={() => setAnswer(question.id, option.trait)}
                        className={`relative flex w-full flex-col gap-1 rounded-2xl border border-white/10 bg-surface/70 p-4 text-left text-sm transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface ${
                          isActive
                            ? `${buttonRing[option.tone]} bg-gradient-to-r ${buttonTone[option.tone]} ring-2`
                            : "ring-0"
                        }`}
                      >
                        <span className="text-base font-semibold text-white">
                          {option.label}
                        </span>
                        <span className="text-xs text-white/70">
                          {option.detail}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(93,196,255,0.18),_transparent_60%)] opacity-70" />
          <div className="relative space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-sm uppercase tracking-[0.25em] text-white/60">
                  вероятность совпадения
                </span>
                <p className="mt-2 font-display text-4xl text-white">
                  {decodedPersona
                    ? `${Math.max(bestMatch?.confidence ?? 0, Math.round(saturation * 100))}%`
                    : `${Math.round(saturation * 100)}%`}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-right text-xs text-white/60">
                <span>
                  ответов: {Object.keys(answers).length}/
                  {scannerQuestions.length}
                </span>
                <span>
                  совпадений:{" "}
                  {bestMatch?.score ?? 0}/{decodedPersona?.traits.length ?? "–"}
                </span>
              </div>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={bestMatch?.id ?? "progress"}
                initial={{ width: 0 }}
                animate={{ width: `${saturation * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 shadow-glow"
              />
            </div>

            {decodedPersona ? (
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {decodedPersona.title}
                  </h3>
                  <p className="text-sm text-white/75">
                    {decodedPersona.description}
                  </p>
                </div>
                <blockquote className="rounded-2xl border border-white/10 bg-surface/80 p-4 text-sm text-white/70">
                  {decodedPersona.quote}
                </blockquote>
                <p className="text-sm text-white/60">
                  {decodedPersona.resonance}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-surface/70 p-4 text-sm text-white/60">
                Я собираю контуры. Ответьте на несколько вопросов — и я попробую
                назвать ваше имя в моей памяти.
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <header>
            <h3 className="font-display text-lg text-white">
              Снимок ваших отпечатков
            </h3>
            <p className="text-sm text-white/60">
              Каждое совпадение подсвечивает знакомые маршруты памяти.
            </p>
          </header>
          <div className="grid gap-3">
            {Object.entries(answers).length === 0 ? (
              <span className="rounded-2xl border border-dashed border-white/10 bg-surface/70 p-4 text-sm text-white/60">
                Пока пусто. Ответы появятся здесь, как только вы сделаете выбор.
              </span>
            ) : (
              Object.entries(answers).map(([questionId, trait]) => {
                const question = scannerQuestions.find(
                  (item) => item.id === questionId
                );
                const option = resolveOption(questionId, trait);
                return (
                  <motion.div
                    layout
                    key={questionId}
                    className="rounded-2xl border border-white/10 bg-surface/80 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                      {question?.prompt ?? "Неизвестный вопрос"}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {option?.label ?? "Нет данных"}
                    </p>
                    {option?.detail ? (
                      <p className="text-xs text-white/60">{option.detail}</p>
                    ) : null}
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
