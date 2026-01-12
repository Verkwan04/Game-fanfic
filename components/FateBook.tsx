import React from 'react';
import { FateCard as FateCardType } from '../types';
import FateCard from './FateCard';

interface Props {
  achievements: Record<string, FateCardType>;
  onClose: () => void;
}

const FateBook: React.FC<Props> = ({ achievements, onClose }) => {
  const cards = (Object.values(achievements) as FateCardType[]).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-float-in">
      {/* Book Container */}
      <div className="w-full max-w-6xl h-[85vh] flex flex-col rounded-sm overflow-hidden relative shadow-2xl">
        
        {/* Ancient Book Cover / Border */}
        <div className="absolute inset-0 bg-[#3e3b3b] pointer-events-none z-0"></div>
        <div className="absolute inset-2 border-2 border-[#a68b5e] opacity-50 pointer-events-none z-20"></div>
        <div className="absolute inset-3 border border-[#a68b5e] opacity-30 pointer-events-none z-20"></div>

        {/* Header Section */}
        <div className="relative z-10 bg-[#2b2b2b] p-6 border-b-2 border-[#a68b5e]/50 flex justify-between items-center shadow-md">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-[#8b1e1e] flex items-center justify-center border-2 border-[#d4af37] shadow-lg">
                  <span className="font-serif text-[#f5f2e9] text-2xl font-bold">命</span>
              </div>
              <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl text-[#d4af37] font-bold calligraphy tracking-[0.2em]">命薄 · 浮生一梦</h2>
                  <span className="text-[#a68b5e] text-xs font-serif tracking-widest mt-1 opacity-80">阅尽千帆，皆是定数</span>
              </div>
           </div>

           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full border border-[#a68b5e] text-[#a68b5e] flex items-center justify-center hover:bg-[#a68b5e] hover:text-[#2b2b2b] transition-all duration-300"
           >
             <span className="material-icons-round">close</span>
           </button>
        </div>

        {/* Content Area - Scroll */}
        <div className="relative z-10 flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-[#f0e6d2]">
           {/* Paper Texture Overlay */}
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
           
           {/* Background Decoration */}
           <div className="absolute top-10 right-10 text-[10rem] opacity-5 pointer-events-none calligraphy text-[#8b1e1e] select-none">
              梦
           </div>

           {cards.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-[#5c5547] space-y-6">
                <span className="material-icons-round text-6xl opacity-30">history_edu</span>
                <div className="text-center font-serif">
                   <p className="text-xl tracking-widest mb-2 font-bold">命书无字</p>
                   <p className="text-sm opacity-70">且去红尘走一遭，方知众生相</p>
                </div>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {cards.map((card) => (
                 <div key={card.id} className="flex justify-center">
                    <FateCard card={card} mini={true} className="transform hover:scale-105 transition-transform duration-500" />
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* Footer info */}
        <div className="relative z-10 bg-[#2b2b2b] p-3 text-center border-t border-[#a68b5e]/30">
           <p className="text-[#a68b5e]/50 text-xs font-serif tracking-[0.5em]">—— 悲欢离合总无情，一任阶前点滴到天明 ——</p>
        </div>
      </div>
    </div>
  );
};

export default FateBook;