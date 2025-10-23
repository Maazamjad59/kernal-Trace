import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-24 bg-slate-700/50 rounded-lg"></div>
      <div>
        <div className="h-6 w-1/2 bg-slate-700/50 rounded-md mb-2"></div>
        <div className="h-64 bg-slate-700/50 rounded-lg"></div>
      </div>
    </div>
  );
};