"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ServicesPage() {
  const [openSupport, setOpenSupport] = useState<string | null>(null);

  const bookableServices = [
    {
      title: "Intro Session",
      text: "A gentle first session to understand needs, build comfort and explore the right support pathway.",
      duration: "30 minutes",
      price: "£25",
      icon: "🌿",
      href: "/services/intro-session",
    },
    {
      title: "1-to-1 Wellbeing Support",
      text: "Personalised sessions focused on confidence, emotional wellbeing, resilience and personal growth.",
      duration: "50 minutes",
      price: "£40",
      icon: "🧠",
      href: "/services/one-to-one-support",
    },
    {
      title: "Group Wellbeing Sessions",
      text: "Interactive sessions where young people can learn, share, build confidence and grow together.",
      duration: "60 minutes",
      price: "£15",
      icon: "🤝",
      href: "/services/group-sessions",
    },
  ];

  const supportAreas = [
    {
      title: "Stress & Anxiety Support",
      text: "Practical wellbeing strategies to help young people manage pressure, school stress and emotions.",
      tag: "Support Focus",
      icon: "🕊️",
      href: "/services/stress-anxiety-support",
      recommended: "Intro Session",
    },
    {
      title: "Confidence & Motivation Coaching",
      text: "Support to help students believe in themselves, set goals and develop positive habits.",
      tag: "Support Focus",
      icon: "✨",
      href: "/services/confidence-coaching",
      recommended: "1-to-1 Support",
    },
    {
      title: "Parent Support & Guidance",
      text: "Helpful guidance for parents who want to support their child’s wellbeing journey.",
      tag: "Guidance",
      icon: "💬",
      href: "/services/parent-support",
      recommended: "Contact Us",
    },
  ];

  return (
    <main className="mindvibe-bg min-h-screen text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mindvibe-frame relative mb-14 overflow-hidden px-8 py-16 text-center"
        >
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Support Options
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D] md:text-6xl">
            Our Services
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4B4B4B]">
            Supportive wellbeing services for young people, parents, schools
            and community groups — designed to feel calm, practical and safe.
          </p>
        </motion.div>

        <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
          Bookable Sessions
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {bookableServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-7 shadow-xl transition duration-300 hover:shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-4xl">{service.icon}</span>
                <span className="rounded-full bg-[#E8D8C8]/70 px-4 py-1 text-sm font-bold text-[#7A4A8D]">
                  {service.duration}
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-bold text-[#7A4A8D]">
                {service.title}
              </h3>

              <p className="mb-6 leading-7 text-[#4B4B4B]">{service.text}</p>

              <div className="flex items-center justify-between border-t border-[#E8D8C8] pt-5">
                <span className="font-bold text-[#2D6A73]">
                  {service.price}
                </span>

                <div className="flex gap-2">
                  <Link
                    href={service.href}
                    className="rounded-xl bg-[#7A4A8D] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#653A78]"
                  >
                    Details
                  </Link>

                  <Link
                    href="/book-session"
                    className="rounded-xl bg-[#2D6A73] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#245961]"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#2D6A73]">
            Support Focus Areas
          </h2>
          <p className="mt-2 max-w-2xl text-[#4B4B4B]">
            These focus areas can be explored during sessions. Click below to
            learn what each type of support can help with.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {supportAreas.map((area, index) => {
            const isOpen = openSupport === area.title;

            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-7 shadow-xl transition duration-300 hover:shadow-2xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-4xl">{area.icon}</span>
                  <span className="rounded-full bg-[#E8D8C8]/70 px-4 py-1 text-sm font-bold text-[#7A4A8D]">
                    {area.tag}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-[#7A4A8D]">
                  {area.title}
                </h3>

                <p className="mb-6 leading-7 text-[#4B4B4B]">{area.text}</p>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={area.href}
                    className="rounded-xl bg-[#7A4A8D] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#653A78]"
                  >
                    Learn More
                  </Link>

                  <button
                    type="button"
                    onClick={() => setOpenSupport(isOpen ? null : area.title)}
                    className="rounded-xl bg-[#2D6A73] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#245961]"
                  >
                    {isOpen ? "Hide Step" : "Best Next Step"}
                  </button>
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 rounded-2xl border border-[#E8D8C8] bg-white/70 p-5"
                  >
                    <p className="text-sm font-bold text-[#7A4A8D]">
                      Recommended next step:
                    </p>

                    <p className="mt-1 text-[#2D6A73]">
                      {area.recommended === "Contact Us"
                        ? "Contact us so we can guide you properly."
                        : `Book ${area.recommended}.`}
                    </p>

                    <Link
                      href={
                        area.recommended === "Contact Us"
                          ? "/contact"
                          : "/book-session"
                      }
                      className="mt-4 inline-block rounded-xl bg-[#2D6A73] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#245961]"
                    >
                      {area.recommended === "Contact Us"
                        ? "Contact Us"
                        : "Book Recommended Session"}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-[#7A4A8D] to-[#2D6A73] p-10 text-center text-white shadow-2xl"
        >
          <h2 className="mb-4 text-3xl font-bold">
            Not sure which support is right?
          </h2>

          <p className="mx-auto mb-7 max-w-2xl">
            Start with an intro session. It gives us a calm space to understand
            what support may be most helpful.
          </p>

          <Link
            href="/book-session"
            className="rounded-xl bg-white px-6 py-3 font-bold text-[#7A4A8D] transition hover:-translate-y-1 hover:shadow-xl"
          >
            Book an Intro Session
          </Link>
        </motion.div>
      </section>
    </main>
  );
}