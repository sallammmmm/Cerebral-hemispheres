import React from 'react';
import DiseaseGenerator from './components/DiseaseGenerator';
import CaseStudySection from './components/CaseStudySection';
import { BrainIcon } from './components/Icons';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <BrainIcon className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">NeuroSphere</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#overview" className="hover:text-teal-600 transition-colors">Anatomy</a>
              <a href="#clinical" className="hover:text-teal-600 transition-colors">Clinical Relevance</a>
              <a href="#cases" className="hover:text-teal-600 transition-colors">Case Studies</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Clinical Relevance of the <br />
              <span className="text-teal-400">Cerebral Hemispheres</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Explore the functional lateralization, anatomical nuances, and pathological presentations of the brain's two distinct halves.
            </p>
            <a href="#cases" className="inline-block bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-teal-500/20">
              Start Case Study
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Anatomy & Function Section */}
        <section id="overview" className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Functional Lateralization</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              The cerebral hemispheres exhibit a high degree of functional specialization. While anatomically similar, the left and right hemispheres process information differently, leading to distinct clinical presentations when injured.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
                <h3 className="text-indigo-600 font-bold mb-2">Dominant (Left)</h3>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  <li>Language (Broca's, Wernicke's)</li>
                  <li>Mathematical calculation</li>
                  <li>Logical reasoning</li>
                  <li>Sequence processing</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-orange-300 transition-colors">
                <h3 className="text-orange-600 font-bold mb-2">Non-Dominant (Right)</h3>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  <li>Spatial awareness</li>
                  <li>Face recognition</li>
                  <li>Emotional prosody</li>
                  <li>Music perception</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* BioDigital Link Replacement */}
          <div className="flex flex-col gap-3">
             <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 relative flex flex-col items-center justify-center p-8 text-center group">
               <div className="absolute inset-0 bg-slate-50 opacity-50"></div>
               <div className="relative z-10 max-w-md space-y-4">
                  <div className="mx-auto bg-white p-4 rounded-full shadow-sm w-16 h-16 flex items-center justify-center mb-2">
                    <BrainIcon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Interactive 3D Anatomy</h3>
                  <p className="text-slate-600 mb-4">
                    Explore major structures of the central nervous system in high detail on the BioDigital platform.
                  </p>
                  <a 
                    href="https://human.biodigital.com/view?id=production/maleAdult/major_structures_of_the_cns_guided&lang=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-full transition-all transform group-hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Launch 3D Viewer <span aria-hidden="true">&rarr;</span>
                  </a>
               </div>
             </div>
             <p className="text-xs text-slate-500 text-center">
                External visualization provided by <span className="font-medium text-slate-700">BioDigital Human</span>.
             </p>
          </div>
        </section>

        {/* Pathology Generator */}
        <section id="clinical">
          <DiseaseGenerator />
        </section>

        {/* Interactive Case Studies */}
        <section id="cases" className="scroll-mt-24 pb-24">
           <CaseStudySection />
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4 text-slate-500 text-sm">
            Disclaimer: This application is for educational purposes only. Always consult a qualified healthcare professional for medical advice.
          </p>
          <div className="flex justify-center gap-4 text-sm font-medium">
            <span>© {new Date().getFullYear()} NeuroSphere</span>
            <span>•</span>
            <span>Powered by Gemini 2.5 Flash</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;