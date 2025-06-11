"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (!parsedUser.name) {
      localStorage.removeItem("user");
      router.push("/auth/register");
      return;
    }
    setUser(parsedUser);
  }, [router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return null; // Placeholder for the removed Dashboard component
} 