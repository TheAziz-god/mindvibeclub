export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="mb-6 text-center text-5xl font-bold text-[#D65A7A]">
          Our Services
        </h1>

        <p className="mx-auto mb-14 max-w-3xl text-center text-lg">
          MindVibeClub provides supportive wellbeing services for young people,
          parents, schools and community groups.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {[
            [
              "1-to-1 Wellbeing Support",
              "Personalised sessions focused on confidence, emotional wellbeing, resilience and personal growth.",
            ],
            [
              "Group Wellbeing Sessions",
              "Interactive sessions where young people can learn, share, build confidence and grow together.",
            ],
            [
              "Stress & Anxiety Support",
              "Practical wellbeing strategies to help young people manage pressure, school stress and emotions.",
            ],
            [
              "Confidence & Motivation Coaching",
              "Support to help students believe in themselves, set goals and develop positive habits.",
            ],
            [
              "Parent Support & Guidance",
              "Helpful guidance for parents who want to support their child’s wellbeing journey.",
            ],
            [
              "School Partnerships",
              "Wellbeing workshops and programmes for schools, youth organisations and community groups.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-[#E8DDD3] bg-white p-8 shadow-sm"
            >
              <h2 className="mb-4 text-2xl font-bold text-[#2D6A73]">
                {title}
              </h2>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}