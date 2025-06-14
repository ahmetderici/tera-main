'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/fiepilot-logo.svg" alt="FIE Pilot Logo" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">FIE Pilot</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/product" className="text-gray-300 hover:text-white transition">Product</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            <Link href="/pricing" className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition">
              See Plans
            </Link>
            {status === "unauthenticated" && (
              <button
                onClick={() => signIn("google", { callbackUrl: "/auth/entry" })}
                className="ml-4 flex items-center gap-2 px-5 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/product" className="block px-3 py-2 text-gray-300 hover:text-white transition">Product</Link>
            <Link href="/pricing" className="block px-3 py-2 text-gray-300 hover:text-white transition">Pricing</Link>
            <Link href="/about" className="block px-3 py-2 text-gray-300 hover:text-white transition">About</Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-300 hover:text-white transition">Contact</Link>
            <Link href="/pricing" className="block px-3 py-2 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 transition">
              See Plans
            </Link>
            {status === "unauthenticated" && (
              <button
                onClick={() => signIn("google", { callbackUrl: "/auth/entry" })}
                className="w-full flex items-center gap-2 px-3 py-2 mt-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
} 