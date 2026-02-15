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

// 三次元世界人设（追星/偶像圈）
export const ARCHETYPES_3D = [
  {
    name: "【理性散粉】",
    desc: "有固定本命，但生活重心在三次元。追星量力而行，不接机不蹲酒店，签售随缘。法律与边界感强。",
    stats: { money: 2000, creativity: 20, legal: 85, eq: 70, stress: 10, popularity: 5, trust: 80 }
  },
  {
    name: "【站姐/前线】",
    desc: "扛大炮跑活动，出图快修图美，在粉圈有话语权。但容易卷入代拍、私生争议，边界一旦模糊就有风险。",
    stats: { money: 1500, creativity: 60, legal: 50, eq: 50, stress: 40, popularity: 60, trust: 40 }
  },
  {
    name: "【富婆粉】",
    desc: "专辑成箱买、代言冲销量、签售场场到。用钱铺路，容易获得官方或后援会重视，但也可能被当韭菜或卷入集资争议。",
    stats: { money: 15000, creativity: 15, legal: 55, eq: 45, stress: 20, popularity: 30, trust: 50 }
  },
  {
    name: "【后援会骨干】",
    desc: "做数据、搞应援、组织活动。权力与责任并存，一旦涉及集资、账目不清或引导骂战，可能害人害己。",
    stats: { money: 1000, creativity: 30, legal: 60, eq: 55, stress: 50, popularity: 50, trust: 35 }
  },
  {
    name: "【易上头型粉丝】",
    desc: "容易因为一条黑评就冲上去对线，或因为想见真人而心动跟机、蹲酒店。法律意识薄弱，需要时刻提醒自己边界。",
    stats: { money: 500, creativity: 25, legal: 25, eq: 30, stress: 35, popularity: 20, trust: 25 }
  }
];

/** 命簿共 20 张信笺，对应 20 个结局；集齐后解锁「同人女使命达成」终极徽章 */
export const TOTAL_ENDINGS = 20;
export const ALL_ENDING_IDS: readonly string[] = [
  "ending_peace", "ending_quit", "ending_cyber_bullying", "ending_jail", "ending_banned",
  "ending_death", "ending_victory_hollow", "ending_god", "ending_2d_cold_circle", "ending_2d_author_legal",
  "ending_2d_burnout", "ending_2d_circle_elders", "ending_2d_controversy_quit", "ending_2d_rebirth",
  "ending_3d_peace", "ending_3d_legal", "ending_3d_reflect", "ending_3d_lifelong_fan", "ending_3d_frontline_retire"
];

export const EVENTS: Record<string, GameEvent> = {
  // --- STAGE 0: 选择世界 ---
  "start": {
    id: "start",
    text: "欢迎来到《同人女模拟器》。\n\n这是一个关于热爱、边界与选择的游戏。你可以沉浸在二次元的同人创作里，也可以走进三次元的追星与线下世界。无论哪条路，都会面临诱惑、压力与道德的考验。\n\n请先选择你要体验的【世界】。",
    choices: [
      {
        text: "【二次元】同人创作 · 出本 · 绘圈/文圈",
        nextEventId: "start_2d",
        description: "创作、经营、参展与法律红线"
      },
      {
        text: "【三次元】追星 · 签售 · 线下 · 粉丝文化",
        nextEventId: "start_3d",
        description: "签售、应援、理性与越界"
      }
    ],
    fixedComments: []
  },

  "start_2d": {
    id: "start_2d",
    text: "你选择了【二次元】世界。在这里，你将体验同人创作、出本、经营账号或小铺，在绘圈/文圈中沉浮。\n\n接下来，请抽取你的【初始人设】——它将决定你的财力、创作力与抗压能力。",
    choices: [
      {
        text: "开始抽签（听天由命）",
        nextEventId: "init_lottery",
        description: "决定你的出身与天赋"
      }
    ],
    fixedComments: []
  },

  "start_3d": {
    id: "start_3d",
    text: "你选择了【三次元】世界。在这里，你将体验追星、签售会、线下应援与粉丝圈的复杂生态。理性与越界往往只有一线之隔。\n\n接下来，请抽取你的【初始人设】——它将影响你在粉圈中的位置与选择。",
    choices: [
      {
        text: "开始抽签（听天由命）",
        nextEventId: "init_lottery_3d",
        description: "决定你的追星风格与底线"
      }
    ],
    fixedComments: []
  },

  "intro_after_lottery": {
    id: "intro_after_lottery",
    text: "拿着你的人设卡，你正式入坑了最近大火的IP《XXX》。首页全是神仙打架，你的CP正处于热恋期（指粉丝脑补）。看着这些绝美粮仓，你体内的创作之魂按捺不住了。你决定先从哪里入手？",
    choices: [
      {
        text: "我是画手，我要用板子说话！",
        nextEventId: "stage2_entry_art",
        effects: { creativity: 5, stress: 5 },
        description: "进入绘圈，靠视觉冲击吸粉"
      },
      {
        text: "我是写手，我要用文字造梦！",
        nextEventId: "stage2_entry_fic",
        effects: { creativity: 5, stress: 5 },
        description: "进入文圈，靠剧情与XP吸粉"
      }
    ],
    fixedComments: [
      "欢迎新人入坑！只要你磕XX我们就是异父异母的亲姐妹！",
      "垂直入坑，这就是天堂吗？粮多到吃不过来，孩子已经撑死了。",
      "大大饿饿饭饭，前面的别挤，让我先舔一口！",
      "虽然是冷圈难民，但看到新入坑的姐妹还是留下了激动的泪水。",
      "新人？先报CP不杀（狗头）",
      "刚入坑+1，首页刷了三天了根本停不下来",
      "姐妹哪里来的，贴贴！"
    ]
  },

  // ========== 三次元线：追星 / 签售 / 辱追 / 私生（教化向） ==========
  "intro_after_lottery_3d": {
    id: "intro_after_lottery_3d",
    text: "你入坑了当下大火的偶像/演员。官宣了签售会、演唱会与代言，粉圈一片沸腾。你想怎样参与这场追星之旅？",
    choices: [
      {
        text: "【理性参与】买专辑、有机会就去签售，不越界",
        nextEventId: "stage3d_signing_choice",
        effects: { legal: 5, eq: 5, trust: 5 },
        description: "健康追星，量力而行"
      },
      {
        text: "【深度参与】加入后援会、做数据、跑线下",
        nextEventId: "stage3d_fandom_deep",
        effects: { popularity: 15, stress: 10 },
        description: "投入时间与精力，注意边界"
      },
      {
        text: "【危险试探】想试试跟机/蹲酒店/买行程……",
        nextEventId: "stage3d_sasaeng_warning",
        effects: { legal: -15, eq: -10 },
        description: "越界行为，将面临道德与法律风险"
      }
    ],
    fixedComments: [
      "签售名额抢到了！姐妹们我们现场见！",
      "理性追星，快乐生活，不给自己也不给偶像添堵。",
      "私生biss，离艺人私生活远一点。",
      "又有人跟机了，真的别给正主招黑好吗。",
      "刚入坑，请问有什么需要注意的吗",
      "量力而行，别贷款追星",
      "今天也是为绝美爱情流泪的一天"
    ]
  },

  "stage3d_sasaeng_warning": {
    id: "stage3d_sasaeng_warning",
    text: "【重要提醒】跟机、蹲酒店、购买或泄露艺人行程，属于侵犯隐私、扰乱公共秩序，可能触犯法律，且会伤害艺人本人与行业风气。游戏内将此类选择设计为高风险路线，旨在让玩家体会后果，请勿在现实中模仿。\n\n你仍然可以选择：回头是岸，或一意孤行（后果自负）。",
    choices: [
      {
        text: "我知错了，改为理性追星",
        nextEventId: "stage3d_signing_choice",
        effects: { legal: 10, eq: 10 },
        description: "回归理性，尊重边界"
      },
      {
        text: "我就要试试（体验后果）",
        nextEventId: "stage3d_sasaeng_path",
        effects: { legal: -20, trust: -20 },
        description: "高风险路线：私生行为将导向负面结局"
      }
    ],
    fixedComments: [
      "能意识到就不晚，理性追星对自己和偶像都好。",
      "现实中这样真的会被告的，别学。",
      "游戏里体验一下后果就好，千万别当真。"
    ]
  },

  "stage3d_sasaeng_path": {
    id: "stage3d_sasaeng_path",
    text: "你搞到了“内部行程”，跟了航班，在酒店大堂蹲到凌晨。你拍到了别人拍不到的画面，在粉圈里一时风头无两，但也有人开始骂你私生、给正主招黑。随后，你发现自己的行为被挂上了反黑站，甚至有人报警。",
    choices: [
      {
        text: "立刻收手，公开道歉并删除偷拍内容",
        nextEventId: "stage3d_after_sasaeng_quit",
        effects: { legal: 5, popularity: -30, stress: 20 },
        description: "及时止损，承担舆论后果"
      },
      {
        text: "不认错，继续跟",
        nextEventId: "ending_3d_legal",
        effects: { legal: -30 },
        description: "执迷不悟，面临法律与社死"
      }
    ],
    fixedComments: [
      "私生不是粉，离艺人生活远一点。",
      "挂反黑站了，这种真的该报警。",
      "游戏里体验一下就好，现实里千万别学。"
    ]
  },

  "stage3d_after_sasaeng_quit": {
    id: "stage3d_after_sasaeng_quit",
    text: "你删除了偷拍内容并道歉，但口碑已经崩了。很多人取关、脱粉，你也上了不少人的“避雷”名单。你决定以后只远远支持，不再越界。",
    choices: [
      {
        text: "重新开始，只参加正规签售与活动",
        nextEventId: "stage3d_signing_choice",
        effects: { trust: 5, stress: -10 },
        description: "用正确的方式继续喜欢"
      }
    ],
    fixedComments: []
  },

  "stage3d_signing_choice": {
    id: "stage3d_signing_choice",
    text: "偶像的签售会即将举办。正规渠道抢票、排队、遵守秩序，是健康追星的一部分。你打算如何参与？",
    choices: [
      {
        text: "【抢票参与】量力而行，抢到就去，抢不到就下次",
        nextEventId: "stage3d_signing_event",
        effects: { eq: 5, stress: -5 },
        description: "理性参与签售"
      },
      {
        text: "【高价收票】特别想去，考虑黄牛/高价收",
        nextEventId: "stage3d_signing_risky",
        effects: { money: -500, legal: -5 },
        description: "可能助长黄牛，且存在诈骗风险"
      }
    ],
    fixedComments: [
      "签售会排队好长但是秩序很好，大家都很有素质。",
      "抵制黄牛，从你我做起。",
      "能见一面就很开心了，不要越界。"
    ]
  },

  "stage3d_signing_event": {
    id: "stage3d_signing_event",
    text: "签售会当天，你排队入场，遵守秩序。轮到你时，你和偶像有了短暂的交流与签名。你发现，在规则之内支持，反而更安心、更长久。",
    choices: [
      {
        text: "满足离场，以后继续理性支持",
        nextEventId: "stage3d_signing_after",
        effects: { trust: 15, stress: -10 },
        description: "健康追星带来正向体验"
      },
      {
        text: "做够了，想体面收山",
        condition: (s) => s.popularity >= 40,
        nextEventId: "ending_3d_frontline_retire",
        effects: {},
        description: "站姐/前线收山"
      }
    ],
    fixedComments: [
      "今天好开心，正主真的好温柔！",
      "理性追星才能走得长远，共勉。",
      "签售秩序靠大家，今天体验满分。"
    ]
  },

  "stage3d_signing_after": {
    id: "stage3d_signing_after",
    text: "签售结束后的几天，你还在回味那几秒钟的对视和签名。你决定：是继续深入粉圈做数据、应援，还是就保持这样偶尔支持？",
    choices: [
      { text: "深入粉圈，做数据、反黑、应援", nextEventId: "stage3d_fandom_deep", effects: { popularity: 10 }, description: "更多参与" }
    ],
    fixedComments: [
      "签售后遗症+1，根本走不出来",
      "下次还抢！",
      "理性消费，快乐追星。"
    ]
  },

  "stage3d_signing_risky": {
    id: "stage3d_signing_risky",
    text: "你通过非官方渠道高价买了票。到了现场才发现是假票，钱打了水漂。有人提醒：签售务必走官方渠道，抵制黄牛、谨防诈骗。",
    choices: [
      {
        text: "吃一堑长一智，以后只走官方",
        nextEventId: "stage3d_fandom_deep",
        effects: { legal: 5, eq: 5 },
        description: "吸取教训"
      }
    ],
    fixedComments: [
      "黄牛和骗子太多了，大家一定要走官方！",
      "心疼姐妹，下次一定官方见。"
    ]
  },

  "stage3d_fandom_deep": {
    id: "stage3d_fandom_deep",
    text: "你深入了粉圈：做数据、反黑、有时和别家或黑子对线。你发现圈子里还有一种人——“辱追”：以攻击、嘲讽自家或对家偶像为乐，到处引战。有人拉你一起“辱追”找乐子。",
    choices: [
      {
        text: "拒绝，不参与辱追与人身攻击",
        nextEventId: "stage3d_manage_or_peace",
        effects: { eq: 10, legal: 5, trust: 10 },
        description: "保持理性，不越界"
      },
      {
        text: "有点心动，想试试骂几句“玩玩”",
        nextEventId: "stage3d_ruzhui_warning",
        effects: { eq: -5 },
        description: "辱追会败坏风气，可能涉及网暴"
      }
    ],
    fixedComments: [
      "辱追真的恶心，不喜欢就别关注不行吗。",
      "理性讨论可以，人身攻击和网暴不行。",
      "反黑是反造谣，不是去骂人。"
    ]
  },

  "stage3d_ruzhui_warning": {
    id: "stage3d_ruzhui_warning",
    text: "【提醒】“辱追”往往伴随人身攻击、造谣传谣与网络暴力，可能违反法律法规，也对艺人与粉丝群体造成伤害。游戏内设计此路线以呈现后果，请勿在现实中模仿。\n\n你仍可选择：收手，或继续（将导向负面结局）。",
    choices: [
      {
        text: "不玩了，还是正常追星吧",
        nextEventId: "stage3d_manage_or_peace",
        effects: { eq: 10, trust: 5 },
        description: "回归理性"
      },
      {
        text: "继续（体验后果）",
        nextEventId: "stage3d_ruzhui_path",
        effects: { eq: -15, trust: -20 },
        description: "高风险：可能涉及网暴与法律"
      }
    ],
    fixedComments: []
  },

  "stage3d_ruzhui_path": {
    id: "stage3d_ruzhui_path",
    text: "你加入了辱追小团体，到处阴阳怪气、挂人、煽动骂战。起初你觉得“只是玩梗”，直到有人因你的言论被网暴，或你本人被挂上反黑站、收到律师函。",
    choices: [
      {
        text: "立刻道歉、删博、退群",
        nextEventId: "ending_3d_reflect",
        effects: { stress: 30 },
        description: "承担后果，反思收场"
      },
      {
        text: "硬刚到底",
        nextEventId: "ending_3d_legal",
        effects: { legal: -20 },
        description: "可能面临法律与社死"
      }
    ],
    fixedComments: [
      "辱追到最后没有赢家，只会一地鸡毛。",
      "网暴犯法，别以为匿名就没事。",
      "游戏里体验一下就好，现实里请理性。"
    ]
  },

  "stage3d_manage_or_peace": {
    id: "stage3d_manage_or_peace",
    text: "你在粉圈里有了存在感。有人提议一起做周边、搞应援众筹，或经营后援会账目。这涉及金钱与信任，必须合法合规。",
    choices: [
      {
        text: "【合规应援】账目公开、不非法集资、周边走正规授权",
        nextEventId: "stage3d_ending_healthy",
        effects: { trust: 20, legal: 10, money: 200 },
        description: "健康经营，长久发展"
      },
      {
        text: "【冒险捞一笔】私下收款、不开发票、卷款跑路……",
        nextEventId: "stage3d_fraud_path",
        effects: { money: 1000, legal: -30, trust: -40 },
        description: "违法违纪，必遭反噬"
      }
    ],
    fixedComments: [
      "后援会账目一定要透明，不然说不清。",
      "非法集资真的会进去的，别碰。",
      "理性应援，快乐追星。"
    ]
  },

  "stage3d_fraud_path": {
    id: "stage3d_fraud_path",
    text: "你通过后援会/周边名义收了大量款项，账目混乱，最后卷款消失。粉丝报警，你的信息被挂遍全网。等待你的是法律制裁与永久骂名。",
    choices: [
      {
        text: "（接受结局）",
        nextEventId: "ending_3d_legal",
        effects: {}
      }
    ],
    fixedComments: [
      "非法集资、诈骗，该！",
      "游戏里体验后果，现实里千万别碰。"
    ]
  },

  "stage3d_ending_healthy": {
    id: "stage3d_ending_healthy",
    text: "你坚持理性追星、合规应援。签售会排队、反黑只反造谣、账目公开透明。虽然没能“一夜暴富”或“越界刺激”，但你和同好们一起创造了健康、长久的追星环境。你打算怎么为这段旅程画上句号？",
    choices: [
      { text: "理性长存，满足离场", nextEventId: "ending_3d_peace", effects: {} },
      { text: "我要一辈子支持TA，一生推", nextEventId: "ending_3d_lifelong_fan", effects: {} }
    ],
    fixedComments: []
  },

  // 三次元专属结局
  "ending_3d_peace": {
    id: "ending_3d_peace",
    text: "【结局：理性长存】\n你在三次元追星路上守住了边界。签售、应援、数据，都在规则之内。你没有因为越界而失去自由或口碑，也没有因为辱追或私生而伤害他人。这份喜欢，干净、长久、问心无愧。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：理性长存",
    poem: "追星本为心头好，莫越雷池半步遥。\n签售应援皆有度，理性长存乐逍遥。"
  },

  "ending_3d_legal": {
    id: "ending_3d_legal",
    text: "【结局：越界之罚】\n私生、辱追、非法集资……你触碰了法律与道德的底线。传唤、立案、社死接踵而至。你本可以只做一名普通粉丝，却因一念之差万劫不复。愿你在游戏外，永远记得：热爱有边界。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：越界之罚",
    poem: "一念越界千古恨，法律道德两不饶。\n热爱当有边界在，莫待铁窗空悔迟。"
  },

  "ending_3d_reflect": {
    id: "ending_3d_reflect",
    text: "【结局：幡然醒悟】\n你在辱追与网暴的边缘及时收手。虽然已经造成了一些伤害，但你选择道歉、反思、退圈。希望这份教训能让你在现实中也记住：不造谣、不网暴、理性发声。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：幡然醒悟",
    poem: "辱追网暴皆成空，幡然醒悟未为迟。\n人言善恶终有报，理性发声方长久。"
  },

  // --- 2D 桥接（保证至少 10 轮选择）---
  "stage2_entry_art": {
    id: "stage2_entry_art",
    text: "板子连上了，笔刷调好了。你盯着空白画布深吸一口气——第一张图，将决定大家对你的第一印象。",
    choices: [
      { text: "开画！用实力说话", nextEventId: "stage2_art_topic", effects: {}, description: "进入风格选择" }
    ],
    fixedComments: [
      "新人吗？画风好干净！",
      "先别急着开车，把人体练稳了再说hhh",
      "饿饿饭饭！"
    ]
  },
  "stage2_entry_fic": {
    id: "stage2_entry_fic",
    text: "文档打开了，光标在闪。你敲下第一个标题——第一篇文，将决定你在圈里的起点。",
    choices: [
      { text: "开写！用故事说话", nextEventId: "stage2_fic_topic", effects: {}, description: "进入题材选择" }
    ],
    fixedComments: [
      "新人写手！蹲了！",
      "别坑啊姐妹，冷圈就指望你了",
      "先更完再说话（不是"
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
      "求求了别搞这种阴间玩意儿，我们CP是纯爱好吗？",
      "草，点开前没想到这么香",
      "楼上+1，人体可以再练练但氛围感绝了",
      "已存图，谢谢菩萨"
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
      "蹲一个后续，卡在这里是人干的事吗？孩子要枯萎了。",
      "半夜刷到，不睡了，等更",
      "OOC是OOC但香也是真的香……我叛变了",
      "求求别坑，冷圈就指着你这口粮了"
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
      "有一说一，感觉剧情有点平淡，没有上一篇好看了。",
      "大大什么时候再更，搬小板凳等",
      "不磕但收藏了，画风太舒服了",
      "上面那个ky的删了吧看着碍眼"
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
      "求补档！来晚了只看到了一辆法拉利的尾气呜呜呜！",
      "存了，感恩",
      "评论区某些人真是又当又立，笑死",
      "菩萨渡我！！！"
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
    text: "经历了一波风浪，你在这个圈子站稳了脚跟，有了一批死忠粉。现在有一个热门活动“CP 24小时创作挑战”，也有人开始问你出不出本、搞不搞经营。",
    choices: [
      {
        text: "参加 24 小时挑战！肝它个昏天黑地！",
        nextEventId: "stage6_mid_game_grind",
        effects: { popularity: 20, stress: 15, creativity: -5 },
        description: "大幅提升知名度，但消耗精力"
      },
      {
        text: "我想出本 / 经营——走正规还是走偏门？",
        nextEventId: "stage6_publish_or_manage",
        effects: {},
        description: "出本、经营小铺，合法与风险一念之间"
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

  // --- 出本 / 经营分支（教化：合法 vs 非法）---
  "stage6_publish_or_manage": {
    id: "stage6_publish_or_manage",
    text: "你想把创作变成实体或变现。出本可以走正规出版（申请书号、合法印制），也可以私印售卖（高收益但违法）；经营可以是合规小铺（授权、纳税），也可以是灰色地带。你的选择将决定结局。",
    choices: [
      {
        text: "【正规出本】了解书号与合法印制流程，慢但安心",
        nextEventId: "stage6_legal_publish",
        effects: { legal: 15, stress: 5 },
        description: "合法出版，长久发展"
      },
      {
        text: "【合规经营】开同人小铺/账号，明码标价、不侵权不逃税",
        nextEventId: "stage6_legal_manage",
        effects: { legal: 10, trust: 10 },
        description: "健康变现，可持续"
      },
      {
        text: "【冒险】私印售卖 / 灰色经营，来钱快",
        nextEventId: "stage6_mid_game_money",
        effects: { legal: -10 },
        description: "高收益高风险，可能触法"
      }
    ],
    fixedComments: [
      "正规出本虽然慢但不会被请喝茶，支持！",
      "好多大大都是正规出版转正的，值得学习。",
      "私印真的别搞，身边有人被查了。",
      "经营的话记得开发票、别盗版。"
    ]
  },

  "stage6_legal_publish": {
    id: "stage6_legal_publish",
    text: "你查了资料：正规出版需要申请书号、走出版社或具有资质的印制流程，内容也需符合出版法规。你决定先积累作品、再尝试投稿或合作出版。虽然慢，但心里踏实。",
    choices: [
      {
        text: "继续创作，有机会再走正规出版",
        nextEventId: "stage7_crisis_relevance",
        effects: { creativity: 10, legal: 10, money: 200 },
        description: "合法路线，可能走向细水长流"
      },
      {
        text: "现在就投稿/签约试试",
        nextEventId: "stage6_author_submit",
        effects: { legal: 10 },
        description: "尝试同人转正"
      }
    ],
    fixedComments: [
      "正规出版才是长久之计，大大加油！",
      "能走正规的都不容易，respect。",
      "同人转正越来越多了，好事。"
    ]
  },

  "stage6_author_submit": {
    id: "stage6_author_submit",
    text: "你整理了作品集，投给了出版社/平台。经过几轮修改与签约流程，你的名字终于印在了书脊上。你从同人太太，成了有署名的正规作者。",
    choices: [
      { text: "（进入结局）", nextEventId: "ending_2d_author_legal", effects: {} }
    ],
    fixedComments: [
      "恭喜大大转正！",
      "同人转正真的不容易，瑞思拜。",
      "以后书店能买到了！"
    ]
  },

  "stage6_legal_manage": {
    id: "stage6_legal_manage",
    text: "你开了同人小铺或经营账号：只卖自己拥有版权的作品/授权周边，明码标价、依法纳税。虽然赚得不如灰色多，但不用提心吊胆，粉丝也更信任你。日子一天天过，你打算就这样走下去。",
    choices: [
      {
        text: "稳健经营，细水长流",
        nextEventId: "stage6_shop_finale",
        effects: { money: 500, trust: 15, legal: 10 },
        description: "合规经营导向好结局"
      }
    ],
    fixedComments: [
      "这种大大我爱了，买着放心。",
      "合法经营才能走得远，支持。",
      "希望圈子越来越多正规军。"
    ]
  },

  "stage6_shop_finale": {
    id: "stage6_shop_finale",
    text: "小铺/账号运转平稳，没有爆红也没有暴雷。你每天回复留言、打包发货，偶尔摸鱼产粮。这份平衡，就是你想要的生活。",
    choices: [
      { text: "（进入结局）", nextEventId: "ending_peace", effects: {} }
    ],
    fixedComments: [
      "大大还在更吗？等一个上新！",
      "买过好几次了，质量稳的。",
      "理性消费，快乐支持。"
    ]
  },

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
        nextEventId: "stage7_after_health",
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

  "stage7_after_health": {
    id: "stage7_after_health",
    text: "从医院出来，医生勒令你休息至少三个月。你关掉所有推送，不再看点赞和评论。一段时间后，你发现：有的身体恢复了，但创作欲再也回不来了；有的慢慢找回了手感，决定换一种节奏活。",
    choices: [
      { text: "休养后慢慢恢复，细水长流", nextEventId: "ending_peace", effects: {} },
      { text: "算了，再也画/写不动了，燃尽退场", nextEventId: "ending_2d_burnout", effects: {} }
    ],
    fixedComments: [
      "身体第一位，大大好好养！",
      "能回来就回来，回不来也别勉强。",
      "同人只是生活一部分，不是全部。"
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
        nextEventId: "ending_2d_controversy_quit",
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
      },
      {
        text: "退出纷争，只做圈内和事佬",
        condition: (s) => s.trust >= 50,
        nextEventId: "ending_2d_circle_elders",
        effects: {},
        description: "不站队，只劝和，赢得尊重"
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
        nextEventId: "stage7_cold_or_peace",
        effects: { creativity: 20, popularity: -20 },
        description: "回归初心，获得内心的宁静"
      },
      {
        text: "不甘心！蹭热度，搞营销，买粉！",
        nextEventId: "stage7_desperate",
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

  "stage7_cold_or_peace": {
    id: "stage7_cold_or_peace",
    text: "你不再盯着数据，只为自己和少数同好而写/画。有人选择彻底躺平做冷圈守墓人，有人慢慢找回节奏、细水长流。",
    choices: [
      { text: "细水长流，偶尔产粮", nextEventId: "ending_peace", effects: {} },
      { text: "留在冷圈，守坑到老", nextEventId: "ending_2d_cold_circle", effects: {} }
    ],
    fixedComments: [
      "冷圈人抱紧！",
      "为爱发电yyds。",
      "不火也没关系，我们记得你。"
    ]
  },

  "stage7_desperate": {
    id: "stage7_desperate",
    text: "你不甘心过气，开始买粉、蹭热度、搞营销。结果账号被判定违规，一夜清零。你站在废墟前：是认栽退场，还是开小号转世再来？",
    choices: [
      { text: "认了，赛博失语", nextEventId: "ending_banned", effects: {} },
      { text: "开小号，转世重生", nextEventId: "ending_2d_rebirth", effects: {} }
    ],
    fixedComments: [
      "买粉真的会被清……",
      "小号见姐妹。",
      "从头再来也需要勇气。"
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
  },

  // ========== 额外 9 个结局（凑齐命簿 20 张）==========
  "ending_2d_cold_circle": {
    id: "ending_2d_cold_circle",
    text: "【结局：冷圈守墓人】\n热度散去，你选择留在冷圈。没人催更、没人吵架，只有零星几个同好互相点赞。你为爱发电，守着这个坑直到最后一刻。也许某天会有人考古发现你，也许不会——但你不后悔。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：冷圈守墓人",
    poem: "冷圈无人问津处，独守一坑到白头。\n为爱发电终不悔，他年或有人考古。"
  },
  "ending_2d_author_legal": {
    id: "ending_2d_author_legal",
    text: "【结局：正规作者出道】\n你坚持走正规出版与版权流程，作品终于通过出版社或平台签约。你从“同人太太”变成了“有署名的作者”。虽然再也不能随意开车，但你的名字印在了书脊上，这是你应得的。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：正规作者出道",
    poem: "同人转正路漫漫，书脊有名心始安。\n合规创作终有报，笔下有根亦有源。"
  },
  "ending_2d_burnout": {
    id: "ending_2d_burnout",
    text: "【结局：燃尽退场】\n从医院出来之后，你再也提不起笔。不是不爱了，是身体和情绪都撑不住了。你悄悄清空了主页，没有告别，也没有解释。就像一根蜡烛，烧到了尽头，只留下一缕青烟。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：燃尽退场",
    poem: "蜡炬成灰泪始干，悄然离场无留言。\n非是不爱是无力，青烟散尽各平安。"
  },
  "ending_2d_circle_elders": {
    id: "ending_2d_circle_elders",
    text: "【结局：圈内元老】\n你没有站队、没有霸凌，反而在几次风波里帮过小透明、劝过架。多年后，你成了大家口中的“老好人太太”，新人入圈都会来问你规矩。你没有爆红，但赢得了尊重。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：圈内元老",
    poem: "不站队来不霸凌，仗义执言留清名。\n新人入圈问规矩，元老未必最红人。"
  },
  "ending_2d_controversy_quit": {
    id: "ending_2d_controversy_quit",
    text: "【结局：争议退场】\n你发了长文道歉，把来龙去脉说清楚，然后销号退圈。有人骂你洗白，有人觉得你至少敢认。你不想再争了，只想回到没有热搜和挂人的日子。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：争议退场",
    poem: "长文道歉后销号，是非留与众人论。\n不争不辩归平淡，从此热搜是路人。"
  },
  "ending_2d_rebirth": {
    id: "ending_2d_rebirth",
    text: "【结局：转世重生】\n大号没了，你换了个小号重头再来。不蹭旧名、不提前世，就当新人。虽然从零开始很累，但至少还能写、还能画。同人女的灵魂，换一身皮也能活。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：转世重生",
    poem: "大号成灰小号生，不提前世不蹭名。\n从零开始虽辛苦，换皮犹可续前缘。"
  },
  "ending_3d_lifelong_fan": {
    id: "ending_3d_lifelong_fan",
    text: "【结局：一生推】\n你决定就这样一直喜欢下去。签售会去、专辑买、数据做，不越界、不辱追、不私生。你不求回报，只求TA越来越好。这份喜欢，你打算坚持一辈子。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：一生推",
    poem: "签售专辑与数据，不越雷池不辱追。\n但求正主步步高，一生推到底不悔。"
  },
  "ending_3d_frontline_retire": {
    id: "ending_3d_frontline_retire",
    text: "【结局：站姐体面收山】\n你曾经扛着大炮跑前线，出图修图一条龙。后来你发现身体和钱包都撑不住了，于是把设备出掉、把账号交给同好，体面收山。你从“站姐”变成了“偶尔买专的散粉”，但回忆里全是高光。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：站姐体面收山",
    poem: "曾扛大炮跑前线，今朝收山做散粉。\n设备出尽账号在，回忆满屏是青春。"
  }
};