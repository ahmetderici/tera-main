"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUsers, FiFileText, FiBarChart2, FiClock, FiCheckCircle } from "react-icons/fi";

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = res.ok ? await res.json() : [];
    setUsers(data);
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
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
              {users.reduce((sum, user) => sum + user.reports.length, 0)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-700 via-pink-700 to-indigo-700 rounded-2xl p-7 border border-gray-800 shadow-lg flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-purple-200">
              <FiClock className="w-6 h-6" />
              <span className="text-gray-300">Last Report</span>
            </div>
            <div className="text-3xl font-bold mt-2">
              {users.length > 0
                ? new Date(users[0].reports[0].createdAt).toLocaleString()
                : "-"}
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
                  <th className="pb-4 text-gray-400 font-medium w-[200px]">Name</th>
                  <th className="pb-4 text-gray-400 font-medium w-[250px]">Email</th>
                  <th className="pb-4 text-gray-400 font-medium w-[200px]">School</th>
                  <th className="pb-4 text-gray-400 font-medium w-[120px]">Total Reports</th>
                  <th className="pb-4 text-gray-400 font-medium w-[120px]">Last Report</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: user.id * 0.1 }}
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
                        {user.school || "-"}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <FiFileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span>{user.reports.length}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-400 whitespace-nowrap">
                      {user.reports.length > 0
                        ? new Date(user.reports[0].createdAt).toLocaleString()
                        : "-"}
                    </td>
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