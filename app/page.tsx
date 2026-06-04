"use client";

import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D65A7A]/20 blur-3xl" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-4 font-semibold text-[#2D6A73]"
        >
          Confidence • Wellbeing • Resilience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl bg-gradient-to-r from-[#D65A7A] via-[#A78BFA] to-[#2D6A73] bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl"
        >
          Building Confidence, Wellbeing & Resilience for Young People
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-6 max-w-2xl text-lg"
        >
          Supporting children and young people through wellbeing, confidence
          building and personal growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative mt-8 flex justify-center gap-4"
        >
          <Link
            href="/book-session"
            className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Book Session
          </Link>

          <Link
            href="/about"
            className="rounded-xl border border-[#2D6A73] px-6 py-3 font-medium text-[#2D6A73] transition duration-300 hover:-translate-y-1 hover:bg-[#2D6A73] hover:text-white hover:shadow-xl"
          >
            Learn More
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md md:grid-cols-3">
          {[
            [500, "+", "Young People Supported"],
            [20, "+", "School & Community Sessions"],
            [95, "%", "Positive Feedback Goal"],
          ].map(([number, suffix, label]) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.08, rotate: 1 }}
              className="text-center"
            >
              <h2 className="text-5xl font-bold text-[#D65A7A]">
                <AnimatedCounter
                  value={number as number}
                  suffix={suffix as string}
                />
              </h2>
              <p className="mt-2 font-medium text-[#2D6A73]">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

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
            <motion.div
              key={title}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-white/30 bg-white/60 p-6 text-center shadow-xl backdrop-blur-md transition duration-300 hover:shadow-2xl"
            >
              <div className="mb-4 text-4xl">{icon}</div>
              <h3 className="mb-3 text-xl font-bold text-[#D65A7A]">
                {title}
              </h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/30 bg-white/60 p-10 shadow-xl backdrop-blur-md"
        >
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
              <div
                key={item}
                className="rounded-xl bg-[#FAF7F2]/80 p-5 font-semibold shadow-sm"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

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
            ["1-to-1 Wellbeing Support", "Personalised sessions focused on confidence, wellbeing and personal growth."],
            ["Group Wellbeing Sessions", "Interactive sessions that encourage resilience, confidence and connection."],
            ["Parent Support & Guidance", "Helpful guidance for parents supporting their child’s wellbeing journey."],
            ["School Partnerships", "Workshops and programmes for schools and youth organisations."],
          ].map(([title, text]) => (
            <motion.div
              key={title}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md transition duration-300 hover:shadow-2xl"
            >
              <h3 className="mb-3 text-2xl font-bold text-[#D65A7A]">
                {title}
              </h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
          What People Say
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center">
          Feedback from students, parents and school communities.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Student", "MindVibeClub helped me feel more confident and less worried about school."],
            ["Parent", "The support was friendly, positive and easy for my child to understand."],
            ["School Partner", "A calm, engaging and supportive approach to student wellbeing."],
          ].map(([person, quote], index) => (
            <motion.div
              key={person}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.4,
              }}
              whileHover={{ scale: 1.03 }}
              className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md transition duration-300 hover:shadow-2xl"
            >
              <p className="mb-5 text-lg">“{quote}”</p>
              <p className="font-bold text-[#D65A7A]">— {person}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-[#D65A7A] to-[#2D6A73] p-12 text-center text-white shadow-2xl"
        >
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Start Your Wellbeing Journey?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Take the next step towards confidence, resilience and personal
            growth.
          </p>

          <Link
            href="/book-session"
            className="rounded-xl bg-white px-6 py-3 font-bold text-[#D65A7A] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Book a Session
          </Link>
        </motion.div>
      </section>
    </main>
  );
}