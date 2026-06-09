import Link from "next/link";

export default function ConfidenceCoachingPage() {
  return (
    <main className="mindvibe-bg min-h-screen text-[#2B2B2B]">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mindvibe-frame relative mb-12 overflow-hidden px-8 py-14 text-center">
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Service Detail
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D]">
            Confidence & Motivation Coaching
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Support to help young people believe in themselves, set goals and
            build positive habits.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Who is this for?
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              This support is for young people who struggle with self-belief,
              motivation, fear of failure, confidence in school or taking small
              positive steps forward.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Areas we can build
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Self-belief and confidence</li>
              <li>✓ Motivation and goal setting</li>
              <li>✓ Positive self-talk</li>
              <li>✓ Resilience after setbacks</li>
              <li>✓ Small habits that support progress</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              What support looks like
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Sessions use encouraging conversations, reflection activities and
              practical goal-setting tools to help young people see their
              strengths and build momentum.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Recommended next step
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              A 1-to-1 wellbeing support session is usually the best option for
              confidence and motivation work because it gives space for personal
              goals and individual support.
            </p>
          </section>
        </article>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/services"
            className="rounded-xl bg-[#7A4A8D] px-6 py-3 text-center font-bold text-white"
          >
            Back to Services
          </Link>

          <Link
            href="/book-session"
            className="rounded-xl bg-[#2D6A73] px-6 py-3 text-center font-bold text-white"
          >
            Book 1-to-1 Support
          </Link>
        </div>
      </section>
    </main>
  );
}