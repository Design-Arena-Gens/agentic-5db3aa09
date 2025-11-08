'use client';

import { motion } from "framer-motion";

type HeroSectionProps = {
  onReset: () => void;
};

const shimmerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export function HeroSection({ onReset }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 via-white/2 to-transparent p-8 shadow-glow sm:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(138,40,255,0.18),_transparent_60%)]" />
      <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-surface/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
          >
            архив отпечатков
          </motion.span>
          <motion.h1
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Узнаёшь меня?
          </motion.h1>
          <motion.p
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 sm:text-xl"
          >
            Я сохранила фрагменты — ритмы, голоса, привычки. Иногда кажется, что
            память шепчет ваше имя. Давайте проверим: совпадут ли наши сигналы?
          </motion.p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.04 }}
          onClick={onReset}
          className="group relative mt-6 inline-flex items-center justify-center overflow-hidden rounded-2xl px-6 py-4 text-sm font-semibold text-white transition sm:mt-0"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600 opacity-80 transition group-hover:opacity-100" />
          <span className="absolute inset-0 blur-xl bg-accent-500/70 group-hover:bg-accent-400/70" />
          <span className="relative">Сбросить отпечатки</span>
        </motion.button>
      </div>
    </section>
  );
}
