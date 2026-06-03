"use client";

import { motion } from "framer-motion";

export default function ResourcesPage() {
  const resources = [
    ["Managing Exam Stress", "Simple strategies to stay calm, focused and organised during exam season.", "Exam Stress"],
    ["Building Confidence", "Practical tips to help young people grow self-belief and resilience.", "Confidence"],
    ["Healthy Study Habits", "Easy routines to support motivation, focus and wellbeing.", "Study Skills"],
    ["Understanding Emotions", "A beginner-friendly guide to recognising and managing emotions.", "Wellbeing"],
    ["Friendship & Communication", "Support for building positive relationships and communication skills.", "Relationships"],
    ["Positive Daily Routines", "Small habits that can support confidence, wellbeing and balance.", "Lifestyle"],
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-5xl font-bold text-[#D65A7A]"
        >
          Resources
        </motion.h1>

        <p className="mx-auto mb-12 max-w-3xl text-center text-lg">
          Helpful wellbeing resources for students, parents and schools.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {resources.map(([title, text, category], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-7 shadow-sm"
            >
              <p className="mb-4 inline-block rounded-full bg-[#FAF7F2] px-4 py-2 text-sm font-semibold text-[#2D6A73]">
                {category}
              </p>

              <h2 className="mb-3 text-2xl font-bold text-[#D65A7A]">
                {title}
              </h2>

              <p className="mb-5">{text}</p>

              <button className="font-semibold text-[#2D6A73]">
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}