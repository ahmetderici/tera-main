'use client'

import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AnimatedSection } from '../components/AnimatedSection'
import { motion } from 'framer-motion'

function AboutSection() {
  return (
    <AnimatedSection className="mt-32 max-w-3xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-10">About FIE Pilot</h2>
      <motion.p 
        className="text-lg text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        FIE Pilot's mission is to revolutionize special education evaluations in Texas by harnessing AI technology. We empower diagnosticians, psychologists, and special education professionals to focus on students, not paperwork.
      </motion.p>
      <motion.p 
        className="text-gray-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Our platform is designed in collaboration with Texas educators and neuropsychologists, ensuring every FIE report is both legally compliant and tailored to each student. By automating the most time-consuming parts of the process, FIE Pilot gives educators more time for what matters most.
      </motion.p>
      <motion.div 
        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-purple-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a7.5 7.5 0 0113 0" />
          </svg>
          <span className="font-semibold">Isa Pakatci</span>
          <span className="text-xs text-gray-400">AI Engineer</span>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-purple-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a7.5 7.5 0 0113 0" />
          </svg>
          <span className="font-semibold">Muhammet Akar</span>
          <span className="text-xs text-gray-400">Educational Diagnostician</span>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
} 