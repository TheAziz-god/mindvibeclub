"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const slotId = searchParams.get("slot_id");

  const [status, setStatus] = useState("Confirming your booking...");

  useEffect(() => {
    async function confirmBooking() {
      if (!bookingId || !slotId) {
        setStatus("Payment successful, but booking details were not found.");
        return;
      }

      const { error: bookingError } = await supabase
        .from("bookings")
        .update({
          payment_status: "paid",
          status: "confirmed",
        })
        .eq("id", bookingId);

      const { error: slotError } = await supabase
        .from("booking_slots")
        .update({
          is_booked: true,
        })
        .eq("id", slotId);

      if (bookingError || slotError) {
        setStatus("Payment successful, but booking confirmation needs admin review.");
        return;
      }

      setStatus("Your booking is confirmed. A confirmation email will be sent shortly.");
    }

    confirmBooking();
  }, [bookingId, slotId]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <h1 className="mb-4 text-5xl font-bold text-[#D65A7A]">
          Payment Successful
        </h1>

        <p className="mb-8 text-lg">{status}</p>

        <Link
          href="/"
          className="rounded-xl bg-[#2D6A73] px-6 py-3 font-medium text-white"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}