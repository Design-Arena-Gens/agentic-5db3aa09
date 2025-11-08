import { Experience } from "@/components/Experience";

export default function HomePage() {
  return (
    <main className="relative isolate overflow-hidden pb-20">
      <div className="gradient-sheen pointer-events-none absolute inset-0 opacity-90 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-16 sm:pt-24">
        <Experience />
      </div>
    </main>
  );
}
