"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const cards = [
    [
      "Our Mission",
      "To empower young people with confidence, wellbeing and life skills needed to thrive.",
      "🎯",
    ],
    [
      "Our Vision",
      "A future where every young person has access to positive support and personal growth.",
      "🌱",
    ],
    [
      "Our Values",
      "Respect, confidence, wellbeing, resilience and community.",
      "🤝",
    ],
  ];

  const timeline = [
    [
      "Why We Started",
      "MindVibeClub was created to give young people a safe, friendly and positive space to grow.",
    ],
    [
      "Who We Support",
      "We support children, young people, parents, schools and community organisations.",
    ],
    [
      "How We Help",
      "Through wellbeing sessions, confidence building, resources and supportive guidance.",
    ],
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-5xl font-bold text-[#D65A7A]"
        >
          About MindVibeClub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-16 max-w-3xl text-center text-lg"
        >
          MindVibeClub was created to help young people build confidence,
          resilience and positive wellbeing through support, education and
          community.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map(([title, text, icon], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/30 bg-white/60 p-8 text-center shadow-xl backdrop-blur-md"
            >
              <div className="mb-4 text-4xl">{icon}</div>

              <h2 className="mb-4 text-2xl font-bold text-[#2D6A73]">
                {title}
              </h2>

              <p>{text}</p>
            </motion.div>
          ))}
        </div>

        <section className="mt-20 rounded-3xl border border-white/30 bg-white/60 p-10 shadow-xl backdrop-blur-md">
          <h2 className="mb-10 text-center text-4xl font-bold text-[#2D6A73]">
            Our Story
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {timeline.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#FAF7F2]/80 p-6 shadow-sm"
              >
                <p className="mb-3 text-3xl font-bold text-[#D65A7A]">
                  0{index + 1}
                </p>

                <h3 className="mb-3 text-xl font-bold text-[#2D6A73]">
                  {title}
                </h3>

                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}