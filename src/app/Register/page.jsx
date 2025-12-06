"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // Create User
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(userCred.user, { displayName: name });

      // Save to Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      setSuccessMsg("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/Home");
      }, 1000);
    } catch (err) {
      console.log(err);

      if (err.code === "auth/email-already-in-use") {
        setErrorMsg("Email already registered");
      } else if (err.code === "auth/invalid-email") {
        setErrorMsg("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        setErrorMsg("Password should be at least 6 characters");
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold transition"
          >
            {loading ? "loading..." : "Register"}
          </button>

          {errorMsg && (
            <p className="text-center text-red-600 font-medium">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-center text-green-600 font-medium">
              {successMsg}
            </p>
          )}
        </form>

         <div className="py-4 text-center">
            Already have an account?{" "}
            <span onClick={()=> router.push("/Login")} className="text-blue-600">
              Login here
            </span>
          </div>
      </div>
    </div>
  );
}
