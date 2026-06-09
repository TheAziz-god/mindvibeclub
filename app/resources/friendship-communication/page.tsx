import Link from "next/link";

export default function FriendshipCommunicationPage() {
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
            Friendship & Communication
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Support for building positive friendships, clear communication and
            respectful relationships.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Why friendships matter
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Friendships can help young people feel connected and supported,
              but they can also feel confusing sometimes. Good communication can
              make relationships feel safer, kinder and more respectful.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Signs a friendship may need attention
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ You feel nervous to be yourself around someone</li>
              <li>✓ You feel left out, ignored or pressured</li>
              <li>✓ Arguments happen often without repair</li>
              <li>✓ You feel drained after spending time with them</li>
              <li>✓ You struggle to explain how you feel</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Try this communication tool
            </h2>

            <p className="mb-4 leading-8 text-[#4B4B4B]">
              Use this sentence starter when something feels difficult:
            </p>

            <p className="rounded-xl bg-[#F8F4EF] p-4 font-bold text-[#2D6A73]">
              “I feel ___ when ___, and I need ___.”
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Friendship tips
            </h2>

            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Listen before replying.</li>
              <li>✓ Use honest but kind words.</li>
              <li>✓ Notice friendships that feel safe and respectful.</li>
              <li>✓ It is okay to set boundaries.</li>
              <li>✓ Healthy friendships include repair after mistakes.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-[#F8F4EF] p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Mini Challenge
            </h2>

            <p className="leading-8 text-[#4B4B4B]">
              Think of one friendship that feels positive. Write down what makes
              it feel safe, kind or supportive.
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