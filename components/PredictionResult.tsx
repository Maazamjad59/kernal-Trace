import React from 'react';

interface PredictionResultProps {
  prediction: string | number;
  targetName: string;
  unit: string;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, targetName, unit }) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-slate-900/70 p-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl opacity-40" />
        <div className="relative">
            <p className="text-sm text-gray-400">{targetName}</p>
            <p className="text-4xl font-bold text-cyan-400">
                {unit}{typeof prediction === 'number' ? prediction.toLocaleString() : prediction}
            </p>
        </div>
    </div>
  );
};