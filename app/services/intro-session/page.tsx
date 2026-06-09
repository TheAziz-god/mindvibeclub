import Link from "next/link";

export default function IntroSessionPage() {
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
            Intro Session
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            A gentle first session to understand needs, build comfort and
            explore the right support pathway.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Who is this for?
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              This session is ideal for young people, parents or carers who are
              unsure where to start. It gives us a calm space to understand what
              support may be most helpful.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              What happens in the session?
            </h2>
            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ A gentle conversation about current needs</li>
              <li>✓ Space to discuss worries, goals or support areas</li>
              <li>✓ Guidance on which session type may be best</li>
              <li>✓ No pressure, judgement or clinical language</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Session Details
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Duration: <strong>30 minutes</strong>
              <br />
              Price: <strong>£25</strong>
              <br />
              Best for: <strong>First-time support</strong>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Why start here?
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Sometimes the hardest part is knowing where to begin. The intro
              session helps make the next step clearer and less overwhelming.
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
            Book Intro Session
          </Link>
        </div>
      </section>
    </main>
  );
}