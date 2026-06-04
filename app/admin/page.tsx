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
  status: string | null;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

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

  useEffect(() => {
    loadData();
  }, []);

  async function updateBookingStatus(id: string, status: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (!error) {
      loadData();
    }
  }

  async function deleteMessage(id: string) {
    const confirmDelete = confirm("Delete this contact message?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (!error) {
      loadData();
    }
  }

  async function deleteBooking(id: string) {
    const confirmDelete = confirm("Delete this booking request?");

    if (!confirmDelete) return;

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (!error) {
      loadData();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const totalBookings = bookings.length;
  const newBookings = bookings.filter(
    (booking) => booking.status === "new" || !booking.status
  ).length;
  const contactedBookings = bookings.filter(
    (booking) => booking.status === "contacted"
  ).length;
  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

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

        <div className="mb-10 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {messages.length}
            </p>
            <p className="font-semibold text-[#2D6A73]">Messages</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {totalBookings}
            </p>
            <p className="font-semibold text-[#2D6A73]">Total Bookings</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {newBookings + contactedBookings}
            </p>
            <p className="font-semibold text-[#2D6A73]">Active Bookings</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {completedBookings}
            </p>
            <p className="font-semibold text-[#2D6A73]">Completed</p>
          </div>
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
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-[#D65A7A]">
                        {msg.full_name}
                      </p>
                      <p className="text-sm">{msg.email}</p>
                    </div>

                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>

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
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-bold text-[#D65A7A]">
                      {booking.full_name}
                    </p>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2D6A73]">
                      {booking.status || "new"}
                    </span>
                  </div>

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

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => updateBookingStatus(booking.id, "new")}
                      className="rounded-lg bg-gray-200 px-3 py-2 text-sm"
                    >
                      New
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "contacted")
                      }
                      className="rounded-lg bg-[#2D6A73] px-3 py-2 text-sm text-white"
                    >
                      Contacted
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "completed")
                      }
                      className="rounded-lg bg-[#D65A7A] px-3 py-2 text-sm text-white"
                    >
                      Completed
                    </button>

                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}