import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold text-[#D65A7A]">
          404
        </h1>

        <h2 className="mb-4 text-3xl font-bold text-[#2D6A73]">
          Page Not Found
        </h2>

        <p className="mb-8 text-lg text-gray-600">
          The page you're looking for doesn't exist.
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