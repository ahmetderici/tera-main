"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Entry() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      localStorage.removeItem("user");
      const user = localStorage.getItem("user");
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/auth/register");
      }
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return null;
} 