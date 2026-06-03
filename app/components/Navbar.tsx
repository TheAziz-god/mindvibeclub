import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8DDD3]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="MindVibeClub Logo"
            width={220}
            height={110}
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-medium">

          <Link
            href="/"
            className="transition hover:text-[#D65A7A]"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="transition hover:text-[#D65A7A]"
          >
            About
          </Link>

          <Link
            href="/services"
            className="transition hover:text-[#D65A7A]"
          >
            Services
          </Link>

          <Link
            href="/resources"
            className="transition hover:text-[#D65A7A]"
          >
            Resources
          </Link>

          <Link
            href="/book-session"
            className="transition hover:text-[#D65A7A]"
          >
            Book
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-[#D65A7A]"
          >
            Contact
          </Link>

          {/* CTA Button */}
          <Link
            href="/book-session"
            className="rounded-lg bg-[#2D6A73] px-5 py-2 text-white transition hover:opacity-90"
          >
            Book Now
          </Link>

        </div>
      </div>
    </nav>
  );
}