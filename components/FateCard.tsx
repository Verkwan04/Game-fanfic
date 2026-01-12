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
        {/* Simple text based mini card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-stone-100">
           <div className="w-full h-full border border-stone-200 flex items-center justify-center relative">
              <span className="writing-vertical-rl font-serif text-stone-800 font-bold tracking-widest truncate max-h-[80%] opacity-80" style={{ writingMode: 'vertical-rl' }}>
                 {card.title}
              </span>
           </div>
        </div>
        <div className="absolute bottom-0 w-full bg-[#8b1e1e] p-1">
          <p className="text-[#f5f2e9] text-[10px] font-serif text-center tracking-widest">{new Date(card.timestamp).toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  // Full Size Card - Pure Typography, No Image
  return (
    <div className={`animate-float-in relative w-full max-w-sm mx-auto bg-[#fdfbf7] shadow-2xl overflow-hidden border-2 border-stone-800 p-8 ${className}`} style={{ minHeight: '500px' }}>
      
      {/* Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
      
      {/* Border Frame */}
      <div className="absolute inset-4 border border-stone-300 pointer-events-none"></div>
      <div className="absolute inset-5 border border-stone-300 pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col items-center mb-10 relative z-10 pt-4">
         <span className="text-xs text-stone-500 font-serif tracking-[0.4em] mb-2 uppercase">Destiny</span>
         <h2 className="text-4xl font-bold text-stone-900 calligraphy mb-2">{card.title}</h2>
         <div className="w-12 h-1 bg-[#8b1e1e] rounded-full"></div>
      </div>

      {/* Poem Area - Central Focus */}
      <div className="flex-1 flex items-center justify-center py-8 relative">
         <div className="whitespace-pre-wrap text-center font-serif text-2xl leading-loose text-stone-800 tracking-[0.25em] opacity-90" 
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
             {card.poem}
         </div>
      </div>

      {/* Footer stamp animation */}
      <div className="mt-12 flex justify-between items-end">
         <div className="text-xs text-stone-400 font-serif tracking-widest writing-vertical-rl">
            {new Date(card.timestamp).toLocaleDateString()}
         </div>
         <div className="animate-stamp w-16 h-16 border-4 border-[#8b1e1e] rounded-sm flex items-center justify-center bg-transparent mix-blend-multiply opacity-80">
            <span className="text-[#8b1e1e] text-sm font-bold writing-vertical-rl calligraphy">同人<br/>一梦</span>
         </div>
      </div>
    </div>
  );
};

export default FateCard;