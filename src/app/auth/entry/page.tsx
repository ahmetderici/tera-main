"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Entry() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const storedUser = localStorage.getItem("user");
      const sessionEmail = session.user.email.toLowerCase().trim();
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const userEmail = (parsedUser.email || "").toLowerCase().trim();
        console.log("Session email:", sessionEmail, "Stored user email:", userEmail);
        if (userEmail === sessionEmail) {
          router.push("/dashboard");
          return;
        } else {
          localStorage.removeItem("user");
        }
      }
      router.push("/auth/register");
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  return null;
} 