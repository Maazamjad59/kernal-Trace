import React from 'react';
import type { MLModel } from '../types';
import { BrainIcon } from './icons/BrainIcon';

interface ModelSelectorProps {
  models: MLModel[];
  selectedModelId: string;
  onSelectModel: (id: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModelId, onSelectModel }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-px shadow-lg shadow-black/20 ring-1 ring-white/10 sticky top-24">
      <div className="bg-slate-800 rounded-[11px] p-4">
        <h2 className="text-lg font-semibold mb-4 text-cyan-400">Choose a Model</h2>
        <div className="space-y-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              className={`w-full text-left p-3 rounded-md transition-all duration-300 flex items-center gap-3 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 ${
                selectedModelId === model.id
                  ? 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/50 shadow-md shadow-black/20'
                  : 'bg-gray-700/50 hover:bg-gray-700/80 hover:scale-[1.02]'
              }`}
            >
              <BrainIcon className="w-5 h-5 flex-shrink-0 text-cyan-400/70" />
              <span className="flex-grow font-medium">{model.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};