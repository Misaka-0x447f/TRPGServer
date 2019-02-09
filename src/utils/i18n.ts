import { langEnum, state } from "@/utils/state";
import {EquipText, Socket} from "@/interfaces/Nechronica/Equips";

export const dict = {
  zh: {
    global: {
      // general
      launcherTitle: "TRPG Server Project Launcher",
      unknownRoute: "未知路由错误。将返回主选单。",
      prevStep: "上一步",
      nextStep: "下一步",
      // main menu
      characterEditor: "角色卡编辑器",
      viewOnlineGames: "搜索线上游戏",
      // global side menu text
      version: "TRPG Server Project (continuous delivery build)",
      about: "此程序正在开发中，尚未开始alpha测试。" +
        "\n目前多人游戏按钮不可用，只有属性编辑器能用。" +
        "\n" +
        "\n遇到问题或催更，请至github页面：github.com/Misaka-0x447f/TRPGServer",
      remainingPoints: "自由点数",
      noEquipAvailable: "无可用装备。",
      noSlotsAvailable: "无可用栏位。",
      unspecified: "未指定",
      invalid: "有其他一项或多项设定不正确。"
    },
    menuName: {
      // side menu names
      fileMenu: "文件",
      editMenu: "编辑",
      aboutMenu: "关于",
      viewMenu: "视图",
    },
    propertyEditor: {
      contentEmpty: "属性编辑器中没有数据。按 Enter 添加一行数据。",
      emptyWhileRO: "属性编辑器中没有数据。",
      isReadOnly: "写保护生效中",
      undoDeleteLine: "撤销 删除行",
      editorSaveWarning: "保存数据将导致被标记为并非由内建生成器所生成。\n" +
        "建议使用生成器来生成您的人物。",
      export: "导出...",
      fileOperateTips: "文件操作需要弹出窗口。如果安装了任何弹窗过滤器，请将此站点加入白名单。",
      identifier: "标识符",
      value: "数据",
      text: "描述文本",
      toggleIdentifier: "切换 标识符",
    },
    nechronica: {
      // NechronicaDataGen
      title: "Nechronica数据生成向导",
      desc: "本向导将帮助您生成一名Nechronica(永远的后日谈)角色。" +
        "本向导使用的规则来自这里的基础规则，但目前还不包含扩充规则。",
      desc2: "让我们先从设定角色基本信息开始。",
      Step2: "基本信息生成",
      characterName: "名字",
      characterAge: "年龄",
      characterDesc: "描述",
      SkipStep2: "我们已为该角色提供了随机名字和年龄。如果想把这里提到的信息留到向导结束时再填写，请直接点击下一步。" +
        "也可以在向导结束后随意添加更多角色描述。",
      remains: "CRC",
      remainsDesc: "CRC/循环冗余校验数据(即规则书中的'暗示')是角色在游戏中恢复记忆的指引，是角色被刻意擦除的记忆的残余数据。" +
        "如果有了这个，就能确认取回的数据是否为自身之记忆。详情请参照规则书。",
      preferBuiltInRemains: "这里也可以自定数据，但我们不推荐如此，除非你知道自己在做什么。" +
        "毕竟如果自定数据描述的范围过窄，反而会限制角色的可能性。",
      customRemains: "自定冗余数据",
      customRemainsDesc: "自定数据描述",
      cache: "永久缓存",
      cacheDesc: "永久缓存(即'记忆碎片')是角色记忆内容的碎片化，每名角色初始具备2份永久缓存。" +
        "请参考规则书在此随意填写。若还没有想好，可以留空。",
      builtInRemains: [
        {
          label: "wasted",
          title: "破局",
          desc: "最好还是不要回想起來的恶意、惨剧、背叛。可是为了了解现在的情況，除了这个之外，想不出別的..."
        },
        {
          label: "despair",
          title: "绝望",
          desc: "那可能是跟现在比起来，有过之而无不及的残酷日子。为了不要重蹈覆辙，有回想起来的必要..."
        },
        {
          label: "trapped",
          title: "陷阱",
          desc: "突然之间遇到了什么，使妳身陷地狱之中，毫不讲理的命运。可是如果就连那样的内容都想不起来的话，" +
            "不管报复还是克服都办不到。"
        },
        {
          label: "puppet",
          title: "人偶",
          desc: "你并非出自本愿而前进，只是单纯地被利用着。如果不晓得过去的情况，就连现在的脚步，到底出自谁的意志都无法确定。"
        },
        {
          label: "sinner",
          title: "罪人",
          desc: "妳渴望赎偿犯下的罪，那是不被任何人所原谅的罪孽。所以如果想不起来的话，无论赎罪还是逃避，都没有办法。"
        },
        {
          label: "lost",
          title: "丧失",
          desc: "妳曾经失去过什么，就连现在也还在持续丧失着。这并不是性命或者记忆，而是更为……更为重要的什么东西。"
        },
        {
          label: "aspire",
          title: "渴望",
          desc: "妳渴望着什么非得到不可的东西，可是妳却忘了。到底在追求着什么，妳恨不得马上回想起来。"
        },
        {
          label: "contrasting",
          title: "对立",
          desc: "现在的妳，与过去的妳，仿佛两个不同的个体。一定要回想起真实的自己，这样才能够变回原本的样子，或者与之分别。"
        },
        {
          label: "hope",
          title: "希望",
          desc: "明明知道了个很不得了的情报。那是对于死灵法师乃至这个世界，都相当致命的秘密。如果不把这个记忆取回来的话……"
        },
        {
          label: "blessed",
          title: "幸福",
          desc: "暖心的日常、有人爱着的喜悦还有美满的时光。那个幸福的日子，哪怕只存在于心中，也想要找回来。"
        }
      ],
      primaryFirmware: "主固件",
      secondaryFirmware: "从固件",
      firmwareDesc: "固件(即规则书中的'类型')决定了角色的战斗模式，也就是战斗中能够使用的技能。如果选择相同的固件，" +
        "就会失去第二固件的战斗模式，但能得到主固件的特化技能。最好不要和其他玩家有重复。固件是战斗时动作的表现，" +
        "因此和角色的外观、记忆没有关联。固件不可更改。",
      builtInFirmware: [
        {
          label: "Stacy",
          title: "活泼女孩",
          desc: "武装1/进化1。泛用型固件。仍然活动的身体。延续死亡的士兵。持续迈进的时候。特点是不死性，具备顽强的身体。"
        },
        {
          label: "Thanatos",
          title: "塔纳托斯",
          desc: "武装1/改造1。战斗型固件。持续不灭的战士，死亡破坏的化身。是杀戮剧的主角。特点是强战斗，即使没有武器依然威猛无比。"
        },
        {
          label: "Gothic",
          title: "恐怖异端",
          desc: "进化1/改造1。异端型固件。亡灵战士的天敌。对尸体特化战士。神智清醒的角色。特点是公认的异类，让其他亡灵战士感到恐惧的亡灵战士。"
        },
        {
          label: "Requiem",
          title: "镇魂杀手",
          desc: "武装1/武装1。射手型固件。操作枪械的娃娃。终结时的镇魂曲。失去魂魄的诗篇。特点是远射程，为了防守特化的存在，游击性能也相当优秀。"
        },
        {
          label: "Baroque",
          title: "繁华无序",
          desc: "进化1/进化1。进化型固件。身体扭曲的娃娃。持续进化的大师。意料之中的畸形。特点是极快反应，在各种速度方面。"
        },
        {
          label: "Romanesque",
          title: "罗马风采",
          desc: "改造1/改造1。机械型固件。精于跳舞的娃娃。无法停止的舞蹈。冥府的公主殿下。"
        }
      ],
      individuality: "个性",
      individualityDesc: "个性(规则书中的'倾向')是角色人格和气质的大致描述，决定角色在队伍中扮演着怎样的角色，" +
        "同时也会给予角色可以采取的行动。此项强烈不建议与其他玩家重复。除非团队变更，个性不可更改。",
      builtInIndividuality: [
        {
          label: "Alice",
          title: "爱丽丝",
          desc: "这世界上存在着，对于战斗总是不能适应的娃娃。不管经过多少年月的战斗，她的内心还是停留在那遥远过去的和平日子里。" +
            "不过这也就代表，那个孩子的内心自始至终都是一个人类。是牧师一样的人格，承担着净化心灵的任务。"
        },
        {
          label: "Holic",
          title: "魔女",
          desc: "所谓的自我，就是抱持着主观与欲望。有着想要到手的东西，那是力量？爱情？还是过去？" +
            "一的下一个是二，十个下一个是百，这些就是想要的清单。更多更多，完全不够，更多更多。" +
            "是游走在癫狂边缘的人格，疯狂也意味着能力提升。"
        },
        {
          label: "Automaton",
          title: "自动化",
          desc: "拥有着心灵却扼杀自己，成为战斗之中的一枚齿轮。娃娃就是娃娃、人偶就是人偶、死亡的身体有着相衬的死亡心灵。" +
            "活着的时候无法守护的东西，那么现在就来好好守护。是能够抑制疯狂的人格，是守序的娃娃。"
        },
        {
          label: "Junk",
          title: "废弃品",
          desc: "在放弃之中得到了力量，可是还不是完全放弃掉。这个身体已经没有什么好失去的，即使如此，" +
            "一定还有着不能失去的东西存在着。哪怕伤痕累累，依然永不退缩。是于死亡边缘或危险中求生的人格，是战争前线的适应者。"
        },
        {
          label: "Court",
          title: "幕僚",
          desc: "并非只有挥动武器才叫做力量，思考与知识也是力量的一部分。在这个荒废了的世界之中，虽然成了难以理解的东西......" +
            "不过那一定还是具有力量的存在。是谋士型的人格，有着战术部署的能力。"
        },
        {
          label: "Sorority",
          title: "班长",
          desc: "所谓的背负并非负担，而是一种坚强。就连这副死亡的躯体，也还是能够背起欲负之物。我们所做的一切都是有意义的，" +
            "只要我们不止步，前面就会有路。哪怕只剩下双腿，都要向前迈进。不要停下来啊！"
        }
      ],
      techLevel: "T",
      enhance: "强化",
      arms: "武装",
      evolve: "进化",
      modify: "改造",
      resource: "资源",
      resourceDesc: "资源是规则书中的宠爱点。资源点数初始为0。",
      equips: "部件",
      equipsDesc: "部件是具备特殊效果的装备。可以装备多少部件、装备何种部件取决于您的强化点数。" +
        "部件必须依赖于未损毁的身体部分来发挥作用。",
      techLevelDesc: "您的部件具有相应的科技等级。低科技等级的装备可以装备至相同或更高科技等级的栏位。" +
        "适合当前科技等级的部件的科技等级标识将被高亮且排序到列表前面。",
      builtInArms: [
        // TODO: arm lvl1
        {
          label: "fight",
          text: "格斗",
          desc: "脑内刻印的格斗技巧，虽然对上死者来说没有什么意义，不过身体却有着本能上的迅捷。",
          tech: 1,
        },
        {
          label: "spikedClub",
          text: "狼牙棒",
          desc: "待补完",
          tech: 1,
        },
        {
          label: "ironClub",
          text: "铁棒",
          desc: "待补完",
          tech: 1,
        },
        // TODO: arm lvl2
        {
          label: "bramble",
          text: "荆棘",
          desc: "带不玩",
          tech: 2,
        },
        {
          label: "armedBoot",
          text: "武装靴子",
          desc: "带暗器的靴子。",
          tech: 2,
        },
        {
          label: "push",
          text: "发力",
          desc: "隔山打牛。移动敌方。",
          tech: 2,
        },
        // TODO: arm lvl3
        {
          label: "serratedKnife",
          text: "锯齿刀",
          desc: "没描述",
          tech: 3,
        },
        {
          label: "weeder",
          text: "除草机",
          desc: "除草剂",
          tech: 3,
        },
        // {
        //   label: "samuraiSword",
        //   text: "武士刀",
        //   desc: "武士刀",
        //   tech: 3,
        // }
      ] as EquipText[],
      builtInEvolve: [
        // TODO: evolve lvl1
        {
          label: "regenerate",
          text: "再生",
          desc: "就是寄生虫那个，描述得改一下",
          tech: 1,
        },
        {
          label: "heart",
          text: "心脏",
          desc: "呼吸加速 AP++",
          tech: 1,
        },
        // TODO: evolve lvl2
        {
          label: "kemonomimi",
          text: "兽耳",
          desc: "ケモのミミ",
          tech: 2,
        },
        // TODO: evolve lvl3
        {
          label: "multiLegs",
          text: "多脚",
          desc: "脚部防护？",
          tech: 3,
        }
      ] as EquipText[],
      builtInModify: [
        // TODO: needs fill
        {
          label: "limiter",
          text: "限制器",
          desc: "不写了",
          tech: 1,
        },
        {
          label: "bomb",
          text: "爆弹",
          desc: "不想写",
          tech: 2,
        },
        {
          label: "enhancedHand",
          text: "钢铁手腕",
          desc: "???",
          tech: 3,
        }
      ] as EquipText[],
      builtInSocket: {
        [Socket.hand]: "手",
        [Socket.body]: "身",
        [Socket.head]: "头",
        [Socket.leg]: "腿"
      },
      collections: "宝物",
      collectionsDesc: "宝物是角色随身携带的物件，能够减轻角色的精神压力。选择初始宝物，或者自定义您的初始宝物。",
      customCollections: "自定宝物",
      customCollectionsDesc: "自定宝物描述",
      builtInCollections: [
        {
          label: "photo",
          title: "相片",
          desc: "还是人类时候的相片，是过去幸福所残缺的一角。或许上头映着的是妳的生前也不一定。"
        },
        {
          label: "book",
          title: "书",
          desc: "又脏又破的古老书本，是妳读过无数次的一本书。现在写在上头的，只是失去意义的一团文字。"
        },
        {
          label: "undead",
          title: "小小的活死物",
          desc: "为什么会造出这样的东西呢？这是活死物当中极其罕见的乌鸦、小猫咪或老鼠之类的小动物。至少比较不会那么无聊啦。"
        },
        {
          label: "destroyedPart",
          title: "损坏的部件",
          desc: "依恋对象的一部分，或者是过去自己的一部分。紧紧抱着已经没有功能的身体部份，看起来会比较像人类吗？"
        },
        {
          label: "mirror",
          title: "手镜",
          desc: "小小的手镜。从以前就一直谨慎小心使用的镜子。尽管讨厌照出来的自己，重要的是这个镜子以前所映照的东西。"
        },
        {
          label: "puppet",
          title: "人偶",
          desc: "可怜可爱的人偶。与现在的妳比起来，哪一边才是坏掉的人偶呢？"
        },
        {
          label: "doll",
          title: "布娃娃",
          desc: "可爱的布偶。可是在经历过长久的战乱之后，这个布偶已经……"
        },
        {
          label: "jewelry",
          title: "饰品",
          desc: "戒指或者首饰之类的东西，闪闪发亮的漂亮饰品。或者对妳而言，是个无可取代的护身符……"
        },
        {
          label: "basket",
          title: "篮子",
          desc: "妳在荒野见到，感觉对上的，装满破铜烂铁的篮子。至于里面想要放些什么……妳也不知道。"
        },
        {
          label: "dress",
          title: "服饰",
          desc: "哪怕身体变得不再像是自己，这件服装编织出来的可爱永远不变。就连穿着的妳，都能获得那颗永远不变的心。"
        }
      ],
      defaultLocation: "默认位置",
      defaultLocationDesc: "默认位置是你在一场战斗开始时的站位。随时可变更。",
      location: [
        {
          label: "0",
          title: "奈落",
        },
        {
          label: "1",
          title: "地狱",
        },
        {
          label: "2",
        title: "炼狱",
        },
        {
          label: "3",
          title: "花园"
        },
        {
          label: "4",
          title: "乐园"
        }
      ],
      lastStep: "你正在成功！这是向导最后一步。你的部分装备或宝物需要指定装备位置。",
      collectionsSocket: "宝物插槽",
      equipsSocket: "装备插槽",
      wizardDone: "全部完成！你可以在文件选单中找到保存选项，将你刚刚创建的角色保存到文件。" +
        "之后，就请期待联机游戏中你的角色的表现吧！",
      finishTip: "除此以外，有部分信息可能随游戏本身、队伍或GM变化，例如经验宝珠或依恋，" +
        "因此它们不会被要求在此向导中填写。它们可以在联机游戏开始时被完善。",
      saveTip: "接下来，请点击右上角的 文件->保存 来保存你的人物。请注意，目前版本的向导还不支持加载数据，因此请确保你已完成所有操作。"
    }
  }
};

export function say(subItem: string, word: string) {
  // Disabled typescript type check; Do custom runtime check.
  if (!dict.zh.hasOwnProperty(subItem) || !(dict.zh as any)[subItem].hasOwnProperty(word)) {
    throw new Error(`unexpected i18n index: ${subItem}/${word}`);
  }
  return (dict.zh as any)[subItem][word];
}

export function isEastAsian() {
  return [langEnum.zh].includes(state.global.lang);
}
