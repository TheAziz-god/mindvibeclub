import Link from "next/link";

export default function StressAnxietySupportPage() {
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
            Stress & Anxiety Support
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Practical wellbeing support to help young people understand,
            manage and respond to stress and anxiety in healthier ways.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Who is this for?
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Young people who feel overwhelmed, worried, under pressure or
              struggle with school stress, exam stress, social situations or
              everyday challenges.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Areas we can explore
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Understanding stress triggers</li>
              <li>✓ Managing anxious thoughts</li>
              <li>✓ Building calming routines</li>
              <li>✓ Confidence in difficult situations</li>
              <li>✓ Healthy coping strategies</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              What support looks like
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Sessions focus on practical wellbeing tools, emotional awareness
              and confidence-building strategies that can be used both in and
              outside of sessions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Important Information
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              MindVibeClub provides wellbeing support and mentoring. We do not
              provide clinical therapy, diagnosis or emergency mental health
              services.
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
            Book Support
          </Link>
        </div>
      </section>
    </main>
  );
}