"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

type ContactMessage = {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
};

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  session_type: string | null;
  preferred_date: string | null;
  message: string | null;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserAndLoadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: messagesData } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (messagesData) setMessages(messagesData);
      if (bookingsData) setBookings(bookingsData);

      setLoading(false);
    }

    checkUserAndLoadData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-20 text-[#2B2B2B]">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-5xl font-bold text-[#D65A7A]">
              Admin Dashboard
            </h1>

            <p className="mt-4 text-lg">
              View contact messages and booking requests submitted through the
              website.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white"
          >
            Logout
          </button>
        </div>

        {loading && (
          <p className="font-semibold text-[#2D6A73]">Loading data...</p>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-5 text-3xl font-bold text-[#2D6A73]">
              Contact Messages
            </h2>

            <div className="space-y-4">
              {messages.length === 0 && !loading && (
                <p>No contact messages yet.</p>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-2xl bg-[#FAF7F2]/80 p-5 shadow-sm"
                >
                  <p className="font-bold text-[#D65A7A]">{msg.full_name}</p>
                  <p className="text-sm">{msg.email}</p>
                  <p className="mt-3">{msg.message}</p>
                  <p className="mt-3 text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-5 text-3xl font-bold text-[#2D6A73]">
              Booking Requests
            </h2>

            <div className="space-y-4">
              {bookings.length === 0 && !loading && (
                <p>No booking requests yet.</p>
              )}

              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl bg-[#FAF7F2]/80 p-5 shadow-sm"
                >
                  <p className="font-bold text-[#D65A7A]">
                    {booking.full_name}
                  </p>

                  <p className="text-sm">{booking.email}</p>

                  {booking.phone && (
                    <p className="text-sm">Phone: {booking.phone}</p>
                  )}

                  <p className="mt-3">
                    <strong>Session:</strong> {booking.session_type}
                  </p>

                  {booking.preferred_date && (
                    <p>
                      <strong>Preferred Date:</strong>{" "}
                      {booking.preferred_date}
                    </p>
                  )}

                  {booking.message && <p className="mt-3">{booking.message}</p>}

                  <p className="mt-3 text-xs text-gray-500">
                    {new Date(booking.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}