export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="mb-10 text-center text-5xl font-bold text-[#D65A7A]">
          About MindVibeClub
        </h1>

        <p className="mx-auto mb-16 max-w-3xl text-center text-lg">
          MindVibeClub was created to help young people build confidence,
          resilience and positive wellbeing through support, education and
          community.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#2D6A73]">
              Our Mission
            </h2>
            <p>
              To empower young people with the confidence, wellbeing and life
              skills needed to thrive.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#2D6A73]">
              Our Vision
            </h2>
            <p>
              A future where every young person has access to positive support
              and opportunities for personal growth.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#2D6A73]">
              Our Values
            </h2>
            <p>Respect, confidence, wellbeing, resilience and community.</p>
          </div>
        </div>
      </section>
    </main>
  );
}