"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    [
      "Compassion",
      "We create a warm, respectful space where young people feel listened to and understood.",
      "💜",
    ],
    [
      "Confidence",
      "We help young people recognise their strengths and believe in their ability to grow.",
      "✨",
    ],
    [
      "Resilience",
      "We support healthy coping skills so challenges feel more manageable.",
      "🌱",
    ],
    [
      "Community",
      "We believe support works best when young people, families and schools feel connected.",
      "🤝",
    ],
  ];

  const story = [
    [
      "Why We Started",
      "MindVibeClub began from a simple idea: every young person deserves someone who listens. We wanted to create a safe space where support feels friendly, practical and easy to access.",
    ],
    [
      "Who We Support",
      "We support children, young people, parents, schools and community organisations through wellbeing sessions, guidance and helpful resources.",
    ],
    [
      "How We Help",
      "We focus on confidence, emotional understanding, resilience and positive routines — helping young people feel calmer, stronger and more supported.",
    ],
  ];

  return (
    <main className="mindvibe-bg min-h-screen text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mindvibe-frame relative mb-16 overflow-hidden px-8 py-16 text-center"
        >
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Our Story
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D] md:text-6xl">
            About MindVibeClub
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-9 text-[#2D6A73]">
            Every young person deserves someone who listens.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#4B4B4B]">
            MindVibeClub was created to help young people build confidence,
            understand emotions and feel supported through calm, practical and
            friendly wellbeing support.
          </p>
        </motion.div>

        <section className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-8 shadow-xl"
          >
            <h2 className="mb-5 text-4xl font-bold text-[#2D6A73]">
              Why MindVibeClub Exists
            </h2>

            <p className="mb-5 leading-8 text-[#4B4B4B]">
              Growing up can feel overwhelming. School pressure, emotions,
              confidence, friendships and family life can all affect how a young
              person feels.
            </p>

            <p className="mb-5 leading-8 text-[#4B4B4B]">
              MindVibeClub gives young people a safe space to talk, reflect and
              learn practical wellbeing tools before things feel too heavy.
            </p>

            <p className="leading-8 text-[#4B4B4B]">
              Our approach is supportive, non-judgemental and easy to understand
              — helping young people feel heard, valued and more confident in
              themselves.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-[#7A4A8D] to-[#2D6A73] p-8 text-white shadow-2xl"
          >
            <h2 className="mb-5 text-4xl font-bold">Our Mission</h2>

            <p className="mb-6 text-lg leading-8">
              To empower young people with confidence, emotional wellbeing and
              life skills that help them feel supported and ready to thrive.
            </p>

            <div className="rounded-2xl bg-white/15 p-5">
              <p className="font-bold">We focus on:</p>
              <ul className="mt-3 space-y-2">
                <li>✓ Confidence building</li>
                <li>✓ Emotional understanding</li>
                <li>✓ Resilience and coping tools</li>
                <li>✓ Positive growth and self-belief</li>
              </ul>
            </div>
          </motion.div>
        </section>

        <section className="mt-20">
          <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
            Our Values
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-center text-[#4B4B4B]">
            These values guide every session, resource and conversation.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map(([title, text, icon], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-7 text-center shadow-xl"
              >
                <div className="mb-4 text-4xl">{icon}</div>

                <h3 className="mb-3 text-2xl font-bold text-[#7A4A8D]">
                  {title}
                </h3>

                <p className="leading-7 text-[#4B4B4B]">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-10 shadow-xl">
          <h2 className="mb-10 text-center text-4xl font-bold text-[#2D6A73]">
            Our Journey
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {story.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/70 p-6 shadow-sm"
              >
                <p className="mb-3 text-4xl font-bold text-[#7A4A8D]">
                  0{index + 1}
                </p>

                <h3 className="mb-3 text-xl font-bold text-[#2D6A73]">
                  {title}
                </h3>

                <p className="leading-7 text-[#4B4B4B]">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl bg-gradient-to-r from-[#7A4A8D] to-[#2D6A73] p-10 text-center text-white shadow-2xl"
        >
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Begin?
          </h2>

          <p className="mx-auto mb-7 max-w-2xl text-lg">
            Start with a calm intro session and take the first step towards
            confidence, resilience and support.
          </p>

          <Link
            href="/book-session"
            className="rounded-xl bg-white px-6 py-3 font-bold text-[#7A4A8D] transition hover:-translate-y-1 hover:shadow-xl"
          >
            Book a Session
          </Link>
        </motion.section>
      </section>
    </main>
  );
}