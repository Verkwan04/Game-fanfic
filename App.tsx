import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Choice, Attributes, FateCard } from './types';
import { INITIAL_STATS, EVENTS, ARCHETYPES } from './constants';
import StatsPanel from './components/StatsPanel';
import EventDisplay from './components/EventDisplay';
import SaveLoadControls from './components/SaveLoadControls';
import FateBook from './components/FateBook';

const SAVE_KEY = 'doujinshi_save_data_v2';
const ACHIEVEMENTS_KEY = 'doujinshi_achievements_v2';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentEventId: 'start',
    attributes: { ...INITIAL_STATS },
    history: ['start'],
    isGameOver: false,
    activeFateCard: null
  });
  
  const [hasSave, setHasSave] = useState(false);
  const [achievements, setAchievements] = useState<Record<string, FateCard>>({});
  const [showFateBook, setShowFateBook] = useState(false);
  const [lotteryResult, setLotteryResult] = useState<string | null>(null);

  // Load Save and Achievements
  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) setHasSave(true);

    const savedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (savedAchievements) {
      try {
        setAchievements(JSON.parse(savedAchievements));
      } catch (e) { console.error("Failed to load achievements", e); }
    }
  }, []);

  const currentEvent = EVENTS[gameState.currentEventId];

  // Handle Ending
  useEffect(() => {
    if (currentEvent && currentEvent.isEnding) {
      handleEndingReached(
        currentEvent.id, 
        currentEvent.endingTitle || "未知结局", 
        currentEvent.poem
      );
    }
  }, [gameState.currentEventId]);

  const handleEndingReached = (endingId: string, title: string, poem?: string) => {
    const finalCard: FateCard = {
      id: endingId,
      title,
      poem: poem || "命数天定，无字天书。",
      timestamp: Date.now()
    };

    setGameState(prev => ({ ...prev, activeFateCard: finalCard }));

    setAchievements(prev => {
      const updated = { ...prev, [endingId]: finalCard };
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleChoice = (choice: Choice) => {
    // INTERCEPT: LOTTERY LOGIC
    if (choice.nextEventId === 'init_lottery') {
        const randomArchetype = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
        
        setGameState(prev => ({
            ...prev,
            currentEventId: 'intro_after_lottery',
            attributes: { ...randomArchetype.stats }, // Override stats
            history: [...prev.history, 'intro_after_lottery'],
            activeFateCard: null
        }));
        
        // Temporarily show result (hacky way using alert or just state?)
        // Better: let's inject a "flash message" into the next event text?
        // Simpler: Just update state and let user see updated stats.
        // Or show an alert.
        alert(`【抽签结果】\n你抽到了：${randomArchetype.name}\n${randomArchetype.desc}`);
        return;
    }

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
      activeFateCard: null
    }));
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

  const handleRestart = () => {
    setGameState({
      currentEventId: 'start',
      attributes: { ...INITIAL_STATS },
      history: ['start'],
      isGameOver: false,
      activeFateCard: null
    });
  };

  if (!currentEvent) {
    return <div className="min-h-screen flex items-center justify-center text-stone-400 font-serif">Loading Universe...</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {showFateBook && (
        <FateBook achievements={achievements} onClose={() => setShowFateBook(false)} />
      )}

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Title / Header */}
        <div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between mb-2 md:mb-0">
          <div className="text-center md:text-left flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-normal calligraphy text-stone-800 tracking-wider drop-shadow-sm">
                同人女模拟器
              </h1>
              <p className="text-stone-500 font-serif text-xs uppercase tracking-[0.3em]">Doujinshi Simulator</p>
            </div>
            <button 
               onClick={() => setShowFateBook(true)}
               className="ml-4 w-12 h-12 rounded-lg bg-[#8b1e1e] text-[#f5f2e9] border border-[#f5f2e9] flex items-center justify-center shadow-md hover:scale-105 transition-transform"
               title="查看命薄"
            >
               <span className="calligraphy text-2xl">命</span>
            </button>
          </div>
          
          <div className="mt-4 md:mt-0">
            <SaveLoadControls onSave={handleSave} onLoad={handleLoad} hasSave={hasSave} />
          </div>
        </div>

        {/* Left Column: Game Area */}
        <div className="md:col-span-8 ink-card rounded-xl p-8 md:p-12 min-h-[600px] max-h-[85vh] flex flex-col relative transition-all">
          <EventDisplay 
            event={currentEvent} 
            onChoice={handleChoice} 
            attributes={gameState.attributes}
            activeFateCard={gameState.activeFateCard}
            onRestart={handleRestart}
            onOpenFateBook={() => setShowFateBook(true)}
          />
        </div>

        {/* Right Column: Stats */}
        <div className="md:col-span-4 space-y-6 flex flex-col">
          <StatsPanel stats={gameState.attributes} />
          
          <div className="ink-card p-5 rounded-xl text-xs leading-relaxed text-stone-600 shadow-sm border border-stone-200">
            <h4 className="font-bold text-stone-800 mb-3 uppercase tracking-wider flex items-center gap-2 font-serif">
              <span className="material-icons-round text-sm text-[#8b1e1e]">lightbulb</span>
              玩法说明
            </h4>
            <ul className="space-y-3 list-none font-serif">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5"></span>
                <span><b>人设抽签</b>：开局随机决定你的命运起点。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5"></span>
                <span><b>收集命签</b>：达成不同结局，解锁命薄判词。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5"></span>
                <span><b>请随时存档</b>：圈子险恶，一失足成千古恨。</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;