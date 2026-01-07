import React from 'react';
import { Attributes } from '../types';

interface Props {
  stats: Attributes;
}

const StatBar = ({ label, value, colorClass }: { label: string; value: number; colorClass: string }) => {
  const percentage = Math.max(0, Math.min(100, value));
  
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 font-semibold text-slate-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full ${colorClass} transition-all duration-700 ease-out rounded-full`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const StatsPanel: React.FC<Props> = ({ stats }) => {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-pink-400"></span>
        当前状态
      </h3>
      <StatBar label="创作力" value={stats.creativity} colorClass="bg-gradient-to-r from-purple-400 to-purple-600" />
      <StatBar label="法律意识" value={stats.legal} colorClass="bg-gradient-to-r from-blue-400 to-blue-600" />
      <StatBar label="情商" value={stats.eq} colorClass="bg-gradient-to-r from-pink-400 to-rose-500" />
      <StatBar label="知名度" value={stats.popularity} colorClass="bg-gradient-to-r from-amber-400 to-orange-500" />
      <StatBar label="压力" value={stats.stress} colorClass="bg-gradient-to-r from-red-400 to-red-600" />
      
      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-sm font-bold text-slate-500">存款</span>
        <span className="text-xl font-bold font-mono text-emerald-600 tracking-tight">¥{stats.money}</span>
      </div>
    </div>
  );
};

export default StatsPanel;