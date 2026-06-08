"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Resources", "/resources"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8D8C8] bg-[#FBF8F3]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="MindVibeClub Logo"
            width={220}
            height={110}
            priority
            className="w-[130px] md:w-[190px]"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className={`relative text-sm font-semibold transition duration-300 ${
                pathname === href
                  ? "text-[#7A4A8D]"
                  : "text-[#2B2B2B] hover:text-[#7A4A8D]"
              }`}
            >
              {name}

              {pathname === href && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#7A4A8D]" />
              )}
            </Link>
          ))}

          <Link
            href="/book-session"
            className="rounded-xl bg-[#2D6A73] px-5 py-2.5 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#245961] hover:shadow-xl"
          >
            Book Session
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-3xl text-[#2D6A73] md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#E8D8C8] bg-[#FBF8F3] px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-5">
            {links.map(([name, href]) => (
              <Link
                key={name}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-semibold transition ${
                  pathname === href
                    ? "text-[#7A4A8D]"
                    : "text-[#2B2B2B]"
                }`}
              >
                {name}
              </Link>
            ))}

            <Link
              href="/book-session"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[#2D6A73] px-5 py-3 text-center font-bold text-white transition hover:bg-[#245961]"
            >
              Book Session
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}