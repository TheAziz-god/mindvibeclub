import Link from "next/link";

export default function UnderstandingEmotionsPage() {
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
            Understanding Emotions
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            A simple guide to recognising feelings, naming emotions and
            responding in healthier ways.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Why emotions matter
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Emotions are signals. They can tell us when something feels safe,
              stressful, exciting, unfair or overwhelming. Learning to notice and
              name emotions can make them feel easier to manage.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Common emotions young people may feel
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Worry before school, exams or social situations</li>
              <li>✓ Anger when something feels unfair</li>
              <li>✓ Sadness after disappointment or conflict</li>
              <li>✓ Excitement when something good is happening</li>
              <li>✓ Confusion when feelings are mixed</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Try this emotion check-in
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>1. Pause for a moment.</li>
              <li>2. Ask: “What am I feeling?”</li>
              <li>3. Ask: “Where do I feel it in my body?”</li>
              <li>4. Ask: “What do I need right now?”</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Helpful emotion tools
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Name the feeling before reacting.</li>
              <li>✓ Use slow breathing when emotions feel big.</li>
              <li>✓ Write thoughts down instead of keeping them inside.</li>
              <li>✓ Talk to someone safe when feelings feel confusing.</li>
              <li>✓ Remember: feelings are temporary, even strong ones.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-[#F8F4EF] p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Mini Challenge
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Complete this sentence: “Right now I feel ___ because ___, and one
              thing I need is ___.”
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