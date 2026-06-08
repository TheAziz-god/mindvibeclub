import Link from "next/link";

export default function ManagingExamStressPage() {
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
            Managing Exam Stress
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Simple strategies to help young people feel calmer, more prepared
            and more in control during exam season.
          </p>
        </div>

        <article className="space-y-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              What is exam stress?
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Exam stress is the pressure or worry someone may feel before or
              during tests. A little pressure can help us focus, but too much
              can make it harder to think clearly, sleep well or feel confident.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Signs of stress
            </h2>
            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Feeling worried, overwhelmed or tearful</li>
              <li>✓ Trouble sleeping or switching off</li>
              <li>✓ Headaches, stomach aches or feeling tense</li>
              <li>✓ Finding it hard to concentrate</li>
              <li>✓ Avoiding revision or feeling stuck</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white/70 p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Try this calming exercise
            </h2>
            <p className="mb-4 leading-8 text-[#4B4B4B]">
              Use this before revision or before an exam:
            </p>
            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>1. Breathe in slowly for 4 seconds.</li>
              <li>2. Hold for 2 seconds.</li>
              <li>3. Breathe out slowly for 6 seconds.</li>
              <li>4. Repeat 4 times.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              Study planning tips
            </h2>
            <ul className="space-y-3 leading-8 text-[#4B4B4B]">
              <li>✓ Break revision into small 25-minute blocks.</li>
              <li>✓ Start with one topic instead of everything at once.</li>
              <li>✓ Use short breaks to reset your brain.</li>
              <li>✓ Prepare your bag and equipment the night before.</li>
              <li>✓ Ask for help if a topic feels confusing.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-[#F8F4EF] p-6">
            <h2 className="mb-3 text-3xl font-bold text-[#7A4A8D]">
              Mini Challenge
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              Write down 3 things you can control today and 1 thing you can let
              go of.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold text-[#2D6A73]">
              When to ask for help
            </h2>
            <p className="leading-8 text-[#4B4B4B]">
              If exam stress feels too heavy, talk to a trusted adult, teacher,
              parent, carer or support service. You do not have to manage it
              alone.
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