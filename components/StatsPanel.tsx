import React from 'react';
import { Attributes } from '../types';

interface Props {
  stats: Attributes;
}

const StatBar = ({ label, value }: { label: string; value: number }) => {
  const percentage = Math.max(0, Math.min(100, value));
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1 font-serif text-stone-600 tracking-wider">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-2 w-full bg-stone-200 rounded-sm overflow-hidden">
        <div 
          className="h-full bg-stone-800 transition-all duration-700 ease-out rounded-sm opacity-80" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const StatsPanel: React.FC<Props> = ({ stats }) => {
  return (
    <div className="ink-card p-8 rounded-xl border border-stone-300">
      <h3 className="text-sm font-bold text-stone-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 font-serif border-b border-stone-200 pb-2">
        <span className="w-2 h-2 bg-[#8b1e1e] transform rotate-45"></span>
        当前状态
      </h3>
      <StatBar label="创作力" value={stats.creativity} />
      <StatBar label="法律意识" value={stats.legal} />
      <StatBar label="情商" value={stats.eq} />
      <StatBar label="知名度" value={stats.popularity} />
      <StatBar label="压力" value={stats.stress} />
      
      <div className="mt-8 pt-4 border-t border-stone-300 flex justify-between items-center">
        <span className="text-sm font-serif text-stone-600 tracking-wide">私房钱</span>
        <span className="text-xl font-bold font-mono text-stone-900 border-b-2 border-stone-800">¥{stats.money}</span>
      </div>
    </div>
  );
};

export default StatsPanel;