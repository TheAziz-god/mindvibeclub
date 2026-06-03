export default function BookSessionPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="mb-6 text-center text-5xl font-bold text-[#D65A7A]">
          Book a Session
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-center text-lg">
          Choose the type of support you are interested in. Online booking and
          payment will be added here later using Calendly, Square Appointments
          or Stripe.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Intro Session", "A short first session to understand your goals.", "£25"],
            ["1-to-1 Support", "Personal wellbeing and confidence support.", "£40"],
            ["Group Session", "Interactive wellbeing sessions for small groups.", "From £15"],
          ].map(([title, text, price]) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <h2 className="mb-3 text-2xl font-bold text-[#2D6A73]">
                {title}
              </h2>

              <p className="mb-6">{text}</p>

              <p className="mb-6 text-3xl font-bold text-[#D65A7A]">
                {price}
              </p>

              <button className="rounded-lg bg-[#2D6A73] px-6 py-3 text-white">
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-[#2D6A73]">
            Important Notice
          </h2>

          <p>
            MindVibeClub is not an emergency or crisis service. If you are in
            immediate danger or need urgent mental health support, call 999,
            contact NHS 111, call Samaritans on 116 123, or go to A&E.
          </p>
        </div>
      </section>
    </main>
  );
}