"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface EditablePreviewProps {
  content: string;
}

export default function EditablePreview({ content }: EditablePreviewProps) {
  const [editedContent, setEditedContent] = useState(content);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Generated Report</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              // In the future, this could trigger PDF download
              alert("Download functionality will be implemented soon!");
            }}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-all flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download as PDF</span>
          </button>
        </div>
      </div>

      <div
        contentEditable
        className="min-h-[400px] p-6 bg-gray-700/50 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600 prose prose-invert max-w-none"
        onInput={(e) => setEditedContent(e.currentTarget.textContent || "")}
        dangerouslySetInnerHTML={{ __html: editedContent }}
      />

      <div className="flex items-center justify-between text-sm text-gray-400">
        <p>You can edit the content above. Changes will be saved automatically.</p>
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last saved: Just now</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
} 