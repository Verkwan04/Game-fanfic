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
      <div className={`relative w-full aspect-[3/5] bg-[#fdfbf7] shadow-xl overflow-hidden border border-stone-300 group ${className}`}>
        {/* Ancient Paper Texture */}
        <div className="absolute inset-0 bg-[#e8e4d9] opacity-40"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
        
        {/* Inner Border */}
        <div className="absolute inset-2 border border-[#8b1e1e]/20"></div>

        {/* Content Vertical Layout */}
        <div className="absolute inset-0 flex flex-col items-center p-4">
           {/* Top Stamp */}
           <div className="w-6 h-6 border border-[#8b1e1e] rounded-sm flex items-center justify-center opacity-60 mb-2">
              <span className="text-[10px] text-[#8b1e1e] font-serif">结</span>
           </div>

           {/* Vertical Title */}
           <div className="flex-1 flex items-center justify-center py-2">
              <h3 
                className="font-bold text-stone-800 text-lg leading-loose tracking-widest writing-vertical-rl font-serif border-l border-stone-300 pl-2"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                {card.title.replace('结局：', '')}
              </h3>
           </div>

           {/* Bottom Date */}
           <div className="mt-2 pt-2 border-t border-stone-300 w-full text-center">
              <span className="text-[10px] text-stone-500 font-serif block transform scale-90">
                {new Date(card.timestamp).toLocaleDateString()}
              </span>
           </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-[#8b1e1e] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
    );
  }

  // --- FULL SIZE CARD ---
  return (
    <div className={`animate-float-in relative w-full max-w-sm mx-auto bg-[#fdfbf7] shadow-2xl overflow-hidden ${className}`} style={{ minHeight: '600px' }}>
      
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[#f4f0e6]"></div>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
      
      {/* Ink Wash Decorations (CSS Gradients simulating ink) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-stone-200 to-transparent opacity-50 rounded-bl-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-200/50 to-transparent opacity-30"></div>

      {/* Frame */}
      <div className="absolute inset-4 border-2 border-double border-stone-800 pointer-events-none"></div>
      <div className="absolute inset-3 border border-stone-300 pointer-events-none opacity-50"></div>

      {/* Header */}
      <div className="relative z-10 pt-12 pb-6 flex flex-col items-center">
         <div className="mb-4 opacity-80">
            <span className="text-xs tracking-[0.5em] text-[#8b1e1e] font-serif block text-center mb-1">DOUJINSHI</span>
            <div className="w-32 h-[1px] bg-[#8b1e1e]"></div>
         </div>
         <h2 className="text-4xl font-bold text-[#1a1a1a] calligraphy tracking-[0.2em] z-10 drop-shadow-sm">{card.title}</h2>
      </div>

      {/* Main Poem Area - Vertical */}
      <div className="relative flex-1 flex items-center justify-center py-4">
         {/* Vertical dividers */}
         <div className="absolute h-4/5 w-[1px] bg-stone-300 right-12 top-10 opacity-30"></div>
         <div className="absolute h-3/5 w-[1px] bg-stone-300 left-12 bottom-10 opacity-30"></div>

         <div 
             className="whitespace-pre-wrap text-center font-serif text-2xl leading-[2.5em] text-[#2c2c2c]" 
             style={{ 
                 writingMode: 'vertical-rl', 
                 fontFamily: '"Ma Shan Zheng", cursive',
             }}
         >
             {card.poem}
         </div>
      </div>

      {/* Footer / Stamp */}
      <div className="relative z-10 pb-12 px-12 flex justify-between items-end">
        <div className="flex flex-col gap-1 opacity-60">
           <span className="w-1 h-12 bg-stone-400 block ml-1"></span>
           <span className="text-xs font-serif writing-vertical-rl text-stone-500 tracking-widest">
              {new Date(card.timestamp).toLocaleDateString().replace(/\//g, '.')}
           </span>
        </div>
        
        {/* Red Seal Stamp */}
        <div className="animate-stamp w-16 h-16 border-[3px] border-[#a83232] rounded-md flex items-center justify-center transform rotate-[-8deg] opacity-90 mix-blend-multiply">
            <div className="w-full h-full border border-[#a83232] m-[2px] flex items-center justify-center">
               <span className="text-[#a83232] font-bold writing-vertical-rl text-sm leading-none calligraphy">同人<br/>亲启</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FateCard;