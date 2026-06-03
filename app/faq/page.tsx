export default function FAQPage() {
  const faqs = [
    ["Is MindVibeClub counselling or therapy?", "MindVibeClub provides wellbeing support, mentoring, coaching and educational resources. We do not provide medical diagnosis, clinical treatment or emergency mental health services."],
    ["Who do you support?", "We support children and young people, including primary school pupils and students up to Year 10."],
    ["How do sessions work?", "Sessions focus on confidence, emotional wellbeing, motivation, resilience and personal growth."],
    ["Do you support under-18s?", "Yes. Safeguarding and appropriate parental or school involvement are important parts of how we work."],
    ["What if someone needs urgent help?", "MindVibeClub is not an emergency service. If someone is in immediate danger, call 999, NHS 111, Samaritans on 116 123, or go to A&E."],
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-6 text-center text-5xl font-bold text-[#D65A7A]">
          Frequently Asked Questions
        </h1>

        <div className="space-y-5">
          {faqs.map(([question, answer]) => (
            <div key={question} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-bold text-[#2D6A73]">{question}</h2>
              <p>{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}