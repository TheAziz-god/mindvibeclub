"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function BookSessionPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionType, setSessionType] = useState("Intro Session");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending booking request...");

    const { error } = await supabase.from("bookings").insert([
      {
        full_name: fullName,
        email: email,
        phone: phone,
        session_type: sessionType,
        preferred_date: preferredDate,
        message: message,
      },
    ]);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Booking request sent successfully!");
    setFullName("");
    setEmail("");
    setPhone("");
    setSessionType("Intro Session");
    setPreferredDate("");
    setMessage("");
  }

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
          Choose the type of support you are interested in. Online payment can
          be connected later using Stripe, Calendly or Square Appointments.
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

              <button
                type="button"
                onClick={() => setSessionType(title)}
                className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Select
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
          <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
            Booking Request Form
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            />

            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            />

            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            />

            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A] md:col-span-2"
            >
              <option>Intro Session</option>
              <option>1-to-1 Support</option>
              <option>Group Session</option>
            </select>

            <textarea
              rows={5}
              placeholder="Tell us what support you are looking for"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A] md:col-span-2"
            />

            <button
              type="submit"
              className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl md:col-span-2"
            >
              Send Booking Request
            </button>

            {status && (
              <p className="font-semibold text-[#D65A7A] md:col-span-2">
                {status}
              </p>
            )}
          </form>
        </motion.div>

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