'use client'

import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AnimatedSection } from '../components/AnimatedSection'
import { motion } from 'framer-motion'
import Link from 'next/link'

function PricingSection() {
  return (
    <section id="pricing" className="mt-32 max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-10">Pricing Plans</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-800">
          <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full mb-4">Introductory Plan</span>
          <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2"/></svg>
          <h3 className="text-2xl font-semibold mb-2">Free</h3>
          <p className="mb-4 text-gray-400">2 reports free (lifetime)</p>
          <button className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto">Start Now</button>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-1 rounded-lg shadow-lg flex flex-col items-center">
          <div className="bg-gray-900 w-full h-full p-8 rounded-lg flex flex-col items-center border border-gray-800">
            <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full mb-2 block">Best for diagnosticians<br/>Best for Schools and Districts</span>
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 20l4-4a12 12 0 0 1 8-8l4-4-4 4a12 12 0 0 1-8 8l-4 4z"/><circle cx="12" cy="12" r="2"/></svg>
            <h3 className="text-2xl font-semibold mb-2 text-white">Pro <span className="text-lg font-normal">- $200/mo</span></h3>
            <p className="mb-4 text-gray-300">10 reports per month</p>
            <button className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto">Start Now</button>
          </div>
        </div>
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-800">
          <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full mb-4">Custom solutions for your School / District</span>
          <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 22 12 12 22 2 12 12 2"/></svg>
          <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
          <p className="mb-4 text-gray-400">More report credits for the whole team</p>
          <button className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto">Contact Us</button>
        </div>
      </div>
    </section>
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