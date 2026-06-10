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
  session_date?: string | null;
  session_time?: string | null;
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

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Dashboard bookings error:", error.message);
      }

      setBookings(data || []);
      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function getBookingDate(booking: Booking) {
    return booking.session_date || booking.preferred_date;
  }

  function formatDate(date: string | null | undefined) {
    if (!date) return "Not selected";

    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatCreatedAt(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function statusStyle(status: string | null) {
    const value = status || "pending";

    if (value === "confirmed") {
      return "bg-[#E9F7EF] text-[#1E7A4F]";
    }

    if (value === "completed") {
      return "bg-[#EEF2FF] text-[#4F46E5]";
    }

    if (value === "cancelled") {
      return "bg-[#FFF1F2] text-[#D65A7A]";
    }

    return "bg-[#F8F4EF] text-[#7A4A8D]";
  }

  function paymentStyle(status: string | null) {
    const value = status || "unpaid";

    if (value === "paid") {
      return "bg-[#E9F7EF] text-[#1E7A4F]";
    }

    if (value === "refunded") {
      return "bg-[#EEF2FF] text-[#4F46E5]";
    }

    return "bg-[#FFF7ED] text-[#B45309]";
  }

  const upcomingBookings = bookings.filter((booking) => {
    const date = getBookingDate(booking);
    if (!date) return false;

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      bookingDate >= today &&
      booking.status !== "cancelled" &&
      booking.status !== "completed"
    );
  });

  const otherBookings = bookings.filter(
    (booking) => !upcomingBookings.some((item) => item.id === booking.id)
  );

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

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-6 shadow-xl md:col-span-2">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2D8B87]">
              Logged in as
            </p>

            <p className="mt-1 break-words text-xl font-bold text-[#7A4A8D]">
              {userEmail}
            </p>

            <p className="mt-3 text-[#4B4B4B]">
              Your bookings are linked to this email address.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-6 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2D8B87]">
              Quick Actions
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/book-session"
                className="rounded-xl bg-[#2D6A73] px-5 py-3 text-center font-bold text-white transition hover:bg-[#245961]"
              >
                Book New Session
              </Link>

              <Link
                href="/profile"
                className="rounded-xl bg-[#7A4A8D] px-5 py-3 text-center font-bold text-white transition hover:bg-[#653A78]"
              >
                View Profile
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

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-[#E8D8C8] bg-white/70 p-6 text-center shadow-lg">
            <p className="text-4xl font-bold text-[#7A4A8D]">
              {bookings.length}
            </p>
            <p className="mt-2 font-semibold text-[#2D6A73]">
              Total Bookings
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8D8C8] bg-white/70 p-6 text-center shadow-lg">
            <p className="text-4xl font-bold text-[#7A4A8D]">
              {upcomingBookings.length}
            </p>
            <p className="mt-2 font-semibold text-[#2D6A73]">
              Upcoming Sessions
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8D8C8] bg-white/70 p-6 text-center shadow-lg">
            <p className="text-4xl font-bold text-[#7A4A8D]">
              {bookings.filter((booking) => booking.payment_status === "paid").length}
            </p>
            <p className="mt-2 font-semibold text-[#2D6A73]">
              Paid Bookings
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2D6A73]">
                Upcoming Bookings
              </h2>
              <p className="mt-2 text-[#4B4B4B]">
                Your upcoming or active sessions will appear here.
              </p>
            </div>

            <Link
              href="/book-session"
              className="w-fit rounded-xl bg-[#2D6A73] px-5 py-3 font-bold text-white transition hover:bg-[#245961]"
            >
              Book Again
            </Link>
          </div>

          {loading && <p>Loading your bookings...</p>}

          {!loading && upcomingBookings.length === 0 && (
            <div className="rounded-2xl bg-white/70 p-6">
              <p className="mb-4 text-[#4B4B4B]">
                You do not have any upcoming bookings linked to this email yet.
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
            {upcomingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                formatDate={formatDate}
                formatCreatedAt={formatCreatedAt}
                statusStyle={statusStyle}
                paymentStyle={paymentStyle}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 shadow-xl">
          <h2 className="mb-2 text-3xl font-bold text-[#2D6A73]">
            Booking History
          </h2>

          <p className="mb-6 text-[#4B4B4B]">
            Past, completed, cancelled or older bookings will appear here.
          </p>

          {!loading && otherBookings.length === 0 && (
            <div className="rounded-2xl bg-white/70 p-6 text-[#4B4B4B]">
              No booking history yet.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            {otherBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                formatDate={formatDate}
                formatCreatedAt={formatCreatedAt}
                statusStyle={statusStyle}
                paymentStyle={paymentStyle}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function BookingCard({
  booking,
  formatDate,
  formatCreatedAt,
  statusStyle,
  paymentStyle,
}: {
  booking: Booking;
  formatDate: (date: string | null | undefined) => string;
  formatCreatedAt: (date: string) => string;
  statusStyle: (status: string | null) => string;
  paymentStyle: (status: string | null) => string;
}) {
  const date = booking.session_date || booking.preferred_date;

  return (
    <div className="rounded-2xl border border-[#E8D8C8] bg-white/70 p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#7A4A8D]">
            {booking.session_type || "Session"}
          </h3>

          <p className="mt-1 text-sm text-[#4B4B4B]">
            Booked on {formatCreatedAt(booking.created_at)}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle(
            booking.status
          )}`}
        >
          {booking.status || "pending"}
        </span>
      </div>

      <div className="space-y-2 text-[#4B4B4B]">
        <p>
          <strong>Date:</strong> {formatDate(date)}
        </p>

        {booking.session_time && (
          <p>
            <strong>Time:</strong> {booking.session_time}
          </p>
        )}

        <p>
          <strong>Payment:</strong>{" "}
          <span
            className={`rounded-full px-2 py-1 text-xs font-bold ${paymentStyle(
              booking.payment_status
            )}`}
          >
            {booking.payment_status || "unpaid"}
          </span>
        </p>

        <p>
          <strong>Price:</strong> £{booking.session_price || 0}
        </p>
      </div>

      <div className="mt-5 rounded-xl bg-[#F8F4EF] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#2D8B87]">
          Booking Reference
        </p>
        <p className="mt-1 break-all text-xs text-[#4B4B4B]">{booking.id}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="rounded-xl border border-[#7A4A8D] px-4 py-2 text-sm font-bold text-[#7A4A8D] transition hover:bg-[#7A4A8D] hover:text-white"
        >
          Request Change
        </Link>

        <Link
          href="/resources"
          className="rounded-xl border border-[#2D6A73] px-4 py-2 text-sm font-bold text-[#2D6A73] transition hover:bg-[#2D6A73] hover:text-white"
        >
          View Resources
        </Link>
      </div>
    </div>
  );
}