"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

type BookingSlot = {
  id: string;
  session_type: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  price: number;
  is_booked: boolean;
};

const sessions = [
  {
    title: "Intro Session",
    text: "A short first session to understand goals, needs and next steps.",
    duration: "30 minutes",
    price: "£25",
  },
  {
    title: "1-to-1 Support",
    text: "Personal wellbeing and confidence support for young people.",
    duration: "50 minutes",
    price: "£40",
  },
  {
    title: "Group Session",
    text: "Interactive wellbeing sessions for small groups, schools or youth organisations.",
    duration: "60 minutes",
    price: "£15",
  },
];

export default function BookSessionPage() {
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionType, setSessionType] = useState("Intro Session");
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function loadSlots(type: string, date?: string) {
    setSessionType(type);
    setSelectedSlot(null);
    setSlots([]);
    setStatus("Loading available slots...");

    let query = supabase
      .from("booking_slots")
      .select("*")
      .eq("session_type", type)
      .eq("is_booked", false)
      .order("slot_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (date) {
      query = query.eq("slot_date", date);
    }

    const { data, error } = await query;

    if (error) {
      setStatus(error.message);
      return;
    }

    setSlots(data || []);

    if (!data || data.length === 0) {
      setStatus("No available slots found for this selection.");
    } else {
      setStatus("");
    }
  }

  useEffect(() => {
    loadSlots("Intro Session");
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(time: string) {
    return time.slice(0, 5);
  }

  async function handleDateSearch() {
    if (!selectedDate) {
      setStatus("Please choose a date first.");
      return;
    }

    loadSlots(sessionType, selectedDate);
  }

  async function handlePayAndBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedSlot) {
      setStatus("Please select an available slot first.");
      return;
    }

    setStatus("Checking slot availability...");

    const { data: latestSlot, error: slotCheckError } = await supabase
      .from("booking_slots")
      .select("*")
      .eq("id", selectedSlot.id)
      .single();

    if (slotCheckError || !latestSlot) {
      setStatus("Could not check this slot. Please try again.");
      return;
    }

    if (latestSlot.is_booked) {
      setStatus("Sorry, this slot has just been booked by someone else.");
      setSelectedSlot(null);
      loadSlots(sessionType, selectedDate || undefined);
      return;
    }

    setStatus("Creating your booking...");

    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          session_type: selectedSlot.session_type,
          preferred_date: selectedSlot.slot_date,
          session_price: selectedSlot.price,
          payment_status: "unpaid",
          status: "pending_payment",
          slot_id: selectedSlot.id,
          message,
        },
      ])
      .select()
      .single();

    if (bookingError) {
      setStatus(bookingError.message);
      return;
    }

    setStatus("Redirecting to secure payment...");

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionType: selectedSlot.session_type,
        price: selectedSlot.price,
        bookingId: bookingData.id,
        slotId: selectedSlot.id,
        customerName: fullName,
        customerEmail: email,
        slotDate: selectedSlot.slot_date,
        startTime: selectedSlot.start_time,
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      setStatus(data.error || "Payment could not start. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-5xl font-bold text-[#D65A7A]"
        >
          Book a Session
        </motion.h1>

        <p className="mx-auto mb-12 max-w-3xl text-center text-lg">
          Choose a session, select an available slot, enter your details and pay securely.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {sessions.map((session, index) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`rounded-3xl border p-8 text-center shadow-xl backdrop-blur-md ${
                sessionType === session.title
                  ? "border-[#D65A7A] bg-white"
                  : "border-white/30 bg-white/60"
              }`}
            >
              <h2 className="mb-3 text-2xl font-bold text-[#2D6A73]">
                {session.title}
              </h2>

              <p className="mb-6">{session.text}</p>

              <div className="mb-6 rounded-2xl bg-[#FAF7F2]/80 p-4">
                <p className="font-semibold text-[#2D6A73]">
                  {session.duration}
                </p>
                <p className="mt-2 text-3xl font-bold text-[#D65A7A]">
                  {session.price}
                </p>
              </div>

              <button
                type="button"
                onClick={() => loadSlots(session.title)}
                className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white"
              >
                View Upcoming Availability
              </button>
            </motion.div>
          ))}
        </div>

        <section className="mt-16 rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md">
          <h2 className="mb-2 text-3xl font-bold text-[#2D6A73]">
            Available Slots
          </h2>

          <p className="mb-6 text-sm text-gray-600">
            View upcoming availability or search for a specific date.
          </p>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            />

            <button
              type="button"
              onClick={handleDateSearch}
              className="rounded-xl bg-[#D65A7A] px-6 py-3 font-medium text-white"
            >
              Search This Date
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedDate("");
                loadSlots(sessionType);
              }}
              className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white"
            >
              Show Upcoming Slots
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {slots.length === 0 && (
              <p className="md:col-span-3">
                No available slots for this session yet.
              </p>
            )}

            {slots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-2xl p-5 text-left shadow-sm ${
                  selectedSlot?.id === slot.id
                    ? "bg-[#2D6A73] text-white"
                    : "bg-[#FAF7F2]/80 text-[#2B2B2B]"
                }`}
              >
                <p className="font-bold">{slot.session_type}</p>
                <p>{formatDate(slot.slot_date)}</p>
                <p>
                  {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                </p>
                <p>£{slot.price}</p>
              </button>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl backdrop-blur-md"
        >
          <h2 className="mb-6 text-3xl font-bold text-[#2D6A73]">
            Your Details
          </h2>

          {selectedSlot && (
            <div className="mb-6 rounded-2xl bg-[#FAF7F2]/80 p-5">
              <p className="font-bold text-[#D65A7A]">Selected Booking</p>
              <p>Session: {selectedSlot.session_type}</p>
              <p>Date: {formatDate(selectedSlot.slot_date)}</p>
              <p>
                Time: {formatTime(selectedSlot.start_time)} -{" "}
                {formatTime(selectedSlot.end_time)}
              </p>
              <p>Price: £{selectedSlot.price}</p>
            </div>
          )}

          <form onSubmit={handlePayAndBook} className="grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            />

            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A] md:col-span-2"
            />

            <textarea
              rows={5}
              placeholder="Tell us what support you are looking for"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A] md:col-span-2"
            />

            <button
              type="submit"
              className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl md:col-span-2"
            >
              Pay & Confirm Booking
            </button>

            {status && (
              <p className="font-semibold text-[#D65A7A] md:col-span-2">
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </section>
    </main>
  );
}