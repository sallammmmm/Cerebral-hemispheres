import React, { useState, useEffect } from 'react';
import { CaseStudy, LoadingState } from '../types';
import { generateCaseStudy } from '../services/geminiService';
import { BookOpenIcon, CheckCircleIcon, XCircleIcon, RefreshIcon } from './Icons';

const CaseStudySection: React.FC = () => {
  const [caseData, setCaseData] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const loadNewCase = async () => {
    setLoading(LoadingState.LOADING);
    setSelectedOption(null);
    setShowExplanation(false);
    try {
      const data = await generateCaseStudy();
      setCaseData(data);
      setLoading(LoadingState.SUCCESS);
    } catch (e) {
      setLoading(LoadingState.ERROR);
    }
  };

  // Initial load
  useEffect(() => {
    loadNewCase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(index);
    setShowExplanation(true);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-8 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <BookOpenIcon className="text-teal-400" />
            Clinical Case Challenge
          </h2>
          <button 
            onClick={loadNewCase}
            disabled={loading === LoadingState.LOADING}
            className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
             <RefreshIcon className={`w-4 h-4 ${loading === LoadingState.LOADING ? 'animate-spin' : ''}`} />
             New Case
          </button>
        </div>

        {loading === LoadingState.LOADING ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 animate-pulse">Consulting the archives...</p>
          </div>
        ) : loading === LoadingState.ERROR ? (
             <div className="py-12 text-center text-red-400">Unable to generate a case study at this time.</div>
        ) : caseData ? (
          <div className="space-y-8 animate-fade-in">
            {/* Vignette */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-teal-400 font-semibold text-sm uppercase tracking-wider mb-2">Patient Vignette</h3>
              <p className="text-lg leading-relaxed text-slate-200">{caseData.scenario}</p>
            </div>

            {/* Question */}
            <div>
              <p className="font-bold text-xl mb-6">{caseData.question}</p>
              <div className="space-y-3">
                {caseData.options.map((option, idx) => {
                  let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between group ";
                  
                  if (selectedOption === null) {
                    btnClass += "border-slate-700 hover:border-teal-500 hover:bg-slate-800";
                  } else {
                    if (idx === caseData.correctOptionIndex) {
                      btnClass += "border-green-500 bg-green-500/10 text-green-400";
                    } else if (idx === selectedOption) {
                      btnClass += "border-red-500 bg-red-500/10 text-red-400";
                    } else {
                      btnClass += "border-slate-800 bg-slate-800/50 text-slate-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={selectedOption !== null}
                      className={btnClass}
                    >
                      <span className="font-medium">{option}</span>
                      {selectedOption !== null && idx === caseData.correctOptionIndex && (
                        <CheckCircleIcon className="text-green-500 w-5 h-5" />
                      )}
                      {selectedOption !== null && idx === selectedOption && idx !== caseData.correctOptionIndex && (
                        <XCircleIcon className="text-red-500 w-5 h-5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-teal-900/20 border border-teal-500/30 p-6 rounded-xl mt-6 animate-slide-up">
                <h4 className="font-bold text-teal-400 mb-2 flex items-center gap-2">
                   Clinical Pearl
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {caseData.explanation}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CaseStudySection;