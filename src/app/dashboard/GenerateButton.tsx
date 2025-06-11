"use client";

import { motion } from "framer-motion";

interface GenerateButtonProps {
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function GenerateButton({ isGenerating, onGenerate }: GenerateButtonProps) {
  return (
    <motion.button
      onClick={onGenerate}
      disabled={isGenerating}
      className={`w-full py-4 px-6 rounded-lg font-semibold transition-all relative overflow-hidden
        ${isGenerating 
          ? "bg-indigo-600 cursor-not-allowed" 
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-[1.02] hover:shadow-lg"
        }`}
      whileHover={!isGenerating ? { scale: 1.02 } : {}}
      whileTap={!isGenerating ? { scale: 0.98 } : {}}
    >
      {isGenerating ? (
        <div className="flex items-center justify-center space-x-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
          <span>Generating Report...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Generate Report</span>
        </div>
      )}
    </motion.button>
  );
} 