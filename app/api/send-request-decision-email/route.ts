import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAILS = [
  "mindvibeclub25@gmail.com.uk",
  "azizkhan69512@gmail.com",
];

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mindvibeclub.com";

export async function POST(request: Request) {
  try {
    const { requestId, decision } = await request.json();

    if (!requestId || !decision) {
      return NextResponse.json(
        { error: "Request ID and decision are required" },
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

    const decisionLabel =
      decision === "approved"
        ? "Approved"
        : decision === "declined"
        ? "Declined"
        : "Updated";

    const customerSubject = `Your MindVibeClub ${requestLabel} Was ${decisionLabel}`;

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;background:#FAF7F2;padding:24px;color:#2B2B2B;">
        <div style="max-width:650px;margin:0 auto;background:white;border-radius:20px;padding:28px;border:1px solid #E8D8C8;">
          <h1 style="color:#D65A7A;margin:0 0 12px;">${requestLabel} ${decisionLabel}</h1>

          <p>Hi ${booking.full_name},</p>

          <p>Your ${requestLabel.toLowerCase()} has been marked as <strong>${decisionLabel.toLowerCase()}</strong>.</p>

          <div style="background:#FAF7F2;border-radius:14px;padding:18px;margin:20px 0;">
            <p><strong>Session:</strong> ${booking.session_type || "Session"}</p>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Request Type:</strong> ${requestLabel}</p>
            <p><strong>Decision:</strong> ${decisionLabel}</p>
            <p><strong>Your Message:</strong> ${
              bookingRequest.message || "No message added."
            }</p>
            <p><strong>Admin Note:</strong> ${
              bookingRequest.admin_note || "No additional note."
            }</p>
          </div>

          ${
            bookingRequest.request_type === "cancel" &&
            decision === "approved"
              ? `<p>Your booking has been cancelled and the slot has been released. If a refund is required, our team will process or contact you separately.</p>`
              : ""
          }

          ${
            bookingRequest.request_type === "reschedule" &&
            decision === "approved"
              ? `<p>Our team will contact you to arrange a suitable new time.</p>`
              : ""
          }

          <div style="text-align:center;margin-top:24px;">
            <a href="${SITE_URL}/dashboard" style="background:#2D6A73;color:white;text-decoration:none;padding:13px 22px;border-radius:12px;font-weight:bold;">
              View Dashboard
            </a>
          </div>

          <p style="margin-top:24px;">
            Need help?<br/>
            Email: mindvibeclub25@gmail.com.uk<br/>
            Call: +44 7494 677720 or +44 7482 492353
          </p>

          <p style="margin-top:24px;">Warm regards,<br/><strong>MindVibeClub</strong></p>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;background:#FAF7F2;padding:24px;color:#2B2B2B;">
        <div style="max-width:650px;margin:0 auto;background:white;border-radius:20px;padding:28px;border:1px solid #E8D8C8;">
          <h1 style="color:#D65A7A;margin:0 0 12px;">Request ${decisionLabel}</h1>

          <p>The customer request has been updated.</p>

          <div style="background:#FAF7F2;border-radius:14px;padding:18px;margin:20px 0;">
            <p><strong>Customer:</strong> ${booking.full_name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Session:</strong> ${booking.session_type || "Session"}</p>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Request Type:</strong> ${requestLabel}</p>
            <p><strong>Decision:</strong> ${decisionLabel}</p>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: booking.email,
      subject: customerSubject,
      html: customerHtml,
    });

    await resend.emails.send({
      from: "MindVibeClub <bookings@mindvibeclub.com>",
      to: ADMIN_EMAILS,
      subject: `Request ${decisionLabel}: ${booking.full_name}`,
      html: adminHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Request decision email error:", error);

    return NextResponse.json(
      { error: "Failed to send request decision email" },
      { status: 500 }
    );
  }
}