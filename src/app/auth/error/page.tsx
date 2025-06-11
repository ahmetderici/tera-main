"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function AuthError() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50 text-center">
          <div className="flex justify-center mb-6">
            <FiAlertCircle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-8">
            Your email is not authorized to access FIE Pilot. Please contact your administrator for access.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Return to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
} 