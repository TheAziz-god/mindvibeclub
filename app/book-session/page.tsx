"use client";

import { motion } from "framer-motion";

export default function BookSessionPage() {
  const sessions = [
    [
      "Intro Session",
      "A short first session to understand goals, needs and next steps.",
      "30 minutes",
      "£25",
    ],
    [
      "1-to-1 Support",
      "Personal wellbeing and confidence support for young people.",
      "50 minutes",
      "£40",
    ],
    [
      "Group Session",
      "Interactive wellbeing sessions for small groups, schools or youth organisations.",
      "60 minutes",
      "From £15",
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
          Book a Session
        </motion.h1>

        <p className="mx-auto mb-12 max-w-3xl text-center text-lg">
          Choose the type of support you are interested in. Online booking and
          payment will be connected here later using Calendly, Square
          Appointments or Stripe.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {sessions.map(([title, text, duration, price], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/30 bg-white/60 p-8 text-center shadow-xl backdrop-blur-md"
            >
              <h2 className="mb-3 text-2xl font-bold text-[#2D6A73]">
                {title}
              </h2>

              <p className="mb-6">{text}</p>

              <div className="mb-6 rounded-2xl bg-[#FAF7F2]/80 p-4">
                <p className="font-semibold text-[#2D6A73]">{duration}</p>
                <p className="mt-2 text-3xl font-bold text-[#D65A7A]">
                  {price}
                </p>
              </div>

              <button className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                Book Now
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md"
        >
          <h2 className="mb-4 text-2xl font-bold text-[#2D6A73]">
            Important Notice
          </h2>

          <p>
            MindVibeClub is not an emergency or crisis service. If you are in
            immediate danger or need urgent mental health support, call 999,
            contact NHS 111, call Samaritans on 116 123, or go to A&E.
          </p>
        </motion.div>
      </section>
    </main>
  );
}