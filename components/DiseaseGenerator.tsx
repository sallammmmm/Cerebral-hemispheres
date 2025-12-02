import React, { useState } from 'react';
import { Disease, LoadingState } from '../types';
import { generateDiseases } from '../services/geminiService';
import { ActivityIcon, RefreshIcon } from './Icons';

const DiseaseGenerator: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

  const handleGenerate = async () => {
    setLoadingState(LoadingState.LOADING);
    try {
      const data = await generateDiseases();
      setDiseases(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (e) {
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <ActivityIcon className="text-teal-600" />
            Pathology Generator
          </h2>
          <p className="text-slate-500 mt-2">Discover 3 specific clinical conditions using Gemini AI.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loadingState === LoadingState.LOADING}
          className="mt-4 md:mt-0 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg shadow-teal-200"
        >
          {loadingState === LoadingState.LOADING ? (
            <>
              <RefreshIcon className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <RefreshIcon /> Generate Diseases
            </>
          )}
        </button>
      </div>

      {loadingState === LoadingState.ERROR && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          Failed to load data. Please check your API configuration.
        </div>
      )}

      {diseases.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diseases.map((disease, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  disease.hemisphere === 'Left' ? 'bg-indigo-100 text-indigo-700' :
                  disease.hemisphere === 'Right' ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {disease.hemisphere}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{disease.name}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{disease.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase">Key Symptoms</h4>
                <ul className="space-y-1">
                  {disease.symptoms.map((symptom, sIdx) => (
                    <li key={sIdx} className="text-sm text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {loadingState === LoadingState.IDLE && (
         <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400">Click generate to explore clinical pathologies</p>
         </div>
      )}
    </div>
  );
};

export default DiseaseGenerator;