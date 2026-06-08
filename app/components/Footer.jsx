import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E8D8C8] bg-[#FBF8F3] px-6 py-10 text-[#2B2B2B]">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-3 text-2xl font-bold text-[#7A4A8D]">
            MindVibeClub
          </h3>
          <p className="text-sm leading-6 text-[#4B4B4B]">
            Supporting young people with confidence, wellbeing and resilience.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-[#2D6A73]">Explore</h4>
          <div className="space-y-2 text-sm">
            <Link href="/" className="block hover:text-[#7A4A8D]">Home</Link>
            <Link href="/about" className="block hover:text-[#7A4A8D]">About</Link>
            <Link href="/services" className="block hover:text-[#7A4A8D]">Services</Link>
            <Link href="/resources" className="block hover:text-[#7A4A8D]">Resources</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-[#2D6A73]">Support</h4>
          <div className="space-y-2 text-sm">
            <Link href="/book-session" className="block hover:text-[#7A4A8D]">Book Session</Link>
            <Link href="/faq" className="block hover:text-[#7A4A8D]">FAQ</Link>
            <Link href="/contact" className="block hover:text-[#7A4A8D]">Contact</Link>
            <Link href="/safeguarding" className="block hover:text-[#7A4A8D]">Safeguarding</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-[#2D6A73]">Start Here</h4>
          <p className="mb-4 text-sm text-[#4B4B4B]">
            Not sure where to begin? Start with an intro session.
          </p>
          <Link
            href="/book-session"
            className="inline-block rounded-xl bg-[#2D6A73] px-5 py-2 text-sm font-bold text-white hover:bg-[#245961]"
          >
            Book Intro Session
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-3 border-t border-[#E8D8C8] pt-5 text-sm text-[#4B4B4B] md:flex-row md:items-center md:justify-between">
        <p>© 2026 MindVibeClub. All rights reserved.</p>

        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-[#7A4A8D]">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-[#7A4A8D]">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}