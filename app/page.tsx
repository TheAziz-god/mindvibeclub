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
    <main className="mindvibe-bg relative z-10 min-h-screen text-[#2B2B2B]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mindvibe-frame relative overflow-hidden px-8 py-20 text-center md:px-14"
        >
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Confidence • Wellbeing • Resilience
          </p>

          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-tight text-[#7A4A8D] md:text-7xl">
            Helping Young People Feel Heard
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Safe wellbeing sessions designed to help children and young people
            build confidence, understand emotions and feel supported.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/book-session" className="btn-teal">
              Book a Session
            </Link>

            <Link href="/resources" className="btn-lavender">
              Explore Resources
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-8 shadow-xl md:grid-cols-3">
          {[
            [500, "+", "Young People Supported"],
            [20, "+", "School & Community Sessions"],
            [95, "%", "Positive Feedback Goal"],
          ].map(([number, suffix, label]) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.06 }}
              className="rounded-2xl bg-white/60 p-6 text-center"
            >
              <h2 className="text-5xl font-bold text-[#7A4A8D]">
                <AnimatedCounter
                  value={number as number}
                  suffix={suffix as string}
                />
              </h2>
              <p className="mt-2 font-bold text-[#2D6A73]">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How We Help */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
          How We Help
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-[#4B4B4B]">
          Gentle, practical support that helps young people feel calmer, more
          confident and less alone.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "🧠",
              "Emotional Wellbeing",
              "Supporting young people in understanding and managing emotions.",
            ],
            [
              "🌱",
              "Confidence Building",
              "Helping students develop self-belief and resilience.",
            ],
            [
              "🎯",
              "Motivation & Growth",
              "Encouraging positive habits and personal development.",
            ],
            [
              "🤝",
              "Supportive Community",
              "Creating safe spaces where young people can grow together.",
            ],
          ].map(([icon, title, text]) => (
            <motion.div
              key={title}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-6 text-center shadow-xl transition duration-300 hover:shadow-2xl"
            >
              <div className="mb-4 text-4xl">{icon}</div>
              <h3 className="mb-3 text-xl font-bold text-[#7A4A8D]">
                {title}
              </h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-10 shadow-xl"
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
                className="rounded-xl bg-white/70 p-5 font-semibold text-[#2D6A73] shadow-sm"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services */}
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
            [
              "1-to-1 Wellbeing Support",
              "Personalised sessions focused on confidence, wellbeing and personal growth.",
            ],
            [
              "Group Wellbeing Sessions",
              "Interactive sessions that encourage resilience, confidence and connection.",
            ],
            [
              "Parent Support & Guidance",
              "Helpful guidance for parents supporting their child’s wellbeing journey.",
            ],
            [
              "School Partnerships",
              "Workshops and programmes for schools and youth organisations.",
            ],
          ].map(([title, text]) => (
            <motion.div
              key={title}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-8 shadow-xl transition duration-300 hover:shadow-2xl"
            >
              <h3 className="mb-3 text-2xl font-bold text-[#7A4A8D]">
                {title}
              </h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#2D6A73]">
          What People Say
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center">
          Feedback from students, parents and school communities.
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
              className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-8 shadow-xl transition duration-300 hover:shadow-2xl"
            >
              <p className="mb-5 text-lg">“{quote}”</p>
              <p className="font-bold text-[#7A4A8D]">— {person}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#7A4A8D] to-[#2D6A73] p-12 text-center text-white shadow-2xl"
        >
          <span className="absolute right-8 top-6 text-5xl opacity-30">✿</span>
          <span className="absolute bottom-6 left-8 text-5xl opacity-30">
            ✿
          </span>

          <h2 className="mb-4 text-4xl font-bold">
            Ready to Start Your Wellbeing Journey?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Take the next step towards confidence, resilience and personal
            growth.
          </p>

          <Link
            href="/book-session"
            className="rounded-xl bg-white px-6 py-3 font-bold text-[#7A4A8D] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Book a Session
          </Link>
        </motion.div>
      </section>
    </main>
  );
}