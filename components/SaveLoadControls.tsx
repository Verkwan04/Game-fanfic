import React, { useState } from 'react';

interface Props {
  onSave: () => void;
  onLoad: () => void;
  hasSave: boolean;
}

const SaveLoadControls: React.FC<Props> = ({ onSave, onLoad, hasSave }) => {
  const [msg, setMsg] = useState<string | null>(null);

  const handleSave = () => {
    onSave();
    setMsg("存档成功!");
    setTimeout(() => setMsg(null), 2000);
  };

  const handleLoad = () => {
    onLoad();
    setMsg("读档成功!");
    setTimeout(() => setMsg(null), 2000);
  };

  return (
    <div className="flex gap-2 items-center">
      <button 
        onClick={handleSave}
        className="px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white text-slate-600 text-xs font-bold border border-white shadow-sm transition-all"
        title="保存当前进度"
      >
        <span className="material-icons-round text-sm align-middle mr-1">save</span>
        存档
      </button>
      
      {hasSave && (
        <button 
          onClick={handleLoad}
          className="px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white text-slate-600 text-xs font-bold border border-white shadow-sm transition-all"
          title="读取上次存档"
        >
           <span className="material-icons-round text-sm align-middle mr-1">history</span>
           读档
        </button>
      )}

      {msg && (
        <span className="text-xs text-emerald-600 font-bold animate-pulse ml-2">{msg}</span>
      )}
    </div>
  );
};

export default SaveLoadControls;