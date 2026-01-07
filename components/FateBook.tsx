import React from 'react';
import { FateCard as FateCardType } from '../types';

interface Props {
  achievements: Record<string, FateCardType>;
  onClose: () => void;
}

const FateBook: React.FC<Props> = ({ achievements, onClose }) => {
  const cards = (Object.values(achievements) as FateCardType[]).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4 animate-float-in">
      <div className="bg-[#fdfbf7] w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative border-4 border-stone-800">
        
        {/* Header */}
        <div className="bg-stone-800 text-[#d4af37] p-4 flex justify-between items-center shadow-lg z-10 border-b border-[#d4af37]/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center">
                <span className="font-serif font-bold text-lg">命</span>
             </div>
             <h2 className="text-2xl font-serif tracking-[0.5em] font-bold">金陵十二钗 · 命薄</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-700 transition-colors text-[#d4af37]"
          >
            <span className="material-icons-round">close</span>
          </button>
        </div>

        {/* Content - Horizontal Scroll for Tags feeling or Grid */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#e8e4d9] relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none"></div>
          
          {cards.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4 relative z-10">
                <span className="material-icons-round text-6xl opacity-30">history_edu</span>
                <p className="font-serif text-xl tracking-widest">命书空白，请先去体验人生...</p>
             </div>
          ) : (
            // Flex layout for vertical tags
            <div className="flex flex-wrap gap-6 justify-center content-start relative z-10">
              {cards.map((card) => (
                <div 
                  key={card.id} 
                  className="group relative w-24 md:w-28 h-80 bg-[#b33e3e] shadow-lg rounded-sm border border-red-900 overflow-hidden hover:-translate-y-4 transition-transform duration-500 cursor-pointer flex flex-col items-center py-2"
                  style={{ 
                     backgroundImage: "linear-gradient(to bottom, #8b1e1e, #681212)",
                     boxShadow: "2px 2px 5px rgba(0,0,0,0.3)"
                  }}
                >
                    {/* Hanging Hole */}
                    <div className="w-2 h-2 rounded-full bg-[#3d0909] mb-2 shadow-inner"></div>

                    {/* Decorative Top */}
                    <div className="w-16 h-16 border border-[#d4af37]/30 rounded-sm mb-4 overflow-hidden bg-stone-900">
                        {card.imageUrl ? (
                           <img src={card.imageUrl} alt="" className="w-full h-full object-cover opacity-80" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-[#d4af37] text-xs">无图</div>
                        )}
                    </div>

                    {/* Vertical Text */}
                    <div className="flex-1 flex items-center justify-center w-full border-t border-b border-[#d4af37]/10 py-2 my-2">
                        <h3 
                           className="font-serif text-xl md:text-2xl text-[#f3e5c2] font-bold tracking-widest drop-shadow-md"
                           style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.3em' }}
                        >
                           {card.title.replace('结局：', '')}
                        </h3>
                    </div>

                    {/* Footer Stamp */}
                    <div className="mt-auto mb-2 opacity-60">
                       <span className="text-[10px] text-[#d4af37] font-serif writing-vertical-rl">
                          {new Date(card.timestamp).toLocaleDateString()}
                       </span>
                    </div>

                    {/* Hover Effect Overlay (Show Poem?) */}
                    <div className="absolute inset-0 bg-stone-900/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                        <p className="text-[#f3e5c2] text-xs md:text-sm font-serif leading-loose text-center writing-vertical-rl tracking-widest h-full overflow-hidden">
                           {card.poem}
                        </p>
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-800 text-[#d4af37]/60 text-xs text-center font-serif border-t border-[#d4af37]/20 flex justify-between px-8">
          <span>云深不知处</span>
          <span>已收录：{cards.length}</span>
        </div>
      </div>
    </div>
  );
};

export default FateBook;