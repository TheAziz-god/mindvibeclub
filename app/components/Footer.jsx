import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#2D6A73] px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-3 text-2xl font-bold">MindVibeClub</h3>
          <p>Supporting young people with confidence, wellbeing and resilience.</p>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Quick Links</h4>
          <Link href="/" className="block">Home</Link>
          <Link href="/about" className="block">About</Link>
          <Link href="/services" className="block">Services</Link>
          <Link href="/resources" className="block">Resources</Link>
          <Link href="/contact" className="block">Contact</Link>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Support</h4>
          <Link href="/faq" className="block">FAQ</Link>
          <Link href="/book-session" className="block">Book Session</Link>
          <Link href="/safeguarding" className="block">Safeguarding</Link>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Legal</h4>
          <Link href="/privacy-policy" className="block">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="block">Terms & Conditions</Link>
          <p className="mt-3 text-sm">
            Not an emergency or crisis service.
          </p>
        </div>
      </div>

      <p className="mt-8 text-center text-sm">
        © 2026 MindVibeClub. All rights reserved.
      </p>
    </footer>
  );
}