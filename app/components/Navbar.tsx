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
    ["Book", "/book-session"],
    ["Contact", "/contact"],
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8DDD3] bg-[#FAF7F2]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="MindVibeClub Logo"
            width={220}
            height={110}
            priority
            className="w-[120px] md:w-[180px]"
          />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className={`transition duration-300 hover:text-[#D65A7A] ${
                pathname === href
                  ? "font-bold text-[#D65A7A]"
                  : "text-[#2B2B2B]"
              }`}
            >
              {name}
            </Link>
          ))}

          <Link
            href="/book-session"
            className="rounded-lg bg-[#2D6A73] px-5 py-2 text-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl text-[#2D6A73] md:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t border-[#E8DDD3] px-6 pb-5 md:hidden">
          <div className="flex flex-col gap-4 pt-4 font-medium">
            {links.map(([name, href]) => (
              <Link
                key={name}
                href={href}
                onClick={() => setOpen(false)}
                className={`transition duration-300 ${
                  pathname === href
                    ? "font-bold text-[#D65A7A]"
                    : "text-[#2B2B2B]"
                }`}
              >
                {name}
              </Link>
            ))}

            <Link
              href="/book-session"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-[#2D6A73] px-5 py-3 text-center text-white transition duration-300 hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}