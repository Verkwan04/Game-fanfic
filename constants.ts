import { Attributes, GameEvent } from "./types";

// --- PERSONAS (Lottery System) ---
export const PERSONAS = [
  {
    id: "rich_kid",
    name: "富二代",
    desc: "家里有矿，用爱发电。",
    stats: { creativity: 30, legal: 40, eq: 50, popularity: 10, stress: 0, money: 2000, trust: 10 }
  },
  {
    id: "law_student",
    name: "法学生",
    desc: "知法懂法，甚至想普法。",
    stats: { creativity: 40, legal: 90, eq: 40, popularity: 5, stress: 30, money: 300, trust: 0 }
  },
  {
    id: "writer",
    name: "中文系才女",
    desc: "文笔惊艳，但心思敏感。",
    stats: { creativity: 90, legal: 50, eq: 30, popularity: 0, stress: 40, money: 400, trust: 0 }
  },
  {
    id: "social_butterfly",
    name: "交际花",
    desc: "混圈高手，八面玲珑。",
    stats: { creativity: 20, legal: 40, eq: 90, popularity: 50, stress: 10, money: 500, trust: 30 }
  },
  {
    id: "high_schooler",
    name: "高中生",
    desc: "作业很多，热情很高。",
    stats: { creativity: 60, legal: 20, eq: 40, popularity: 0, stress: 80, money: 50, trust: 10 }
  }
];

export const INITIAL_STATS: Attributes = {
  creativity: 50,
  legal: 50,
  eq: 50,
  popularity: 0,
  stress: 20,
  money: 0,
  trust: 0
};

// --- COMMENT LIBRARY ---
// Pre-fabricated, "Alive" feeling comments. Length 50-100 chars.
export const COMMENT_LIBRARY: Record<string, string[]> = {
  "start": [
    "刚搜tag看到的，虽然文笔还有点稚嫩，但是脑洞很大！大大加油呀，这种冷门CP能有粮吃我就很满足了，千万不要坑！蹲一个后续~",
    "刷到这篇真的惊喜，感觉人物对话特别还原，没有那种OOC的尴尬感。就是更得有点少，不够看啊！大大快去码字，生产队的驴都不敢这么歇！",
    "萌新入坑！节奏虽然稍微慢了一点，但是氛围感营造得很好。特别是中间那段心理描写，真的戳到我了。已收藏，期待太太的下一章！",
    "路过留爪。设定的切入点很有意思，感觉后续会有大刀？瑟瑟发抖。只要不虐我CP怎么都行，大大请多写点甜的吧，孩子要饿死了。",
    "终于有人写这个梗了！之前就一直想看这种设定的文，大大简直是我的互联网嘴替。行文很流畅，一口气读完，催更催更！"
  ],
  "praise_high": [
    "卧槽卧槽！这是什么神仙太太下凡！那个眼神拉丝的描写看得我直接在床上扭成一条蛆！张力拉满，性张力爆棚！大大我是你的狗！",
    "即使是BE我也认了，写得太有宿命感了。大大你是懂怎么往读者心口捅刀子的... 今晚的眼泪不值钱，全是为了他们的绝美爱情。",
    "这文笔真的绝了，画面感太强了，感觉像是在看电影。每一个字都戳在我的XP上，建议直接出书！大大把二维码放出来，我要给你打钱！",
    "这就是成年人的快乐吗？虽然有点OOC但是我也爱！这辆车开得太稳了，车门我已经焊死了，谁也别想下车！摩多摩多！",
    "看完直接失语，这种灵魂的共鸣感太强了。不仅是爱情，更是一种救赎啊。感谢大大带来这么美好的故事，此生无悔入此坑！"
  ],
  "praise_low": [
    "打卡。虽然有些地方逻辑不太通，但是作为新人已经很不错了。建议排版再优化一下，看着会更舒服。加油！",
    "感觉人物稍微有点崩，不过为了吃粮我可以忽略。希望大大下章能把受的性格再捉摸一下，现在有点太弱气了。",
    "不更了吗？虽然热度不高，但是这里还有一个活人在看啊！大大别灰心，冷圈就是这样的，坚持产粮总会被看到的。",
    "文笔略显小白，但是梗还不错。如果能把背景描写再丰富一点就好了。先收藏养肥了再看，希望不要坑掉哦。",
    "看得出作者很努力在写了，但是剧情推进有点太慢了，看了半天不知道重点在哪里。建议加快节奏，不然很容易弃文的。"
  ],
  "flame_ooc": [
    "避雷。这也太OOC了吧？攻完全变成了个恋爱脑油腻男，受变成了娇妻，作者真的看过原著吗？为了推剧情强行降智，告辞。",
    "无法理解，为什么要给他们加这种奇怪的设定？完全毁了人物原本的魅力。虽然是同人，但也不能只借个名字就乱写吧？",
    "纯路人，看了两眼觉得很尴尬。这文笔是小学生写的吗？现在的同人门槛真的越来越低了，什么人都能来写两笔。",
    "这也能叫同人？完全就是套皮文学。把名字遮住根本不知道写的是谁。请尊重一下原著角色好吗？这种垃圾文还是别发出来现眼了。",
    "本来是冲着tag进来的，结果被雷得外焦里嫩。这种只会谈恋爱的脑残剧情真的看够了，能不能有点深度？果断取关拉黑。"
  ],
  "drama_ai": [
    "这文风怎么看怎么像AI生成的，逻辑前后矛盾，还有很多莫名其妙的形容词。现在的同人女连字都懒得码了吗？抵制尸块拼接！",
    "挂人墙见。实锤了，这几段描写完全就是把原本的词条喂给AI生成的。这种没有灵魂的垃圾文字就别发出来恶心人了。",
    "虽然作者澄清了，但我还是觉得很怪。那种生硬的转折和毫无感情的景物描写，真的很像GPT出来的东西。大家自己分辨吧。",
    "现在的AI小鬼真的多，以为随便生成一点东西就能骗流量。同人创作的核心是爱，连爱都没有还写什么？滚出同人圈！",
    "有一说一，这段话的语序都不通顺，明显是机翻或者AI润色的。连最基本的真诚都没有，还指望读者给你买单？做梦去吧。"
  ],
  "drama_legal": [
    "博主你这篇文的尺度是不是有点太大了？虽然我也爱看，但是最近风声紧，建议还是锁了吧，或者走外链。安全第一啊！",
    "已举报。拿着搞黄色的东西当文学，还发在公共平台，不仅毁角色还教坏未成年。网警已经在路上了，等着喝茶吧。",
    "这真的是可以在这里发的吗？太刑了... 虽然很刺激，但是为了大家能长久有粮吃，还是低调一点比较好。删了吧。",
    "看得我心惊肉跳，这车速已经超速了吧？虽然很香，但是真的怕大大被请喝茶。建议转战AO3或者爱发电，国内平台太危险了。",
    "这种违规内容怎么还没被夹？审核都在睡觉吗？为了净化网络环境，我已经随手举报了。不谢，请叫我红领巾。"
  ],
  "sales_hype": [
    "通贩什么时候开？钱包已准备好！错过了一贩后悔一年，这次一定要抢到！求求大大别限购，让我买爆！",
    "这个封面设计太好看了吧！虽然家里已经没地方放了，但是为了这个特典我也要买！希望能有签绘，大大看看孩子！",
    "啊啊啊啊又是手慢无！黄牛能不能滚啊！大大能不能二刷？求求了，哪怕是预售等半年我也愿意！孩子只想拥有一本实体书。",
    "实物图也太美了吧，这烫金工艺简直绝了！买来收藏都值了。已经在定闹钟了，希望能抢到前一百名的特典！",
    "All in！成年人不做选择，我全都要！大大出的周边必须支持，哪怕吃土也要买。期待发货，已经迫不及待想摸到实体了！"
  ],
  "sales_scam": [
    "避雷！五十块钱的本子你就给我用这种纸？印刷模糊得连字都看不清，这完全是欺诈吧？把读者当韭菜割吗？",
    "作者是不是卷钱跑路了？发货拖了三个月，客服也不回消息。吃相太难看了，以后再也不买这家的本子了。退钱！",
    "大家别买！这本所谓的“精装版”就是把lofter上的文复制粘贴打印出来，连排版都没改，错别字都在。真的太下头了。",
    "第一次见到这么离谱的色差，跟宣图完全是两个东西。这就是所谓的“实物为准”吗？完全是虚假宣传！必须维权到底！",
    "无语死了，包装简陋得要命，书角都撞坏了。找客服理论还被拉黑。这种垃圾作者就该挂出来避雷，大家千万别上当！"
  ]
};

// --- EVENT TREE (Expanded & Harder) ---
export const EVENTS: Record<string, GameEvent> = {
  // --- START & LOTTERY ---
  "start": {
    id: "start",
    text: "混沌初开，你站在命运的转盘前。在这个充满热爱与风险的同人世界里，你将扮演什么角色？",
    choices: [
      {
        text: "求签问卦，开启人生",
        nextEventId: "lottery_draw",
        description: "随机抽取你的初始人设"
      }
    ]
  },
  "lottery_draw": {
    id: "lottery_draw",
    text: "你摇动签筒，一支竹签落地。签上写着...",
    choices: PERSONAS.map(p => ({
      text: `【${p.name}】${p.desc}`,
      nextEventId: "start_real",
      effects: p.stats,
      description: `初始资金: ¥${p.stats.money}`
    }))
  },
  "start_real": {
    id: "start_real",
    text: "身份已定。你刚入坑一部热门作品《XXX》，看着粮仓里良莠不齐的作品，你决定...",
    choices: [
      { text: "我要产粮！拯救饥荒！", nextEventId: "choose_genre", effects: { stress: 5 } },
      { text: "先当读者，只看不写。", nextEventId: "consumer_loop", effects: { stress: -5 } }
    ]
  },

  // --- EARLY GAME ---
  "consumer_loop": {
    id: "consumer_loop",
    text: "你每天快乐刷手机，虽然没有压力，但看着别人产出的粮，你越来越挑剔。",
    choices: [
      { text: "忍不住了，我要自己动笔！", nextEventId: "choose_genre", effects: { creativity: 10 } },
      { text: "继续躺平，催更就好。", nextEventId: "ending_normal_consumer", effects: {} }
    ]
  },
  "choose_genre": {
    id: "choose_genre",
    text: "打开文档，光标闪烁。第一篇文，你打算写什么？",
    choices: [
      { 
        text: "全年龄向甜饼 (清水)", 
        nextEventId: "platform_choice", 
        effects: { legal: 5, popularity: 5 },
        description: "安全，但难以出头"
      },
      { 
        text: "极度刺激的深夜车 (R18)", 
        nextEventId: "platform_choice_risky", 
        effects: { legal: -10, popularity: 30, stress: 10 },
        description: "自带流量，自带风险"
      },
      {
        text: "晦涩难懂的原著向考据",
        nextEventId: "publish_flop",
        effects: { creativity: -10, stress: 20 },
        description: "容易没人看"
      }
    ]
  },
  "platform_choice": {
    id: "platform_choice",
    text: "清水甜文写好了，发在哪里？",
    choices: [
      { text: "老福特 (主流社区)", nextEventId: "feedback_route_a", effects: { popularity: 10 } },
      { text: "微博 (流量广场)", nextEventId: "feedback_route_b", effects: { popularity: 15, stress: 10 } }
    ]
  },
  "platform_choice_risky": {
    id: "platform_choice_risky",
    text: "这车速太快，国内平台发不出来。你决定...",
    choices: [
      { text: "微博发图链/倒置图", nextEventId: "danger_early", effects: { legal: -20, popularity: 40, stress: 15 } },
      { text: "AO3 (虽然要翻墙)", nextEventId: "feedback_ao3", effects: { legal: 5, popularity: 10 } }
    ]
  },

  // --- FEEDBACK LOOPS ---
  "publish_flop": {
    id: "publish_flop",
    text: "文章发出去三天，点击量只有个位数。你的热情被浇了一盆冷水。",
    choices: [
      { text: "坚持就是胜利！继续写！", nextEventId: "grind_loop", effects: { stress: 10, creativity: 5 } },
      { text: "果然我不适合，退圈。", nextEventId: "ending_giveup", effects: {} }
    ],
    commentScenario: "praise_low"
  },
  "feedback_route_a": {
    id: "feedback_route_a",
    text: "反响平平，但有几个暖心评论。不过也有人说你人物OOC。",
    choices: [
      { text: "虚心接受，下次改进", nextEventId: "grind_loop", effects: { eq: 10, creativity: 5 } },
      { text: "怼回去！“你行你上”", nextEventId: "drama_early", effects: { eq: -10, popularity: 5 } }
    ],
    commentScenario: "start"
  },
  "feedback_route_b": {
    id: "feedback_route_b",
    text: "在微博上，你的文被转发到了槽吧。一群人正在审判你的文笔。",
    choices: [
      { text: "装死不看", nextEventId: "grind_loop", effects: { stress: 10 } },
      { text: "发长文解释心路历程", nextEventId: "drama_escalation", effects: { stress: 20, popularity: 10 } }
    ],
    commentScenario: "flame_ooc"
  },
  "feedback_ao3": {
    id: "feedback_ao3",
    text: "收获了不少Kudos，但墙内有人挂了你的外链，说你为了流量不要脸。",
    choices: [
      { text: "无视", nextEventId: "grind_loop", effects: { stress: 5 } },
      { text: "锁文跑路", nextEventId: "ending_giveup", effects: { popularity: -10 } }
    ],
    commentScenario: "drama_legal"
  },

  // --- MID GAME GRIND ---
  "grind_loop": {
    id: "grind_loop",
    text: "日子一天天过去，你在这个圈子里浮浮沉沉。接下来的一段时间，你的重心是？",
    choices: [
      { text: "【爆肝】开启长篇连载", nextEventId: "long_novel_challenge", effects: { stress: 20, creativity: -10 } },
      { text: "【社交】混群扩列", nextEventId: "social_drama", effects: { trust: 20, stress: -5 } },
      { text: "【搞钱】接稿赚外快", nextEventId: "freelance_hell", effects: { money: 100, creativity: -20 } },
      { text: "【整活】做无料/周边", nextEventId: "merch_risk", effects: { money: -200 } }
    ]
  },

  // --- BRANCH: LONG NOVEL ---
  "long_novel_challenge": {
    id: "long_novel_challenge",
    text: "连载是个无底洞。数据惨淡，评论区冷清，你的存稿用完了，卡文卡得想撞墙。",
    choices: [
      { text: "为爱发电，咬牙完结！(需高创作力)", condition: (s) => s.creativity > 60, nextEventId: "novel_success", effects: { popularity: 20, creativity: 20 } },
      { text: "不管了，坑了它！", nextEventId: "ending_bad_reputation", effects: { popularity: -20 } },
      { text: "水一水字数，烂尾。", nextEventId: "grind_loop", effects: { popularity: -5 } }
    ],
    commentScenario: "praise_low"
  },
  "novel_success": {
    id: "novel_success",
    text: "你坚持下来了！完结的那一刻，文章被各大推文号转发，你火了。",
    choices: [
      { text: "趁热打铁，出个志！", nextEventId: "selling_books_prep", effects: { money: -500 } },
      { text: "深藏功与名，休息。", nextEventId: "grind_loop", effects: { stress: -20 } }
    ],
    commentScenario: "praise_high"
  },

  // --- BRANCH: SOCIAL ---
  "social_drama": {
    id: "social_drama",
    text: "你加了几个亲友群，表面上姐妹情深。某天，你发现有人在背地里截你的图挂你。",
    choices: [
      { text: "退群保平安", nextEventId: "grind_loop", effects: { trust: -20, stress: 5 } },
      { text: "撕破脸！挂回去！", nextEventId: "drama_escalation", effects: { popularity: 20, stress: 30, eq: -20 } }
    ],
    commentScenario: "flame_ooc"
  },
  "drama_early": {
    id: "drama_early",
    text: "你忍不住回怼了恶评。结果引来了更多乐子人，你的评论区沦陷了。",
    choices: [
      { text: "继续对线！", nextEventId: "drama_escalation", effects: { stress: 20 } },
      { text: "装死", nextEventId: "grind_loop", effects: { stress: 10 } }
    ],
    commentScenario: "flame_ooc"
  },

  // --- BRANCH: FREELANCE ---
  "freelance_hell": {
    id: "freelance_hell",
    text: "甲方的要求五花八门：“要五彩斑斓的黑”。你改了十版，最后对方说还是第一版好。",
    choices: [
      { text: "拿钱办事，忍。", nextEventId: "grind_loop", effects: { money: 200, stress: 30 } },
      { text: "这就是社畜的预演吗？我不干了。", nextEventId: "ending_slave_early", effects: {} }
    ]
  },

  // --- RISKY BUSINESS: BOOKS ---
  "selling_books_prep": {
    id: "selling_books_prep",
    text: "出本是一项大工程。排版、校对、宣图、联系印厂。资金是个大问题。",
    choices: [
      { text: "小印量(50本)，只为了纪念", nextEventId: "sales_safe", effects: { money: -500, popularity: 5 } },
      { text: "我要赚钱！印1000本！", nextEventId: "sales_danger", effects: { money: -2000, stress: 40 } },
      { text: "搞无料(免费送)，求打赏", nextEventId: "wuliao_scam", effects: { money: -300 } }
    ],
    commentScenario: "sales_hype"
  },
  "sales_danger": {
    id: "sales_danger",
    text: "预售链接一开，秒切。你看着后台几万块的流水，手都在抖。这已经远超“爱好”的范畴了。",
    choices: [
      { text: "低调发货，祈祷平安", nextEventId: "police_raid_check", effects: { legal: -30 } },
      { text: "被人举报非法出版", nextEventId: "ending_jail", effects: {} }
    ],
    commentScenario: "sales_hype"
  },
  "sales_safe": {
    id: "sales_safe",
    text: "虽然亏了本，但看着精美的实体书，你觉得一切都值了。",
    choices: [
      { text: "继续在这个圈子发光发热", nextEventId: "grind_loop", effects: { creativity: 10 } },
      { text: "圆满了，退圈现充。", nextEventId: "ending_normal_happy", effects: {} }
    ],
    commentScenario: "praise_high"
  },
  "wuliao_scam": {
    id: "wuliao_scam",
    text: "你设置了1元链接防刷。结果被人举报“无证经营”。闲鱼封了你的号。",
    choices: [
      { text: "心累...", nextEventId: "ending_giveup", effects: {} }
    ],
    commentScenario: "sales_scam"
  },

  // --- DRAMA & DANGER ---
  "drama_escalation": {
    id: "drama_escalation",
    text: "事情闹大了。你的三次元信息被扒了出来（开盒）。你的学校/公司收到了举报信。",
    choices: [
      { text: "滑跪道歉，销号跑路", nextEventId: "ending_cyber_bullying", effects: { stress: 50 } },
      { text: "硬刚到底 (需极高心理素质)", condition: (s) => s.stress < 30 && s.eq > 60, nextEventId: "survived_drama", effects: { popularity: 50, legal: -10 } }
    ],
    commentScenario: "drama_legal"
  },
  "police_raid_check": {
    id: "police_raid_check",
    text: "你的流水太大，被监管部门盯上了。",
    choices: [
      { text: "听天由命...", condition: (s) => s.legal > 60, nextEventId: "ending_tea", effects: {} },
      { text: "完蛋了...", condition: (s) => s.legal <= 60, nextEventId: "ending_jail", effects: {} }
    ],
    commentScenario: "drama_legal"
  },
  "danger_early": {
    id: "danger_early",
    text: "你的擦边球打得太好了，吸引了大量流量，也引来了网警。",
    choices: [
      { text: "我就蹭蹭不进去...", nextEventId: "ending_tea", effects: {} }
    ],
    commentScenario: "drama_legal"
  },
  "survived_drama": {
    id: "survived_drama",
    text: "你凭借强大的内心挺过了网暴。现在的你是钮祜禄·同人女，黑红也是红。",
    choices: [
      { text: "转型职业网红/作家", nextEventId: "ending_influencer", effects: {} },
      { text: "继续写我的文", nextEventId: "grind_loop", effects: {} }
    ],
    commentScenario: "praise_high"
  },

  // --- SPECIAL: DEFYING FATE EVENT ---
  "event_miracle": {
    id: "event_miracle",
    text: "【逆天改命】在你最迷茫的时候，一位退圈多年的大神突然联系了你，不仅转发了你的作品，还把她的人脉资源都推给了你。这是百万分之一的运气！",
    choices: [
      { 
        text: "抓住机会，飞升成神！", 
        nextEventId: "ending_legend", 
        effects: { popularity: 100, money: 5000, creativity: 100 },
        description: "天选之子" 
      }
    ],
    commentScenario: "praise_high"
  },

  // --- ENDINGS (1:9 Ratio - Mostly Bad/Normal) ---
  // BAD ENDINGS
  "ending_jail": {
    id: "ending_jail",
    text: "【结局：铁窗泪】\n非法经营数额巨大。你不仅要退赔所有违法所得，还面临刑事处罚。你的青春将在缝纫机踩踏声中度过。",
    choices: [], isEnding: true, endingTitle: "结局：铁窗泪",
    poem: "贪念一起祸门开，金银散尽惹尘埃。\n高墙只锁悔心人，昔日繁华不再来。"
  },
  "ending_tea": {
    id: "ending_tea",
    text: "【结局：请喝茶】\n虽然没有判刑，但留下了案底。你的父母被叫到了派出所，看着你写的那些文字，他们眼神里的失望让你窒息。",
    choices: [], isEnding: true, endingTitle: "结局：请喝茶",
    poem: "一盏清茶味更苦，双亲白发泪模糊。\n文心虽在身已误，从此萧郎是路人。"
  },
  "ending_cyber_bullying": {
    id: "ending_cyber_bullying",
    text: "【结局：惊弓之鸟】\n网络暴力摧毁了你的精神防线。你患上了严重的抑郁症，只要听到手机震动就会发抖。你彻底消失在了网络世界。",
    choices: [], isEnding: true, endingTitle: "结局：惊弓之鸟",
    poem: "人言如刀不见血，字字诛心透骨寒。\n掩耳盗铃终是错，梦回犹在鬼门关。"
  },
  "ending_bad_reputation": {
    id: "ending_bad_reputation",
    text: "【结局：臭名昭著】\n坑品太差，或是卷入太多是非，你在圈内名声扫地。无论你换多少个马甲，总会被人认出来追着骂。",
    choices: [], isEnding: true, endingTitle: "结局：过街老鼠",
    poem: "虽然才气比天高，德行有亏众口嘲。\n马甲千重藏不住，满屏唾沫似惊涛。"
  },
  "ending_giveup": {
    id: "ending_giveup",
    text: "【结局：半途而废】\n这世界太乱，创作太难。你默默注销了账号。多年后，没人记得你曾经来过。",
    choices: [], isEnding: true, endingTitle: "结局：无名之辈",
    poem: "兴来提笔意飞扬，意尽人散茶更凉。\n大梦一场终须醒，也就是个普通郎。"
  },
  "ending_slave_early": {
    id: "ending_slave_early",
    text: "【结局：被生活磨平】\n你发现写同人救不了你的贫穷。你找了个班上，每天996，再也没有力气打开文档。",
    choices: [], isEnding: true, endingTitle: "结局：社畜",
    poem: "月亮与币难兼得，低头只为碎银忙。\n心中那团少年火，早已熄在风雪场。"
  },

  // NORMAL ENDINGS
  "ending_normal_consumer": {
    id: "ending_normal_consumer",
    text: "【结局：快乐读者】\n你从未动笔，所以从未受伤害。你在坑底躺得很平，偶尔给大大递递茶。这或许是最幸福的结局。",
    choices: [], isEnding: true, endingTitle: "结局：吃粮人",
    poem: "不写文章不惹愁，且将闲眼看风流。\n神仙打架由他去，我自逍遥一叶舟。"
  },
  "ending_normal_happy": {
    id: "ending_normal_happy",
    text: "【结局：圈地自萌】\n你有三两个亲友，写写自己喜欢的故事。不追求热度，不涉及金钱。你在这个小小的角落里找到了安宁。",
    choices: [], isEnding: true, endingTitle: "结局：桃花源",
    poem: "不论窗外风雨恶，且向花间写太平。\n三五知己一杯酒，此心安处是吾名。"
  },

  // GOOD ENDINGS (Rare)
  "ending_legend": {
    id: "ending_legend",
    text: "【结局：同人封神】\n你的名字成为了这个圈子的传说。你的作品被奉为“镇圈之宝”。你不仅收获了名声，更重要的是，你保护好了那份初心。",
    choices: [], isEnding: true, endingTitle: "结局：无冕之王",
    poem: "笔落惊风雨，诗成泣鬼神。\n十年磨一剑，今日把示君。\n不负心中爱，留得身后名。"
  },
  "ending_influencer": {
    id: "ending_influencer",
    text: "【结局：流量变现】\n你不再执着于纯粹的创作，而是成为了深谙流量密码的网红。接广、带货、引流，你赚得盆满钵满。虽然有人骂你变了，但你不在乎。",
    choices: [], isEnding: true, endingTitle: "结局：名利场",
    poem: "妆楼颙望只有金，笑看痴人说真心。\n长袖善舞多财路，谁管当年梦已沉。"
  }
};