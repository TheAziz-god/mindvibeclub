import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAILS = [
  "mindvibeclub25@gmail.uk.com",
  "azizkhan69512@gmail.com",
];

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeValue: string) {
  const [hours, minutes] = timeValue.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0);

  return date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select(
        "id, full_name, email, phone, message, session_type, preferred_date, session_price, slot_id, payment_status, status"
      )
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      console.error("Booking fetch error:", bookingError);
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const { data: slot, error: slotError } = await supabaseAdmin
      .from("booking_slots")
      .select("slot_date, start_time, end_time, price")
      .eq("id", booking.slot_id)
      .single();

    if (slotError || !slot) {
      console.error("Slot fetch error:", slotError);
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }

    const bookingDate = formatDate(slot.slot_date || booking.preferred_date);
    const startTime = formatTime(slot.start_time);
    const endTime = formatTime(slot.end_time);
    const price = booking.session_price || slot.price;

    const detailsHtml = `
      <div style="background-color: #FAF7F2; padding: 18px; border-radius: 14px; margin: 22px 0;">
        <p><strong>Session:</strong> ${booking.session_type}</p>
        <p><strong>Date:</strong> ${bookingDate}</p>
        <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
        <p><strong>Price:</strong> £${price}</p>
        <p><strong>Payment:</strong> ${booking.payment_status || "paid"}</p>
        <p><strong>Status:</strong> ${booking.status || "confirmed"}</p>
        <p><strong>Booking ID:</strong> ${booking.id}</p>
      </div>
    `;

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: booking.email,
      subject: "Your MindVibeClub Booking Is Confirmed",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FAF7F2; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 18px; padding: 28px;">
            <h1 style="color: #D65A7A; margin-bottom: 12px;">Booking Confirmed</h1>

            <p>Hi ${booking.full_name},</p>

            <p>Your MindVibeClub session has been confirmed. Here are your booking details:</p>

            ${detailsHtml}

            <p>If you need to request a change, please contact us through the website.</p>

            <p style="margin-top: 28px;">Warm regards,<br />MindVibeClub</p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: ADMIN_EMAILS,
      subject: `New Paid Booking: ${booking.session_type}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FAF7F2; padding: 24px;">
          <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 18px; padding: 28px;">
            <h1 style="color: #D65A7A; margin-bottom: 12px;">New Paid Booking</h1>

            <p>A customer has completed payment and their session is confirmed.</p>

            ${detailsHtml}

            <div style="background-color: #ffffff; border: 1px solid #E8D8C8; padding: 18px; border-radius: 14px;">
              <p><strong>Customer:</strong> ${booking.full_name}</p>
              <p><strong>Email:</strong> ${booking.email}</p>
              <p><strong>Phone:</strong> ${booking.phone || "Not provided"}</p>
              <p><strong>Message:</strong> ${booking.message || "No message added."}</p>
            </div>

            <p style="margin-top: 28px;">Check the admin dashboard for full booking details.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking confirmation email error:", error);

    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}