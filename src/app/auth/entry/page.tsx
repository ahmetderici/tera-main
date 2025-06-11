"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Entry() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email === session?.user?.email) {
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