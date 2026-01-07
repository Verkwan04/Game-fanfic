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
      <div className={`relative aspect-[2/3] bg-[#fdfbf7] border border-stone-300 rounded-sm overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group ${className}`}>
        {card.imageUrl ? (
            <img src={card.imageUrl} alt={card.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
        ) : (
            <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-stone-300 font-serif">无图</div>
        )}
        <div className="absolute bottom-0 w-full bg-stone-900/90 p-2 pt-4">
          <p className="text-stone-100 text-xs font-serif text-center tracking-widest">{card.title}</p>
        </div>
      </div>
    );
  }

  // Full Size Card with "Pop Up" Animation
  return (
    <div className={`animate-float-in relative w-full max-w-sm mx-auto bg-[#fdfbf7] shadow-2xl overflow-hidden border-2 border-stone-800 p-6 ${className}`} style={{ minHeight: '560px' }}>
      
      {/* Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-stone-800 pb-3 relative z-10">
         <div className="flex flex-col">
            <span className="text-xs text-stone-500 font-serif tracking-[0.2em]">命薄 · 判词</span>
            <h2 className="text-3xl font-bold text-stone-900 calligraphy mt-1">{card.title}</h2>
         </div>
         {/* Red Stamp */}
         <div className="w-10 h-10 border-2 border-[#8b1e1e] flex items-center justify-center rounded-sm transform rotate-6 shadow-sm opacity-90">
            <span className="calligraphy text-[#8b1e1e] text-sm">终局</span>
         </div>
      </div>

      {/* Image Area - Ink Wash Style */}
      <div className="w-full aspect-square bg-stone-100 mb-6 border border-stone-200 relative overflow-hidden shadow-inner group">
        {card.imageUrl ? (
          <img 
            src={card.imageUrl} 
            alt="Ending" 
            className="w-full h-full object-cover grayscale contrast-125 brightness-110 animate-float-in" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-50">
             <span className="material-icons-round text-4xl animate-spin mb-2 opacity-20">autorenew</span>
             <span className="font-serif text-sm tracking-widest opacity-60">丹青绘制中...</span>
          </div>
        )}
        {/* Vignette for ink effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none"></div>
      </div>

      {/* Poem Area - Vertical Text */}
      <div className="relative py-4 px-2 bg-stone-50 border-t border-b border-stone-200/50">
         <div className="whitespace-pre-wrap text-center font-serif text-xl leading-loose text-stone-800 tracking-[0.2em] opacity-90" style={{ writingMode: 'vertical-rl', margin: '0 auto', height: '160px', fontFamily: '"Ma Shan Zheng", cursive' }}>
             {card.poem}
         </div>
      </div>

      {/* Footer stamp animation */}
      <div className="mt-6 flex justify-end">
        <div className="animate-stamp w-14 h-14 border-4 border-[#8b1e1e] rounded-sm flex items-center justify-center bg-transparent mix-blend-multiply">
            <span className="text-[#8b1e1e] text-xs font-bold writing-vertical-rl calligraphy">同人<br/>一梦</span>
        </div>
      </div>
    </div>
  );
};

export default FateCard;