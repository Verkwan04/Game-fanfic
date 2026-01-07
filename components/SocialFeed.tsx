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
  const avatars = [
    "bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", 
    "bg-purple-400", "bg-pink-400", "bg-indigo-400", "bg-gray-400"
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
      <div className="mt-8 bg-white/50 rounded-xl p-4 border border-white/60 shadow-sm animate-pulse">
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
        <div className="text-center text-slate-400 text-xs mt-2">正在刷新实时广场...</div>
      </div>
    );
  }

  if (!comments) return null;

  const commentList = comments.split('\n').filter(c => c.trim().length > 0);

  return (
    <div className="mt-8 border-t border-slate-200/50 pt-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span className="material-icons-round text-base">public</span>
          实时热门讨论
        </h3>
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Hot 🔥</span>
      </div>

      <div className="space-y-4">
        {commentList.map((text, idx) => {
          const user = getRandomUser(idx);
          return (
            <div key={idx} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm transition-all hover:shadow-md hover:bg-white comment-anim" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex-shrink-0 ${user.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-inner`}>
                  {user.name.charAt(0)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-slate-700 truncate">{user.name}</span>
                    <span className="text-xs text-slate-400">{user.time}</span>
                  </div>
                  
                  <p className="text-slate-800 text-sm mt-1 leading-relaxed break-words">
                    {text}
                  </p>
                  
                  {/* Fake Actions */}
                  <div className="flex gap-4 mt-3 text-slate-400 text-xs font-medium">
                    <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                      <span className="material-icons-round text-[14px]">favorite_border</span>
                      {user.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                      <span className="material-icons-round text-[14px]">chat_bubble_outline</span>
                      回复
                    </button>
                    <button className="flex items-center gap-1 hover:text-slate-600 transition-colors ml-auto">
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