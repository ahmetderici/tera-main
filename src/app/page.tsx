'use client'

import "./globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from 'next/image';
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { AnimatedSection } from './components/AnimatedSection'
import { motion } from 'framer-motion'

// Navbar Component
const navLinks = [
  { name: "Product", href: "#product" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

// --- Kurumsal Outline Iconlar (SVG) ---
const icons = {
  upload: (
    <svg className="w-10 h-10 text-indigo-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="4" y="16" width="16" height="4" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ai: (
    <svg className="w-10 h-10 text-pink-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  ),
  review: (
    <svg className="w-10 h-10 text-cyan-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ferpa: (
    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2l4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  lock: (
    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="5" y="11" width="14" height="8" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  team: (
    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a7.5 7.5 0 0113 0" />
    </svg>
  ),
  price: (
    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  mail: (
    <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6l9-6" />
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 8a4 4 0 0 1 4 4v6M8 8v10M8 8a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v10" />
    </svg>
  ),
};

function StickyCTA() {
  return (
    <a href="/contact" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg block md:hidden text-center">
      Contact us
    </a>
  );
}

function Hero() {
  return (
    <AnimatedSection className="flex flex-col items-center text-center px-4 py-16 md:py-20 max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        1-Minute FIE Reports.<br/>
        100% TEA-Aligned.<br/>
        FERPA-Compliant.
      </motion.h1>
      <motion.p 
        className="mt-6 text-lg text-gray-300 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Empowering Texas diagnosticians with AI-generated, fully editable FIE reports.
      </motion.p>
      <motion.div 
        className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/pricing" className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:scale-105 transition w-full sm:w-auto">
          See Plans
        </Link>
        <Link href="/product" className="border border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-black transition w-full sm:w-auto">
          Learn More
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}

function ProductSection() {
  return (
    <section id="product" className="mt-12 max-w-6xl mx-auto px-4">
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
              <div className="bg-gray-800 rounded p-2 text-xs text-gray-300 mb-2">Based on the comprehensive evaluation, John meets the criteria for Specific Learning Disability with a primary manifestation in Dyslexia, as evidenced by ….</div>
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
            <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full mb-2 block">Best for diagnosticians</span>
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 20l4-4a12 12 0 0 1 8-8l4-4-4 4a12 12 0 0 1-8 8l-4 4z"/><circle cx="12" cy="12" r="2"/></svg>
            <h3 className="text-2xl font-semibold mb-2 text-white">Pro <span className="text-lg font-normal">- $200/mo</span></h3>
            <p className="mb-4 text-gray-300">10 reports per month</p>
            <button className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto">Start Now</button>
          </div>
        </div>
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-800">
          <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full mb-4">Best for schools and districts</span>
          <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 22 12 12 22 2 12 12 2"/></svg>
          <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
          <p className="mb-4 text-gray-400">More report credits for the whole team</p>
          <button className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto">Contact Us</button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="mt-32 max-w-3xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-10">About FIE Pilot</h2>
      <p className="text-lg text-gray-300 mb-8">
        FIE Pilot's mission is to revolutionize special education evaluations in Texas by harnessing AI technology. We empower diagnosticians, psychologists, and special education professionals to focus on students, not paperwork.
      </p>
      <p className="text-gray-400 mb-8">
        Our platform is designed in collaboration with Texas educators and neuropsychologists, ensuring every FIE report is both legally compliant and tailored to each student. By automating the most time-consuming parts of the process, FIE Pilot gives educators more time for what matters most.
      </p>
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          {icons.team}
          <span className="font-semibold">Isa Pakatci</span>
          <span className="text-xs text-gray-400">AI Engineer</span>
        </div>
        <div className="flex flex-col items-center">
          {icons.team}
          <span className="font-semibold">Muhammet Akar</span>
          <span className="text-xs text-gray-400">Educational Diagnostician</span>
        </div>
      </div>
    </section>
  );
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
          <div className="text-gray-400 text-sm">Student data privacy ensured.</div>
        </div>
        {/* COPPA Card */}
        <div className="flex flex-col items-center bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 w-full md:w-1/3 max-w-xs">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 mb-4 shadow-lg">
            {/* Shield/child SVG */}
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2l7 4v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V6l7-4z" stroke="white" strokeWidth="2.5" fill="none"/><circle cx="12" cy="10" r="2.5" fill="white"/><path d="M10.5 15c.5-1 2.5-1 3 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="text-lg font-semibold text-white mb-1">COPPA Aligned</div>
          <div className="text-gray-400 text-sm">Designed with child data protection in mind.</div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function WhyTeraSection() {
  return (
    <AnimatedSection className="mt-32 max-w-3xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-8">🏆 Why FIE Pilot?</h2>
      <ul className="text-lg text-gray-300 space-y-3">
        <li>• Built for Texas special education needs.</li>
        <li>• Backed by neuropsychologists and school districts.</li>
        <li>• No steep learning curve — get started in minutes.</li>
      </ul>
    </AnimatedSection>
  );
}

function ContactSection() {
  const [status, setStatus] = useState<null | 'success' | 'error' | 'loading'>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/xvgrgpzp", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <AnimatedSection className="mt-32 max-w-xl mx-auto text-center px-4 mb-0 pb-0">
      <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
      <p className="text-gray-400 mb-4">A FIE Pilot team member will reach out within 1 business day.</p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="p-3 rounded bg-gray-900 text-white border border-gray-600"
        />
        <input
          type="email"
          name="email"
          placeholder="School Email"
          required
          className="p-3 rounded bg-gray-900 text-white border border-gray-600"
        />
        <textarea
          name="message"
          placeholder="Tell us about your needs..."
          rows={4}
          required
          className="p-3 rounded bg-gray-900 text-white border border-gray-600"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded hover:scale-105 transition"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Submit'}
        </button>
        {status === 'success' && <div className="text-green-400 mt-2">Thank you! We will contact you soon.</div>}
        {status === 'error' && <div className="text-red-400 mt-2">An error occurred. Please try again.</div>}
      </form>
      <div className="mt-8 flex flex-col items-center gap-2 text-gray-400">
        <div className="flex gap-4 text-xl">
          <a href="mailto:info@fiepilot.ai" aria-label="Email" className="hover:text-white">{icons.mail}</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">{icons.linkedin}</a>
        </div>
        <span>info@fiepilot.ai</span>
      </div>
    </AnimatedSection>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>FIE Pilot | AI-Powered FIE Automation</title>
        <meta name="description" content="FIE Pilot helps Texas schools generate legally compliant FIE evaluations in hours — not days. FERPA compliant, secure, and trusted by experts." />
      </Head>
      <main className="flex flex-col min-h-screen bg-black text-white">
        {/* Glow Backgrounds */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute -bottom-40 right-[-300px] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 -z-10" />
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Hero />
          <ProductSection />
          <PricingSection />
          <AboutSection />
          <TrustedBySection />
          <WhyTeraSection />
          <ContactSection />
        </div>
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}