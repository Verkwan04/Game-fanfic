import React from 'react';
import { FateCard as FateCardType } from '../types';

interface Props {
  achievements: Record<string, FateCardType>;
  onClose: () => void;
}

const FateBook: React.FC<Props> = ({ achievements, onClose }) => {
  const cards = (Object.values(achievements) as FateCardType[]).sort((a, b) => b.timestamp - a.timestamp);

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
                <p className="text-xs text-stone-400 tracking-widest uppercase mt-1">Records of Reincarnation</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-800 transition-colors text-stone-400 hover:text-white"
          >
            <span className="material-icons-round text-2xl">close</span>
          </button>
        </div>

        {/* Content - Grid of "Wooden Tags" style */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#e8e4d9] relative custom-scrollbar">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 pointer-events-none"></div>
          
          {cards.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-6 relative z-10 opacity-60">
                <span className="material-icons-round text-7xl">auto_stories</span>
                <p className="font-serif text-2xl tracking-[0.2em]">命书空白，请先去体验人生...</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10 pb-10">
              {cards.map((card) => (
                <div 
                  key={card.id} 
                  className="group relative h-72 bg-[#fdfbf7] shadow-lg hover:shadow-2xl rounded-sm border-l-4 border-[#8b1e1e] overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-default flex flex-col"
                >
                    {/* Date */}
                    <div className="absolute top-2 right-2 text-[10px] text-stone-400 font-serif writing-vertical-rl">
                       {new Date(card.timestamp).toLocaleDateString()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <h3 className="text-xl font-bold text-[#8b1e1e] calligraphy mb-4 writing-vertical-rl tracking-widest text-center h-2/3">
                           {card.title}
                        </h3>
                    </div>

                    {/* Hover Poem Overlay */}
                    <div className="absolute inset-0 bg-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <p className="text-[#f5f2e9] text-sm font-serif leading-loose text-center tracking-widest whitespace-pre-wrap">
                           {card.poem}
                        </p>
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fcfbf9] text-stone-500 text-xs text-center font-serif border-t border-stone-300 flex justify-between px-8">
          <span>一花一世界</span>
          <span>已解锁结局：{cards.length} / 8</span>
        </div>
      </div>
    </div>
  );
};

export default FateBook;