import React, { useEffect, useState, useRef } from 'react';
import { GameEvent, Choice, Attributes, FateCard as FateCardType } from '../types';
import SocialFeed from './SocialFeed';
import FateCard from './FateCard';
import html2canvas from 'html2canvas';

interface Props {
  event: GameEvent;
  onChoice: (choice: Choice) => void;
  attributes: Attributes;
  aiComments: string | null;
  loadingAI: boolean;
  activeFateCard: FateCardType | null;
  onRestart: () => void;
  onOpenFateBook: () => void;
}

const EventDisplay: React.FC<Props> = ({ 
  event, 
  onChoice, 
  attributes, 
  aiComments, 
  loadingAI, 
  activeFateCard, 
  onRestart,
  onOpenFateBook 
}) => {
  const [showContent, setShowContent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setShowContent(false);
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, [event.id]);

  const handleDownloadCard = async () => {
    if (!cardRef.current || isSaving) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Higher resolution
        backgroundColor: null, 
        useCORS: true, 
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `同人女模拟器-结局-${activeFateCard?.title || 'Fate'}.png`;
      link.click();
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyText = () => {
    if (!activeFateCard) return;
    const shareText = `【同人女模拟器】\n我在乱世中达成了结局：${activeFateCard.title}\n----------------\n${activeFateCard.poem}\n----------------\n你是为爱发电还是用爱换钱？快来测测你的同人创作运势！`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      alert("判词已复制到剪贴板！\n快去粘贴分享给朋友吧！");
    }).catch(() => {
      console.error("Copy failed");
    });
  };

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
           <div className="my-8 flex flex-col items-center gap-6">
              <div ref={cardRef} className="w-full flex justify-center p-2 rounded-lg bg-transparent">
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

              {/* Card Actions */}
              {activeFateCard && (
                 <div className="flex flex-wrap justify-center gap-3 w-full">
                    <button 
                      onClick={handleCopyText}
                      className="px-4 py-2 bg-[#fdfbf7] border border-[#8b1e1e] text-[#8b1e1e] hover:bg-[#fff5f5] rounded-md font-serif text-sm flex items-center gap-2 transition-colors shadow-sm"
                    >
                       <span className="material-icons-round text-sm">content_copy</span>
                       复制判词分享
                    </button>

                    <button 
                      onClick={handleDownloadCard}
                      disabled={isSaving}
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-md font-serif text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                       <span className="material-icons-round text-sm">{isSaving ? 'hourglass_top' : 'download'}</span>
                       {isSaving ? '保存中...' : '保存图片'}
                    </button>
                    
                    <button 
                      onClick={onOpenFateBook}
                      className="px-4 py-2 bg-[#8b1e1e] hover:bg-[#a62424] text-[#f5f2e9] rounded-md font-serif text-sm flex items-center gap-2 transition-colors shadow-md"
                    >
                       <span className="material-icons-round text-sm">bookmark_added</span>
                       收入命薄
                    </button>
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
        {!event.isEnding && event.choices.map((choice, index) => {
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