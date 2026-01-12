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

// Character Archetypes
export const ARCHETYPES = [
  {
    name: "【天选富婆】",
    desc: "家里有矿，用爱发电。约稿从不手软，出本只送不卖。唯一的缺点是太有钱了，容易被当成ATM，且难以共情打工人的痛苦。",
    stats: { money: 8000, creativity: 30, legal: 50, eq: 20, stress: 0, popularity: 20, trust: 30 }
  },
  {
    name: "【美院大佬】",
    desc: "人体结构满分，光影一绝。虽然画技高超，但心思细腻敏感，容易因为一条恶评emo一整晚，san值常年低空飞行。",
    stats: { money: 500, creativity: 95, legal: 50, eq: 30, stress: 50, popularity: 40, trust: 10 }
  },
  {
    name: "【高三牲/考研党】",
    desc: "在题海中偷得半日闲。时间极其紧缺，全靠甚至燃烧生命在产粮。热血笨蛋，容易上头，法律意识较为淡薄。",
    stats: { money: 100, creativity: 60, legal: 10, eq: 20, stress: 20, popularity: 5, trust: 50 }
  },
  {
    name: "【社畜太太】",
    desc: "白天是职场牛马，晚上是圈内神仙。文笔老练辛辣，看透世态炎凉。但也因为长期熬夜，身体状况堪忧，随时可能猝死。",
    stats: { money: 3000, creativity: 70, legal: 70, eq: 70, stress: 80, popularity: 10, trust: 10 }
  },
  {
    name: "【乐子人】",
    desc: "并不在乎圈子死活，只在乎有没有瓜吃。擅长阴阳怪气，攻击性极强，哪里有火哪里就有你的身影。混乱邪恶阵营。",
    stats: { money: 300, creativity: 40, legal: 40, eq: 5, stress: 0, popularity: 60, trust: 0 }
  }
];

export const EVENTS: Record<string, GameEvent> = {
  // --- STAGE 1: ORIGIN ---
  "start": {
    id: "start",
    text: "欢迎来到《同人女模拟器》。\n\n这是一个关于爱、欲望与生存的游戏。在这里，你可能是神仙太太，也可能是人人喊打的过街老鼠。在这个充满戾气与热爱的互联网夹缝中，你能坚持多久？\n\n首先，请抽取你的【初始人设】。",
    choices: [
      {
        text: "开始抽签 (听天由命)",
        nextEventId: "init_lottery",
        effects: {},
        description: "决定你的出身、天赋与抗压能力"
      }
    ],
    fixedComments: []
  },

  "intro_after_lottery": {
    id: "intro_after_lottery",
    text: "拿着你的人设卡，你正式入坑了最近大火的IP《XXX》。首页全是神仙打架，你的CP正处于热恋期（指粉丝脑补）。看着这些绝美粮仓，你体内的创作之魂按捺不住了。",
    choices: [
      {
        text: "我是画手，我要用板子说话！",
        nextEventId: "stage2_art_topic",
        effects: { creativity: 5, stress: 5 },
        description: "进入绘圈，靠视觉冲击吸粉"
      },
      {
        text: "我是写手，我要用文字造梦！",
        nextEventId: "stage2_fic_topic",
        effects: { creativity: 5, stress: 5 },
        description: "进入文圈，靠剧情与XP吸粉"
      }
    ],
    fixedComments: [
      "欢迎新人入坑！只要你磕XX我们就是异父异母的亲姐妹！",
      "垂直入坑，这就是天堂吗？粮多到吃不过来，孩子已经撑死了。",
      "大大饿饿饭饭，前面的别挤，让我先舔一口！",
      "虽然是冷圈难民，但看到新入坑的姐妹还是留下了激动的泪水。"
    ]
  },

  // --- STAGE 2: STYLE & TOPIC ---
  "stage2_art_topic": {
    id: "stage2_art_topic",
    text: "你打开了Sai/Procreate，面对空白的画布。第一张图，你决定画什么风格来打响名号？",
    choices: [
      {
        text: "【全年龄】温馨治愈的日常贴贴",
        nextEventId: "stage3_platform",
        effects: { popularity: 10, stress: 5, legal: 5 },
        description: "受众广，风险低，容易被官方翻牌"
      },
      {
        text: "【R18】张力拉满的触手/监禁/黑深残",
        nextEventId: "stage3_platform_risky",
        effects: { popularity: 30, stress: 15, legal: -15 },
        description: "流量密码，容易被封号，容易招惹小鬼"
      }
    ],
    fixedComments: [
      "这种画风我真的爱了，感觉像是吃了两斤糖一样甜！",
      "虽然但是，这个人体是不是有点奇怪？建议大大再练练基础。",
      "我不穿裤子是我不礼貌吗？这种好东西也是我能免费看的？",
      "求求了别搞这种阴间玩意儿，我们CP是纯爱好吗？"
    ]
  },

  "stage2_fic_topic": {
    id: "stage2_fic_topic",
    text: "你打开了Word，光标疯狂闪烁。你想写一个什么样的故事？",
    choices: [
      {
        text: "【原著向】考据严谨的补完/分析",
        nextEventId: "stage3_platform",
        effects: { popularity: 5, trust: 10, legal: 5 },
        description: "容易获得死忠粉，但热度起得慢"
      },
      {
        text: "【AU/PWP】娱乐圈包养/ABO生子/强制爱",
        nextEventId: "stage3_platform_risky",
        effects: { popularity: 25, stress: 10, legal: -10 },
        description: "狗血刺激，容易爆火，也容易被挂OOC"
      }
    ],
    fixedComments: [
      "这种神仙文笔是真实存在的吗？感觉比原著还要还原！",
      "大大好会写，每一个字都踩在我的XP上，幻肢痛了。",
      "虽然很带感，但是这也太OOC了吧，我的纸片人不会做这种事。",
      "蹲一个后续，卡在这里是人干的事吗？孩子要枯萎了。"
    ]
  },

  // --- STAGE 3: PLATFORM & DEBUT ---
  "stage3_platform": {
    id: "stage3_platform",
    text: "作品完成了，非常清水健康。你决定把它发在哪里作为你的主阵地？",
    choices: [
      {
        text: "【老福特】Lofter - 同人快乐老家",
        nextEventId: "stage4_feedback_normal",
        effects: { popularity: 10, trust: 5 },
        description: "tag机制友好，由于审核机制，经常莫名被锁"
      },
      {
        text: "【微博】Weibo - 流量中心",
        nextEventId: "stage4_feedback_drama",
        effects: { popularity: 20, stress: 10, eq: -5 },
        description: "流量巨大，但杠精、ky精极多，容易吵架"
      }
    ],
    fixedComments: []
  },

  "stage3_platform_risky": {
    id: "stage3_platform_risky",
    text: "作品完成了，尺度有点大，甚至涉及了一些敏感XP。你打算发在哪里？",
    choices: [
      {
        text: "【微博】拉灯/倒转/外链/试阅",
        nextEventId: "stage4_feedback_risky_weibo",
        effects: { popularity: 30, stress: 20, legal: -10 },
        description: "极易被举报，账号随时可能没了"
      },
      {
        text: "【AO3/推特】海外留档，国内引流",
        nextEventId: "stage4_feedback_risky_ao3",
        effects: { popularity: 10, legal: 5, trust: 10 },
        description: "相对安全，但门槛高，国内读者访问困难"
      }
    ],
    fixedComments: []
  },

  // --- STAGE 4: FEEDBACK & REACTION ---
  "stage4_feedback_normal": {
    id: "stage4_feedback_normal",
    text: "你在老福特发布了作品。虽然热度不是很高，但评论区很温馨。不过，也有人在评论区ky。",
    choices: [
      {
        text: "一一回复评论，和读者贴贴",
        nextEventId: "stage5_rising_fame",
        effects: { trust: 15, eq: 5 },
        description: "建立良好的粉丝关系"
      },
      {
        text: "高冷不回，只发作品",
        nextEventId: "stage5_rising_fame",
        effects: { stress: -5, popularity: -2 },
        description: "保持神秘感，节省精力"
      }
    ],
    fixedComments: [
      "啊啊啊大大好温柔，每一条都回复了，这是什么神仙！",
      "虽然我不磕这对，但是大大的画风真的好绝，入坑了！",
      "KY退散！在别人底下刷逆家CP的有没有家教啊？",
      "有一说一，感觉剧情有点平淡，没有上一篇好看了。"
    ]
  },

  "stage4_feedback_drama": {
    id: "stage4_feedback_drama",
    text: "微博的流量果然大，你的作品被转了几千次。但随之而来的是各种指指点点。",
    choices: [
      {
        text: "玻璃心碎了一地，在此发疯",
        nextEventId: "stage5_rising_fame_bad",
        effects: { stress: 20, popularity: 10, eq: -10 }
      },
      {
        text: "无视恶评，专注于夸夸",
        nextEventId: "stage5_rising_fame",
        effects: { stress: 5, eq: 10 }
      }
    ],
    fixedComments: [
      "笑死，这就破防了？心理素质这么差还出来混什么圈？",
      "博主别理他们，有些人就是现实生活不如意来网上找存在感。",
      "虽然但是，我觉得路人说得也没错啊，粉丝别太洗地了。",
      "纯路人，觉得画得挺好的，不懂评论区在吵什么。"
    ]
  },

  "stage4_feedback_risky_weibo": {
    id: "stage4_feedback_risky_weibo",
    text: "你的擦边球作品在微博爆火，大家都叫你“菩萨”。但很快，你的私信收到了警告。",
    choices: [
      {
        text: "立刻删博，怂保平安",
        nextEventId: "stage5_rising_fame",
        effects: { popularity: -10, stress: 5, legal: 10 }
      },
      {
        text: "设置仅粉丝可见，继续发",
        nextEventId: "stage5_rising_fame_bad",
        effects: { popularity: 10, trust: 10, legal: -10, stress: 15 }
      }
    ],
    fixedComments: [
      "卧槽这是不花钱能看的吗？博主你是我的神！",
      "姐妹快删！被挂了！那种专门举报的蛆闻着味儿就来了！",
      "已举报，不谢。搞这种淫秽色情也不怕进去踩缝纫机？",
      "求补档！来晚了只看到了一辆法拉利的尾气呜呜呜！"
    ]
  },

  "stage4_feedback_risky_ao3": {
    id: "stage4_feedback_risky_ao3",
    text: "AO3的评论区全是“Kudos”和英文长评。但有人把你的链接挂回了国内论坛，指责你“递刀子”。",
    choices: [
      {
        text: "闭麦装死，不给眼神",
        nextEventId: "stage5_rising_fame",
        effects: { stress: 5, popularity: 5 }
      },
      {
        text: "挂人反击，赛博升堂",
        nextEventId: "stage5_rising_fame_bad",
        effects: { stress: 30, popularity: 30, eq: -20 }
      }
    ],
    fixedComments: [
      "Excuse me? We are just enjoying fiction. Why so serious?",
      "大大别理那群神经病，他们就是嫉妒你红，抱抱大大！",
      "这就是你们说的创作自由？写这种东西也不怕遭报应。",
      "吃瓜，前排兜售瓜子饮料。这年头写文也有罪了？"
    ]
  },

  // --- STAGE 5: RISING FAME & FAN CULTURE ---
  "stage5_rising_fame": {
    id: "stage5_rising_fame",
    text: "经历了一波风浪，你在这个圈子站稳了脚跟，有了一批死忠粉。现在有一个热门活动“CP 24小时创作挑战”，你要参加吗？",
    choices: [
      {
        text: "参加！肝它个昏天黑地！",
        nextEventId: "stage6_mid_game_grind",
        effects: { popularity: 20, stress: 15, creativity: -5 },
        description: "大幅提升知名度，但消耗精力"
      },
      {
        text: "太累了，还是摸鱼划水吧",
        nextEventId: "stage6_mid_game_rest",
        effects: { stress: -10, popularity: -5 },
        description: "保命要紧"
      }
    ],
    fixedComments: [
      "这就是大佬的肝吗？一天产出的量顶我一年，瑞思拜。",
      "虽然很高兴有粮吃，但是大大注意身体啊，发际线要紧！",
      "这次活动的质量好高啊，感觉整个圈子都过年了！",
      "某些人能不能别蹭热度了？画得还没我家狗画得好。"
    ]
  },

  "stage5_rising_fame_bad": {
    id: "stage5_rising_fame_bad",
    text: "你因为之前的争议言行，处于黑红状态。黑粉盯着你的一举一动。此时有人私信找你约高价商稿，但要求很过分（擦边/抄袭嫌疑）。",
    choices: [
      {
        text: "恰饭要紧，接了！(富贵险中求)",
        nextEventId: "stage6_mid_game_money",
        effects: { money: 1000, legal: -20, stress: 20 },
        description: "金钱诱惑，法律风险极大"
      },
      {
        text: "爱惜羽毛，果断拒绝",
        nextEventId: "stage6_mid_game_social",
        effects: { trust: 10, money: -100, legal: 5 },
        description: "赢得口碑，但没钱"
      }
    ],
    fixedComments: [
      "听说博主接了那个抄袭游戏的推广？恰烂钱不要脸。",
      "有一说一，给的实在太多了，换我我也接，恰饭嘛不寒碜。",
      "大失所望，原本以为你是有骨气的创作者，没想到也是向资本低头。",
      "黑粉滚啊，大大不吃饭喝西北风吗？你们给大大打钱了吗？"
    ]
  },

  // --- STAGE 6: MID-GAME HUB (THE GRIND) ---
  "stage6_mid_game_grind": {
    id: "stage6_mid_game_grind",
    text: "你为了维持热度，开始了地狱般的赶稿生活。日更三千，周更两张。你的手腕开始剧痛，心脏也偶尔早搏。",
    choices: [
      {
        text: "只要学不死，就往死里学！继续冲！",
        nextEventId: "stage7_crisis_health",
        effects: { popularity: 30, stress: 40, creativity: -10 },
        description: "冲刺顶级流量，身体亮红灯"
      },
      {
        text: "不行了，请假窗掉...",
        nextEventId: "stage7_crisis_relevance",
        effects: { stress: -20, popularity: -20, trust: -10 },
        description: "虽然保住了狗命，但粉丝跑路了"
      }
    ],
    fixedComments: [
      "大大你是住在微博了吗？高产似母猪（夸张褒义）！",
      "心疼大大，手腕贴个膏药吧，别落下了腱鞘炎。",
      "催更催更！卡在这里我就要闹了！快把下一章交出来！",
      "虽然但是，感觉最近的质量下降了，是不是为了赶工敷衍我们？"
    ]
  },

  "stage6_mid_game_money": {
    id: "stage6_mid_game_money",
    text: "你尝到了流量变现的甜头。你决定搞一波大的：私印个人志（本子）。预售开了几千本，金额巨大。",
    choices: [
      {
        text: "低调行事，通过暗号群售卖",
        nextEventId: "stage7_crisis_legal",
        effects: { money: 2000, legal: -30, stress: 30 },
        description: "试图规避风险，但总有内鬼"
      },
      {
        text: "大张旗鼓，闲鱼淘宝挂链接",
        nextEventId: "ending_jail", // Instant Fail
        effects: { legal: -50 },
        description: "太嚣张了，直接被送进去"
      }
    ],
    fixedComments: [
      "买到了！好耶！这下可以抱着本子睡觉了！",
      "通贩什么时候发货啊？等得黄花菜都凉了。",
      "已截图留证。非法出版获利这么多，够判好几年了吧？",
      "楼上的你有病吧？不买别看，为什么要害大大？"
    ]
  },

  "stage6_mid_game_social": {
    id: "stage6_mid_game_social",
    text: "你混进了核心大佬群。群里表面上一团和气，背地里却在互相挂人。某天，群主（大粉头）让你站队，一起排挤一个小透明。",
    choices: [
      {
        text: "为了合群，加入霸凌",
        nextEventId: "stage7_crisis_reputation",
        effects: { popularity: 10, eq: -20, trust: -30 },
        description: "成为圈子恶霸，良心不安"
      },
      {
        text: "保持中立，甚至帮小透明说话",
        nextEventId: "stage7_crisis_reputation",
        effects: { popularity: -10, trust: 20, stress: 10 },
        description: "被大佬圈排挤，但问心无愧"
      }
    ],
    fixedComments: [
      "那个小透明就是绿茶啊，大大干得漂亮！鉴婊达人！",
      "没想到你也是这种人，取关了。同人圈真是恶臭。",
      "大大被绑架了吗？为什么要掺和这种烂事？",
      "吃瓜群众表示看不懂了，贵圈真乱，还是老实看文吧。"
    ]
  },

  "stage6_mid_game_rest": {
    id: "stage6_mid_game_rest",
    text: "你选择了躺平。半个月没更新，粉丝群里开始死寂。当你再次打开软件，发现首页已经是新墙头的天下。",
    choices: [
      {
        text: "垂死病中惊坐起，我要夺回属于我的一切！",
        nextEventId: "stage7_crisis_health",
        effects: { stress: 30, creativity: 10 },
        description: "强行复出，压力拉满"
      },
      {
        text: "算了，过气就过气吧，做个咸鱼",
        nextEventId: "stage7_crisis_relevance",
        effects: { stress: -10, creativity: 5 },
        description: "接受平庸，寻找初心"
      }
    ],
    fixedComments: [
      "失踪人口回归！我还以为大大退圈了呜呜呜！",
      "这对CP早糊了，大大不如来看看隔壁的新坑？",
      "爷青回！只要你更新，我就能再爱你一万年！",
      "都没热度了还在更，这才是真爱啊，泪目了。"
    ]
  },

  // --- STAGE 7: CRISIS & CLIMAX ---
  "stage7_crisis_health": {
    id: "stage7_crisis_health",
    text: "【危机降临：身体崩溃】\n长期的高压创作终于击垮了你。某天凌晨，你感到胸闷气短，眼前发黑。如果不立刻停止，可能会死。",
    choices: [
      {
        text: "立刻去医院，彻底断网休养",
        nextEventId: "ending_peace",
        effects: { stress: -50, popularity: -20 },
        description: "放弃名利，保住小命"
      },
      {
        text: "最后一张...画完这张就去睡...",
        condition: (s) => s.creativity > 80,
        nextEventId: "ending_death",
        effects: {},
        description: "用生命献祭艺术"
      },
      {
        text: "最后一张...画完这张...",
        condition: (s) => s.creativity <= 80,
        nextEventId: "ending_quit",
        effects: {},
        description: "有心无力，最终退圈"
      }
    ],
    fixedComments: [
      "卧槽大大进ICU了？真的假的？别吓我啊！",
      "熬夜真的会死人的，大家都要注意身体啊。",
      "为了搞同人把命搭进去，真的值得吗？",
      "虽然很遗憾，但还是身体最重要，大大好好休息！"
    ]
  },

  "stage7_crisis_legal": {
    id: "stage7_crisis_legal",
    text: "【危机降临：净网行动】\n一封律师函或者警察的传唤打破了你的平静生活。你的本子被定性为非法出版物，或者你的文被判定传播淫秽信息。",
    choices: [
      {
        text: "坦白从宽，积极退赃，争取缓刑",
        nextEventId: "ending_jail", // Depending on severity could be jail or quit
        effects: { money: -5000 },
        description: "破财免灾，留下案底"
      },
      {
        text: "销毁证据，死不承认",
        nextEventId: "ending_jail",
        effects: {},
        description: "抗拒执法，罪加一等"
      }
    ],
    fixedComments: [
      "通报出来了！真的是XX大大！",
      "天网恢恢疏而不漏，这就是赚黑心钱的下场。",
      "虽然但是，写个黄文也要判这么重吗？太惨了吧。",
      "纯路人，这就是你们吹的‘为爱发电’？全是生意。"
    ]
  },

  "stage7_crisis_reputation": {
    id: "stage7_crisis_reputation",
    text: "【危机降临：全网黑】\n你的黑料（不论真假）被做成了长图包，在各大论坛疯传。#XX滚出同人圈# 的词条上了热搜。",
    choices: [
      {
        text: "发长文道歉，然后销号退圈",
        nextEventId: "ending_quit",
        effects: { stress: 20 },
        description: "虽然输了，但至少结束了痛苦"
      },
      {
        text: "硬刚到底，起诉造谣者",
        condition: (s) => s.money > 2000,
        nextEventId: "ending_victory_hollow",
        effects: { money: -2000, stress: 50 },
        description: "赢了官司，输了人心"
      },
      {
        text: "硬刚到底...",
        condition: (s) => s.money <= 2000,
        nextEventId: "ending_cyber_bullying",
        effects: { stress: 100 },
        description: "没钱没势，被口水淹没"
      }
    ],
    fixedComments: [
      "好死！早看他不爽了，人品极差。",
      "虽然有瓜，但也不能网暴素人吧？这也太可怕了。",
      "苍蝇不叮无缝的蛋，他要是没做亏心事怕什么？",
      "道歉有什么用？造成的伤害能弥补吗？滚吧。"
    ]
  },

  "stage7_crisis_relevance": {
    id: "stage7_crisis_relevance",
    text: "【危机降临：寒冬已至】\n你发现无论发什么都没人看了。曾经的粉丝早已爬墙，只有几个僵尸粉偶尔点赞。这种巨大的落差感吞噬了你。",
    choices: [
      {
        text: "接受现实，用爱发电，只为自己而作",
        nextEventId: "ending_peace",
        effects: { creativity: 20, popularity: -20 },
        description: "回归初心，获得内心的宁静"
      },
      {
        text: "不甘心！蹭热度，搞营销，买粉！",
        nextEventId: "ending_banned", // Usually leads to desperate moves
        effects: { money: -500, legal: -10 },
        description: "为了流量不择手段，最终玩火自焚"
      }
    ],
    fixedComments: [
      "以前真的很喜欢大大，但是现在的画风真的...一言难尽。",
      "爬墙了爬墙了，新墙头太香了，对不起大大。",
      "还在坚持产粮的都是活菩萨，且看且珍惜吧。",
      "感觉这个号已经卖了吧？全是广告，取关了。"
    ]
  },

  // --- ENDINGS ---
  
  "ending_quit": {
    id: "ending_quit",
    text: "【结局：退圈保平安】\n你意识到，网络世界的爱恨太虚无。你注销了账号，删除了所有文档。虽然心里空了一块，但至少晚上能睡着觉了。\n\n你回归了三次元，偶尔在深夜，你还会想起那个曾经在键盘上敲出梦想的自己。但那已经是上辈子的事了。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：退圈",
    poem: "网海浮沉几度秋，如今抽身且罢休。\n满屏爱恨皆虚妄，不如现充解千愁。"
  },
  
  "ending_cyber_bullying": {
    id: "ending_cyber_bullying",
    text: "【结局：惊弓之鸟】\n网络暴力的阴影挥之不去。只要听到手机震动，你就会心跳加速，手心冒汗。你不仅失去了创作的热情，也对人性失去了信任。你在这个世界上变得小心翼翼，生怕再说错一句话。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：惊弓之鸟",
    poem: "人言可畏胜刀枪，字字诛心透骨凉。\n掩卷息屏归去后，夜深犹自梦苍茫。"
  },

  "ending_jail": {
    id: "ending_jail",
    text: "【结局：铁窗泪】\n你因为非法出版/传播淫秽物品牟利罪被立案调查。虽然你只是想搞同人，但法律的红线不可触碰。等待你的是漫长的刑期。在狱中，你再也没有画笔和键盘，只有无尽的悔恨。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：铁窗泪",
    poem: "利欲熏心这般愁，铁窗风雨几时休。\n当初只道金银好，换得身名一旦休。"
  },

  "ending_banned": {
    id: "ending_banned",
    text: "【结局：赛博失语】\n你的账号没了。那个承载了你无数心血、连接着几万粉丝的ID，变成了一串乱码。你试图转世，但每次都被追着举报。你在这个圈子彻底“社会性死亡”了。你的名字成为了不可说的禁忌。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：赛博失语",
    poem: "十年心血一朝空，名为违规去无踪。\n赛博坟场无墓碑，只有404在风中。"
  },

  "ending_death": {
    id: "ending_death",
    text: "【结局：过劳死】\n长期熬夜赶稿、饮食不规律、精神压力过大...你的身体终于罢工了。在一次赶漫展死线的凌晨，你的心脏停止了跳动。为了爱，你献祭了生命。你的作品成为了绝响，粉丝们在你的主页点起了蜡烛。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：殉道者",
    poem: "呕心沥血为谁痴，燃尽芳华绝笔时。\n唯愿天堂无截稿，来生不再做画师。"
  },

  "ending_victory_hollow": {
    id: "ending_victory_hollow",
    text: "【结局：惨胜】\n你赢了官司，让造谣者道了歉。但你也为此耗尽了积蓄和精力。看着满地鸡毛的圈子，你再也找不回当初单纯磕CP的快乐了。你赢了道理，却输掉了热爱。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：惨胜",
    poem: "虽赢身后虚名在，输却当年赤子心。\n一片狼藉归去路，独留清白照古今。"
  },

  // GOOD / RARE ENDINGS
  "ending_god": { // Reachable only if stats are perfect, currently tricky, maybe future expansion
    id: "ending_god",
    text: "【结局：紫微星】\n你是被神选中的创作者。你的每一部作品都爆火，你的画风/文风成为全网模仿的对象。你不仅安全变现，还成功转型，成为了真正的行业大佬。你在名利场中游刃有余，成为了传说。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：紫微星",
    poem: "十年辛苦磨一剑，今日锋芒天下知。\n名利双收随手得，青云直上九重时。"
  },
  
  "ending_peace": {
    id: "ending_peace",
    text: "【结局：细水长流】\n你没有大红大紫，也没有遭遇大风大浪。你在三次元和二次元之间找到了完美的平衡。你有三五好友，有稳定的产出，这份热爱温暖了你漫长的岁月。这或许是最好的结局。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：细水长流",
    poem: "平平淡淡才是真，偶向闲窗写旧因。\n不求闻达于诸侯，自有一方自在身。"
  }
};