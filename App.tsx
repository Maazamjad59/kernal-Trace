import React, { useState, useMemo } from 'react';
import { ModelSelector } from './components/ModelSelector';
import { ModelExplorer } from './components/ModelExplorer';
import { ML_MODELS } from './constants';
import type { MLModel } from './types';
import { LogoIcon } from './components/icons/LogoIcon';

const App: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>(ML_MODELS[0].id);

  const selectedModel = useMemo(() => {
    return ML_MODELS.find(model => model.id === selectedModelId) as MLModel;
  }, [selectedModelId]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col">
      <header className="bg-slate-900/60 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LogoIcon className="w-7 h-7 text-cyan-400" />
              <h1 className="text-2xl font-bold text-cyan-400 tracking-tight">Kernal Trace</h1>
            </div>
            <p className="text-sm text-gray-400 hidden sm:block">Interactive Machine Learning Demonstrations</p>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="lg:w-1/3 xl:w-1/4 w-full">
            <ModelSelector
              models={ML_MODELS}
              selectedModelId={selectedModelId}
              onSelectModel={setSelectedModelId}
            />
          </aside>
          <main className="lg:w-2/3 xl:w-3/4 w-full">
            {selectedModel && <ModelExplorer key={selectedModel.id} model={selectedModel} />}
          </main>
        </div>
      </div>
      <footer className="text-center py-4 text-xs text-gray-500 border-t border-white/10">
        <p>Powered by Appstra | All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;