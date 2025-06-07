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
    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
      Request a Demo
    </a>
  );
}

function Hero() {
  return (
    <AnimatedSection className="flex flex-col items-center text-center px-4 py-20 md:py-32 max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        1-Minute FIE Reports. 100% TEA-Aligned. FERPA-Compliant.
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
  );
}

function ProductSection() {
  return (
    <section id="product" className="mt-32 max-w-5xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-8">AI-powered FIE Automation</h2>
      <p className="text-lg text-gray-300 mb-8">
        Tera utilizes advanced AI to swiftly create legally compliant FIE reports tailored for Texas schools. Let the AI do the magic — get results in 1 minute.
      </p>
      <ul className="max-w-2xl mx-auto space-y-4 mb-12 text-gray-400 text-lg text-left">
        <li>• Uses reliable assessment sources such as <span className="font-semibold text-white">WISC</span>, <span className="font-semibold text-white">BASC</span>, and more.</li>
        <li>• Generate and review reports in 1 minute.</li>
        <li>• Fully editable reports to ensure accuracy and compliance.</li>
      </ul>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        <div className="w-[320px] h-[200px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl font-bold opacity-80 shadow-lg">
          <span>Report<br/>Mockup</span>
        </div>
        <div className="w-[320px] h-[200px] bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white text-base shadow-lg border border-gray-800">
          <span className="font-semibold mb-2">Editable Preview</span>
          <span className="text-xs text-gray-400">Users can review and edit the AI-generated report before exporting.</span>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm">*All data is encrypted and FERPA compliant.</p>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="mt-32 max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-10">Pricing Plans</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-800">
          {icons.price}
          <h3 className="text-2xl font-semibold mb-2">Free</h3>
          <p className="mb-4 text-gray-400">Up to 3 reports per month.</p>
          <button className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto">Start Now</button>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-1 rounded-lg shadow-lg flex flex-col items-center">
          <div className="bg-gray-900 w-full h-full p-8 rounded-lg flex flex-col items-center border border-gray-800">
            {icons.price}
            <h3 className="text-2xl font-semibold mb-2 text-white">Pro <span className="text-lg font-normal">- $200/mo</span></h3>
            <p className="mb-4 text-gray-300">Up to 10 reports per month.</p>
            <button className="bg-white text-black px-6 py-2 rounded-md font-semibold mt-auto">Start Now</button>
          </div>
        </div>
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-800">
          {icons.price}
          <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
          <p className="mb-4 text-gray-400">Custom solutions tailored for your school.</p>
          <button className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-2 rounded-md font-semibold mt-auto">Contact Us</button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="mt-32 max-w-3xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-10">About Tera</h2>
      <p className="text-lg text-gray-300 mb-8">
        Tera's mission is to revolutionize special education evaluations in Texas by harnessing AI technology. We empower diagnosticians, psychologists, and special education professionals to focus on students, not paperwork.
      </p>
      <p className="text-gray-400 mb-8">
        Our platform is designed in collaboration with Texas educators and neuropsychologists, ensuring every FIE report is both legally compliant and tailored to each student. By automating the most time-consuming parts of the process, Tera gives educators more time for what matters most.
      </p>
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          {icons.team}
          <span className="font-semibold">Dr. Jane Doe</span>
          <span className="text-xs text-gray-400">Lead Neuropsychologist</span>
        </div>
        <div className="flex flex-col items-center">
          {icons.team}
          <span className="font-semibold">John Smith</span>
          <span className="text-xs text-gray-400">AI Engineer</span>
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  return (
    <AnimatedSection className="mt-32 max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-8">Trusted by Texas Educators</h2>
      <div className="grid md:grid-cols-3 gap-12 text-left">
        <div>
          <span className="text-2xl">✅</span>
          <h3 className="text-xl font-semibold mb-2 inline-block ml-2">FERPA Compliant</h3>
          <p className="text-gray-400">Student data privacy ensured.</p>
        </div>
        <div>
          <span className="text-2xl">🔒</span>
          <h3 className="text-xl font-semibold mb-2 inline-block ml-2">HIPAA Ready</h3>
          <p className="text-gray-400">Optional compliance for relevant assessments.</p>
        </div>
        <div>
          <span className="text-2xl">🧒</span>
          <h3 className="text-xl font-semibold mb-2 inline-block ml-2">COPPA Aligned</h3>
          <p className="text-gray-400">Designed with child data protection in mind.</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function WhyTeraSection() {
  return (
    <AnimatedSection className="mt-32 max-w-3xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-8">🏆 Why Tera?</h2>
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
      <p className="text-gray-400 mb-4">A Tera team member will reach out within 1 business day.</p>
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
          <a href="mailto:contact@tera.com" aria-label="Email" className="hover:text-white">{icons.mail}</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">{icons.linkedin}</a>
        </div>
        <span>contact@tera.com</span>
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
        <title>Tera | AI-Powered FIE Automation</title>
        <meta name="description" content="Tera helps Texas schools generate legally compliant FIE evaluations in hours — not days. FERPA compliant, secure, and trusted by experts." />
      </Head>
      <main className="flex flex-col min-h-screen bg-black text-white">
        {/* Glow Backgrounds */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute -bottom-40 right-[-300px] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 -z-10" />
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Hero />
          <HowItWorks />
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