export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B]">
      <section className="mx-auto max-w-5xl px-6 py-20">

        <h1 className="mb-6 text-center text-5xl font-bold text-[#D65A7A]">
          Contact Us
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg">
          We'd love to hear from you. Whether you're a student, parent,
          school or organisation, feel free to get in touch.
        </p>

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <form className="space-y-6">

            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Message
              </label>
              <textarea
                rows={6}
                placeholder="How can we help?"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#2D6A73] px-6 py-3 text-white"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>
    </main>
  );
}