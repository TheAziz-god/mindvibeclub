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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mindvibeclub.com";

export async function POST(request: Request) {
  try {
    const { requestId } = await request.json();

    if (!requestId) {
      return NextResponse.json(
        { error: "Request ID is required" },
        { status: 400 }
      );
    }

    const { data: bookingRequest, error: requestError } = await supabaseAdmin
      .from("booking_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (requestError || !bookingRequest) {
      return NextResponse.json(
        { error: "Booking request not found" },
        { status: 404 }
      );
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", bookingRequest.booking_id)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const requestLabel =
      bookingRequest.request_type === "cancel"
        ? "Cancellation Request"
        : "Reschedule Request";

    const html = `
      <div style="font-family:Arial,sans-serif;background:#FAF7F2;padding:24px;color:#2B2B2B;">
        <div style="max-width:650px;margin:0 auto;background:white;border-radius:20px;padding:28px;border:1px solid #E8D8C8;">
          <h1 style="color:#D65A7A;margin:0 0 12px;">${requestLabel} Received</h1>

          <p>Hi ${booking.full_name},</p>

          <p>We have received your ${requestLabel.toLowerCase()} for your MindVibeClub booking.</p>

          <div style="background:#FAF7F2;border-radius:14px;padding:18px;margin:20px 0;">
            <p><strong>Session:</strong> ${booking.session_type || "Session"}</p>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Request Type:</strong> ${requestLabel}</p>
            <p><strong>Status:</strong> Pending</p>
            <p><strong>Your Message:</strong> ${
              bookingRequest.message || "No message added."
            }</p>
          </div>

          <p>We aim to respond within 12 hours.</p>

          <p>
            Need help?<br/>
            Email: mindvibeclub25@gmail.uk.com<br/>
            Call: +44 7494 677720 or +44 7482 492353
          </p>

          <p style="margin-top:24px;">Warm regards,<br/><strong>MindVibeClub</strong></p>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;background:#FAF7F2;padding:24px;color:#2B2B2B;">
        <div style="max-width:650px;margin:0 auto;background:white;border-radius:20px;padding:28px;border:1px solid #E8D8C8;">
          <h1 style="color:#D65A7A;margin:0 0 12px;">New ${requestLabel}</h1>

          <p>A customer submitted a booking request.</p>

          <div style="background:#FAF7F2;border-radius:14px;padding:18px;margin:20px 0;">
            <p><strong>Customer:</strong> ${booking.full_name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone || "Not provided"}</p>
            <p><strong>Session:</strong> ${booking.session_type || "Session"}</p>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Request Type:</strong> ${requestLabel}</p>
            <p><strong>Message:</strong> ${
              bookingRequest.message || "No message added."
            }</p>
          </div>

          <div style="text-align:center;margin-top:24px;">
            <a href="${SITE_URL}/admin" style="background:#7A4A8D;color:white;text-decoration:none;padding:13px 22px;border-radius:12px;font-weight:bold;">
              Open Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: booking.email,
      subject: `Your MindVibeClub ${requestLabel} Has Been Received`,
      html,
    });

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: ADMIN_EMAILS,
      subject: `New ${requestLabel}: ${booking.full_name}`,
      html: adminHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking request email error:", error);

    return NextResponse.json(
      { error: "Failed to send booking request email" },
      { status: 500 }
    );
  }
}