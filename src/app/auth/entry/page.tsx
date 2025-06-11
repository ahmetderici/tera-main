"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Entry() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const res = await fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`);
        if (res.ok) {
          router.push("/dashboard");
        } else {
          router.push("/auth/register");
        }
      }
      if (status === "unauthenticated") {
        router.push("/");
      }
    };
    checkUser();
  }, [status, session, router]);

  return null;
} 