import Link from "next/link";

export default function OneToOneSupportPage() {
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
            1-to-1 Wellbeing Support
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Personal wellbeing and confidence support designed around the young
            person’s needs, emotions and goals.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Who is this for?
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              This is best for young people who would benefit from individual
              support with confidence, stress, motivation, emotions or personal
              growth.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              What can we focus on?
            </h2>
            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Confidence and self-belief</li>
              <li>✓ Managing stress or worry</li>
              <li>✓ Understanding emotions</li>
              <li>✓ Building positive routines</li>
              <li>✓ Motivation and goal setting</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Session Details
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Duration: <strong>50 minutes</strong>
              <br />
              Price: <strong>£40</strong>
              <br />
              Best for: <strong>Personalised support</strong>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Why choose 1-to-1 support?
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Individual sessions allow young people to explore what matters to
              them at their own pace, with support that feels calm, practical
              and personal.
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