import React, { useEffect, useState } from 'react';
import { GameEvent, Choice, Attributes, FateCard as FateCardType } from '../types';
import SocialFeed from './SocialFeed';
import FateCard from './FateCard';

interface Props {
  event: GameEvent;
  onChoice: (choice: Choice) => void;
  attributes: Attributes;
  aiComments: string | null;
  loadingAI: boolean;
  activeFateCard: FateCardType | null;
  onRestart: () => void;
}

const EventDisplay: React.FC<Props> = ({ event, onChoice, attributes, aiComments, loadingAI, activeFateCard, onRestart }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(false);
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, [event.id]);

  return (
    <div className={`relative flex flex-col h-full transition-all duration-700 ease-in-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* Story Content & Social Feed Container */}
      <div className="flex-grow overflow-y-auto mb-6 pr-4 custom-scrollbar">
        
        {/* Main Text */}
        <div className="mb-8">
          {event.isEnding && (
            <div className="text-center mb-6">
               <span className="inline-block px-4 py-1 rounded-sm border border-[#8b1e1e] text-[#8b1e1e] text-sm font-bold tracking-widest mb-2 font-serif">
                  终章
               </span>
            </div>
          )}
          <h2 className="text-3xl font-bold text-stone-900 mb-8 calligraphy tracking-widest leading-relaxed">
            {event.isEnding ? event.endingTitle : "新的篇章"}
          </h2>
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-lg leading-loose text-stone-700 font-serif text-justify">
              {event.text}
            </p>
          </div>
        </div>

        {/* Fate Card Display at Ending */}
        {event.isEnding && (
           <div className="my-8 flex justify-center">
              {activeFateCard ? (
                 <div className="animate-float-in w-full flex justify-center">
                    <FateCard card={activeFateCard} />
                 </div>
              ) : (
                 <div className="w-full max-w-sm h-[500px] border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center text-stone-400 bg-stone-50/50 animate-pulse font-serif">
                    <span className="material-icons-round text-4xl mb-2 opacity-50">brush</span>
                    <span>正在挥毫泼墨...</span>
                 </div>
              )}
           </div>
        )}

        {/* Automatic Social Feed (Hide on Ending to focus on the Card) */}
        {!event.isEnding && (
          <SocialFeed comments={aiComments} loading={loadingAI} />
        )}

      </div>

      {/* Choices Area - Fixed at bottom */}
      <div className="space-y-4 pt-6 border-t border-stone-200">
        {event.choices.map((choice, index) => {
          if (choice.condition && !choice.condition(attributes)) return null;

          return (
            <button
              key={index}
              onClick={() => onChoice(choice)}
              className="ink-btn w-full text-left p-4 rounded-lg bg-stone-100/50 hover:bg-stone-200 border border-stone-300 hover:border-stone-400 transition-all duration-300 group relative"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-stone-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 font-bold text-stone-800 group-hover:text-black text-base serif tracking-wide">{choice.text}</span>
              {choice.description && (
                <span className="block relative z-10 text-xs text-stone-500 mt-1 font-serif italic group-hover:text-stone-600">{choice.description}</span>
              )}
            </button>
          );
        })}

        {event.isEnding && (
          <button
            onClick={onRestart}
            className="w-full text-center p-5 rounded-lg bg-[#1a1a1a] text-[#f5f2e9] shadow-lg hover:bg-black hover:shadow-xl transition-all font-bold tracking-widest mt-4 flex items-center justify-center gap-2 group font-serif border border-stone-600"
          >
            <span className="material-icons-round group-hover:-rotate-180 transition-transform duration-700">refresh</span>
            重入轮回
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDisplay;