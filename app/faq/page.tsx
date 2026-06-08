"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function FAQPage() {
  const faqs = [
    [
      "Is MindVibeClub counselling or therapy?",
      "MindVibeClub provides wellbeing support, mentoring, coaching and educational resources. We do not provide medical diagnosis, clinical treatment or emergency mental health services.",
    ],
    [
      "Who do you support?",
      "We support children and young people, including primary school pupils and students up to Year 10.",
    ],
    [
      "How do sessions work?",
      "Sessions focus on confidence, emotional wellbeing, motivation, resilience and personal growth through supportive conversations and practical strategies.",
    ],
    [
      "Do you support under-18s?",
      "Yes. Safeguarding and appropriate parental or school involvement are important parts of how we work.",
    ],
    [
      "What if someone needs urgent help?",
      "MindVibeClub is not an emergency service. If someone is in immediate danger, call 999, NHS 111, Samaritans on 116 123, or go to A&E.",
    ],
    [
      "Can parents be involved?",
      "Yes. Depending on age and circumstances, parents can be involved in supporting positive wellbeing outcomes.",
    ],
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="mindvibe-bg min-h-screen text-[#2B2B2B]">
      <section className="mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mindvibe-frame relative mb-14 overflow-hidden px-8 py-16 text-center"
        >
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Help Centre
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D] md:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4B4B4B]">
            Clear answers to common questions about sessions, wellbeing support
            and how MindVibeClub works.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-5">
          {faqs.map(([question, answer], index) => (
            <motion.div
              key={question}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 shadow-xl"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <h2 className="pr-6 text-xl font-bold text-[#2D6A73]">
                  {question}
                </h2>

                <span className="text-3xl font-light text-[#7A4A8D]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="border-t border-[#E8D8C8] px-6 py-5"
                >
                  <p className="leading-8 text-[#4B4B4B]">{answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-[#F2C9C9] bg-[#FFF5F5] p-8 shadow-lg"
        >
          <h2 className="mb-3 text-2xl font-bold text-[#D65A7A]">
            Important Notice
          </h2>

          <p className="leading-8 text-[#4B4B4B]">
            MindVibeClub is not a crisis or emergency service. If someone is at
            immediate risk of harm, call 999 or seek urgent support through NHS
            services.
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-[#7A4A8D] to-[#2D6A73] p-10 text-center text-white shadow-2xl"
        >
          <h2 className="mb-4 text-4xl font-bold">
            Still Have Questions?
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-lg">
            We're happy to help. Reach out through our contact page and we'll
            get back to you as soon as possible.
          </p>

          <a
            href="/contact"
            className="inline-block rounded-xl bg-white px-6 py-3 font-bold text-[#7A4A8D] transition hover:-translate-y-1 hover:shadow-xl"
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </main>
  );
}