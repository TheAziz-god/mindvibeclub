import Link from "next/link";

export default function HealthyStudyHabitsPage() {
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
            Healthy Study Habits
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Simple routines to help young people stay focused, motivated and
            balanced while studying.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Why study habits matter
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Good study habits make learning feel more manageable. They help
              reduce stress, improve focus and stop revision from feeling like
              one huge task.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Signs your study routine may need support
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Leaving work until the last minute</li>
              <li>✓ Feeling overwhelmed before starting</li>
              <li>✓ Getting distracted easily</li>
              <li>✓ Studying for hours without breaks</li>
              <li>✓ Not knowing what to revise first</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Try the 25-minute focus method
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>1. Choose one small task.</li>
              <li>2. Set a timer for 25 minutes.</li>
              <li>3. Work only on that task.</li>
              <li>4. Take a 5-minute break.</li>
              <li>5. Repeat if you feel ready.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Study habit tips
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Keep your study space simple.</li>
              <li>✓ Use short checklists instead of long lists.</li>
              <li>✓ Start with the easiest task to build momentum.</li>
              <li>✓ Take breaks before your brain feels overloaded.</li>
              <li>✓ End each session by planning the next small step.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-[#F8F4EF] p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Mini Challenge
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Create a simple 3-step study plan for tomorrow.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              When to ask for help
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              If studying feels impossible or stress is affecting sleep, mood or
              confidence, speak to a trusted adult, teacher or support service.
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