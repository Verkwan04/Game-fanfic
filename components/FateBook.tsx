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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4 animate-float-in">
      <div className="bg-[#fdfbf7] w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative border-8 border-stone-800">
        
        {/* Header */}
        <div className="bg-stone-800 text-[#d4af37] p-4 flex justify-between items-center shadow-lg z-10">
          <h2 className="text-2xl font-serif tracking-[0.5em] font-bold">金陵十二钗 · 命薄</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-700 transition-colors"
          >
            <span className="material-icons-round">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-stone-100">
          
          {cards.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                <span className="material-icons-round text-6xl opacity-30">auto_stories</span>
                <p className="font-serif text-xl">命书空白，请先去体验人生...</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <div key={card.id} className="flex flex-col items-center">
                    <FateCard card={card} mini />
                    <span className="mt-2 text-xs text-stone-500 font-serif">
                        {new Date(card.timestamp).toLocaleDateString()}
                    </span>
                </div>
              ))}
            </div>
          )}
          
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-800 text-stone-400 text-xs text-center font-serif border-t border-[#d4af37]/30">
          收录结局：{cards.length}
        </div>
      </div>
    </div>
  );
};

export default FateBook;