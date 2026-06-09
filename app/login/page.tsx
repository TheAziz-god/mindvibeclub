"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ADMIN_EMAIL = "azizkhan69512@gmail.com";
const REDIRECT_URL = "https://mindvibeclub.vercel.app";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Signing you in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    if (data.user?.email === ADMIN_EMAIL) {
      router.push("/admin");
      return;
    }

    router.push("/dashboard");
  }

  async function handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: REDIRECT_URL,
      },
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus(
      "Account created. Please check your email and click the confirmation link to verify your account."
    );
  }

  return (
    <main className="mindvibe-bg flex min-h-screen items-center justify-center px-6 py-20 text-[#2B2B2B]">
      <section className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
        <div className="mindvibe-frame relative overflow-hidden px-8 py-14">
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Welcome
          </p>

          <h1 className="mb-6 text-5xl font-bold text-[#7A4A8D]">
            Your MindVibeClub Space
          </h1>

          <p className="mb-6 leading-8 text-[#4B4B4B]">
            Sign in to manage your bookings, view session details and access
            support resources. You can also continue as a guest and book without
            creating an account.
          </p>

          <div className="rounded-2xl bg-white/70 p-5">
            <h2 className="mb-2 font-bold text-[#2D6A73]">
              Guest booking is still available
            </h2>
            <p className="text-sm leading-6 text-[#4B4B4B]">
              You do not need an account to book a session. Creating an account
              will be useful for viewing booking history and support resources.
            </p>
          </div>

          <Link
            href="/book-session"
            className="mt-6 inline-block rounded-xl bg-[#2D6A73] px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#245961]"
          >
            Continue as Guest
          </Link>
        </div>

        <div className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <div className="mb-6 flex rounded-2xl bg-white/70 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setStatus("");
              }}
              className={`w-1/2 rounded-xl px-4 py-3 font-bold transition ${
                mode === "login"
                  ? "bg-[#7A4A8D] text-white"
                  : "text-[#7A4A8D]"
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setStatus("");
              }}
              className={`w-1/2 rounded-xl px-4 py-3 font-bold transition ${
                mode === "signup"
                  ? "bg-[#7A4A8D] text-white"
                  : "text-[#7A4A8D]"
              }`}
            >
              Create Account
            </button>
          </div>

          {mode === "login" && (
            <form onSubmit={handleLogin}>
              <h2 className="mb-2 text-3xl font-bold text-[#2D6A73]">
                Sign In
              </h2>

              <p className="mb-6 text-sm leading-6 text-[#4B4B4B]">
                Use your email and password to access your account.
              </p>

              <label className="mb-4 block">
                <span className="mb-2 block font-semibold text-[#2D6A73]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
                />
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block font-semibold text-[#2D6A73]">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#2D6A73] py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#245961] hover:shadow-xl"
              >
                Sign In
              </button>
            </form>
          )}

          {mode === "signup" && (
            <form onSubmit={handleCreateAccount}>
              <h2 className="mb-2 text-3xl font-bold text-[#2D6A73]">
                Create Account
              </h2>

              <p className="mb-6 text-sm leading-6 text-[#4B4B4B]">
                Create your account. We’ll send a confirmation link to your
                email.
              </p>

              <label className="mb-4 block">
                <span className="mb-2 block font-semibold text-[#2D6A73]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
                />
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block font-semibold text-[#2D6A73]">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-[#E8D8C8] bg-white/80 p-3 outline-none focus:border-[#7A4A8D]"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#2D6A73] py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#245961] hover:shadow-xl"
              >
                Create Account
              </button>
            </form>
          )}

          {status && (
            <p className="mt-5 rounded-xl bg-white/70 p-3 text-center font-semibold text-[#7A4A8D]">
              {status}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}