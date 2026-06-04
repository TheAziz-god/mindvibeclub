"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const { error } = await supabase.from("contact_messages").insert([
      {
        full_name: fullName,
        email: email,
        message: message,
      },
    ]);

    if (error) {
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus("Message sent successfully!");
    setFullName("");
    setEmail("");
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
          Contact Us
        </motion.h1>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg">
          We’d love to hear from you. Whether you're a student, parent, school
          or organisation, feel free to get in touch.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md"
          >
            <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
              Get in Touch
            </h2>

            <div className="space-y-5">
              <p>
                <strong>Email:</strong> hello@mindvibeclub.co.uk
              </p>

              <p>
                <strong>Location:</strong> Leicester, United Kingdom
              </p>

              <p>
                <strong>Who Can Contact Us?</strong> Students, parents, schools,
                youth organisations and community partners.
              </p>

              <div className="rounded-2xl bg-[#FAF7F2]/80 p-5">
                <h3 className="mb-2 font-bold text-[#2D6A73]">
                  Important Notice
                </h3>

                <p>
                  MindVibeClub is not an emergency service. If someone is in
                  immediate danger, call 999 or go to A&E.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md"
          >
            <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />

              <textarea
                rows={6}
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />

              <button
                type="submit"
                className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Send Message
              </button>

              {status && (
                <p className="font-semibold text-[#D65A7A]">
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}