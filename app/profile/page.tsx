"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProfileUser = {
  email: string;
  created_at: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      setUser({
        email: data.user.email || "",
        created_at: data.user.created_at,
      });

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <main className="mindvibe-bg min-h-screen text-[#2B2B2B]">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mindvibe-frame relative mb-12 overflow-hidden px-8 py-14 text-center">
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Account
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D]">
            My Profile
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            Manage your MindVibeClub account details and access your customer
            space.
          </p>
        </div>

        {loading && (
          <div className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 text-center shadow-xl">
            Loading profile...
          </div>
        )}

        {!loading && user && (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 text-center shadow-xl">
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#7A4A8D] text-4xl font-bold text-white">
                {user.email.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-2xl font-bold text-[#7A4A8D]">
                Customer Account
              </h2>

              <p className="mt-2 break-words text-[#4B4B4B]">{user.email}</p>
            </div>

            <div className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl md:col-span-2">
              <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
                Account Details
              </h2>

              <div className="space-y-5">
                <div className="rounded-2xl bg-white/70 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2D8B87]">
                    Email
                  </p>
                  <p className="mt-2 font-semibold text-[#4B4B4B]">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2D8B87]">
                    Account Created
                  </p>
                  <p className="mt-2 font-semibold text-[#4B4B4B]">
                    {formatDate(user.created_at)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2D8B87]">
                    Phone Number
                  </p>
                  <p className="mt-2 text-[#4B4B4B]">
                    Phone verification will be added later after SMS setup.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-[#2D6A73] px-5 py-3 text-center font-bold text-white transition hover:bg-[#245961]"
                >
                  My Dashboard
                </Link>

                <Link
                  href="/forgot-password"
                  className="rounded-xl bg-[#7A4A8D] px-5 py-3 text-center font-bold text-white transition hover:bg-[#653A78]"
                >
                  Change Password
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-[#D65A7A] px-5 py-3 font-bold text-[#D65A7A] transition hover:bg-[#D65A7A] hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}