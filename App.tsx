import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Choice, Attributes, FateCard } from './types';
import { INITIAL_STATS, EVENTS, COMMENT_LIBRARY } from './constants';
import StatsPanel from './components/StatsPanel';
import EventDisplay from './components/EventDisplay';
import SaveLoadControls from './components/SaveLoadControls';
import FateBook from './components/FateBook';
import { generateFateCard } from './services/geminiService';

const SAVE_KEY = 'doujinshi_save_data_v2'; 
const ACHIEVEMENTS_KEY = 'doujinshi_achievements_v1';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentEventId: 'start',
    attributes: { ...INITIAL_STATS },
    history: ['start'],
    isGameOver: false,
    generatedComments: null,
    activeFateCard: null
  });
  
  const [hasSave, setHasSave] = useState(false);
  const [achievements, setAchievements] = useState<Record<string, FateCard>>({});
  const [showFateBook, setShowFateBook] = useState(false);

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

  const currentEvent = EVENTS[gameState.currentEventId] || EVENTS['start'];

  // Handle Side Effects (Ending Generation / Comment Generation)
  useEffect(() => {
    if (!currentEvent) return;

    // 1. Handle Ending
    if (currentEvent.isEnding) {
      handleEndingReached(
        currentEvent.id, 
        currentEvent.endingTitle || "未知结局", 
        currentEvent.text,
        currentEvent.poem
      );
      setGameState(prev => ({ ...prev, generatedComments: null }));
      return;
    }

    // 2. Handle Social Comments (Synchronous from Library)
    if (currentEvent.commentScenario) {
      const pool = COMMENT_LIBRARY[currentEvent.commentScenario];
      if (pool && pool.length > 0) {
        // Shuffle and pick 3 unique comments
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        setGameState(prev => ({ ...prev, generatedComments: shuffled.slice(0, 3) }));
      } else {
         setGameState(prev => ({ ...prev, generatedComments: null }));
      }
    } else {
      setGameState(prev => ({ ...prev, generatedComments: null }));
    }
  }, [gameState.currentEventId]);

  const handleEndingReached = async (endingId: string, title: string, text: string, predefinedPoem?: string) => {
    // 1. Check cache
    if (achievements[endingId]) {
      setGameState(prev => ({ ...prev, activeFateCard: achievements[endingId] }));
      return;
    }

    // 2. Generate Poem (AI or predefined)
    const { poem } = await generateFateCard(title, text, predefinedPoem);
    
    const finalCard: FateCard = {
      id: endingId,
      title,
      poem,
      timestamp: Date.now()
    };

    // 3. Update
    setAchievements(prev => {
      const updated = { ...prev, [endingId]: finalCard };
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
      return updated;
    });

    setGameState(prev => ({ ...prev, activeFateCard: finalCard }));
  };

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

    // DEFING FATE LOGIC (Random "Miracle" Probability)
    let nextId = choice.nextEventId;
    const isNextEnding = EVENTS[nextId]?.isEnding;
    
    if (!isNextEnding && nextId !== 'start' && nextId !== 'lottery_draw') {
       const fateRoll = Math.random();
       if (fateRoll < 0.02) { // 2% chance
          console.log("Defying Fate Triggered!");
          nextId = 'event_miracle';
       }
    }

    setGameState(prev => ({
      ...prev,
      currentEventId: nextId,
      attributes: newStats,
      history: [...prev.history, nextId],
      generatedComments: null,
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
        if (parsed && parsed.currentEventId && parsed.attributes) {
           setGameState(parsed);
        }
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
      generatedComments: null,
      activeFateCard: null
    });
  };

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
            aiComments={gameState.generatedComments}
            loadingAI={false} 
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
                <span><b>开局抽签</b>：不同的出身决定了你的初始资源。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5"></span>
                <span><b>逆天改命</b>：极小概率触发奇迹事件。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5"></span>
                <span><b>善用存档</b>：江湖险恶，随时可能结局。</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;