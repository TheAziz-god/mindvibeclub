import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5">

        <Image
          src="/logo.jpeg"
          alt="MindVibeClub Logo"
          width={180}
          height={80}
          priority
        />

        <div className="flex gap-8 text-[#2B2B2B]">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-16 px-8">

        <h1 className="text-6xl font-bold text-[#D65A7A] max-w-4xl">
          Building Confidence, Wellbeing &
          Resilience for Young People
        </h1>

        <p className="mt-6 text-xl text-[#2B2B2B] max-w-2xl">
          Supporting children and young people through wellbeing,
          confidence building and personal growth.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-[#2D6A73] text-white px-6 py-3 rounded-lg hover:opacity-90">
            Book Session
          </button>

          <button className="border border-[#2D6A73] text-[#2D6A73] px-6 py-3 rounded-lg hover:bg-[#2D6A73] hover:text-white">
            Learn More
          </button>
        </div>

      </section>

    </main>
  );
}