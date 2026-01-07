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
  onRestart: () => void; // New prop for correct restart behavior
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
      <div className="flex-grow overflow-y-auto mb-6 pr-2 custom-scrollbar">
        
        {/* Main Text */}
        <div className="mb-8">
          {event.isEnding && (
            <div className="text-center mb-6">
               <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-bold tracking-wider mb-2">FINAL CHAPTER</span>
            </div>
          )}
          <h2 className="text-3xl font-black text-slate-800 mb-6 dreamy-font tracking-wide leading-tight">
            {event.isEnding ? event.endingTitle : "新的篇章"}
          </h2>
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg leading-loose text-slate-700 serif">
              {event.text}
            </p>
          </div>
        </div>

        {/* Fate Card Display at Ending */}
        {event.isEnding && (
           <div className="my-8 flex justify-center">
              {activeFateCard ? (
                 <div className="animate-float-in">
                    <FateCard card={activeFateCard} />
                 </div>
              ) : (
                 <div className="w-full max-w-sm h-[500px] border-4 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center text-stone-400 bg-stone-50 animate-pulse">
                    <span className="material-icons-round text-4xl mb-2">auto_awesome</span>
                    <span className="text-sm font-serif">正在推演天机...</span>
                    <span className="text-xs mt-2 opacity-60">绘制命运画卷中</span>
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
      <div className="space-y-4 pt-4 border-t border-white/40">
        {event.choices.map((choice, index) => {
          if (choice.condition && !choice.condition(attributes)) return null;

          return (
            <button
              key={index}
              onClick={() => onChoice(choice)}
              className="w-full text-left p-4 rounded-xl bg-white/60 hover:bg-white border border-white/50 shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 font-bold text-slate-700 group-hover:text-pink-900 text-base">{choice.text}</span>
              {choice.description && (
                <span className="block relative z-10 text-xs text-slate-500 mt-1 font-medium group-hover:text-pink-700/70">{choice.description}</span>
              )}
            </button>
          );
        })}

        {event.isEnding && (
          <button
            onClick={onRestart}
            className="w-full text-center p-5 rounded-xl bg-slate-800 text-white shadow-lg hover:bg-slate-700 hover:shadow-xl transition-all font-bold tracking-widest mt-4 flex items-center justify-center gap-2 group"
          >
            <span className="material-icons-round group-hover:-rotate-180 transition-transform duration-500">refresh</span>
            重入轮回
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDisplay;