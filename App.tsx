import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Choice, Attributes } from './types';
import { INITIAL_STATS, EVENTS } from './constants';
import StatsPanel from './components/StatsPanel';
import EventDisplay from './components/EventDisplay';
import SaveLoadControls from './components/SaveLoadControls';
import { generateFanComments } from './services/geminiService';

const SAVE_KEY = 'doujinshi_save_data_v1';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentEventId: 'start',
    attributes: { ...INITIAL_STATS },
    history: ['start'],
    isGameOver: false,
    generatedComments: null,
    isLoadingAI: false
  });
  
  const [hasSave, setHasSave] = useState(false);

  // Check for save file on mount
  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) setHasSave(true);
  }, []);

  const currentEvent = EVENTS[gameState.currentEventId];

  // Logic for special checkpoints
  useEffect(() => {
    if (!currentEvent) return;
    
    let redirectId: string | null = null;

    if (gameState.currentEventId === 'ending_original_check') {
       redirectId = (gameState.attributes.creativity > 80 && gameState.attributes.popularity > 50) 
         ? 'ending_success' 
         : 'ending_fail_original';
    } else if (gameState.currentEventId === 'jail_check') {
       redirectId = (gameState.attributes.legal < 30) 
         ? 'ending_jail_sales' 
         : 'ending_police_1';
    }

    if (redirectId) {
      setGameState(prev => ({
        ...prev,
        currentEventId: redirectId!,
        history: [...prev.history, redirectId!]
      }));
    }
  }, [gameState.currentEventId, gameState.attributes]);

  // Wrapper to trigger AI comments automatically
  const triggerAIComments = useCallback(async (eventId: string, stats: Attributes) => {
    const evt = EVENTS[eventId];
    if (!evt || evt.isEnding) return;

    setGameState(prev => ({ ...prev, isLoadingAI: true, generatedComments: null }));
    
    // Slight delay to simulate network/thinking and allow UI transition
    await new Promise(r => setTimeout(r, 800)); 

    const comments = await generateFanComments(evt.text, stats);

    setGameState(prev => ({ 
      ...prev, 
      isLoadingAI: false,
      generatedComments: comments
    }));
  }, []);


  const handleChoice = (choice: Choice) => {
    const newStats = { ...gameState.attributes };

    if (choice.effects) {
      Object.entries(choice.effects).forEach(([key, value]) => {
        const k = key as keyof Attributes;
        if (typeof value === 'number') {
          newStats[k] += value;
        }
      });
    }

    setGameState(prev => ({
      ...prev,
      currentEventId: choice.nextEventId,
      attributes: newStats,
      history: [...prev.history, choice.nextEventId],
      generatedComments: null // Clear previous comments immediately
    }));

    // Trigger AI for the NEXT event
    triggerAIComments(choice.nextEventId, newStats);
  };

  const handleSave = () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    setHasSave(true);
  };

  const handleLoad = () => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
  };

  if (!currentEvent) {
    return <div className="min-h-screen flex items-center justify-center text-pink-400 animate-pulse">Loading Universe...</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Title / Header */}
        <div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between mb-2 md:mb-0">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-normal dreamy-font text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-wider drop-shadow-sm">
              同人女模拟器
            </h1>
            <p className="text-slate-500 font-light text-xs uppercase tracking-[0.3em]">Doujinshi Simulator</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <SaveLoadControls onSave={handleSave} onLoad={handleLoad} hasSave={hasSave} />
          </div>
        </div>

        {/* Left Column: Game Area */}
        <div className="md:col-span-8 glass-card rounded-3xl p-6 md:p-10 min-h-[600px] max-h-[85vh] flex flex-col relative shadow-2xl shadow-purple-500/10 transition-all">
          <EventDisplay 
            event={currentEvent} 
            onChoice={handleChoice} 
            attributes={gameState.attributes}
            aiComments={gameState.generatedComments}
            loadingAI={gameState.isLoadingAI}
          />
        </div>

        {/* Right Column: Stats */}
        <div className="md:col-span-4 space-y-6 flex flex-col">
          <StatsPanel stats={gameState.attributes} />
          
          <div className="glass p-5 rounded-2xl text-xs leading-relaxed text-slate-600 shadow-sm border border-white/50">
            <h4 className="font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="material-icons-round text-sm text-yellow-500">lightbulb</span>
              玩法说明
            </h4>
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5"></span>
                <span><b>自动评论</b>：你的每一个选择都会实时引发网友热议。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5"></span>
                <span>请随时<b>存档</b>，某些结局不可逆。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-pink-400 mt-1.5"></span>
                <span>创作力决定好评度，法律意识决定生存率。</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;