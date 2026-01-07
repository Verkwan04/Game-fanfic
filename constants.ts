import { Attributes, GameEvent } from "./types";

export const INITIAL_STATS: Attributes = {
  creativity: 50,
  legal: 50,
  eq: 50,
  popularity: 10,
  stress: 20,
  money: 500
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
        nextEventId: "first_feedback",
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
        nextEventId: "commercial_thought",
        effects: { eq: 10, popularity: 5 }
      },
      {
        text: "挂他！怼回去！“笔给你你来写？”",
        nextEventId: "drama_check",
        effects: { eq: -10, stress: 10, popularity: 10 } 
      },
      {
        text: "无视，删评。",
        nextEventId: "commercial_thought",
        effects: { stress: -5 }
      }
    ]
  },
  
  "ao3_feedback": {
    id: "ao3_feedback",
    text: "在AO3上，你的车收获了大量的“Kudos”。但是有人把你的文搬运到了国内微博，并艾特了网警举报。",
    choices: [
      {
        text: "立刻滑跪道歉，删文锁号。",
        nextEventId: "commercial_thought",
        effects: { stress: 20, popularity: -10 }
      },
      {
        text: "装死，反正我是海外IP。",
        nextEventId: "police_risk_check",
        effects: { legal: -5 }
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
        nextEventId: "ending_police_1", 
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
        nextEventId: "commercial_thought",
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

  // --- COMMERCIALIZATION ---
  "commercial_thought": {
    id: "commercial_thought",
    text: "随着作品越来越多，粉丝都在喊：“大大出本吗？想要《XXX》的实体书！”你看着自己干瘪的钱包，心动了。",
    choices: [
      {
        text: "出！印个500本，回馈粉丝。",
        nextEventId: "selling_books",
        effects: { money: -100, stress: 10 } 
      },
      {
        text: "不了，国内出本风险太大，搞点无料（免费周边）吧。",
        nextEventId: "free_merch",
        effects: { money: -50, popularity: 10, legal: 10 }
      },
      {
        text: "尝试约稿赚钱/接广告。",
        nextEventId: "freelance_path",
        effects: { money: 50, creativity: -5 }
      }
    ]
  },

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
        text: "参加漫展场贩。",
        nextEventId: "sales_outcome",
        effects: { money: 300, popularity: 10 }
      }
    ]
  },
  
  "sales_outcome": {
    id: "sales_outcome",
    text: "销量还不错，你赚了一笔钱。但是，有人举报你“非法出版”。",
    choices: [
      {
        text: "我只是少量印刷交流...",
        nextEventId: "jail_check",
        effects: {}
      }
    ]
  },
  
  "jail_check": {
    id: "jail_check",
    text: "警方注意到了你的交易流水。",
    choices: [
      {
        text: "查看结果",
        nextEventId: "ending_jail_sales",
        effects: {}
      }
    ]
  },

  "free_merch": {
    id: "free_merch",
    text: "你寄出了很多无料，大家都很开心，你的口碑极好。",
    choices: [
      {
        text: "这就是同人的初心啊。",
        nextEventId: "future_path",
        effects: { stress: -10 }
      }
    ]
  },

  "freelance_path": {
    id: "freelance_path",
    text: "你开始接稿。但甲方的要求极其奇葩，磨灭了你的爱。",
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

  // --- END GAME PATHS ---
  "future_path": {
    id: "future_path",
    text: "经历了一系列风波，你站在人生的岔路口。",
    choices: [
      {
        text: "尝试转型原创，当职业作家。",
        nextEventId: "original_attempt",
        effects: {}
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

  "original_attempt": {
    id: "original_attempt",
    text: "你发布了第一部原创小说。",
    choices: [
      {
        text: "查看数据",
        nextEventId: "ending_original_check", 
        effects: {}
      }
    ]
  },

  // --- ENDINGS ---
  "ending_police_1": {
    id: "ending_police_1",
    text: "【结局：请喝茶】\n因为多次发布违规内容或被恶意举报，你被辖区派出所传唤。虽然只是批评教育，但你在三次元社死了，父母也没收了你的电脑。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：请喝茶"
  },
  "ending_jail_sales": {
    id: "ending_jail_sales",
    text: "【结局：非法经营】\n你的本子销售额超过了立案标准。因为缺乏出版刊号，你因涉嫌“非法经营罪”被刑事拘留。铁窗泪。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：铁窗泪"
  },
  "ending_quit": {
    id: "ending_quit",
    text: "【结局：退圈保平安】\n圈子里的乌烟瘴气让你窒息。你注销了所有账号，从此只做一个现充。虽然清净了，但心里总觉得空落落的。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：退圈"
  },
  "ending_slave": {
    id: "ending_slave",
    text: "【结局：社畜】\n因为同人赚不到钱，或者因为接稿耗尽了灵气，你最终入职了一家互联网公司，每天996。你再也没有时间提笔写字。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：普通社畜"
  },
  "ending_normal": {
    id: "ending_normal",
    text: "【结局：现充的快乐】\n你找了一份普通工作，偶尔在周末写写清水文。虽然不火，但有一群固定的读者。这或许是最好的平衡。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：平淡是真"
  },
  "ending_success": {
    id: "ending_success",
    text: "【结局：大神之路】\n你的原创作品一炮而红！多年积累的笔力让你在商业写作中如鱼得水。你签了影视版权，实现了财富自由。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：大神作家"
  },
  "ending_fail_original": {
    id: "ending_fail_original",
    text: "【结局：扑街】\n脱离了同人滤镜，你的原创作品无人问津。数据惨淡，你不得不回去找工作。",
    choices: [],
    isEnding: true,
    endingTitle: "结局：转型失败"
  }
};