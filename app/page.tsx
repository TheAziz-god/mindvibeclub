import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Image
          src="/logo.png"
          alt="MindVibeClub Logo"
          width={220}
          height={110}
          priority
        />

        <div className="flex gap-8 text-sm font-medium">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Resources</a>
          <a href="#">Contact</a>
        </div>
      </nav>

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
          <button className="rounded-lg bg-[#2D6A73] px-6 py-3 font-medium text-white">
            Book Session
          </button>
          <button className="rounded-lg border border-[#2D6A73] px-6 py-3 font-medium text-[#2D6A73]">
            Learn More
          </button>
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
            <div
              key={title}
              className="rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <div className="mb-4 text-4xl">{icon}</div>
              <h3 className="mb-3 text-xl font-bold">{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
          Our Services
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center">
          Simple, supportive wellbeing services for young people, parents and
          schools.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            ["1-to-1 Wellbeing Support", "Personalised sessions focused on confidence, wellbeing, emotional awareness and personal growth."],
            ["Group Wellbeing Sessions", "Interactive group sessions that encourage resilience, communication, confidence and connection."],
            ["Parent Support & Guidance", "Helpful guidance and resources for parents supporting their child's wellbeing journey."],
            ["School Partnerships", "Workshops and wellbeing programmes for schools, youth groups and educational organisations."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-[#E8DDD3] bg-white p-8 shadow-sm"
            >
              <h3 className="mb-3 text-2xl font-bold text-[#D65A7A]">
                {title}
              </h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Resources */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
          Featured Resources
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center">
          Helpful wellbeing guides for students, parents and schools.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Managing Exam Stress", "Simple tips to stay calm, organised and confident during exam season."],
            ["Building Confidence", "Practical steps to help young people grow self-belief and resilience."],
            ["Healthy Study Habits", "Easy routines to support focus, motivation and wellbeing."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl bg-white p-7 shadow-sm">
              <p className="mb-4 text-3xl">📘</p>
              <h3 className="mb-3 text-xl font-bold text-[#D65A7A]">
                {title}
              </h3>
              <p className="mb-5">{text}</p>
              <button className="font-semibold text-[#2D6A73]">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
          What People Say
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center">
          Feedback from young people, parents and school communities.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              "Student",
              "MindVibeClub helped me feel more confident and less worried about school.",
            ],
            [
              "Parent",
              "The support was friendly, positive and easy for my child to understand.",
            ],
            [
              "School Partner",
              "A calm, engaging and supportive approach to student wellbeing.",
            ],
          ].map(([person, quote]) => (
            <div
              key={person}
              className="rounded-2xl bg-white p-7 shadow-sm"
            >
              <p className="mb-5 text-lg">“{quote}”</p>
              <p className="font-bold text-[#D65A7A]">— {person}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-[#D65A7A] px-8 py-14 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Support Your Wellbeing Journey?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Start with a friendly wellbeing session and take the next step
            towards confidence, resilience and personal growth.
          </p>

          <button className="rounded-lg bg-white px-6 py-3 font-bold text-[#D65A7A]">
            Book a Session
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-[#2D6A73] px-6 py-10 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-2xl font-bold">MindVibeClub</h3>
            <p>
              Supporting young people with confidence, wellbeing and resilience.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-bold">Quick Links</h4>
            <p>Home</p>
            <p>About</p>
            <p>Services</p>
            <p>Resources</p>
            <p>Contact</p>
          </div>

          <div>
            <h4 className="mb-3 font-bold">Important</h4>
            <p>Privacy Policy</p>
            <p>Safeguarding Policy</p>
            <p>Terms & Conditions</p>
            <p>MindVibeClub is not an emergency service.</p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm">
          © 2026 MindVibeClub. All rights reserved.
        </p>
      </footer>
    </main>
  );
}