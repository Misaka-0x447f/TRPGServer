import {langEnum, state} from "@/utils/state";

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
    },
    menuName: {
      // side menu names
      editMenu: "编辑",
      aboutMenu: "关于",
    },
    propertyEditor: {
      contentEmpty: "属性编辑器中没有数据。按 Enter 添加一行数据。",
      emptyWhileRO: "属性编辑器中没有数据。",
      isReadOnly: "写保护生效中",
      undoDeleteLine: "撤销 删除行",
      editorSaveWarning: "保存数据将导致被标记为并非由内建生成器所生成。\n" +
        "建议使用生成器来生成您的人物。",
      identifier: "标识符",
      value: "值",
      text: "文本",
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
      arch: "架构",
      archDesc: "架构(即规则书中的'暗示')是角色在游戏中恢复记忆的依据，是角色被刻意擦除的记忆的指引。详情请参照规则书。",
      preferBuiltInArch: "这里也可以自定架构，但我们不推荐如此，除非你知道自己在做什么。" +
        "毕竟如果自定架构的范围过窄，反而会限制角色的可能性。",
      customArch: "自定义架构",
      customArchDesc: "自定义架构描述",
      cache: "永久缓存",
      cacheDesc: "永久缓存(即'记忆碎片')是角色记忆内容的碎片化，每名角色初始具备2份永久缓存。" +
        "请参考规则书在此随意填写。若还没有想好，可以留空。",
      builtInArch: [
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
