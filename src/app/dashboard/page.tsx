"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, [router, session, status]);

  const fetchReports = async () => {
    if (session?.user?.email) {
      setLoading(true);
      const userRes = await fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`);
      if (!userRes.ok) {
        router.push("/auth/register");
        return;
      }
      const userData = await userRes.json();
      setUser(userData);
      const reportsRes = await fetch(`/api/report?email=${encodeURIComponent(session.user.email)}`);
      const reportsData = reportsRes.ok ? await reportsRes.json() : [];
      setReports(reportsData);
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
  }
  if (!user) {
    return null;
  }
  return <Dashboard session={{ user }} reports={reports} fetchReports={fetchReports} />;
} 