"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUsers, FiFileText, FiBarChart2, FiClock, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import { firestore } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }

    // Set up real-time listener for users collection
    const usersQuery = query(collection(firestore, 'users'), orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setLastFetch(new Date());
      setLoading(false);
    }, (err) => {
      console.error('Error in Firestore listener:', err);
      setError('Failed to load users. Please try again.');
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        <div className="text-center">
          <FiRefreshCw className="animate-spin mx-auto mb-4 text-4xl" />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center gap-2 mx-auto"
          >
            <FiRefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Top bar with Admin Panel title and Sign Out button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={() => {
              localStorage.removeItem("adminAuth");
              router.push("/");
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold"
          >
            Sign Out
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-gray-400">Plan: {user.plan}</p>
                </div>
                {user.plan === 'trial' && (
                  <button
                    onClick={() => {
                      fetch('/api/admin/users', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email }),
                      }).then(() => {
                        // Firestore listener will automatically update the UI
                      });
                    }}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                  >
                    Upgrade to Pro
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 