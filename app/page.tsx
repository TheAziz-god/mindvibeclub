import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="mb-4 font-semibold text-[#2D6A73]">
          Confidence • Wellbeing • Resilience
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-tight text-[#D65A7A] md:text-7xl">
          Building Confidence, Wellbeing & Resilience for Young People
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg">
          Supporting children and young people through wellbeing, confidence
          building and personal growth.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/book-session"
            className="rounded-lg bg-[#2D6A73] px-6 py-3 font-medium text-white"
          >
            Book Session
          </Link>

          <Link
            href="/about"
            className="rounded-lg border border-[#2D6A73] px-6 py-3 font-medium text-[#2D6A73]"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* How We Help */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#2D6A73]">
          How We Help
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["🧠", "Emotional Wellbeing", "Supporting young people in understanding and managing emotions."],
            ["🌱", "Confidence Building", "Helping students develop self-belief and resilience."],
            ["🎯", "Motivation & Growth", "Encouraging positive habits and personal development."],
            ["🤝", "Supportive Community", "Creating safe spaces where young people can grow together."],
          ].map(([icon, title, text]) => (
            <div key={title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="mb-4 text-4xl">{icon}</div>
              <h3 className="mb-3 text-xl font-bold">{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h2 className="mb-8 text-center text-4xl font-bold text-[#2D6A73]">
            Why Choose MindVibeClub?
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Youth-focused wellbeing support",
              "Friendly and non-clinical approach",
              "Resources for students, parents and schools",
              "Clear safeguarding and crisis guidance",
            ].map((item) => (
              <div key={item} className="rounded-xl bg-[#FAF7F2] p-5 font-semibold">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
          Our Services
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center">
          Simple, supportive wellbeing services for young people, parents and schools.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            ["1-to-1 Wellbeing Support", "Personalised sessions focused on confidence, wellbeing and personal growth."],
            ["Group Wellbeing Sessions", "Interactive sessions that encourage resilience, confidence and connection."],
            ["Parent Support & Guidance", "Helpful guidance for parents supporting their child’s wellbeing journey."],
            ["School Partnerships", "Workshops and programmes for schools and youth organisations."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-[#E8DDD3] bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-2xl font-bold text-[#D65A7A]">{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}