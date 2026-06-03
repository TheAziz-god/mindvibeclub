"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
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
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md"
          >
            <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#D65A7A]">Email</h3>
                <p>hello@mindvibeclub.co.uk</p>
              </div>

              <div>
                <h3 className="font-bold text-[#D65A7A]">Location</h3>
                <p>Leicester, United Kingdom</p>
              </div>

              <div>
                <h3 className="font-bold text-[#D65A7A]">Who Can Contact Us?</h3>
                <p>
                  Students, parents, schools, youth organisations and community
                  partners.
                </p>
              </div>

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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md"
          >
            <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
              Send a Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Message</label>
                <textarea
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}