// src/pages/Dashboard.jsx
"use client";

import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/Login");
  };

  return (
    <div className="min-h-screen flex text-black items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Welcome, {user?.displayName ?? user?.email ?? "User"}</h2>
          <button onClick={handleLogout} className="text-sm px-3 py-1 border bg-blue-600 text-white py-2 rounded-lg ">Logout</button>
        </div>

        <div className="text-gray-600">
          This is a minimal dashboard.
        </div>
      </div>
    </div>
  );
}
