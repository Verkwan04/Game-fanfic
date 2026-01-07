import React from 'react';

interface Props {
  comments: string | null;
  loading: boolean;
}

// Helper to generate a consistent-looking random user based on index
const getRandomUser = (index: number) => {
  const names = [
    "Momo", "纯爱战士", "User_8871", "吃瓜路人", "XXX激推", 
    "熬夜冠军", "快乐小狗", "Bot", "AAA建材王总", "磕学家",
    "不想上班", "管理员", "匿名用户", "电子榨菜", "绝美爱情"
  ];
  // Desaturated colors
  const avatars = [
    "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-zinc-400", 
    "bg-neutral-500", "bg-slate-500", "bg-gray-400", "bg-zinc-500"
  ];
  
  return {
    name: names[index % names.length] + (Math.floor(Math.random() * 100)),
    avatarColor: avatars[index % avatars.length],
    likes: Math.floor(Math.random() * 500) + 1,
    time: `${Math.floor(Math.random() * 10) + 1}分钟前`
  };
};

const SocialFeed: React.FC<Props> = ({ comments, loading }) => {
  if (loading) {
    return (
      <div className="mt-8 bg-stone-50/50 rounded-lg p-4 border border-stone-200 animate-pulse">
        <div className="flex gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-stone-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-stone-200 rounded w-1/4"></div>
            <div className="h-3 bg-stone-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="text-center text-stone-400 text-xs mt-2 font-serif">坊间传闻收集中...</div>
      </div>
    );
  }

  if (!comments) return null;

  const commentList = comments.split('\n').filter(c => c.trim().length > 0);

  return (
    <div className="mt-8 border-t border-dashed border-stone-300 pt-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-sm font-bold text-stone-600 uppercase tracking-widest flex items-center gap-2 font-serif">
          <span className="material-icons-round text-base">forum</span>
          坊间议论
        </h3>
        <span className="text-xs text-stone-500 border border-stone-300 px-2 py-0.5 rounded-sm font-serif">热议</span>
      </div>

      <div className="space-y-4">
        {commentList.map((text, idx) => {
          const user = getRandomUser(idx);
          return (
            <div key={idx} className="bg-[#fcfbf9] p-4 rounded-sm border border-stone-200 shadow-sm transition-all hover:border-stone-400 comment-anim" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex gap-3">
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 ${user.avatarColor} flex items-center justify-center text-white font-bold text-xs`}>
                  {user.name.charAt(0)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-stone-700 truncate font-serif">{user.name}</span>
                    <span className="text-xs text-stone-400 font-serif">{user.time}</span>
                  </div>
                  
                  <p className="text-stone-800 text-sm mt-1 leading-relaxed break-words font-serif">
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