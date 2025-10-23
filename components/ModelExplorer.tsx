import React, { useState, useEffect, useCallback } from 'react';
import type { MLModel, PredictionResponse, Feature } from '../types';
import { FeatureType } from '../types';
import { getPrediction } from '../services/geminiService';
import { FeatureImportanceChart } from './FeatureImportanceChart';
import { ChartIcon } from './icons/ChartIcon';
import { SkeletonLoader } from './SkeletonLoader';
import { PredictionResult } from './PredictionResult';

interface ModelExplorerProps {
  model: MLModel;
}

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/50 rounded-xl p-px shadow-lg shadow-black/20 ring-1 ring-white/10 ${className}`}>
    <div className="bg-slate-800 rounded-[11px] p-6 h-full">
      {children}
    </div>
  </div>
);


export const ModelExplorer: React.FC<ModelExplorerProps> = ({ model }) => {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionResponse | null>(null);

  useEffect(() => {
    const initialData = model.features.reduce((acc, feature) => {
      acc[feature.id] = feature.defaultValue;
      return acc;
    }, {} as Record<string, string | number>);
    setFormData(initialData);
    setPredictionData(null);
    setError(null);
  }, [model]);

  const handleInputChange = useCallback((featureId: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [featureId]: value }));
  }, []);

  const handlePredict = async () => {
    setIsLoading(true);
    setError(null);
    setPredictionData(null);
    try {
      const result = await getPrediction(model, formData);
      setPredictionData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderFeatureInput = (feature: Feature) => {
    const value = formData[feature.id];

    switch (feature.type) {
      case FeatureType.SLIDER:
        return (
            <div key={feature.id} className="mb-6">
                <label htmlFor={feature.id} className="block text-sm font-medium text-gray-300 mb-2 flex justify-between">
                    <span>{feature.name}</span>
                    <span className="font-bold text-cyan-400">{value}</span>
                </label>
                <input
                    id={feature.id}
                    type="range"
                    min={feature.min}
                    max={feature.max}
                    step={feature.step}
                    value={value}
                    onChange={(e) => handleInputChange(feature.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer custom-range"
                />
                <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
            </div>
        );
      case FeatureType.TEXT:
        return (
            <div key={feature.id} className="mb-6">
                <label htmlFor={feature.id} className="block text-sm font-medium text-gray-300 mb-2">{feature.name}</label>
                <textarea
                    id={feature.id}
                    rows={4}
                    value={value as string}
                    onChange={(e) => handleInputChange(feature.id, e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    placeholder={feature.description}
                />
            </div>
        );
      case FeatureType.SELECT:
        return (
            <div key={feature.id} className="mb-6">
                <label htmlFor={feature.id} className="block text-sm font-medium text-gray-300 mb-2">{feature.name}</label>
                <select
                    id={feature.id}
                    value={value}
                    onChange={(e) => handleInputChange(feature.id, e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-md p-2.5 focus:ring-cyan-500 focus:border-cyan-500 transition"
                >
                    {feature.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-2xl font-bold text-white mb-2">{model.name}</h2>
        <p className="text-gray-400 max-w-3xl">{model.description}</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Inputs</h3>
          <div>{model.features.map(renderFeatureInput)}</div>
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:shadow-lg hover:shadow-cyan-500/30 disabled:bg-gray-600 disabled:shadow-none text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : 'Get Prediction'}
          </button>
        </Card>

        <Card>
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Results</h3>
            {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-md">{error}</div>}
            
            {isLoading && !predictionData && (
                <SkeletonLoader />
            )}
            
            {predictionData && (
                <div className="space-y-6">
                    <PredictionResult 
                      prediction={predictionData.prediction}
                      targetName={model.predictionTarget.name}
                      unit={model.predictionTarget.unit}
                    />
                    <div className="h-64 md:h-80">
                         <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-300">
                            <ChartIcon className="w-5 h-5"/>
                            Feature Importance
                        </h4>
                        <FeatureImportanceChart data={predictionData.featureImportances} />
                    </div>
                </div>
            )}

            {!isLoading && !predictionData && !error && (
                <div className="flex-grow flex items-center justify-center text-gray-500 min-h-[300px]">
                    <p>Results will be displayed here.</p>
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};