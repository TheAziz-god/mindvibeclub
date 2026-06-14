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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mindvibeclub.com";
const LOGO_URL = `${SITE_URL}/logo.png`;

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
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

function emailLayout(content: string) {
  return `
    <div style="margin:0; padding:0; background:#FAF7F2; font-family:Arial, sans-serif; color:#2B2B2B;">
      <div style="max-width:680px; margin:0 auto; padding:28px 16px;">
        <div style="text-align:center; margin-bottom:18px;">
          <img src="${LOGO_URL}" alt="MindVibeClub" style="max-width:120px; height:auto; margin-bottom:10px;" />
          <p style="margin:0; color:#2D8B87; font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase;">
            Confidence • Wellbeing • Resilience
          </p>
        </div>

        <div style="background:#ffffff; border:1px solid #E8D8C8; border-radius:22px; padding:30px; box-shadow:0 10px 25px rgba(0,0,0,0.06);">
          ${content}
        </div>

        <div style="margin-top:18px; background:#ffffff; border:1px solid #E8D8C8; border-radius:18px; padding:18px; text-align:center;">
          <h3 style="margin:0 0 8px; color:#2D6A73; font-size:18px;">Need help?</h3>
          <p style="margin:0; color:#4B4B4B; line-height:1.7;">
            Email us at <a href="mailto:mindvibeclub25@gmail.uk.com" style="color:#7A4A8D; font-weight:700;">mindvibeclub25@gmail.uk.com</a><br />
            Call <a href="tel:+447494677720" style="color:#2D6A73; font-weight:700;">+44 7494 677720</a>
            or <a href="tel:+447482492353" style="color:#2D6A73; font-weight:700;">+44 7482 492353</a>
          </p>
          <p style="margin:12px 0 0; color:#777; font-size:13px;">
            Online Services • London, UK
          </p>
        </div>

        <p style="text-align:center; margin:18px 0 0; color:#777; font-size:12px; line-height:1.6;">
          MindVibeClub provides wellbeing and support services. We are not an emergency service.
          If someone is in immediate danger, call 999 or go to A&E.
        </p>
      </div>
    </div>
  `;
}

function bookingDetailsCard({
  sessionType,
  bookingDate,
  startTime,
  endTime,
  price,
  paymentStatus,
  bookingStatus,
  bookingId,
}: {
  sessionType: string | null;
  bookingDate: string;
  startTime: string;
  endTime: string;
  price: number | null;
  paymentStatus: string | null;
  bookingStatus: string | null;
  bookingId: string;
}) {
  return `
    <div style="background:#FAF7F2; border:1px solid #E8D8C8; padding:18px; border-radius:16px; margin:22px 0;">
      <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Session:</strong> ${sessionType || "Session"}</p>
      <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Date:</strong> ${bookingDate}</p>
      <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Time:</strong> ${startTime} - ${endTime}</p>
      <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Price:</strong> £${price || 0}</p>
      <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Payment:</strong> ${paymentStatus || "paid"}</p>
      <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Status:</strong> ${bookingStatus || "confirmed"}</p>
      <p style="margin:0;"><strong style="color:#7A4A8D;">Booking ID:</strong> ${bookingId}</p>
    </div>
  `;
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

    const detailsHtml = bookingDetailsCard({
      sessionType: booking.session_type,
      bookingDate,
      startTime,
      endTime,
      price,
      paymentStatus: booking.payment_status,
      bookingStatus: booking.status,
      bookingId: booking.id,
    });

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: booking.email,
      subject: "Your MindVibeClub Booking Is Confirmed",
      html: emailLayout(`
        <h1 style="color:#D65A7A; margin:0 0 12px; font-size:30px;">Booking Confirmed</h1>

        <p style="font-size:16px; line-height:1.7; margin:0 0 12px;">Hi ${booking.full_name},</p>

        <p style="font-size:16px; line-height:1.7; margin:0;">
          Your MindVibeClub session has been confirmed. Here are your booking details:
        </p>

        ${detailsHtml}

        <div style="text-align:center; margin:26px 0;">
          <a href="${SITE_URL}/dashboard" style="display:inline-block; background:#2D6A73; color:#ffffff; text-decoration:none; padding:13px 22px; border-radius:12px; font-weight:700;">
            Manage Booking
          </a>
        </div>

        <p style="font-size:15px; line-height:1.7; color:#4B4B4B;">
          If you need to request a change, please use your dashboard or contact us using the details below.
        </p>

        <p style="margin-top:24px; font-size:15px; line-height:1.7;">
          Warm regards,<br />
          <strong>MindVibeClub</strong>
        </p>
      `),
    });

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: ADMIN_EMAILS,
      subject: `New Paid Booking: ${booking.session_type}`,
      html: emailLayout(`
        <h1 style="color:#D65A7A; margin:0 0 12px; font-size:30px;">New Paid Booking</h1>

        <p style="font-size:16px; line-height:1.7; margin:0;">
          A customer has completed payment and their session is confirmed.
        </p>

        ${detailsHtml}

        <div style="background:#ffffff; border:1px solid #E8D8C8; padding:18px; border-radius:16px;">
          <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Customer:</strong> ${booking.full_name}</p>
          <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Email:</strong> ${booking.email}</p>
          <p style="margin:0 0 10px;"><strong style="color:#7A4A8D;">Phone:</strong> ${booking.phone || "Not provided"}</p>
          <p style="margin:0;"><strong style="color:#7A4A8D;">Message:</strong> ${booking.message || "No message added."}</p>
        </div>

        <div style="text-align:center; margin:26px 0 4px;">
          <a href="${SITE_URL}/admin" style="display:inline-block; background:#7A4A8D; color:#ffffff; text-decoration:none; padding:13px 22px; border-radius:12px; font-weight:700;">
            Open Admin Dashboard
          </a>
        </div>
      `),
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