"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill all fields.");
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      router.push("/Home");
    } catch (error) {
      console.error(error);
      let msg = "Failed to login";

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        msg = "Invalid email or password.";
      } else if (error.code === "auth/invalid-credential") {
        msg = "Invalid credentials. Please check your email and password.";
      } else if (error.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Try again later.";
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 shadow-lg rounded-xl p-6 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl text-black font-bold text-center mb-4">Login</h2>

        <div className="space-y-2">
          <label className="text-sm text-black font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-black"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-black font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 text-black rounded-lg"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Loading..." : "Login"}
        </button>

    <div className="py-4 text-center">
  Don’t have an account?{" "}
  <span
    onClick={() => router.push("/Register")}
    className="text-blue-600 cursor-pointer"
    >
    Register here
  </span>
</div>
    </form>
    </div>
  );
}
