"use client";

import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "azizkhan69512@gmail.com";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finishLogin() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      if (data.user.email === ADMIN_EMAIL) {
        router.push("/admin");
        return;
      }

      router.push("/dashboard");
    }

    finishLogin();
  }, [router]);

  return (
    <main className="mindvibe-bg flex min-h-screen items-center justify-center px-6 text-[#2B2B2B]">
      <div className="rounded-3xl border border-[#E8D8C8] bg-[#FBF8F3]/95 p-8 text-center shadow-xl">
        <h1 className="text-3xl font-bold text-[#7A4A8D]">
          Signing you in...
        </h1>
        <p className="mt-3 text-[#4B4B4B]">
          Please wait while we finish setting up your session.
        </p>
      </div>
    </main>
  );
}