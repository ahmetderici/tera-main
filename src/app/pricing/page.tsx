'use client'

import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AnimatedSection } from '../components/AnimatedSection'
import { motion } from 'framer-motion'
import Link from 'next/link'

function PricingSection() {
  return (
    <AnimatedSection className="mt-32 max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-10">Pricing Plans</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div 
          className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-800"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full mb-2">Starter Plan</span>
          <svg className="w-8 h-8 text-purple-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Free</h3>
          <p className="mb-4 text-gray-400">Up to 3 reports per month.</p>
          <Link href="/contact" className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto hover:opacity-90 transition">
            Start Now
          </Link>
          <p className="text-xs text-gray-400 mt-2">No credit card required</p>
        </motion.div>
        <motion.div 
          className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-1 rounded-lg shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gray-900 w-full h-full p-8 rounded-lg flex flex-col items-center border border-gray-800">
            <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full mb-2">Best for small school districts</span>
            <svg className="w-8 h-8 text-purple-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <h3 className="text-2xl font-semibold mb-2 text-white">Pro <span className="text-lg font-normal">- $200/mo</span></h3>
            <p className="mb-4 text-gray-300">Up to 10 reports per month.</p>
            <Link href="/contact" className="bg-white text-black px-6 py-2 rounded-md font-semibold mt-auto hover:opacity-90 transition">
              Start Now
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-800"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full mb-2">Tailored for multi-campus districts</span>
          <svg className="w-8 h-8 text-purple-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
          <p className="mb-4 text-gray-400">Custom solutions tailored for your school.</p>
          <Link href="/contact" className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto hover:opacity-90 transition">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default function PricingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <PricingSection />
      </div>
      <Footer />
    </main>
  )
} 