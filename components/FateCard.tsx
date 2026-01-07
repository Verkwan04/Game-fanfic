import React from 'react';
import { FateCard as FateCardType } from '../types';

interface Props {
  card: FateCardType;
  className?: string;
  mini?: boolean;
}

const FateCard: React.FC<Props> = ({ card, className = "", mini = false }) => {
  if (mini) {
    return (
      <div className={`relative aspect-[2/3] bg-[#fdfbf7] border-2 border-[#8b5a2b] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group ${className}`}>
        {card.imageUrl ? (
            <img src={card.imageUrl} alt={card.title} className="absolute inset-0 w-full h-full object-cover sepia-[0.3] opacity-90 group-hover:opacity-100 transition-opacity" />
        ) : (
            <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400">无图</div>
        )}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
          <p className="text-white text-xs font-serif text-center">{card.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-sm mx-auto bg-[#fdfbf7] shadow-2xl overflow-hidden border-4 border-double border-[#8b5a2b] p-4 ${className}`} style={{ minHeight: '500px' }}>
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4 border-b border-[#8b5a2b]/30 pb-2">
         <div className="flex flex-col">
            <span className="text-xs text-[#8b5a2b] font-serif tracking-widest">命薄 · 判词</span>
            <h2 className="text-2xl font-bold text-stone-800 font-serif">{card.title}</h2>
         </div>
         <div className="w-8 h-8 rounded-full border border-[#8b5a2b] flex items-center justify-center">
            <span className="font-serif text-[#8b5a2b] text-xs">终</span>
         </div>
      </div>

      {/* Image Area */}
      <div className="w-full aspect-square bg-stone-100 mb-6 border border-stone-300 relative overflow-hidden shadow-inner group">
        {card.imageUrl ? (
          <img src={card.imageUrl} alt="Ending" className="w-full h-full object-cover sepia-[0.2] contrast-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-200">
             <span className="animate-pulse">绘制天机中...</span>
          </div>
        )}
      </div>

      {/* Poem Area - Vertical Text Layout for that authentic feel */}
      <div className="relative py-4 px-6 bg-[#f4f1ea] border-t border-b border-[#8b5a2b]/20">
         <div className="whitespace-pre-wrap text-center font-serif text-lg leading-loose text-stone-800 tracking-widest" style={{ writingMode: 'vertical-rl', margin: '0 auto', height: '180px' }}>
             {card.poem || "天机未显..."}
         </div>
      </div>

      {/* Footer stamp */}
      <div className="mt-4 flex justify-end opacity-70">
        <div className="w-12 h-12 border-2 border-red-800 rounded-sm flex items-center justify-center transform rotate-12">
            <span className="text-red-800 text-xs font-bold writing-vertical-rl">同人<br/>一梦</span>
        </div>
      </div>
    </div>
  );
};

export default FateCard;