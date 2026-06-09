import Link from "next/link";

export default function PositiveDailyRoutinesPage() {
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
            Positive Daily Routines
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Small daily habits that support confidence, wellbeing, balance and
            emotional regulation.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Why routines help
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Routines can help young people feel more settled and in control.
              They do not need to be perfect. Even small habits can make the day
              feel calmer and easier to manage.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Signs your routine may need support
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Feeling rushed or overwhelmed most mornings</li>
              <li>✓ Finding it hard to wind down at night</li>
              <li>✓ Forgetting meals, breaks or rest</li>
              <li>✓ Spending too much time scrolling</li>
              <li>✓ Feeling like the day has no structure</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Try a simple 3-part routine
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>1. Morning: one small action to start calmly.</li>
              <li>2. Afternoon: one break or reset moment.</li>
              <li>3. Evening: one thing that helps you switch off.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Routine-building tips
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Start with one habit, not ten.</li>
              <li>✓ Keep routines realistic and flexible.</li>
              <li>✓ Add rest, movement and something enjoyable.</li>
              <li>✓ Use reminders if they help.</li>
              <li>✓ Celebrate consistency, not perfection.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-[#F8F4EF] p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Mini Challenge
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Choose one small habit to repeat for the next 3 days. Keep it
              simple enough that you can actually do it.
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