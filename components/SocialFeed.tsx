import React from 'react';

interface Props {
  comments: string[];
}

// Helper to generate a consistent-looking random user based on index
const getRandomUser = (index: number) => {
  const names = [
    "Momo", "纯爱战士", "吃瓜路人", "XXX激推", "熬夜冠军", "快乐小狗",
    "磕学家", "不想上班", "电子榨菜", "绝美爱情", "互联网嘴替", "催更狂魔",
    "冷圈难民", "今天也在磕", "饿饿饭饭", "路过存图", "理性消费人",
    "站姐不私生", "签售抢到了", "为爱发电", "匿名用户", "只看文不说话"
  ];
  const avatars = [
    "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-zinc-400", 
    "bg-neutral-500", "bg-slate-500", "bg-gray-400", "bg-zinc-500",
    "bg-[#8b1e1e]", "bg-[#4a4a4a]"
  ];
  
  return {
    name: names[index % names.length] + (Math.floor(Math.random() * 100)),
    avatarColor: avatars[index % avatars.length],
    likes: Math.floor(Math.random() * 500) + 1,
    time: `${Math.floor(Math.random() * 10) + 1}分钟前`
  };
};

const shuffle = <T,>(arr: T[]): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const SocialFeed: React.FC<Props> = ({ comments }) => {
  if (!comments || comments.length === 0) return null;
  const displayComments = comments.length > 6 ? shuffle(comments).slice(0, 6) : shuffle(comments);

  return (
    <div className="mt-8 border-t border-dashed border-stone-300 pt-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-sm font-bold text-stone-600 uppercase tracking-widest flex items-center gap-2 font-serif">
          <span className="material-icons-round text-base">forum</span>
          坊间议论
        </h3>
        <span className="text-xs text-stone-500 border border-stone-300 px-2 py-0.5 rounded-sm font-serif">实时</span>
      </div>

      <div className="space-y-4">
        {displayComments.map((text, idx) => {
          const user = getRandomUser(idx);
          return (
            <div key={idx} className="bg-[#fcfbf9] p-4 rounded-sm border border-stone-200 shadow-sm transition-all hover:border-stone-400 comment-anim" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex gap-3">
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 ${user.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-inner`}>
                  {user.name.charAt(0)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-stone-700 truncate font-serif">{user.name}</span>
                    <span className="text-xs text-stone-400 font-serif">{user.time}</span>
                  </div>
                  
                  <p className="text-stone-800 text-sm mt-1 leading-relaxed break-words font-serif text-justify">
                    {text}
                  </p>
                  
                  {/* Fake Actions */}
                  <div className="flex gap-4 mt-2 text-stone-400 text-xs font-medium">
                    <button className="flex items-center gap-1 hover:text-[#8b1e1e] transition-colors">
                      <span className="material-icons-round text-[14px]">thumb_up_off_alt</span>
                      {user.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-stone-600 transition-colors ml-auto">
                      <span className="material-icons-round text-[14px]">more_horiz</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialFeed;