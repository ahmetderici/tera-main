"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Entry() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkUser = async () => {
      if (status === "loading") return; // Wait for session to load

      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`);
          const data = await res.json();
          
          if (res.ok && data) {
            // User exists, go to dashboard
            router.push("/dashboard");
          } else {
            // User doesn't exist, go to registration
            router.push("/auth/register");
          }
        } catch (error) {
          console.error("Error checking user:", error);
          router.push("/auth/register");
        }
      } else if (status === "unauthenticated") {
        router.push("/");
      }
    };
    
    checkUser();
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-xl">
      Loading...
    </div>
  );
} 