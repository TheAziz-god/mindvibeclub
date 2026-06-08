"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

type Resource = {
  title: string;
  text: string;
  category: string;
  icon: string;
  tips: string[];
  activity: string;
};

export default function ResourcesPage() {
  const resources: Resource[] = [
    {
      title: "Managing Exam Stress",
      text: "Simple strategies to stay calm, focused and organised during exam season.",
      category: "Exam Stress",
      icon: "📘",
      tips: [
        "Break revision into small 25-minute chunks.",
        "Prepare your bag, notes and timetable the night before.",
        "Use slow breathing before starting difficult tasks.",
      ],
      activity:
        "Mini challenge: Write down 3 things you can control today and 1 thing you can let go of.",
    },
    {
      title: "Building Confidence",
      text: "Practical tips to help young people grow self-belief and resilience.",
      category: "Confidence",
      icon: "🌱",
      tips: [
        "Notice one small win each day.",
        "Practise using kind words when talking to yourself.",
        "Try one small brave action each week.",
      ],
      activity:
        "Mini challenge: Write one sentence beginning with: “I am proud of myself for…”",
    },
    {
      title: "Healthy Study Habits",
      text: "Easy routines to support motivation, focus and wellbeing.",
      category: "Study Skills",
      icon: "🎯",
      tips: [
        "Keep your study space simple and distraction-free.",
        "Use a short checklist instead of a long to-do list.",
        "Take breaks before your brain feels overloaded.",
      ],
      activity: "Mini challenge: Create a 3-step study plan for tomorrow.",
    },
    {
      title: "Understanding Emotions",
      text: "A beginner-friendly guide to recognising and managing emotions.",
      category: "Wellbeing",
      icon: "🧠",
      tips: [
        "Name the feeling before reacting to it.",
        "Notice where the feeling shows up in your body.",
        "Use grounding techniques when emotions feel too big.",
      ],
      activity:
        "Mini challenge: Write: “Right now I feel ___ because ___.”",
    },
    {
      title: "Friendship & Communication",
      text: "Support for building positive relationships and communication skills.",
      category: "Relationships",
      icon: "🤝",
      tips: [
        "Use honest but kind words.",
        "Listen before replying.",
        "Notice which friendships make you feel safe and respected.",
      ],
      activity:
        "Mini challenge: Practise saying: “I feel ___ when ___, and I need ___.”",
    },
    {
      title: "Positive Daily Routines",
      text: "Small habits that can support confidence, wellbeing and balance.",
      category: "Lifestyle",
      icon: "☀️",
      tips: [
        "Start the day with one simple routine.",
        "Include movement, rest and something enjoyable.",
        "Keep routines realistic, not perfect.",
      ],
      activity:
        "Mini challenge: Choose one small habit to repeat for the next 3 days.",
    },
  ];

  const categories = [
    "All",
    "Exam Stress",
    "Confidence",
    "Wellbeing",
    "Study Skills",
    "Relationships",
    "Lifestyle",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    resources[0]
  );

  const filteredResources =
    activeCategory === "All"
      ? resources
      : resources.filter((resource) => resource.category === activeCategory);

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
            Wellbeing Library
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D] md:text-6xl">
            Resources
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4B4B4B]">
            Helpful wellbeing resources for students, parents and schools —
            designed like a calm workbook with practical tips and mini
            challenges.
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);

                const firstMatch =
                  category === "All"
                    ? resources[0]
                    : resources.find((item) => item.category === category);

                setSelectedResource(firstMatch || null);
              }}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                activeCategory === category
                  ? "border-[#7A4A8D] bg-[#7A4A8D] text-white"
                  : "border-[#7A4A8D] bg-white/70 text-[#7A4A8D] hover:bg-[#7A4A8D] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`rounded-3xl border p-7 shadow-xl transition duration-300 hover:shadow-2xl ${
                selectedResource?.title === resource.title
                  ? "border-[#7A4A8D] bg-[#FBF8F3]"
                  : "border-[#E8D8C8] bg-[#FBF8F3]/90"
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-4xl">{resource.icon}</span>

                <span className="rounded-full bg-[#E8D8C8]/70 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#7A4A8D]">
                  {resource.category}
                </span>
              </div>

              <h2 className="mb-4 text-2xl font-bold text-[#7A4A8D]">
                {resource.title}
              </h2>

              <p className="mb-6 leading-7 text-[#4B4B4B]">
                {resource.text}
              </p>

              {resource.title === "Managing Exam Stress" ? (
                <Link
                  href="/resources/managing-exam-stress"
                  className="font-bold text-[#2D6A73] transition hover:text-[#7A4A8D]"
                >
                  Read Resource →
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedResource(resource)}
                  className="font-bold text-[#2D6A73] transition hover:text-[#7A4A8D]"
                >
                  Read Resource →
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {selectedResource && (
          <motion.section
            key={selectedResource.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-2xl"
          >
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-bold uppercase tracking-[0.2em] text-[#2D8B87]">
                  Workbook Resource
                </p>

                <h2 className="mt-2 text-4xl font-bold text-[#7A4A8D]">
                  {selectedResource.icon} {selectedResource.title}
                </h2>
              </div>

              <span className="w-fit rounded-full bg-[#E8D8C8]/70 px-5 py-2 text-sm font-bold text-[#7A4A8D]">
                {selectedResource.category}
              </span>
            </div>

            <p className="mb-8 max-w-3xl leading-8 text-[#4B4B4B]">
              {selectedResource.text}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white/70 p-6">
                <h3 className="mb-4 text-2xl font-bold text-[#2D6A73]">
                  Try These Tips
                </h3>

                <ul className="space-y-3 leading-7 text-[#4B4B4B]">
                  {selectedResource.tips.map((tip) => (
                    <li key={tip}>✓ {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-[#F8F4EF] p-6">
                <h3 className="mb-4 text-2xl font-bold text-[#2D6A73]">
                  Mini Challenge
                </h3>

                <p className="leading-8 text-[#4B4B4B]">
                  {selectedResource.activity}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl bg-gradient-to-r from-[#7A4A8D] to-[#2D6A73] p-10 text-center text-white shadow-2xl"
        >
          <h2 className="mb-4 text-4xl font-bold">
            More Resources Coming Soon
          </h2>

          <p className="mx-auto max-w-2xl text-lg">
            We’re building wellbeing guides, worksheets, reflection activities
            and practical tools for young people and families.
          </p>
        </motion.div>
      </section>
    </main>
  );
}