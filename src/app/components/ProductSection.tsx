export function ProductSection() {
  return (
    <section id="product" className="mt-32 max-w-5xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold mb-8">AI-powered FIE Automation</h2>
      <p className="text-lg text-gray-300 mb-8">
        FIE Pilot utilizes advanced AI to swiftly create legally compliant FIE reports tailored for Texas schools. Let the AI do the magic — get results in 1 minute.
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
  )
} 