"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  session_type: string | null;
  preferred_date: string | null;
  payment_status: string | null;
  status: string | null;
  session_price: number | null;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        router.push("/login");
        return;
      }

      const email = userData.user.email || "";
      setUserEmail(email);

      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false });

      setBookings(data || []);
      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function formatDate(date: string | null) {
    if (!date) return "Not selected";

    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <main className="mindvibe-bg min-h-screen text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mindvibe-frame relative mb-12 overflow-hidden px-8 py-14 text-center">
          <span className="mindvibe-doodle top-right">✿</span>
          <span className="mindvibe-doodle bottom-left">✿</span>

          <p className="mb-4 font-bold uppercase tracking-[0.25em] text-[#2D8B87]">
            Customer Space
          </p>

          <h1 className="text-5xl font-bold text-[#7A4A8D]">
            My Dashboard
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B4B4B]">
            View your bookings, payment status and session details.
          </p>
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-6 shadow-xl md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2D8B87]">
              Logged in as
            </p>
            <p className="mt-1 font-bold text-[#7A4A8D]">{userEmail}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/book-session"
              className="rounded-xl bg-[#2D6A73] px-5 py-3 font-bold text-white"
            >
              Book New Session
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-[#7A4A8D] px-5 py-3 font-bold text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <section className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
            My Bookings
          </h2>

          {loading && <p>Loading your bookings...</p>}

          {!loading && bookings.length === 0 && (
            <div className="rounded-2xl bg-white/70 p-6">
              <p className="mb-4 text-[#4B4B4B]">
                You do not have any bookings linked to this email yet.
              </p>

              <Link
                href="/book-session"
                className="inline-block rounded-xl bg-[#2D6A73] px-5 py-3 font-bold text-white"
              >
                Book Your First Session
              </Link>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-[#E8D8C8] bg-white/70 p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#7A4A8D]">
                      {booking.session_type || "Session"}
                    </h3>
                    <p className="text-sm text-[#4B4B4B]">
                      {formatDate(booking.preferred_date)}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#F8F4EF] px-3 py-1 text-xs font-bold text-[#2D6A73]">
                    {booking.status || "pending"}
                  </span>
                </div>

                <p>
                  <strong>Payment:</strong>{" "}
                  {booking.payment_status || "unpaid"}
                </p>

                <p>
                  <strong>Price:</strong> £{booking.session_price || 0}
                </p>

                <p className="mt-3 text-xs text-[#4B4B4B]">
                  Booking ID: {booking.id}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}