"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <h1 className="mb-4 text-5xl font-bold text-[#D65A7A]">
          Payment Successful
        </h1>

        <p className="mb-8 text-lg">
          Thank you. Your payment was successful and your booking is being confirmed.
          You will receive a confirmation email shortly.
        </p>

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