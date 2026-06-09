import Link from "next/link";

export default function GroupSessionsPage() {
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
            Group Wellbeing Sessions
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Interactive wellbeing sessions that help young people learn, share,
            build confidence and grow together.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Who is this for?
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Group sessions are ideal for schools, youth organisations,
              community groups or small groups of young people who would benefit
              from shared wellbeing activities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              What happens in group sessions?
            </h2>
            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Confidence-building activities</li>
              <li>✓ Wellbeing discussions in a safe space</li>
              <li>✓ Emotional awareness exercises</li>
              <li>✓ Practical tools for stress and motivation</li>
              <li>✓ Positive communication and teamwork</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Session Details
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Duration: <strong>60 minutes</strong>
              <br />
              Price: <strong>£15</strong>
              <br />
              Best for: <strong>Groups, schools and community settings</strong>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Why choose group support?
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Group sessions help young people realise they are not alone. They
              can learn from each other, practise communication and build
              confidence in a supportive environment.
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
            Book Group Session
          </Link>
        </div>
      </section>
    </main>
  );
}