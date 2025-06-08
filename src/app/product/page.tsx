'use client'

import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AnimatedSection } from '../components/AnimatedSection'
import { motion } from 'framer-motion'

function ProductSection() {
  return (
    <section id="product" className="mt-32 max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-10 text-center">AI-powered FIE Automation</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-10">
        {/* Left: AI Illustration */}
        <div className="flex-1 flex flex-col items-center md:items-end">
          <div className="w-48 h-48 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl mb-6">
            {/* Magic wand icon */}
            <svg className="w-24 h-24 text-white opacity-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 48 48">
              <path d="M24 6v6M24 36v6M6 24h6M36 24h6M12.2 12.2l4.2 4.2M31.6 31.6l4.2 4.2M12.2 35.8l4.2-4.2M31.6 16.4l4.2-4.2" strokeLinecap="round"/>
              <rect x="20" y="20" width="8" height="8" rx="2" fill="white" stroke="currentColor"/>
            </svg>
          </div>
          <div className="hidden md:block w-80 text-right text-lg text-gray-300 font-medium">Let AI handle the paperwork, so you can focus on students.</div>
        </div>
        {/* Right: FIE Report Preview */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="w-[340px] h-[220px] bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 rounded-2xl shadow-2xl border border-gray-800 flex flex-col p-6 justify-between mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-white text-lg font-bold mb-1">FIE Report Preview</div>
              <div className="text-gray-400 text-xs mb-2">Student: John Doe | Date: 2024-05-20</div>
              <div className="bg-gray-800 rounded p-2 text-xs text-gray-300 mb-2">Further evaluation is recommended. You can edit and personalize this AI-generated draft before exporting.</div>
              <div className="flex gap-2 mt-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">WISC</span>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">BASC</span>
                <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded">Teacher Input</span>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-500">*Editable preview</span>
            </div>
          </div>
          {/* Mini Scenario Card */}
          <div className="w-[340px] bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-xl shadow-lg p-4 text-left text-white text-sm font-medium border border-indigo-900">
            <span className="block font-bold mb-1">Mini Scenario</span>
            Diagnosticians can upload WISC or BASC scores at 9 AM and export a ready-to-review FIE report before their 10 AM meeting.
          </div>
        </div>
      </div>
      {/* 3-Step Process Flow */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-8 mt-8 mb-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 w-full md:w-1/3 z-10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white text-xl font-bold mb-3 shadow-lg">1</div>
          {/* Upload icon */}
          <svg className="w-8 h-8 text-indigo-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="16" width="16" height="4" rx="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 16v2a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2"/></svg>
          <div className="font-semibold mb-1">Drop all your reports and expert opinions</div>
          <div className="text-gray-400 text-xs">Upload all assessment files, PDFs, and expert notes in one place. No formatting needed.</div>
        </div>
        {/* Arrow 1 */}
        <div className="hidden md:flex items-center justify-center h-full z-0">
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12h50m0 0l-6-6m6 6l-6 6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 w-full md:w-1/3 z-10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-bold mb-3 shadow-lg">2</div>
          {/* Magic wand icon */}
          <svg className="w-8 h-8 text-pink-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/><rect x="9" y="9" width="6" height="6" rx="1" fill="white" stroke="currentColor"/></svg>
          <div className="font-semibold mb-1">Let AI do the magic</div>
          <div className="text-gray-400 text-xs">Our AI instantly analyzes your documents and generates a TEA-aligned FIE draft for you.</div>
        </div>
        {/* Arrow 2 */}
        <div className="hidden md:flex items-center justify-center h-full z-0">
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12h50m0 0l-6-6m6 6l-6 6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 w-full md:w-1/3 z-10">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 text-white text-xl font-bold mb-3 shadow-lg">3</div>
          {/* Document with checkmark icon */}
          <svg className="w-8 h-8 text-cyan-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12l2 2l4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="font-semibold mb-1">Your FIE report is ready!</div>
          <div className="text-gray-400 text-xs">Review and edit the preview as needed. Export your finalized, compliant FIE report in minutes.</div>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-8">*All data is encrypted and FERPA compliant.</p>
    </section>
  )
}

function TrustedBySection() {
  return (
    <AnimatedSection className="mt-32 max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-10">Trusted by Texas Educators</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* FERPA Card */}
        <div className="flex flex-col items-center bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 w-full md:w-1/3 max-w-xs">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 mb-4 shadow-lg">
            {/* Blue check SVG */}
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5" fill="none"/><path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="text-lg font-semibold text-white mb-1">FERPA Compliant</div>
          <div className="text-gray-400 text-sm mb-1">Student data privacy ensured.</div>
          <div className="text-gray-500 text-xs">All student data is encrypted and handled securely.</div>
        </div>
        {/* COPPA Card */}
        <div className="flex flex-col items-center bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 w-full md:w-1/3 max-w-xs">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 mb-4 shadow-lg">
            {/* Shield/child SVG */}
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2l7 4v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V6l7-4z" stroke="white" strokeWidth="2.5" fill="none"/><circle cx="12" cy="10" r="2.5" fill="white"/><path d="M10.5 15c.5-1 2.5-1 3 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="text-lg font-semibold text-white mb-1">COPPA Aligned</div>
          <div className="text-gray-400 text-sm mb-1">Designed with child data protection in mind.</div>
          <div className="text-gray-500 text-xs">We follow best practices for child data privacy.</div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function ProductPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <ProductSection />
        <TrustedBySection />
      </div>
      <Footer />
    </main>
  )
} 