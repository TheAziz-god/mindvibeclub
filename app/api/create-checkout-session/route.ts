import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const prices = {
  "Intro Session": 2500,
  "1-to-1 Support": 4000,
  "Group Session": 1500,
};

export async function POST(request: Request) {
  const { sessionType } = await request.json();

  const amount = prices[sessionType as keyof typeof prices];

  if (!amount) {
    return Response.json({ error: "Invalid session type" }, { status: 400 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: sessionType,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-cancelled`,
  });

  return Response.json({ url: checkoutSession.url });
}