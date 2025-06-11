"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUsers, FiFileText, FiBarChart2, FiClock, FiCheckCircle } from "react-icons/fi";

interface UserStats {
  name: string;
  email: string;
  school?: string;
  totalReports: number;
  monthlyReports: number;
  pendingReviews: number;
  lastActive: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is authenticated
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }

    // Load all users' data from localStorage
    const loadUserData = () => {
      const allUsers: UserStats[] = [];
      
      // Get all keys from localStorage
      const keys = Object.keys(localStorage);
      
      // Process each key
      keys.forEach(key => {
        if (key === "user") {
          const userData = JSON.parse(localStorage.getItem(key) || "{}");
          const previousForms = JSON.parse(localStorage.getItem("previousForms") || "[]");
          
          const now = new Date();
          const thisMonthCount = previousForms.filter((f: { timestamp: number }) => {
            const d = new Date(f.timestamp);
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
          }).length;

          allUsers.push({
            name: userData.name || "Unknown User",
            email: userData.email || "No email",
            school: userData.school || "Not specified",
            totalReports: previousForms.length,
            monthlyReports: thisMonthCount,
            pendingReviews: 0,
            lastActive: previousForms.length > 0 
              ? new Date(Math.max(...previousForms.map((f: { timestamp: number }) => f.timestamp))).toLocaleDateString()
              : "Never"
          });
        }
      });

      setUsers(allUsers);
      setIsLoading(false);
    };

    loadUserData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-300">Monitor user activity and report generation</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Total Users: {users.length}</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 rounded-2xl p-7 border border-gray-800 shadow-lg flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-indigo-200">
              <FiUsers className="w-6 h-6" />
              <span className="text-gray-300">Total Users</span>
            </div>
            <div className="text-3xl font-bold mt-2">{users.length}</div>
          </div>
          <div className="bg-gradient-to-br from-pink-700 via-indigo-700 to-purple-700 rounded-2xl p-7 border border-gray-800 shadow-lg flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-pink-200">
              <FiFileText className="w-6 h-6" />
              <span className="text-gray-300">Total Reports</span>
            </div>
            <div className="text-3xl font-bold mt-2">
              {users.reduce((sum, user) => sum + user.totalReports, 0)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-700 via-pink-700 to-indigo-700 rounded-2xl p-7 border border-gray-800 shadow-lg flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-purple-200">
              <FiClock className="w-6 h-6" />
              <span className="text-gray-300">This Month</span>
            </div>
            <div className="text-3xl font-bold mt-2">
              {users.reduce((sum, user) => sum + user.monthlyReports, 0)}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800/80 rounded-2xl p-8 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FiUsers className="w-6 h-6 text-indigo-400" /> User Statistics
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4 text-gray-400 font-medium w-[200px]">User</th>
                  <th className="pb-4 text-gray-400 font-medium w-[250px]">Email</th>
                  <th className="pb-4 text-gray-400 font-medium w-[200px]">School</th>
                  <th className="pb-4 text-gray-400 font-medium w-[120px]">Total Reports</th>
                  <th className="pb-4 text-gray-400 font-medium w-[120px]">This Month</th>
                  <th className="pb-4 text-gray-400 font-medium w-[120px]">Pending</th>
                  <th className="pb-4 text-gray-400 font-medium w-[120px]">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {user.name[0].toUpperCase()}
                        </div>
                        <span className="font-medium truncate">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-300 truncate" title={user.email}>
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-300 truncate" title={user.school}>
                        {user.school}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <FiFileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span>{user.totalReports}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <FiBarChart2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                        <span>{user.monthlyReports}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span>{user.pendingReviews}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-400 whitespace-nowrap">{user.lastActive}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 