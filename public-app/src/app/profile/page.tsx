"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth || !auth.isAuthChecked) return;

    if (!auth.isAuthenticated) {
      router.push("/");
    }
  }, [auth, router]);

  if (!auth || !auth.isAuthChecked) {
    return null; // or a loader
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Profile</h1>

        <div className="space-y-2">
          <p className="text-zinc-400">Username</p>
          <p className="text-lg font-semibold">
            {auth.username ?? "-"}
          </p>
        </div>

        <button
          onClick={auth.logout}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
