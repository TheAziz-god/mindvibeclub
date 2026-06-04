import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#2D6A73] px-6 py-10 text-white">
      {/* Background Glow Effects */}
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="mb-3 text-2xl font-bold">MindVibeClub</h3>

          <p className="leading-relaxed text-white/90">
            Supporting young people with confidence, wellbeing and resilience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 font-bold">Quick Links</h4>

          <div className="space-y-2">
            <Link
              href="/"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              About
            </Link>

            <Link
              href="/services"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Services
            </Link>

            <Link
              href="/resources"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Resources
            </Link>

            <Link
              href="/contact"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-3 font-bold">Support</h4>

          <div className="space-y-2">
            <Link
              href="/faq"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              FAQ
            </Link>

            <Link
              href="/book-session"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Book Session
            </Link>

            <Link
              href="/safeguarding"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Safeguarding
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-3 font-bold">Legal</h4>

          <div className="space-y-2">
            <Link
              href="/privacy-policy"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="block transition duration-300 hover:text-[#F6C2D0]"
            >
              Terms & Conditions
            </Link>

            <p className="mt-4 text-sm text-white/80">
              Not an emergency or crisis service.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-10 border-t border-white/20 pt-6 text-center">
        <p className="text-sm text-white/80">
          © 2026 MindVibeClub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}