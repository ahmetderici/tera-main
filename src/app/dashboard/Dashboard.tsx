"use client";

import { useState, useEffect } from "react";
import UploadBox from "./UploadBox";
import GenerateButton from "./GenerateButton";
import EditablePreview from "./EditablePreview";
import { motion } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { useRouter } from "next/navigation";
import { FiUser, FiFileText, FiSettings, FiLogOut, FiBarChart2, FiClock, FiCheckCircle, FiDownload, FiTrash2, FiEdit2, FiCheck, FiX, FiUsers } from "react-icons/fi";
import { signOut } from "next-auth/react";

interface DashboardProps {
  session: {
    user: {
      name: string;
      email?: string;
      school?: string;
      title?: string;
    };
  };
  reports: any[];
  fetchReports?: () => Promise<void>;
}

export default function Dashboard({ session, reports, fetchReports }: DashboardProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [renamingIdx, setRenamingIdx] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const router = useRouter();
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [userName, setUserName] = useState(session.user.name);
  const [userTitle, setUserTitle] = useState(session.user.title || "Diagnostician");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFormsMobile, setShowFormsMobile] = useState(false);

  // Raporlar artık props.reports üzerinden geliyor
  const previousForms = reports;
  const totalReports = reports.length;
  const now = new Date();
  const monthlyReports = reports.filter((f: { createdAt: string }) => {
    const d = new Date(f.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
  const pendingReviews = 0; // Gerekirse backend'den alınabilir

  // Load user title from localStorage if exists
  useEffect(() => {
    const storedTitle = localStorage.getItem("userTitle");
    if (storedTitle) setUserTitle(storedTitle);
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  // Check if user is admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsAdmin(userData.email === "admin@fiepilot.com"); // Admin email kontrolü
    }
  }, []);

  // Helper to save previous forms to localStorage
  const savePreviousForms = (forms: { url: string; timestamp: number }[]) => {
    localStorage.setItem("previousForms", JSON.stringify(forms));
  };

  const handleDownloadMergedPdf = async () => {
    if (!mergedPdfUrl) return;
    // Backend'e rapor kaydet
    await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        url: mergedPdfUrl,
        name: `Report ${new Date().toLocaleString()}`,
      }),
    });
    // Raporları güncelle
    if (fetchReports) await fetchReports();
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Merge PDFs
    if (files.length > 0) {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      setGeneratedContent(null); // No AI content for now
      // Do NOT save to previous forms here
    } else {
      setGeneratedContent("No files to merge.");
      setMergedPdfUrl(null);
    }
    setIsGenerating(false);
  };

  // Delete a previous form
  const handleDeleteForm = async (idx: number) => {
    const report = previousForms[idx];
    if (!report || !report.id) return;
    await fetch(`/api/report?id=${encodeURIComponent(report.id)}`, {
      method: "DELETE"
    });
    if (fetchReports) await fetchReports();
  };

  // Start renaming
  const handleStartRename = (idx: number) => {
    setRenamingIdx(idx);
    setRenameValue(previousForms[idx].name || `Form ${previousForms.length - idx}`);
  };

  // Save rename
  const handleSaveRename = (idx: number) => {
    const updated = previousForms.map((form, i) =>
      i === idx ? { ...form, name: renameValue } : form
    );
    savePreviousForms(updated);
    setRenamingIdx(null);
    setRenameValue("");
  };

  // Cancel rename
  const handleCancelRename = () => {
    setRenamingIdx(null);
    setRenameValue("");
  };

  // Save user name and title to localStorage
  const handleSaveUserSettings = () => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userTitle", userTitle);
    setShowUserSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:fixed md:left-0 md:top-0 md:h-full md:w-72 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-b md:border-b-0 md:border-r border-gray-800 p-6 flex flex-col justify-between z-20 shadow-2xl">
        <div>
          {/* User Card */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-lg mb-2">
              {userName[0].toUpperCase()}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold">{userName}</div>
              <button className="text-indigo-300 hover:text-indigo-500" onClick={() => setShowUserSettings(v => !v)} title="Edit Profile"><FiSettings /></button>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">{userTitle}</div>
            {showUserSettings && (
              <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4 w-60 flex flex-col items-stretch shadow-xl z-50">
                <label className="text-xs text-gray-300 mb-1">Name</label>
                <input
                  className="mb-3 px-2 py-1 rounded bg-gray-900 border border-indigo-400 text-white focus:outline-none"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
                <label className="text-xs text-gray-300 mb-1">Title</label>
                <input
                  className="mb-3 px-2 py-1 rounded bg-gray-900 border border-indigo-400 text-white focus:outline-none"
                  value={userTitle}
                  onChange={e => setUserTitle(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 px-2 py-1 rounded bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold" onClick={handleSaveUserSettings}>Save</button>
                  <button className="flex-1 px-2 py-1 rounded bg-gray-700 text-gray-300 border border-gray-600" onClick={() => setShowUserSettings(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Previous Forms - Collapsible on mobile */}
          <div className="mb-6">
            <div className="flex items-center justify-between md:block">
              <h4 className="text-md font-semibold text-gray-200 mb-3 md:mb-3">Previous Forms</h4>
              <button
                className="md:hidden px-3 py-1 bg-gray-700 rounded text-xs text-gray-200"
                onClick={() => setShowFormsMobile(v => !v)}
              >
                {showFormsMobile ? "Hide" : "Show"}
              </button>
            </div>
            <ul className={`space-y-3 max-h-56 overflow-y-auto pr-2 ${showFormsMobile ? "block" : "hidden"} md:block`}>
              {previousForms.length === 0 && (
                <li className="text-gray-500 text-sm">No previous forms</li>
              )}
              {previousForms.map((form, idx) => (
                <li key={form.timestamp} className="flex items-center bg-gray-700/80 rounded-lg px-3 py-2 shadow hover:bg-gray-600 transition group">
                  <FiDownload className="w-4 h-4 text-indigo-400 mr-2 flex-shrink-0" />
                  {renamingIdx === idx ? (
                    <>
                      <input
                        className="bg-gray-800 text-white rounded px-2 py-1 text-xs w-20 focus:outline-none border border-indigo-400"
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") handleSaveRename(idx);
                          if (e.key === "Escape") handleCancelRename();
                        }}
                        autoFocus
                      />
                      <button className="ml-1 text-green-400 hover:text-green-600" onClick={() => handleSaveRename(idx)}><FiCheck /></button>
                      <button className="ml-1 text-red-400 hover:text-red-600" onClick={handleCancelRename}><FiX /></button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 min-w-0">
                        <a href={form.url} download={`${form.name || `merged-report-${form.timestamp}`}.pdf`} className="hover:underline text-sm whitespace-nowrap overflow-hidden text-ellipsis block">
                          {form.name || `Form ${previousForms.length - idx}`}
                        </a>
                      </span>
                      <div className="flex items-center min-w-[60px] justify-end">
                        <button className="ml-2 text-indigo-300 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition" onClick={() => handleStartRename(idx)} title="Rename"><FiEdit2 /></button>
                        <button className="ml-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition" onClick={() => handleDeleteForm(idx)} title="Delete"><FiTrash2 /></button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Admin Link */}
          {isAdmin && (
            <div className="mt-6">
              <a
                href="/admin"
                className="flex items-center gap-3 text-indigo-400 hover:text-indigo-300 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors font-medium"
              >
                <FiUsers className="w-5 h-5" />
                <span>Admin Panel</span>
              </a>
            </div>
          )}
        </div>
        {/* Bottom: Sign Out */}
        <div className="mt-8 flex flex-col items-center">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg text-white font-semibold shadow hover:scale-105 transition mb-2 w-full justify-center"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <FiLogOut className="w-5 h-5" /> Sign Out
          </button>
          <span className="text-xs text-gray-500">FIE Pilot v1.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-4 md:p-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Welcome */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-2">Welcome back, {session.user.name} 👋</h1>
              <p className="text-lg text-gray-300">Your AI-powered FIE workspace</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 rounded-2xl p-7 border border-gray-800 shadow-lg flex flex-col items-start gap-2 hover:scale-[1.03] transition-transform">
              <div className="flex items-center gap-2 text-indigo-200"><FiBarChart2 className="w-6 h-6" /><span className="text-gray-300">Total Reports</span></div>
              <div className="text-3xl font-bold mt-2">{totalReports}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-700 via-indigo-700 to-purple-700 rounded-2xl p-7 border border-gray-800 shadow-lg flex flex-col items-start gap-2 hover:scale-[1.03] transition-transform">
              <div className="flex items-center gap-2 text-pink-200"><FiClock className="w-6 h-6" /><span className="text-gray-300">This Month</span></div>
              <div className="text-3xl font-bold mt-2">{monthlyReports}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-700 via-pink-700 to-indigo-700 rounded-2xl p-7 border border-gray-800 shadow-lg flex flex-col items-start gap-2 hover:scale-[1.03] transition-transform">
              <div className="flex items-center gap-2 text-purple-200"><FiCheckCircle className="w-6 h-6" /><span className="text-gray-300">Pending Reviews</span></div>
              <div className="text-3xl font-bold mt-2">{pendingReviews}</div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-gray-800/80 rounded-2xl p-8 border border-gray-700 mb-10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FiFileText className="w-6 h-6 text-indigo-400" /> Upload Assessment Files</h2>
            <UploadBox files={files} setFiles={setFiles} />
          </div>

          {/* Generate Button */}
          {files.length > 0 && (
            <div className="mb-10">
              <GenerateButton
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
              />
            </div>
          )}

          {/* Preview Section */}
          {mergedPdfUrl && (
            <div className="bg-gray-800/80 rounded-2xl p-8 border border-gray-700 flex flex-col items-center shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FiFileText className="w-6 h-6 text-indigo-400" /> Merged PDF Preview</h3>
              <a
                href={mergedPdfUrl}
                download="merged-report.pdf"
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-all mb-6 flex items-center gap-2"
                onClick={handleDownloadMergedPdf}
              >
                <FiDownload className="w-5 h-5" /> Download Merged PDF
              </a>
              <iframe
                src={mergedPdfUrl}
                title="Merged PDF Preview"
                className="w-full h-96 rounded border border-gray-700 bg-white"
              />
            </div>
          )}
          {!mergedPdfUrl && generatedContent && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <EditablePreview content={generatedContent} />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
} 