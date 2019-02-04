import { langEnum, state } from "@/utils/state";

export const ns = "nechronica";

export const dict = {
  zh: {
    global: {
      // general
      launcherTitle: "TRPG Server Project Launcher",
      internalError: "内部错误。",
      internalErrorDetail: "程序发生内部错误。如果错误持续，请联系Misaka。",
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
      remainingPoints: "自由点数"
    },
    menuName: {
      // side menu names
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
      identifier: "标识符",
      value: "数据",
      text: "描述文本",
      toggleIdentifier: "切换 标识符",
    },
    nechronica: {
      // NechronicaDataGen
      title: "Nechronica数据生成向导",
      desc: "本向导将帮助您生成一名Nechronica(永远的后日谈)角色。" +
        "本向导使用的规则来自这里的基础规则，但不包含扩充规则:",
      Step2: "基本信息生成",
      characterName: "角色名",
      characterAge: "年龄",
      characterDesc: "角色描述",
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
          label: "01",
          title: "破局",
          desc: "最好还是不要回想起來的恶意、惨剧、背叛。可是为了了解现在的情況，除了这个之外，想不出別的..."
        },
        {
          label: "02",
          title: "绝望",
          desc: "那可能是跟现在比起来，有过之而无不及的残酷日子。为了不要重蹈覆辙，有回想起来的必要..."
        },
        {
          label: "03",
          title: "陷阱",
          desc: "突然之间遇到了什么，使妳身陷地狱之中，毫不讲理的命运。可是如果就连那样的内容都想不起来的话，" +
            "不管报复还是克服都办不到。"
        },
        {
          label: "04",
          title: "人偶",
          desc: "你并非出自本愿而前进，只是单纯地被利用着。如果不晓得过去的情况，就连现在的脚步，到底出自谁的意志都无法确定。"
        }
        // TODO: fill up
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
          desc: "武装1/异变1。泛用型固件。仍然活动的身体。延续死亡的士兵。持续迈进的时候。特点是不死性，具备顽强的身体。"
        },
        {
          label: "Thanatos",
          title: "塔纳托斯",
          desc: "武装1/改造1。战斗型固件。持续不灭的战士，死亡破坏的化身。是杀戮剧的主角。特点是强战斗，即使没有武器依然威猛无比。"
        },
        {
          label: "Gothic",
          title: "恐怖异端",
          desc: "变异1/改造1。异端型固件。亡灵战士的天敌。对尸体特化战士。神智清醒的角色。特点是公认的异类，让其他亡灵战士感到恐惧的亡灵战士。"
        },
        {
          label: "Requiem",
          title: "镇魂杀手",
          desc: "武装1/武装1。射手型固件。操作枪械的娃娃。终结时的镇魂曲。失去魂魄的诗篇。特点是远射程，为了防守特化的存在，游击性能也相当优秀。"
        },
        {
          label: "Baroque",
          title: "繁华无序",
          desc: "变异1/变异1。变异型固件。身体扭曲的娃娃。持续进化的大师。意料之中的畸形。特点是极快反应，在各种速度方面。"
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
          desc: "所谓的背负并非负担，而是一种坚强。就连这副死亡的躯体，也还是能够背起欲负之物。只要撑得起来，" +
            "哪怕只剩下双腿，都要向前迈进。是停不下来的领路人型人格。"
        }
      ],
      arms: "武装",
      evolve: "进化",
      modify: "改造",
      enhance: "强化",
      resource: "资源",
      resourceDesc: "资源是规则书中的宠爱点。资源点数初始为0。",
      builtInArms: [
        // TODO: arm lvl1
        {
          label: "fight",
          text: "格斗",
          desc: "脑内刻印的格斗技巧，虽然对上死者来说没有什么意义，不过身体却有着本能上的迅捷。"
        },
        {
          label: "spikedClub",
          text: "狼牙棒",
          desc: "待补完"
        },
        {
          label: "ironClub",
          text: "铁棒",
          desc: "待补完"
        },
        // TODO: arm lvl2
        {
          label: "bramble",
          text: "荆棘",
          desc: "带不玩"
        },
        {
          label: "armedBoot",
          text: "武装靴子",
          desc: "带暗器的靴子。"
        },
        {
          label: "push",
          text: "发力",
          desc: "隔山打牛。移动敌方。"
        },
        // TODO: arm lvl3
        {
          label: "serratedKnife",
          text: "锯齿刀",
          desc: "没描述"
        },
        {
          label: "weeder",
          text: "除草机",
          desc: "除草剂"
        },
        {
          label: "samuraiSword",
          text: "武士刀",
          desc: "武士刀"
        }
      ],
      builtInEvolve: [
        // TODO: evolve lvl1
        {
          label: "regenerate",
          text: "再生",
          desc: "就是寄生虫那个，描述得改一下"
        },
        {
          label: "heart",
          text: "心脏",
          desc: "呼吸加速 AP++"
        },
        // TODO: evolve lvl2
        {
          label: "kemonomimi",
          text: "兽耳",
          desc: "ケモのミミ"
        },
        // TODO: evolve lvl3
        {
          label: "multiLegs",
          text: "多脚",
          desc: "脚部防护？"
        }
      ],
      builtInModify: [
        // TODO: needs fill
        {
          label: "limiter",
          text: "限制器",
          desc: "不写了"
        },
        {
          label: "bomb",
          text: "爆弹",
          desc: "不想写"
        },
        {
          label: "enhancedHand",
          text: "钢铁手腕",
          desc: "???"
        }
      ]
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
