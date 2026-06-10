"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

const REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/reset-password"
    : "https://mindvibeclub.vercel.app/reset-password";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending password reset link...");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: REDIRECT_URL,
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Password reset link sent. Please check your email.");
  }

  return (
    <main className="mindvibe-bg flex min-h-screen items-center justify-center px-6 py-20 text-[#2B2B2B]">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl"
      >
        <h1 className="mb-3 text-4xl font-bold text-[#7A4A8D]">
          Forgot Password?
        </h1>

        <p className="mb-6 leading-7 text-[#4B4B4B]">
          Enter your email address and we’ll send you a secure password reset
          link.
        </p>

        <label className="mb-5 block">
          <span className="mb-2 block font-semibold text-[#2D6A73]">
            Email
          </span>

          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#2D6A73] py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#245961] hover:shadow-xl"
        >
          Send Reset Link
        </button>

        {status && (
          <p className="mt-5 rounded-xl bg-white/70 p-3 text-center font-semibold text-[#7A4A8D]">
            {status}
          </p>
        )}

        <Link
          href="/login"
          className="mt-6 block text-center font-bold text-[#2D6A73] hover:text-[#7A4A8D]"
        >
          Back to Login
        </Link>
      </form>
    </main>
  );
}