import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const bookingId = session.metadata?.bookingId;
    const slotId = session.metadata?.slotId;

    if (!bookingId || !slotId) {
      return NextResponse.json(
        { error: "Missing booking metadata" },
        { status: 400 }
      );
    }

    const { error: bookingError } = await supabaseAdmin
      .from("bookings")
      .update({
        payment_status: "paid",
        status: "confirmed",
      })
      .eq("id", bookingId);

    if (bookingError) {
      console.error("Webhook booking update error:", bookingError);
      return NextResponse.json(
        { error: "Failed to update booking" },
        { status: 500 }
      );
    }

    const { error: slotError } = await supabaseAdmin
      .from("booking_slots")
      .update({
        is_booked: true,
      })
      .eq("id", slotId);

    if (slotError) {
      console.error("Webhook slot update error:", slotError);
      return NextResponse.json(
        { error: "Failed to update slot" },
        { status: 500 }
      );
    }

    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      await fetch(`${siteUrl}/api/send-booking-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
        }),
      });
    } catch (emailError) {
      console.error("Webhook confirmation email error:", emailError);
    }
  }

  return NextResponse.json({ received: true });
}