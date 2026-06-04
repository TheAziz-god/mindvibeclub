export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-[#D65A7A] border-t-transparent"></div>

        <h2 className="mt-6 text-2xl font-bold text-[#2D6A73]">
          MindVibeClub
        </h2>

        <p className="mt-2 text-gray-600">
          Loading...
        </p>
      </div>
    </div>
  );
}