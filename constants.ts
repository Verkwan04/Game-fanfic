import { Attributes, GameEvent } from "./types";

export const INITIAL_STATS: Attributes = {
  creativity: 50,
  legal: 50,
  eq: 50,
  popularity: 10,
  stress: 20,
  money: 500,
  trust: 0
};

// Simplified Event Tree
export const EVENTS: Record<string, GameEvent> = {
  // --- START ---
  "start": {
    id: "start",
    text: "你是一名普通的大学生，也是一名隐藏的“同人女”。最近你沉迷于一部名为《XXX》的热门作品，这对CP让你磕生磕死。看着圈内粮仓日渐干涸，你心中的创作欲蠢蠢欲动——",
    choices: [
      {
        text: "我要自己产粮！为爱发电！",
        nextEventId: "choose_genre",
        effects: { creativity: 5, stress: 5 }
      },
      {
        text: "先当个快乐的读者，吃一口是一口。",
        nextEventId: "consumer_path",
        effects: { stress: -10, creativity: -5 }
      }
    ]
  },
  "consumer_path": {
    id: "consumer_path",
    text: "你每天快乐刷手机，虽然没有压力，但看着别人产出的粮总是觉得不对胃口，OOC太多了！你的脑洞无处安放。",
    choices: [
      {
        text: "不行，这口粮我必须自己做！",
        nextEventId: "choose_genre",
        effects: { creativity: 10 }
      },
      {
        text: "算了，躺平真舒服。",
        nextEventId: "ending_normal",
        effects: {}
      }
    ]
  },

  // --- GENRE SELECTION ---
  "choose_genre": {
    id: "choose_genre",
    text: "你打开了文档，光标在空白页上闪烁。第一篇文，你打算写什么题材？",
    choices: [
      {
        text: "全年龄向甜饼 (清水)",
        nextEventId: "platform_choice",
        effects: { legal: 5, popularity: 5 },
        description: "安全，受众广，但竞争大。"
      },
      {
        text: "极其刺激的深车 (R18)",
        nextEventId: "platform_choice_risky",
        effects: { legal: -10, popularity: 20, stress: 5 },
        description: "高风险，高热度，容易被封号。"
      }
    ]
  },

  // --- PLATFORM SELECTION ---
  "platform_choice": {
    id: "platform_choice",
    text: "写完了！是一篇甜甜的清水文。你打算发在哪里？",
    choices: [
      {
        text: "老福特 (国内最大的同人社区)",
        nextEventId: "first_feedback",
        effects: { popularity: 10 }
      },
      {
        text: "微博 (流量大，是非多)",
        nextEventId: "first_feedback_weibo",
        effects: { popularity: 15, stress: 10 }
      }
    ]
  },
  "platform_choice_risky": {
    id: "platform_choice_risky",
    text: "你写了一篇香艳的豪车，自己看了都脸红。你打算发在哪里？",
    choices: [
      {
        text: "老福特 (用图片/外链尝试规避)",
        nextEventId: "danger_check_1",
        effects: { legal: -5, stress: 10 }
      },
      {
        text: "AO3 (虽然要翻墙，但很自由)",
        nextEventId: "ao3_feedback",
        effects: { legal: 5, popularity: 5 } 
      }
    ]
  },

  // --- FEEDBACK & CONFLICT ---
  "first_feedback": {
    id: "first_feedback",
    text: "发布后，反响不错。但有一个杠精评论：“你这写的人物OOC了，原作里《XXX》根本不是这样的性格。”",
    choices: [
      {
        text: "温柔解释，虚心接受。",
        nextEventId: "mid_game_hub", // Redirect to new flow
        effects: { eq: 10, popularity: 5 }
      },
      {
        text: "挂他！怼回去！“笔给你你来写？”",
        nextEventId: "drama_check",
        effects: { eq: -10, stress: 10, popularity: 10 } 
      },
      {
        text: "无视，删评。",
        nextEventId: "mid_game_hub", // Redirect to new flow
        effects: { stress: -5 }
      }
    ]
  },
  
  "first_feedback_weibo": {
    id: "first_feedback_weibo",
    text: "微博上的热度很高，但你也引来了一群奇怪的人。有人转发说：“这画风/文风怎么像AI生成的？现在同人女都这么敷衍了吗？”",
    choices: [
      {
        text: "【AI猎巫】放出过程图/大纲自证清白！",
        nextEventId: "ai_accusation_proof",
        effects: { stress: 20, popularity: 5 }
      },
      {
        text: "不理会，清者自清。",
        nextEventId: "ai_accusation_ignore",
        effects: { stress: 10, popularity: -5 }
      }
    ]
  },

  "ai_accusation_proof": {
    id: "ai_accusation_proof",
    text: "你花了一整晚整理时间线和草稿。虽然粉丝信了，但那群猎巫的人只是换了个地方骂：“就算是手搓的，这么丑也不如AI。”",
    choices: [
      {
        text: "心态崩了，休息一阵。",
        nextEventId: "mid_game_hub",
        effects: { stress: 15, creativity: -10 }
      }
    ]
  },
  
  "ai_accusation_ignore": {
    id: "ai_accusation_ignore",
    text: "你没有回应，结果谣言越传越离谱。有人把你挂到了“鉴AI挂人墙”，你的私信充满了谩骂。",
    choices: [
      {
        text: "这网没法上了...",
        nextEventId: "ending_cyber_bullying",
        effects: { stress: 50 }
      },
      {
        text: "强行忍耐，继续更新打脸。",
        nextEventId: "mid_game_hub",
        effects: { stress: 30, eq: 20 }
      }
    ]
  },
  
  "ao3_feedback": {
    id: "ao3_feedback",
    text: "在AO3上，你的车收获了大量的“Kudos”。但是有人把你的文搬运到了国内微博，并艾特了网警举报。",
    choices: [
      {
        text: "立刻滑跪道歉，删文锁号。",
        nextEventId: "mid_game_hub",
        effects: { stress: 20, popularity: -10 }
      },
      {
        text: "装死，反正我是海外IP。",
        nextEventId: "police_risk_check",
        effects: { legal: -5 }
      }
    ]
  },

  // --- NEW: MID-GAME HUB (Daily Routine) ---
  "mid_game_hub": {
    id: "mid_game_hub",
    text: "经过初期的尝试，你的账号渐渐步入正轨。接下来的一段时间，你决定把重心放在哪里？",
    choices: [
      {
        text: "【沉淀】开长篇连载，打磨剧情。",
        nextEventId: "path_long_novel_start", // Redirect to game
        effects: { creativity: -5 },
        description: "耗费心力，需要灵感判定。"
      },
      {
        text: "【整活】混论坛/看电影/水群，维持热度。",
        nextEventId: "path_forum_surfer",
        effects: { creativity: -5, popularity: 20, stress: -5, legal: -5 },
        description: "轻松快乐热度高，但容易卷入是非争议。"
      },
      {
        text: "【扩列】建粉丝群，在圈内交朋友。",
        nextEventId: "path_social_build",
        effects: { trust: 20, stress: -10 },
        description: "寻找同好，分享生活。但人心隔肚皮..."
      },
      {
        text: "【搞钱】出个人志",
        nextEventId: "selling_books",
        effects: { money: -100, stress: 15, creativity: 5 },
        description: "将已有的脑洞实体化，高投入高回报？"
      }
    ]
  },

  // --- PATH: LONG NOVEL WITH MINI-GAME ---
  "path_long_novel_start": {
    id: "path_long_novel_start",
    text: "你构思了一个宏大的长篇连载。写到一半，卡文了。你坐在电脑前，看着闪烁的光标，大脑一片空白。你需要一次灵感爆发。",
    choices: [], // Trigger mini game
    miniGame: {
      type: 'dice',
      threshold: 4, // Need 4, 5, or 6 to succeed
      successEventId: "long_novel_success",
      failEventId: "long_novel_fail",
      successEffects: { creativity: 20, popularity: 10, stress: -10 },
      failEffects: { creativity: -10, stress: 15 }
    }
  },

  "long_novel_fail": {
    id: "long_novel_fail",
    text: "【判定失败】你枯坐了一整晚，只写出了两百字，还删了一百九十个字。灵感女神没有眷顾你，你在这个长篇坑里越陷越深，读者开始催更并在评论区发刀片。",
    choices: [
      {
        text: "太累了，断更跑路吧...",
        nextEventId: "commercial_thought",
        effects: { stress: -10, popularity: -5 }
      }
    ]
  },

  "long_novel_success": {
    id: "long_novel_success",
    text: "【判定大成功！】如神灵附体，你运指如飞，一气呵成写完了最高潮的章节！这一章发布后，评论区炸了，读者都在尖叫流泪。你不仅填完了坑，文笔也得到了极大的升华。",
    choices: [
      {
        text: "趁热打铁，出本纪念！",
        nextEventId: "selling_books",
        effects: { creativity: 20, popularity: 15 }
      },
      {
        text: "休息一下，看看有什么变现机会。",
        nextEventId: "commercial_thought",
        effects: { creativity: 10 }
      }
    ]
  },

  // --- PATH: FORUM/MOVIE (High Drama) ---
  "path_forum_surfer": {
    id: "path_forum_surfer",
    text: "你最近沉迷于在论坛指点江山，或者拉片看电影找代餐。你在论坛发的“关于XXX角色崩坏的深度分析”被转了几千条，热度爆炸，但评论区也吵翻了天。",
    choices: [
      {
        text: "继续输出观点，黑红也是红！",
        nextEventId: "drama_escalation",
        effects: { popularity: 20, stress: 10, legal: -5 }
      },
      {
        text: "见好就收，切回岁月静好模式。",
        nextEventId: "commercial_thought",
        effects: { stress: -5 }
      }
    ]
  },
  "drama_escalation": {
    id: "drama_escalation",
    text: "你的言论激怒了原作粉/对家粉。他们开始深扒你的过往发言，试图寻找你的黑点。你感觉自己处于风暴中心。",
    choices: [
      {
        text: "硬刚到底！",
        nextEventId: "drama_check",
        effects: { stress: 20 }
      },
      {
        text: "滑跪道歉。",
        nextEventId: "random_crisis_hub",
        effects: { popularity: -10, eq: -10 }
      }
    ]
  },

  // --- PATH: SOCIAL / BETRAYAL ---
  "path_social_build": {
    id: "path_social_build",
    text: "你建了一个名为“XXX养老院”的粉丝群，还加了几个聊得来的亲友。大家每天一起磕CP，吐槽三次元的烦恼。你感觉找到了组织。",
    choices: [
      {
        text: "不仅聊CP，还分享三次元生活（自拍/工作/炫富）。",
        nextEventId: "social_deepen_risky",
        effects: { trust: 20, stress: -10 },
        description: "关系越来越铁，但也暴露了隐私。"
      },
      {
        text: "保持距离，只聊二次元。",
        nextEventId: "commercial_thought",
        effects: { trust: 5 }
      }
    ]
  },
  "social_deepen_risky": {
    id: "social_deepen_risky",
    text: "你和群里的“亲友”无话不谈。你告诉她们你最近升职加薪了，还晒了男朋友送的礼物。大家都夸你是“现充赢家”。直到有一天——",
    choices: [
      {
        text: "查看发生了什么...",
        nextEventId: "friend_betrayal",
        effects: {}
      }
    ]
  },
  "friend_betrayal": {
    id: "friend_betrayal",
    text: "【背刺】你的“亲友”把你在群里吐槽领导、以及写R18文的记录打包发给了你的公司邮箱，并向网信办举报了你。原来她一直嫉妒你的生活，潜伏在你身边只为这一天。",
    choices: [
      {
        text: "崩溃！向她求情。",
        nextEventId: "betrayal_outcome_bad",
        effects: { stress: 50, eq: -20 }
      },
      {
        text: "冷静处理，矢口否认，那是P图。",
        nextEventId: "betrayal_outcome_fight",
        effects: { stress: 20, legal: 10 }
      }
    ]
  },
  "betrayal_outcome_bad": {
    id: "betrayal_outcome_bad",
    text: "对方没有理会你的求情，反而把你的狼狈样发到了网上嘲笑。你在三次元的工作丢了，二次元的名声也臭了。",
    choices: [
      {
        text: "这人心...太可怕了。",
        nextEventId: "ending_cyber_bullying",
        effects: {}
      }
    ]
  },
  "betrayal_outcome_fight": {
    id: "betrayal_outcome_fight",
    text: "你硬着头皮坚持那是有人恶意P图陷害。虽然公司半信半疑，但你的生活被搞得一团糟。你清空了列表，退出了所有群聊。",
    choices: [
      {
        text: "从此做一个孤狼。",
        nextEventId: "commercial_thought",
        effects: { trust: -100, stress: 30 }
      }
    ]
  },

  // --- DRAMA & RISKS HUB (Updated Router) ---
  "random_crisis_hub": {
    id: "random_crisis_hub",
    text: "日子一天天过去，你在圈子里小有名气。但互联网总是充满了不确定性。这一天——",
    choices: [
      {
        text: "查看今日运势...",
        nextEventId: "algorithm_death", // Default route
        effects: {}
      }
    ]
  },

  "algorithm_death": {
    id: "algorithm_death",
    text: "【平台限流】你发现最近发布的作品阅读量只有个位数。明明之前都有几千热度。朋友告诉你：“你可能被Shadowban了，因为你的tag里带了敏感词。”",
    choices: [
      {
        text: "养号，暂停更新，去现充。",
        nextEventId: "future_path",
        effects: { popularity: -10, stress: -10 }
      },
      {
        text: "疯狂修改关键词，重新发布。",
        nextEventId: "account_ban_risk",
        effects: { stress: 20, creativity: -5 }
      },
      {
        text: "不管了，去搞点实体的吧。",
        nextEventId: "commercial_thought",
        effects: {}
      }
    ]
  },

  "account_ban_risk": {
    id: "account_ban_risk",
    text: "你反复修改重发，触发了平台的滥用检测机制。你的账号被“因违反社区公约”永久封禁。",
    choices: [
      {
        text: "申诉！我是冤枉的！",
        nextEventId: "ending_banned",
        effects: {}
      },
      {
        text: "心累，退圈。",
        nextEventId: "ending_quit",
        effects: {}
      }
    ]
  },

  // --- DANGER CHECKS ---
  "danger_check_1": {
    id: "danger_check_1",
    text: "你的文章因为尺度太大被屏毕了。平台给你发了警告。",
    choices: [
      {
        text: "必须重发！修改敏感词再发！",
        nextEventId: "account_ban_risk", 
        effects: { legal: -20, stress: 10 }
      },
      {
        text: "算了，以后写清水的吧。",
        nextEventId: "first_feedback",
        effects: { legal: 5, creativity: -5 }
      }
    ]
  },
  
  "drama_check": {
    id: "drama_check",
    text: "你和读者的争吵升级了。对方也是个大V，挂了你的ID，粉丝开始冲你的评论区。",
    choices: [
      {
        text: "退网保平安。",
        nextEventId: "ending_quit",
        effects: { stress: -20 }
      },
      {
        text: "持续对线，我也不是好惹的！",
        nextEventId: "police_tea_check",
        effects: { stress: 20, eq: -20 }
      }
    ]
  },
  
  "police_risk_check": {
    id: "police_risk_check",
    text: "风头似乎过去了...但你总觉得不安全。",
    choices: [
      {
        text: "继续创作",
        nextEventId: "mid_game_hub",
        effects: {}
      }
    ]
  },
  
  "police_tea_check": {
    id: "police_tea_check",
    text: "事情闹大了。有人人肉了你的信息，并且向有关部门举报你传播不良信息。",
    choices: [
      {
        text: "等待命运...",
        nextEventId: "ending_police_1", 
        effects: {}
      }
    ]
  },

  // --- COMMERCIALIZATION (Updated with Wuliao & CP) ---
  "commercial_thought": {
    id: "commercial_thought",
    text: "随着作品越来越多，粉丝都在喊：“大大出本吗？”、“想要透扇！”。你看着干瘪的钱包，又看了看热情的评论。",
    choices: [
      {
        text: "出个人志！印个500本，回馈粉丝。",
        nextEventId: "selling_books",
        effects: { money: -100, stress: 10 },
        description: "高风险，高收益"
      },
      {
        text: "不做贩售，只做无料（免费派送）。",
        nextEventId: "wuliao_choice",
        effects: { money: -50, popularity: 10 },
        description: "看似安全，实则..."
      },
      {
        text: "不想搞实物，太麻烦。接稿/约稿吧。",
        nextEventId: "freelance_path",
        effects: { money: 50, creativity: -5 }
      }
    ]
  },

  // --- WULIAO (FREE MERCH) PATH ---
  "wuliao_choice": {
    id: "wuliao_choice",
    text: "你决定自费制作一批精美的周边（明信片或无料本），免费送给同好。但是邮费是个问题。",
    choices: [
      {
        text: "走闲鱼链接，设置1元+运费（防止跑单）。",
        nextEventId: "wuliao_crisis",
        effects: { popularity: 10 }
      },
      {
        text: "漫展现场无料交换，不仅要运费还要才艺表演！",
        nextEventId: "cp_inspection",
        effects: { popularity: 15, stress: 5 }
      }
    ]
  },

  "wuliao_crisis": {
    id: "wuliao_crisis",
    text: "【无料风波】有人没抢到你的无料，心生怨恨。反手举报你的闲鱼链接涉及“非法出版”和“刷单”。因为你收了1元钱（包装费），被定性为盈利行为。",
    choices: [
      {
        text: "立刻退款，关闭链接，滑跪道歉。",
        nextEventId: "future_path",
        effects: { stress: 20, money: -20 }
      },
      {
        text: "跟闲鱼客服扯皮，坚称是二手闲置。",
        nextEventId: "ending_police_1",
        effects: { legal: -10 }
      }
    ]
  },

  // --- SELLING BOOKS & CP PATH ---
  "selling_books": {
    id: "selling_books",
    text: "本子做好了，封面非常精美。你打算怎么卖？",
    choices: [
      {
        text: "开淘宝店，低调发货。",
        nextEventId: "sales_outcome",
        effects: { money: 500, legal: -10 }
      },
      {
        text: "参加CP（Comicup）漫展场贩。",
        nextEventId: "cp_inspection",
        effects: { money: 300, popularity: 10 }
      },
      {
        text: "走闲鱼链接，设置1元+运费",
        nextEventId: "wuliao_choice",
        effects: { money: -50, popularity: 5 },
        description: "只为回血，不想赚钱"
      }
    ]
  },

  "cp_inspection": {
    id: "cp_inspection",
    text: "【漫展危机】你带着大包小包到了展会现场。突然，几个戴红袖章的工作人员开始巡摊：“把你们摊位上所有的印刷品拿出来检查！有刊号吗？有准生证吗？这图尺度这么大？”",
    choices: [
      {
        text: "赶紧把本子藏到桌布底下，只摆清水周边。",
        nextEventId: "sales_outcome_safe",
        effects: { money: 100, stress: 20 }
      },
      {
        text: "理直气壮：“这是个人收藏交流！”",
        nextEventId: "cp_confiscated",
        effects: { legal: -10 }
      }
    ]
  },

  "cp_confiscated": {
    id: "cp_confiscated",
    text: "工作人员不听你的解释。你的本子被全数没收暂存，摊位被勒令整改。你看着空荡荡的摊位，欲哭无泪。",
    choices: [
      {
        text: "损失惨重，回家...",
        nextEventId: "ending_loss",
        effects: { money: -500, stress: 30 }
      }
    ]
  },
  
  "sales_outcome": {
    id: "sales_outcome",
    text: "销量还不错，你赚了一笔钱。但是，有人举报你“非法出版”。",
    choices: [
      {
        text: "查看结果",
        nextEventId: "jail_check",
        effects: {}
      }
    ]
  },

  "sales_outcome_safe": {
    id: "sales_outcome_safe",
    text: "你躲过了一劫，虽然卖得不多，但至少安全回家了。同人展越来越难混了。",
    choices: [
      {
        text: "以后还是别搞实物了。",
        nextEventId: "future_path",
        effects: {}
      }
    ]
  },
  
  "jail_check": {
    id: "jail_check",
    text: "警方注意到了你的交易流水。这在法律上是一个非常危险的边缘。",
    choices: [
      {
        text: "如果是少量印刷，且运气好...",
        condition: (s) => s.legal > 40 && s.money < 1000,
        nextEventId: "ending_normal",
        effects: {}
      },
      {
        text: "如果金额巨大...",
        condition: (s) => s.money >= 1000 || s.legal <= 40,
        nextEventId: "ending_jail_sales",
        effects: {}
      }
    ]
  },

  "freelance_path": {
    id: "freelance_path",
    text: "你开始接稿。但甲方的要求极其奇葩，而且经常拖欠尾款。",
    choices: [
      {
        text: "为了钱，忍了。",
        nextEventId: "ending_slave",
        effects: { money: 200, creativity: -50, stress: 50 }
      },
      {
        text: "不干了，还是写同人开心。",
        nextEventId: "future_path",
        effects: { money: -50, stress: -20 }
      }
    ]
  },

  // --- TRANSITION TO END GAME ---
  "future_path": {
    id: "future_path",
    text: "经历了一系列风波，你站在人生的岔路口。无论是为爱发电的疲惫，还是三次元的压力，都让你不得不重新思考。",
    choices: [
      // NEW HIDDEN ENDING 1: Cultural Ambassador
      {
        text: "【隐藏】接受官方邀请，成为文化大使。",
        condition: (s) => s.creativity > 80 && s.legal > 80 && s.popularity > 50,
        nextEventId: "ending_cultural_ambassador",
        effects: { money: 1000 },
        description: "达成隐藏条件：高创作、高法律、高知名"
      },
      // NEW HIDDEN ENDING 2: Fandom Godmother
      {
        text: "【隐藏】整合资源，建立创作者避风港。",
        condition: (s) => s.trust > 80 && s.money > 800 && s.eq > 50,
        nextEventId: "ending_godmother",
        effects: {},
        description: "达成隐藏条件：高信任、高金钱、高情商"
      },
      {
        text: "我不甘心！我要转型职业作家！(高难度)",
        nextEventId: "original_start",
        effects: { stress: 10 }
      },
      {
        text: "找个班上，同人只当爱好。",
        nextEventId: "ending_normal",
        effects: {}
      },
      {
        text: "彻底割席，这个圈子不值得。",
        nextEventId: "ending_quit",
        effects: {}
      }
    ]
  },

  // --- PROFESSIONAL WRITER PATH (EXPANDED) ---
  "original_start": {
    id: "original_start",
    text: "你决定脱离同人的舒适区，挑战原创。你打开了某绿江文学城/某点中文网的后台。",
    choices: [
      {
        text: "写此时最火的“追妻火葬场/系统流”题材。",
        nextEventId: "original_publishing",
        effects: { popularity: 5, creativity: -10 },
        description: "迎合市场，容易签约但容易扑街"
      },
      {
        text: "写自己心中的冷门神作。",
        nextEventId: "original_cold_start",
        effects: { creativity: 20, popularity: -10 },
        description: "用爱发电，地狱难度"
      }
    ]
  },

  "original_publishing": {
    id: "original_publishing",
    text: "你写了三万字正文，点击量寥寥无几，也没有编辑来找你签约。",
    choices: [
      {
        text: "坚持日更，杀签（不断申请签约）！",
        nextEventId: "original_contract",
        effects: { stress: 20 }
      },
      {
        text: "砍大纲，切书，重开！",
        nextEventId: "original_publishing",
        effects: { creativity: -10, stress: 10 }
      },
      {
        text: "太难了，我不写了。",
        nextEventId: "ending_fail_original",
        effects: {}
      }
    ]
  },

  "original_cold_start": {
    id: "original_cold_start",
    text: "你写得很开心，但数据是一潭死水。单机写了二十万字，只有三个读者，其中一个还是盗文网抓取的机器人。",
    choices: [
      {
        text: "耐得住寂寞，这本就是写给我自己的。",
        nextEventId: "ending_mid_writer",
        effects: { creativity: 30 }
      },
      {
        text: "去论坛发帖自荐，去微博蹭热度。",
        nextEventId: "plagiarism_event",
        effects: { popularity: 5, stress: 10 }
      }
    ]
  },

  "original_contract": {
    id: "original_contract",
    text: "终于，站短亮了！编辑发来了签约邀请。但是你一看合同，全是霸王条款：全版权买断，甚至如果你去世了账号归平台。",
    choices: [
      {
        text: "闭眼签了！我要成为作家！",
        nextEventId: "original_struggle",
        effects: { legal: -20, money: 50 }
      },
      {
        text: "这合同是卖身契啊...据理力争。",
        nextEventId: "original_rejected",
        effects: { legal: 10 }
      }
    ]
  },

  "original_rejected": {
    id: "original_rejected",
    text: "编辑很冷漠：“不签就别写。” 你的作家梦碎了。",
    choices: [
      {
        text: "换个小平台试试。",
        nextEventId: "ending_mid_writer",
        effects: {}
      },
      {
        text: "回去写同人吧，至少有反馈。",
        nextEventId: "first_feedback",
        effects: {}
      }
    ]
  },

  "original_struggle": {
    id: "original_struggle",
    text: "签约后，你并没有飞升。没有推荐位，收益每天几块钱。为了全勤奖（600块），你每天必须水文3000字，写得想吐。",
    choices: [
      {
        text: "熬！熬到完结就是胜利！",
        condition: (s) => s.creativity > 70 && s.stress < 80,
        nextEventId: "ending_success", // High stats required
        effects: {}
      },
      {
        text: "身体扛不住了，断更...",
        condition: (s) => s.stress >= 80,
        nextEventId: "ending_fail_original",
        effects: {}
      },
      {
        text: "随便写写，烂尾跑路。",
        condition: (s) => s.creativity <= 70,
        nextEventId: "ending_mid_writer",
        effects: {}
      }
    ]
  },

  "plagiarism_event": {
    id: "plagiarism_event",
    text: "你的冷门文突然火了！但你发现，是一个大V“融梗”了你的核心创意，还倒打一耙说你蹭热度。",
    choices: [
      {
        text: "做调色盘（对比图）挂他！",
        nextEventId: "drama_check",
        effects: { stress: 20 }
      },
      {
        text: "小透明斗不过大V，忍气吞声。",
        nextEventId: "ending_cyber_bullying",
        effects: {}
      }
    ]
  },

  // --- ENDINGS ---
  
  // New Good Ending 1
  "ending_cultural_ambassador": {
    id: "ending_cultural_ambassador",
    text: "【结局：文化大使】\n你因为对原作极其深刻的理解和高超的二创水平，被官方版权方注意到。他们不仅没有告你，反而邀请你参与官方衍生作品的编剧。你用实力证明，同人不仅仅是依附，更是共生。你在主流媒体上侃侃而谈，让更多人理解了这个小众圈子的美好。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：文化大使",
    poem: "枯木逢春发旧枝，同人一笔动天时。\n原来殊途终同归，满堂花醉客来迟。"
  },

  // New Good Ending 2
  "ending_godmother": {
    id: "ending_godmother",
    text: "【结局：圈层教母】\n你并没有成为顶尖的大作家，但你用极高的情商和积累的人脉，建立了一个名为“方舟”的创作社区。你保护了无数小作者免受网暴，你制定的“圈层公约”被视为铁律。你是这个混沌圈子里最坚实的后盾，被无数人尊称为“教母”。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：圈层教母",
    poem: "八方风雨护孤舟，万丈红尘一望收。\n不为浮名遮望眼，且留清气在心头。"
  },

  "ending_police_1": {
    id: "ending_police_1",
    text: "【结局：请喝茶】\n因为传播违规内容或被恶意举报，你被辖区派出所传唤。虽然只是批评教育，但你在三次元社死了，父母也没收了你的电脑。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：请喝茶",
    poem: "笔底波澜触暗礁，清茶一盏意难销。\n此时方悔从前事，满纸荒唐未肯抛。"
  },
  "ending_jail_sales": {
    id: "ending_jail_sales",
    text: "【结局：非法经营】\n你的本子/无料涉及金额超过了立案标准。因为缺乏出版刊号，你因涉嫌“非法经营罪”被刑事拘留。铁窗泪。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：铁窗泪",
    poem: "利欲熏心这般愁，铁窗风雨几时休。\n当初只道金银好，换得身名一旦休。"
  },
  "ending_loss": {
    id: "ending_loss",
    text: "【结局：血本无归】\n漫展被查，本子被扣，印刷费打了水漂。你不仅没赚到钱，还搭进去几个月的生活费。看着堆满房间的废纸，你心如死灰。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：血本无归",
    poem: "满腔热血付东流，散尽千金换别愁。\n纸上繁华终是梦，空余残墨染春秋。"
  },
  "ending_banned": {
    id: "ending_banned",
    text: "【结局：炸号】\n你的账号彻底消失在互联网的洪流中。多年积累的粉丝、文章、评论，瞬间清零。你就像一个从未存在过的幽灵。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：赛博失语",
    poem: "十年心血一朝空，名为违规去无踪。\n赛博坟场无墓碑，只有404在风中。"
  },
  "ending_cyber_bullying": {
    id: "ending_cyber_bullying",
    text: "【结局：退网抑郁】\n网络暴力的浪潮将你淹没。私信里全是恶毒的诅咒，你不敢开手机，不敢看屏幕。你得了严重的网络创伤，决定永远离开这个是非之地。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：惊弓之鸟",
    poem: "人言可畏胜刀枪，字字诛心透骨凉。\n掩卷息屏归去后，夜深犹自梦苍茫。"
  },
  "ending_quit": {
    id: "ending_quit",
    text: "【结局：退圈保平安】\n圈子里的乌烟瘴气让你窒息。你注销了所有账号，从此只做一个现充。虽然清净了，但心里总觉得空落落的。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：退圈",
    poem: "江湖风浪总难平，归去来兮一身轻。\n从此不闻圈内事，闲看花落听鸟鸣。"
  },
  "ending_slave": {
    id: "ending_slave",
    text: "【结局：社畜】\n因为同人赚不到钱，或者因为接稿耗尽了灵气，你最终入职了一家互联网公司，每天996。你再也没有时间提笔写字。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：普通社畜",
    poem: "灵台方寸已蒙尘，案牍劳形老此身。\n梦想当年如逝水，同人一梦属他人。"
  },
  "ending_normal": {
    id: "ending_normal",
    text: "【结局：现充的快乐】\n你找了一份普通工作，偶尔在周末写写清水文。虽然不火，但有一群固定的读者。这或许是最好的平衡。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：平淡是真",
    poem: "平平淡淡才是真，偶向闲窗写旧因。\n不求闻达于诸侯，自有一方自在身。"
  },
  "ending_success": {
    id: "ending_success",
    text: "【结局：紫微星降临】\n你熬过了漫长的冷板凳期，一本封神！影视版权卖出天价，你的名字挂在畅销榜首。你是无数作者仰望的“紫微星”。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：大神作家",
    poem: "十年辛苦磨一剑，今日锋芒天下知。\n名利双收随手得，青云直上九重时。"
  },
  "ending_mid_writer": {
    id: "ending_mid_writer",
    text: "【结局：底层写手】\n你没有成神，也没有饿死。你每个月拿着几千块的全勤稿费，在温饱线上挣扎。虽然没有大红大紫，但这里有属于你的故事世界。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：笔耕不辍",
    poem: "虽然未得步青云，且把文章慰我心。\n冷暖自知书卷里，也无风雨也无晴。"
  },
  "ending_fail_original": {
    id: "ending_fail_original",
    text: "【结局：扑街】\n脱离了同人滤镜，你的原创作品无人问津。数据惨淡，你不得不回去找工作。你终于承认，自己只是一个普通的创作者。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：梦碎",
    poem: "才高命薄叹奈何，转型路断泪滂沱。\n回首依然无去处，红尘碌碌且高歌。"
  }
};