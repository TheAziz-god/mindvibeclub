"use client";

import { motion } from "framer-motion";

export default function SafeguardingPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-5xl font-bold text-[#D65A7A]"
        >
          Safeguarding Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md"
        >
          <p>
            MindVibeClub is committed to creating a safe, respectful and
            supportive environment for children and young people.
          </p>

          <h2 className="text-2xl font-bold text-[#2D6A73]">
            Our Commitment
          </h2>
          <p>
            We take safeguarding seriously and aim to protect young people from
            harm, abuse, neglect and unsafe situations.
          </p>

          <h2 className="text-2xl font-bold text-[#2D6A73]">Concerns</h2>
          <p>
            If a safeguarding concern is raised, appropriate action will be
            taken in line with safeguarding responsibilities.
          </p>

          <h2 className="text-2xl font-bold text-[#2D6A73]">
            Emergency Support
          </h2>
          <p>
            MindVibeClub is not an emergency service. If someone is in immediate
            danger, call 999, NHS 111, Samaritans on 116 123, or go to A&E.
          </p>
        </motion.div>
      </section>
    </main>
  );
}