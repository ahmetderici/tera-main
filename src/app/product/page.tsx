'use client'

import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AnimatedSection } from '../components/AnimatedSection'
import { motion } from 'framer-motion'

function ProductSection() {
  return (
    <AnimatedSection className="mt-32 max-w-5xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-8">AI-powered FIE Automation</h2>
      <p className="text-lg text-gray-300 mb-8">
        Tera utilizes advanced AI to swiftly create legally compliant FIE reports tailored for Texas schools. Let the AI do the magic — get results in 1 minute.
      </p>
      <div className="bg-gray-800/60 rounded-lg p-6 mb-8 text-left text-base text-gray-200 max-w-xl mx-auto">
        <span className="font-semibold text-white">Mini Scenario:</span> Diagnosticians can upload WISC or BASC scores at 9 AM and export a ready-to-review FIE report before their 10 AM meeting.
      </div>
      <ul className="max-w-2xl mx-auto space-y-4 mb-12 text-gray-400 text-lg text-left">
        <li>• Uses reliable assessment sources such as <span className="font-semibold text-white">WISC</span>, <span className="font-semibold text-white">BASC</span>, and more.</li>
        <li>• Generate and review reports in 1 minute.</li>
        <li>• Fully editable reports to ensure accuracy and compliance.</li>
      </ul>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        <motion.div 
          className="w-[320px] h-[200px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl font-bold opacity-80 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span>Report<br/>Mockup</span>
        </motion.div>
        <motion.div 
          className="w-[320px] h-[200px] bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white text-base shadow-lg border border-gray-800"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span className="font-semibold mb-2">Editable Preview</span>
          <span className="text-xs text-gray-400">Users can review and edit the AI-generated report before exporting.</span>
        </motion.div>
      </div>
      <p className="text-center text-gray-500 text-sm">*All data is encrypted and FERPA compliant.</p>
    </AnimatedSection>
  )
}

function HowItWorks() {
  return (
    <AnimatedSection className="mt-32 max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-12">How Tera Works</h2>
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        <motion.div 
          className="flex flex-col items-center bg-gray-900 rounded-xl p-8 shadow-lg w-full md:w-1/3 border border-gray-800 relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white text-3xl font-bold mb-4 shadow-lg">
            1
          </div>
          <svg className="w-10 h-10 text-indigo-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="4" y="16" width="16" height="4" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Upload Data</h3>
          <p className="text-gray-400">Securely upload evaluations & assessments.</p>
          <p className="text-sm text-gray-500 mt-2">Upload PDFs or structured forms via our secure platform.</p>
        </motion.div>
        <div className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 z-0">
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12h70m0 0l-6-6m6 6l-6 6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <motion.div 
          className="flex flex-col items-center bg-gray-900 rounded-xl p-8 shadow-lg w-full md:w-1/3 border border-gray-800 relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white text-3xl font-bold mb-4 shadow-lg">
            2
          </div>
          <svg className="w-10 h-10 text-pink-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M12 8v8" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">AI Generates FIE</h3>
          <p className="text-gray-400">AI drafts TEA-aligned FIE reports tailored to each case.</p>
          <p className="text-sm text-gray-500 mt-2">Our GPT-powered engine drafts legally aligned reports instantly.</p>
        </motion.div>
        <div className="hidden md:block absolute left-2/3 top-1/2 -translate-y-1/2 z-0">
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12h70m0 0l-6-6m6 6l-6 6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <motion.div 
          className="flex flex-col items-center bg-gray-900 rounded-xl p-8 shadow-lg w-full md:w-1/3 border border-gray-800 relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 text-white text-3xl font-bold mb-4 shadow-lg">
            3
          </div>
          <svg className="w-10 h-10 text-cyan-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Review & Share</h3>
          <p className="text-gray-400">Professionals review, finalize, and distribute the reports.</p>
          <p className="text-sm text-gray-500 mt-2">Professionals can edit, finalize, and export as needed.</p>
        </motion.div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="flex items-center gap-2 text-green-400 font-semibold">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2l4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          FERPA Compliant
        </span>
        <span className="text-xs text-gray-400">Tera complies with FERPA, ensuring all student data is handled securely and confidentially.</span>
      </div>
    </AnimatedSection>
  )
}

export default function ProductPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <ProductSection />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  )
} 