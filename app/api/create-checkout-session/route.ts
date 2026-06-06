import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const {
    sessionType,
    price,
    bookingId,
    slotId,
    customerName,
    customerEmail,
    slotDate,
    startTime,
  } = await request.json();

  if (!sessionType || !price || !bookingId || !slotId) {
    return Response.json(
      { error: "Missing checkout information" },
      { status: 400 }
    );
  }

  const amount = Number(price) * 100;

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: sessionType,
            description: `${slotDate} at ${startTime}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId,
      slotId,
      sessionType,
      customerName,
      customerEmail,
      slotDate,
      startTime,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?booking_id=${bookingId}&slot_id=${slotId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-cancelled`,
  });

  return Response.json({ url: checkoutSession.url });
}