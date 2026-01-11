import React, { useState } from 'react';

interface Props {
  onRollComplete: (result: number) => void;
}

const DiceGame: React.FC<Props> = ({ onRollComplete }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    // Sound effect could go here

    // Animation duration
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 6) + 1;
      setResult(newResult);
      setIsRolling(false);
      
      // Delay before proceeding to let user see result
      setTimeout(() => {
        onRollComplete(newResult);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-stone-100/50 rounded-lg border-2 border-dashed border-stone-300 my-4">
      <h3 className="font-serif text-lg font-bold text-stone-700 mb-4 tracking-widest">
        运势判定
      </h3>
      
      <div className="relative w-24 h-24 mb-6 perspective-1000">
        <div 
          className={`w-full h-full relative transform-style-3d transition-transform duration-1000 ${isRolling ? 'animate-spin-3d' : ''}`}
        >
           {/* Dice Cube Simulation */}
           <div className={`w-full h-full bg-stone-800 rounded-xl flex items-center justify-center shadow-xl border border-stone-600 text-white text-4xl font-serif ${isRolling ? 'scale-90' : 'scale-100'} transition-all`}>
              {result !== null ? (
                 <span className="material-icons-round text-5xl text-[#d4af37]">
                    {getActionIcon(result)}
                 </span>
              ) : (
                 <span className="material-icons-round text-5xl opacity-50">help_outline</span>
              )}
           </div>
        </div>
      </div>

      <div className="text-center h-8 mb-4">
         {result !== null && (
            <span className="text-[#8b1e1e] font-bold font-serif animate-float-in">
               掷出了 {result} 点！
            </span>
         )}
      </div>

      <button
        onClick={rollDice}
        disabled={isRolling || result !== null}
        className={`
           px-8 py-2 rounded-full font-serif font-bold tracking-widest shadow-lg transition-all
           ${isRolling || result !== null 
             ? 'bg-stone-300 text-stone-500 cursor-not-allowed' 
             : 'bg-[#8b1e1e] text-[#f5f2e9] hover:bg-[#a62424] hover:scale-105'}
        `}
      >
        {isRolling ? '命运流转...' : '掷骰定数'}
      </button>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes spin3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(720deg) rotateY(360deg) rotateZ(360deg); }
        }
        .animate-spin-3d { animation: spin3d 0.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// Helper to map dice numbers to icons for flavor
const getActionIcon = (num: number) => {
   switch(num) {
      case 1: return 'filter_1';
      case 2: return 'filter_2';
      case 3: return 'filter_3';
      case 4: return 'filter_4';
      case 5: return 'filter_5';
      case 6: return 'filter_6';
      default: return 'help';
   }
};

export default DiceGame;