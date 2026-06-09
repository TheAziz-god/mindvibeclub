import Link from "next/link";

export default function BuildingConfidencePage() {
  return (
    <main className="mindvibe-bg min-h-screen text-[#2B2B2B]">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mindvibe-frame relative mb-12 overflow-hidden px-8 py-14 text-center">
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Wellbeing Resource
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D]">
            Building Confidence
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Practical steps to help young people grow self-belief, resilience
            and a kinder inner voice.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              What is confidence?
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Confidence means believing that you can try, learn and grow — even
              when something feels difficult. It does not mean feeling perfect
              all the time. Confidence grows through small steps, practice and
              encouragement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Signs confidence may be low
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Avoiding new challenges</li>
              <li>✓ Saying “I can’t” before trying</li>
              <li>✓ Comparing yourself to others</li>
              <li>✓ Feeling nervous about speaking up</li>
              <li>✓ Only noticing mistakes instead of progress</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Try this confidence exercise
            </h2>

            <p className="mb-4 leading-8 text-[#4B4B4B]">
              At the end of each day, write down:
            </p>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>1. One thing you tried.</li>
              <li>2. One thing you handled well.</li>
              <li>3. One thing you are learning.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Confidence-building tips
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Start with small goals.</li>
              <li>✓ Celebrate effort, not just results.</li>
              <li>✓ Replace “I can’t” with “I’m learning.”</li>
              <li>✓ Spend time with people who encourage you.</li>
              <li>✓ Remember that confidence grows through practice.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-[#F8F4EF] p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Mini Challenge
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Write one sentence beginning with: “I am proud of myself for…”
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              When to ask for support
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              If low confidence is stopping you from joining in, speaking up or
              trying things you care about, it can help to talk to a trusted
              adult, teacher, parent or wellbeing support service.
            </p>
          </section>
        </article>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/resources"
            className="rounded-xl bg-[#7A4A8D] px-6 py-3 text-center font-bold text-white"
          >
            Back to Resources
          </Link>

          <Link
            href="/book-session"
            className="rounded-xl bg-[#2D6A73] px-6 py-3 text-center font-bold text-white"
          >
            Book Support
          </Link>
        </div>
      </section>
    </main>
  );
}