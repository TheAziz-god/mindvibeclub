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
        email,
        message,
      },
    ]);

    if (error) {
      setStatus(error.message);
      return;
    }

    const emailResponse = await fetch("/api/send-contact-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        message,
      }),
    });

    if (!emailResponse.ok) {
      setStatus(
        "Message saved, but email notification failed. Check Resend setup."
      );
      return;
    }

    setStatus("Message sent successfully!");
    setFullName("");
    setEmail("");
    setMessage("");
  }

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
            Get In Touch
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D] md:text-6xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4B4B4B]">
            We’d love to hear from you. Whether you're a student, parent,
            school or organisation, feel free to get in touch.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-8 shadow-xl"
          >
            <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
              Get in Touch
            </h2>

            <div className="space-y-5 leading-8 text-[#4B4B4B]">
              <p>
                <strong className="text-[#7A4A8D]">Email:</strong>{" "}
                hello@mindvibeclub.co.uk
              </p>

              <p>
                <strong className="text-[#7A4A8D]">Location:</strong>{" "}
                Leicester, United Kingdom
              </p>

              <p>
                <strong className="text-[#7A4A8D]">Who Can Contact Us?</strong>{" "}
                Students, parents, schools, youth organisations and community
                partners.
              </p>

              <div className="rounded-2xl border border-[#F2C9C9] bg-[#FFF5F5] p-5">
                <h3 className="mb-2 font-bold text-[#D65A7A]">
                  Important Notice
                </h3>

                <p>
                  MindVibeClub is not an emergency service. If someone is in
                  immediate danger, call 999 or go to A&E.
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 p-5">
                <h3 className="mb-2 font-bold text-[#2D6A73]">
                  Response Time
                </h3>

                <p>
                  We aim to respond as soon as possible during normal working
                  hours.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/90 p-8 shadow-xl"
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
                className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
              />

              <textarea
                rows={6}
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
              />

              <button
                type="submit"
                className="rounded-xl bg-[#2D6A73] px-6 py-3 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#245961] hover:shadow-xl"
              >
                Send Message
              </button>

              {status && (
                <p className="rounded-xl bg-white/70 p-3 font-semibold text-[#7A4A8D]">
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