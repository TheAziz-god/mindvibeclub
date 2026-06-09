import Link from "next/link";

export default function ParentSupportPage() {
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
            Parent Support & Guidance
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Helpful guidance for parents and carers who want to support a young
            person’s confidence, wellbeing and emotional growth.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Who is this for?
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              This support is for parents or carers who want guidance around a
              child or young person’s wellbeing, confidence, stress, motivation
              or emotional needs.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              What we can help with
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Understanding possible support needs</li>
              <li>✓ Helping your child feel heard and supported</li>
              <li>✓ Encouraging positive routines and confidence</li>
              <li>✓ Knowing when extra support may be helpful</li>
              <li>✓ Working alongside school or community support</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              What guidance looks like
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Parent guidance is practical and supportive. It can help families
              understand next steps and choose the most suitable support option.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Recommended next step
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              If you are unsure where to start, contact us or book an intro
              session. This helps us understand the situation and guide you
              towards the right support.
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
            href="/contact"
            className="rounded-xl bg-[#2D6A73] px-6 py-3 text-center font-bold text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}