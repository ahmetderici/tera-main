import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 mb-0 pb-0 text-center text-sm text-gray-500 py-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
        <span className="flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2l4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          FERPA Compliant
        </span>
        <Link href="#privacy" className="underline hover:text-white">Privacy Policy</Link>
      </div>
      <div className="text-xs text-gray-600">FIE Pilot complies with FERPA, ensuring all student data is handled securely and confidentially.</div>
      <div className="mt-2">© 2025 FIE Pilot. All rights reserved.</div>
    </footer>
  )
} 