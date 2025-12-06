"use client";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import Login from "@/app/Login/page";
import Dashboard from "@/app/Home/page";

export default function Home() {
  const [user, setUser] = useState();

  useEffect(() => auth.onAuthStateChanged(setUser), []);

  return user ? <Dashboard /> : <Login />;
}
