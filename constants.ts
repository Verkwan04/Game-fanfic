import { Attributes, GameEvent } from "./types";

export const INITIAL_STATS: Attributes = {
  creativity: 10,
  legal: 10,
  eq: 10,
  popularity: 0,
  stress: 0,
  money: 0,
  trust: 10
};

// Character Archetypes for the Lottery
export const ARCHETYPES = [
  {
    name: "【天选富婆】",
    desc: "家里有矿，用爱发电。缺点是何不食肉糜，容易被当冤大头。",
    stats: { money: 5000, creativity: 20, legal: 40, eq: 30, stress: 0, popularity: 10, trust: 20 }
  },
  {
    name: "【美院大佬】",
    desc: "画技高超，人体结构满分。但心思细腻，容易玉玉。",
    stats: { money: 500, creativity: 90, legal: 50, eq: 40, stress: 40, popularity: 30, trust: 10 }
  },
  {
    name: "【未成年学生】",
    desc: "作业很少，时间很多，热血笨蛋。法律意识淡薄。",
    stats: { money: 100, creativity: 50, legal: 5, eq: 20, stress: 10, popularity: 5, trust: 50 }
  },
  {
    name: "【社畜太太】",
    desc: "带薪摸鱼，文笔老练。但随时可能猝死。",
    stats: { money: 2000, creativity: 60, legal: 60, eq: 60, stress: 80, popularity: 10, trust: 10 }
  },
  {
    name: "【乐子人】",
    desc: "不管是红是黑，只要有流量就行。情商极低，攻击性极强。",
    stats: { money: 300, creativity: 30, legal: 30, eq: 5, stress: 0, popularity: 50, trust: 0 }
  }
];

export const EVENTS: Record<string, GameEvent> = {
  // --- START & LOTTERY ---
  "start": {
    id: "start",
    text: "欢迎来到《同人女模拟器》。在这里，你将体验一位同人创作者的爱恨嗔痴。\n\n投胎是门技术活，在进入这个混沌的圈子之前，请先抽取你的【初始人设】。",
    choices: [
      {
        text: "开始抽签 (听天由命)",
        nextEventId: "init_lottery",
        effects: {},
        description: "随机获得初始属性"
      }
    ],
    fixedComments: []
  },
  // "init_lottery" is handled specially in App.tsx to apply random stats and jump to "intro_after_lottery"

  "intro_after_lottery": {
    id: "intro_after_lottery",
    text: "拿着你的人设卡，你正式入坑了最近大火的IP《XXX》。看着首页飘过的粮，你按捺不住躁动的双手。",
    choices: [
      {
        text: "我是画手，我要画图！",
        nextEventId: "create_image_start",
        effects: { creativity: 5, stress: 5 }
      },
      {
        text: "我是写手，我要写文！",
        nextEventId: "create_text_start",
        effects: { creativity: 5, stress: 5 }
      }
    ],
    fixedComments: [
      "欢迎新人入坑！",
      "垂直入坑，这就是天堂吗？",
      "大大饿饿饭饭",
      "快产粮！生产队的驴都不敢歇！"
    ]
  },

  // --- CREATION PATHS ---
  "create_image_start": {
    id: "create_image_start",
    text: "你决定画一张《XXX》的同人图。你打算画什么风格？",
    choices: [
      {
        text: "温馨治愈的Q版大头",
        nextEventId: "platform_choice",
        effects: { popularity: 10, stress: 5 },
        description: "容易吸粉，风险低"
      },
      {
        text: "张力拉满的涩涩图 (R18)",
        nextEventId: "platform_choice_risky",
        effects: { popularity: 30, stress: 10, legal: -10 },
        description: "高风险，高回报"
      }
    ],
    fixedComments: [
      "这就是大大的画风吗？爱了爱了",
      "想看贴贴！",
      "搞快点搞快点",
      "裤子已经脱了"
    ]
  },

  "create_text_start": {
    id: "create_text_start",
    text: "你打开文档，光标闪烁。你打算写什么梗？",
    choices: [
      {
        text: "全员向/友情向/清水",
        nextEventId: "platform_choice",
        effects: { legal: 5, popularity: 5 },
        description: "安全，受众广"
      },
      {
        text: "ABO/强制爱/车 (R18)",
        nextEventId: "platform_choice_risky",
        effects: { legal: -10, popularity: 20, stress: 10 },
        description: "流量密码，但小心炸号"
      }
    ],
    fixedComments: [
      "蹲一个后续",
      "这种设定我可以！",
      "别逼我跪下来求你更新",
      "这就没了？卡在这里是人干的事吗？"
    ]
  },

  // --- PLATFORM ---
  "platform_choice": {
    id: "platform_choice",
    text: "作品完成了，非常清水健康。你决定发在哪里？",
    choices: [
      {
        text: "老福特 (LOFTER)",
        nextEventId: "feedback_normal",
        effects: { popularity: 10 },
        description: "同人快乐老家"
      },
      {
        text: "微博 (Weibo)",
        nextEventId: "feedback_weibo_drama",
        effects: { popularity: 15, stress: 10 },
        description: "流量大，杠精多"
      }
    ],
    fixedComments: []
  },

  "platform_choice_risky": {
    id: "platform_choice_risky",
    text: "作品完成了，尺度有点大。你打算发在哪里？",
    choices: [
      {
        text: "老福特 (拼死一试)",
        nextEventId: "lofter_block",
        effects: { stress: 10, legal: -5 },
        description: "可能会被屏蔽"
      },
      {
        text: "微博 (用图片倒转/外链)",
        nextEventId: "weibo_report_risk",
        effects: { popularity: 20, stress: 15, legal: -10 },
        description: "容易被举报"
      },
      {
        text: "AO3 (海外)",
        nextEventId: "ao3_path",
        effects: { popularity: 5, legal: 5 },
        description: "安全，但国内看的人少"
      }
    ],
    fixedComments: []
  },

  // --- EARLY FEEDBACK & RISKS ---
  "lofter_block": {
    id: "lofter_block",
    text: "你发出的瞬间就被锁了，仅自己可见。系统提示：【包含违规内容】。",
    choices: [
      {
        text: "修改敏感词，重发！(反复横跳)",
        nextEventId: "account_ban_check",
        effects: { stress: 20, legal: -10 }
      },
      {
        text: "算了，发个清水版链接。",
        nextEventId: "feedback_normal",
        effects: { creativity: -5 }
      }
    ],
    fixedComments: [
      "大大被锁了吗？我看不到啊！",
      "老福特你没有心！",
      "把审核杀了给大大助兴",
      "求补档求补档"
    ]
  },
  
  "weibo_report_risk": {
    id: "weibo_report_risk",
    text: "你用了十八层滤镜和倒转图片发在微博。热度很高，但评论区出现了一些不和谐的声音。",
    choices: [
      {
        text: "不管，黑红也是红。",
        nextEventId: "feedback_weibo_drama",
        effects: { stress: 10 }
      },
      {
        text: "怂了，设为仅粉丝可见。",
        nextEventId: "mid_game_hub",
        effects: { popularity: -5, trust: 5 }
      }
    ],
    fixedComments: [
      "卧槽这也太那个了吧...",
      "博主注意点影响，已举报。",
      "姐妹好勇！快存！",
      "能不能别给圈子招黑？"
    ]
  },

  "ao3_path": {
    id: "ao3_path",
    text: "在AO3上，你的作品收获了很多Kudos。但有人把你的链接挂到了国内论坛，指责你【递刀子】。",
    choices: [
      {
        text: "装死，不回应。",
        nextEventId: "mid_game_hub",
        effects: { stress: 5 }
      },
      {
        text: "跟他们对线！创作自由！",
        nextEventId: "cyber_war_start",
        effects: { stress: 30, popularity: 20 }
      }
    ],
    fixedComments: [
      "Kudos! Thank you for sharing.",
      "太太神仙！",
      "有人挂你了，快跑！",
      "这种文也敢写？等着喝茶吧。"
    ]
  },

  "feedback_normal": {
    id: "feedback_normal",
    text: "作品反响平平，但有几个小天使给你留了长评。",
    choices: [
      {
        text: "回复评论，和读者贴贴。",
        nextEventId: "mid_game_hub",
        effects: { trust: 10, eq: 5 }
      },
      {
        text: "高冷不回。",
        nextEventId: "mid_game_hub",
        effects: { popularity: -2 }
      }
    ],
    fixedComments: [
      "虽然很短但很可爱！",
      "大大加油！",
      "打卡",
      "好甜好甜，牙疼"
    ]
  },

  "feedback_weibo_drama": {
    id: "feedback_weibo_drama",
    text: "你的作品因为OOC（人物性格崩坏）被挂上了避雷bot。几千条评论在骂你。",
    choices: [
      {
        text: "道歉，退圈三天。",
        nextEventId: "mid_game_hub",
        effects: { stress: 20, popularity: -10 }
      },
      {
        text: "挂回去！“不喜欢别看！”",
        nextEventId: "cyber_war_start",
        effects: { stress: 40, popularity: 30, eq: -20 }
      }
    ],
    fixedComments: [
      "避雷，OOC致死。",
      "这写的什么玩意？",
      "虽然但是，我觉得还行啊...",
      "你家住海边吗管这么宽？"
    ]
  },

  // --- MID GAME LOOP ---
  "mid_game_hub": {
    id: "mid_game_hub",
    text: "风波暂平，日子还得过。接下来的一个月，你打算怎么度过？",
    choices: [
      {
        text: "【爆肝】日更三千，冲刺漫展死线！",
        nextEventId: "grind_content",
        effects: { creativity: -10, stress: 20, popularity: 10 },
        description: "主要增加知名度，极耗精力"
      },
      {
        text: "【社交】混群、连麦、扩列。",
        nextEventId: "social_event",
        effects: { trust: 15, stress: -10, money: -50 },
        description: "增加信任，消耗金钱（请客/送礼）"
      },
      {
        text: "【搞钱】接稿、开通赞赏、卖周边。",
        nextEventId: "money_event",
        effects: { money: 200, creativity: -10, legal: -5 },
        description: "增加金钱，略微降低法律值"
      },
      {
        text: "【现充】回归三次元，休息一阵。",
        nextEventId: "rest_event",
        effects: { stress: -30, popularity: -10 },
        description: "大幅降低压力，掉粉"
      }
    ],
    fixedComments: [
      "大大失踪人口回归？",
      "催更催更催更！",
      "最近圈里好乱啊...",
      "只要你更文我们就是异父异母的亲兄弟"
    ]
  },

  // --- EVENTS BRANCHES ---

  // 1. GRIND CONTENT
  "grind_content": {
    id: "grind_content",
    text: "你没日没夜地赶稿，头发大把地掉。虽然产出很高，但你感觉身体被掏空。",
    choices: [
      {
        text: "还能肝！只要不死就往死里更！",
        condition: (s) => s.stress < 80,
        nextEventId: "health_check",
        effects: { popularity: 20, stress: 20 }
      },
      {
        text: "不行了，心脏疼...请假。",
        nextEventId: "mid_game_hub",
        effects: { stress: -10 }
      }
    ],
    fixedComments: [
      "劳模啊！注意身体！",
      "生产队的驴都没你勤快",
      "虽然很高兴有粮吃，但大大别猝死啊",
      "这就是强者的发量吗？"
    ]
  },

  "health_check": {
    id: "health_check",
    text: "你在电脑前昏睡了过去。醒来时发现自己躺在医院，医生说你过度劳累，必须戒网。",
    choices: [
      {
        text: "谨遵医嘱，退圈保命。",
        nextEventId: "ending_quit",
        effects: {}
      },
      {
        text: "拔了针头回家继续写！(作死)",
        condition: (s) => s.creativity > 50, // Modified: use creativity instead of passion
        nextEventId: "ending_death", // BAD ENDING
        effects: {}
      }
    ],
    fixedComments: [
      "卧槽大大进医院了？",
      "早日康复！",
      "身体要紧啊！",
      "R.I.P (开玩笑的别当真)"
    ]
  },

  // 2. SOCIAL EVENT
  "social_event": {
    id: "social_event",
    text: "你在群里认识了一个非常投缘的“亲友”。你们每天聊到深夜，交换了地址，甚至想面基。",
    choices: [
      {
        text: "掏心掏肺，把三次元信息都告诉她。",
        nextEventId: "betrayal_check",
        effects: { trust: 20 }
      },
      {
        text: "留个心眼，只聊二次元。",
        nextEventId: "mid_game_hub",
        effects: { trust: 5 }
      }
    ],
    fixedComments: [
      "羡慕神仙友谊",
      "面基记得发返图！",
      "互联网没有真心...",
      "蹲一个翻车现场（划掉）"
    ]
  },

  "betrayal_check": {
    id: "betrayal_check",
    text: "某天，你发现你的私密聊天记录被发到了贴吧。原来她嫉妒你的热度，一直在套你的话。",
    choices: [
      {
        text: "崩溃，被最信任的人背刺。",
        nextEventId: "ending_cyber_bullying",
        effects: { stress: 50 }
      },
      {
        text: "黑化！把她的黑料也抖出来！",
        nextEventId: "cyber_war_start",
        effects: { stress: 30, eq: -20 }
      }
    ],
    fixedComments: [
      "知人知面不知心啊",
      "这就是为什么我不搞亲友",
      "吃瓜，这瓜保熟吗？",
      "心疼大大"
    ]
  },

  // 3. MONEY EVENT
  "money_event": {
    id: "money_event",
    text: "你想搞点钱。目前最快的方式是？",
    choices: [
      {
        text: "私印R18本子 (高风险)",
        nextEventId: "illegal_sales_check",
        effects: { money: 1000, legal: -30, stress: 20 }
      },
      {
        text: "接无料商稿 (画点软色情擦边球)",
        nextEventId: "soft_porn_check",
        effects: { money: 300, legal: -10 }
      },
      {
        text: "老老实实开赞赏",
        nextEventId: "mid_game_hub",
        effects: { money: 50 }
      }
    ],
    fixedComments: [
      "通贩！通贩！",
      "我买爆！",
      "这这这这能过审吗？",
      "大大缺钱了吗？"
    ]
  },

  "illegal_sales_check": {
    id: "illegal_sales_check",
    text: "你的本子销量极佳，但也引起了职业举报人的注意。",
    choices: [
      {
        text: "查看结果",
        condition: (s) => s.legal > 50 && s.popularity < 50, // High legal awareness or low visibility saves you
        nextEventId: "mid_game_hub",
        effects: { stress: 30 }
      },
      {
        text: "查看结果",
        condition: (s) => s.legal <= 50 || s.popularity >= 50,
        nextEventId: "ending_jail",
        effects: {}
      }
    ],
    fixedComments: [
      "已举报，不谢。",
      "这种钱也敢赚？",
      "现在的同人女胆子真大",
      "牢底坐穿预定"
    ]
  },

  // 4. REST EVENT
  "rest_event": {
    id: "rest_event",
    text: "你消失了一个月。当你回来时，发现圈子已经变天了。你的CP糊了，新的烫门崛起了。",
    choices: [
      {
        text: "爬墙！去搞新CP！",
        nextEventId: "intro_after_lottery", // Loop back sort of
        effects: { trust: -20, popularity: -10 }
      },
      {
        text: "坚守冷坑，做北极圈的王。",
        nextEventId: "mid_game_hub",
        effects: { popularity: -20, creativity: 10, trust: 20 }
      }
    ],
    fixedComments: [
      "大大你终于回来了呜呜呜",
      "这对已经没人磕了...",
      "爬墙好快啊笑死",
      "虽然冷，但只要大大在我就在"
    ]
  },

  // --- CYBER WAR & BAN ---
  "cyber_war_start": {
    id: "cyber_war_start",
    text: "你处于舆论的风暴中心。私信99+全是辱骂，你的三次元学校/公司也被骚扰了。",
    choices: [
      {
        text: "扛不住了，销号跑路。",
        nextEventId: "ending_cyber_bullying",
        effects: {}
      },
      {
        text: "硬刚到底，发律师函！",
        condition: (s) => s.money > 2000, // Need money to fight
        nextEventId: "ending_victory_hollow",
        effects: {}
      },
      {
        text: "硬刚到底...",
        condition: (s) => s.money <= 2000,
        nextEventId: "ending_cyber_bullying",
        effects: {}
      }
    ],
    fixedComments: [
      "滚出圈子！",
      "你死了吗？",
      "给爷爬",
      "支持博主维权！"
    ]
  },

  "account_ban_check": {
    id: "account_ban_check",
    text: "你频繁触碰底线，平台终于对你下手了。",
    choices: [
      {
        text: "查看判决",
        nextEventId: "ending_banned",
        effects: {}
      }
    ],
    fixedComments: [
      "账号已注销",
      "查无此人",
      "好死开香槟咯",
      "可惜了那么多粮"
    ]
  },

  // --- ENDINGS ---
  
  // BAD ENDINGS (Most common)
  "ending_quit": {
    id: "ending_quit",
    text: "【结局：退圈保平安】\n你意识到，网络世界的爱恨太虚无。你注销了账号，删除了所有文档。虽然心里空了一块，但至少晚上能睡着觉了。\n\n江湖不见。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：退圈",
    poem: "网海浮沉几度秋，如今抽身且罢休。\n满屏爱恨皆虚妄，不如现充解千愁。"
  },
  
  "ending_cyber_bullying": {
    id: "ending_cyber_bullying",
    text: "【结局：惊弓之鸟】\n网络暴力的阴影挥之不去。只要听到手机震动，你就会心跳加速。你不仅失去了创作的热情，也对人性失去了信任。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：惊弓之鸟",
    poem: "人言可畏胜刀枪，字字诛心透骨凉。\n掩卷息屏归去后，夜深犹自梦苍茫。"
  },

  "ending_jail": {
    id: "ending_jail",
    text: "【结局：铁窗泪】\n你因为非法出版/传播淫秽物品牟利罪被立案调查。虽然你只是想搞同人，但法律的红线不可触碰。等待你的是漫长的刑期。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：铁窗泪",
    poem: "利欲熏心这般愁，铁窗风雨几时休。\n当初只道金银好，换得身名一旦休。"
  },

  "ending_banned": {
    id: "ending_banned",
    text: "【结局：赛博失语】\n你的账号没了。那个承载了你无数心血、连接着几万粉丝的ID，变成了一串乱码。你试图转世，但每次都被追着举报。你在这个圈子彻底“社会性死亡”了。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：赛博失语",
    poem: "十年心血一朝空，名为违规去无踪。\n赛博坟场无墓碑，只有404在风中。"
  },

  "ending_death": {
    id: "ending_death",
    text: "【结局：过劳死】\n长期熬夜赶稿、饮食不规律、精神压力过大...你的身体终于罢工了。在一次赶漫展死线的凌晨，你的心脏停止了跳动。为了爱，你献祭了生命。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：殉道者",
    poem: "呕心沥血为谁痴，燃尽芳华绝笔时。\n唯愿天堂无截稿，来生不再做画师。"
  },

  "ending_victory_hollow": {
    id: "ending_victory_hollow",
    text: "【结局：惨胜】\n你赢了官司，让造谣者道了歉。但你也为此耗尽了积蓄和精力。看着满地鸡毛的圈子，你再也找不回当初单纯磕CP的快乐了。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：惨胜",
    poem: "虽赢身后虚名在，输却当年赤子心。\n一片狼藉归去路，独留清白照古今。"
  },

  // GOOD / RARE ENDINGS
  "ending_god": {
    id: "ending_god",
    text: "【结局：紫微星】\n你是被神选中的创作者。你的每一部作品都爆火，你的画风/文风成为全网模仿的对象。你不仅安全变现，还成功转型，成为了真正的行业大佬。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：紫微星",
    poem: "十年辛苦磨一剑，今日锋芒天下知。\n名利双收随手得，青云直上九重时。"
  },
  
  "ending_peace": {
    id: "ending_peace",
    text: "【结局：细水长流】\n你没有大红大紫，也没有遭遇大风大浪。你在三次元和二次元之间找到了完美的平衡。你有三五好友，有稳定的产出，这份热爱温暖了你漫长的岁月。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：细水长流",
    poem: "平平淡淡才是真，偶向闲窗写旧因。\n不求闻达于诸侯，自有一方自在身。"
  }
};