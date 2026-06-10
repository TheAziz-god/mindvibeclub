"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 6) {
      setStatus("Password must be at least 6 characters.");
      return;
    }

    setStatus("Updating password...");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Password updated successfully. Redirecting to login...");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  }

  return (
    <main className="mindvibe-bg flex min-h-screen items-center justify-center px-6 py-20 text-[#2B2B2B]">
      <form
        onSubmit={handleUpdatePassword}
        className="w-full max-w-md rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl"
      >
        <h1 className="mb-3 text-4xl font-bold text-[#7A4A8D]">
          Reset Password
        </h1>

        <p className="mb-6 leading-7 text-[#4B4B4B]">
          Enter a new password for your MindVibeClub account.
        </p>

        <label className="mb-5 block">
          <span className="mb-2 block font-semibold text-[#2D6A73]">
            New Password
          </span>

          <input
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password"
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
          Update Password
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