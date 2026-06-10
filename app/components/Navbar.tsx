"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Resources", "/resources"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ];

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.warn("Navbar auth check failed:", error.message);
        await supabase.auth.signOut();
        setUserEmail(null);
        return;
      }

      setUserEmail(data.user?.email || null);
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUserEmail(null);
    setOpen(false);
    router.push("/");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8D8C8] bg-[#FBF8F3]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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

        <div className="hidden items-center gap-8 md:flex">
          {links.map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className={`relative px-1 text-sm font-semibold transition duration-300 ${
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

          <div className="ml-4 flex items-center gap-3">
            {userEmail ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-[#7A4A8D] px-4 py-2 text-sm font-bold text-[#7A4A8D] transition hover:bg-[#7A4A8D] hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  className="rounded-xl border border-[#2D6A73] px-4 py-2 text-sm font-bold text-[#2D6A73] transition hover:bg-[#2D6A73] hover:text-white"
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-[#D65A7A] px-4 py-2 text-sm font-bold text-[#D65A7A] transition hover:bg-[#D65A7A] hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-xl border border-[#7A4A8D] px-4 py-2 text-sm font-bold text-[#7A4A8D] transition hover:bg-[#7A4A8D] hover:text-white"
              >
                Login
              </Link>
            )}

            <Link
              href="/book-session"
              className="rounded-xl bg-[#2D6A73] px-5 py-2.5 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#245961] hover:shadow-xl"
            >
              Book Session
            </Link>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-3xl text-[#2D6A73] md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

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

            {userEmail ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-[#7A4A8D] px-5 py-3 text-center font-bold text-[#7A4A8D]"
                >
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-[#2D6A73] px-5 py-3 text-center font-bold text-[#2D6A73]"
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-[#D65A7A] px-5 py-3 text-center font-bold text-[#D65A7A]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[#7A4A8D] px-5 py-3 text-center font-bold text-[#7A4A8D]"
              >
                Login
              </Link>
            )}

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