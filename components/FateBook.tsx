import React, { useState, useEffect } from 'react';
import { FateCard as FateCardType } from '../types';
import { TOTAL_ENDINGS, ALL_ENDING_IDS } from '../constants';

interface Props {
  achievements: Record<string, FateCardType>;
  onClose: () => void;
}

const FateBook: React.FC<Props> = ({ achievements, onClose }) => {
  const [showBadge, setShowBadge] = useState(false);
  const collectedCount = ALL_ENDING_IDS.filter((id) => achievements[id]).length;
  const allCollected = collectedCount >= TOTAL_ENDINGS;

  useEffect(() => {
    if (allCollected) setShowBadge(true);
  }, [allCollected]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-sm p-4 animate-float-in">
      <div className="bg-[#f5f2e9] w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative border border-stone-600">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] text-[#f5f2e9] p-6 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-sm bg-[#8b1e1e] flex items-center justify-center shadow-inner">
                <span className="font-serif font-bold text-xl">命</span>
             </div>
             <div>
                <h2 className="text-2xl font-serif tracking-[0.3em] font-bold">轮回命簿</h2>
                <p className="text-xs text-stone-400 tracking-widest uppercase mt-1">共{TOTAL_ENDINGS}张信笺，集齐解锁终极徽章</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-800 transition-colors text-stone-400 hover:text-white"
          >
            <span className="material-icons-round text-2xl">close</span>
          </button>
        </div>

        {/* Content - 20 张信笺（空信笺 + 已解锁） */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#e8e4d9] relative custom-scrollbar">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10 pb-10">
            {ALL_ENDING_IDS.map((endingId) => {
              const card = achievements[endingId];
              const isEmpty = !card;
              return (
                <div 
                  key={endingId} 
                  className={`group relative h-72 rounded-sm overflow-hidden flex flex-col transition-all duration-500 cursor-default hover:-translate-y-2 ${
                    isEmpty 
                      ? 'bg-stone-200/80 border border-dashed border-stone-400 shadow' 
                      : 'bg-[#fdfbf7] shadow-lg hover:shadow-2xl border-l-4 border-[#8b1e1e]'
                  }`}
                >
                  {isEmpty ? (
                    <>
                      <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <span className="material-icons-round text-5xl text-stone-400 mb-2">description</span>
                        <h3 className="text-lg font-serif text-stone-500 tracking-widest">空信笺</h3>
                        <p className="text-xs text-stone-400 mt-1">待书写</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute top-2 right-2 text-[10px] text-stone-400 font-serif">
                         {new Date(card.timestamp).toLocaleDateString()}
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <h3 className="text-xl font-bold text-[#8b1e1e] calligraphy mb-4 writing-vertical-rl tracking-widest text-center">
                           {card.title}
                        </h3>
                      </div>
                      <div className="absolute inset-0 bg-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <p className="text-[#f5f2e9] text-sm font-serif leading-loose text-center tracking-widest whitespace-pre-wrap">
                           {card.poem}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fcfbf9] text-stone-500 text-xs text-center font-serif border-t border-stone-300 flex justify-between px-8">
          <span>一花一世界，一叶一结局</span>
          <span>已解锁：{collectedCount} / {TOTAL_ENDINGS}</span>
        </div>
      </div>

      {/* 同人女使命达成 - 终极徽章弹层 */}
      {showBadge && (
        <div 
          className="absolute inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md animate-float-in"
          onClick={() => setShowBadge(false)}
        >
          <div 
            className="bg-[#f5f2e9] max-w-md w-full mx-4 rounded-2xl shadow-2xl border-4 border-[#8b1e1e] p-8 text-center animate-float-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#8b1e1e] flex items-center justify-center">
              <span className="material-icons-round text-5xl text-[#f5f2e9]">verified</span>
            </div>
            <h3 className="text-2xl font-bold text-[#8b1e1e] font-serif tracking-[0.3em] mb-2">同人女使命达成</h3>
            <p className="text-stone-600 font-serif text-sm mb-6">你已集齐命簿二十张信笺，阅尽轮回百态。</p>
            <button
              onClick={() => setShowBadge(false)}
              className="px-8 py-3 bg-[#8b1e1e] text-[#f5f2e9] rounded-lg font-serif font-bold tracking-widest hover:bg-[#a62424] transition-colors"
            >
              收下徽章
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FateBook;
