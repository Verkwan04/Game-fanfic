import React, { useState } from 'react';

interface Props {
  onConfirm: () => void;
}

const Disclaimer: React.FC<Props> = ({ onConfirm }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/95 backdrop-blur-sm p-4 animate-float-in">
      <div className="bg-[#f5f2e9] w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col border border-stone-600 relative overflow-hidden">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        
        <div className="p-6 bg-[#1a1a1a] text-[#f5f2e9] shrink-0 z-10 shadow-md">
          <h2 className="text-xl font-bold font-serif tracking-[0.2em] text-center">免责声明</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-stone-800 text-sm font-serif leading-relaxed custom-scrollbar relative z-10">
           <p className="font-bold text-base">致所有用户：</p>
           <p>欢迎体验本游戏。请您在开始前，仔细阅读并理解本免责声明的全部内容。您的下载、安装、访问或使用行为，即视为您已完全理解、同意并承诺遵守本声明的所有条款。</p>
           
           <div className="space-y-2 mt-4">
             <h3 className="font-bold text-[#8b1e1e] text-base">一、游戏性质与用户承诺</h3>
             <p>1. 本游戏为个人开发、非商业性质的技术测试与娱乐体验项目，旨在进行技术交流与能力展示。</p>
             <p>2. 您承诺并保证：您使用本游戏的目的是进行合法的个人娱乐或技术评估，不涉及任何商业用途，且不会将其用于任何违法、违规活动，或侵害他人合法权益的行为。</p>
           </div>

           <div className="space-y-2 mt-4">
             <h3 className="font-bold text-[#8b1e1e] text-base">二、内容与风险免责</h3>
             <p>1. 本游戏内容为原创或基于公有领域素材的再创作，不直接关联或影射任何特定现实实体、商业作品或个人。开发者无意侵犯任何第三方的知识产权或名誉权。</p>
             <p>2. 游戏体验过程中可能涉及虚拟情节、画面或操作，请您清晰区分虚拟游戏与现实世界。开发者对因用户混淆虚拟与现实而产生的任何后果不承担责任。</p>
             <p>3. 本游戏按“现状”提供，不保证完全无缺陷、无中断或绝对安全。对于游戏运行可能导致的设备软硬件故障、数据丢失或任何间接损失，开发者恕不负责。</p>
           </div>

           <div className="space-y-2 mt-4">
             <h3 className="font-bold text-[#8b1e1e] text-base">三、用户行为与责任自担</h3>
             <p>1. 您应对使用本游戏过程中的一切行为及后果自行承担责任。</p>
             <p>2. 请您在遵守法律法规及公序良俗的前提下进行分享与传播，任何因用户传播行为引发的纠纷或责任，均与开发者无关。</p>
           </div>

           <div className="space-y-2 mt-4">
             <h3 className="font-bold text-[#8b1e1e] text-base">四、责任限制</h3>
             <p>在法律允许的最大范围内，开发者不就因使用或无法使用本游戏所引发的任何直接、间接、附带、特殊或后果性损害承担责任，包括但不限于利润损失、数据丢失、业务中断等。</p>
           </div>

           <div className="space-y-2 mt-4">
             <h3 className="font-bold text-[#8b1e1e] text-base">五、声明修改与最终解释</h3>
             <p>开发者保留随时更新或修改本免责声明的权利，修改后的声明将在游戏相关页面公布后立即生效。本声明的最终解释权归开发者所有。</p>
           </div>
        </div>

        <div className="p-6 bg-[#e8e4d9] border-t border-stone-300 z-10 shrink-0 flex flex-col items-center gap-4">
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 accent-[#8b1e1e] cursor-pointer"
            />
            <span className="text-stone-700 font-bold text-sm group-hover:text-[#8b1e1e] transition-colors">
              我已阅读并同意上述免责声明
            </span>
          </label>

          <button
            onClick={onConfirm}
            disabled={!agreed}
            className={`
              w-full py-3 px-6 rounded-md font-bold tracking-widest transition-all duration-300 font-serif
              ${agreed 
                ? 'bg-[#8b1e1e] text-[#f5f2e9] shadow-lg hover:bg-[#a62424] hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'bg-stone-300 text-stone-500 cursor-not-allowed'}
            `}
          >
            进入游戏
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;