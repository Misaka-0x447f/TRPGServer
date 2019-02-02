import {langEnum, state} from "@/utils/state";

export const dict = {
  zh: {
    global: {
      // general
      launcherTitle: "TRPG Server Project Launcher",
      internalError: "内部错误。",
      internalErrorDetail: "程序发生内部错误。如果错误持续，请联系Misaka。",
      unknownRoute: "未知路由错误。将返回主选单。",
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
      undoDeleteLine: "撤销 删除行",
      // editor
      editorSaveWarning: "保存数据将导致被标记为并非由内建生成器所生成。\n" +
        "建议使用生成器来生成您的人物。",
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
        "也可以在向导结束后随意添加更多角色描述。"
    }
  }
};

export function say(subItem: string, word: string) {
  // Disabled typescript type check; Do custom runtime check.
  if (!dict.zh.hasOwnProperty(subItem) || !(dict.zh as any)[subItem].hasOwnProperty(word)) {
    throw new Error(`unexpected i18n index: ${subItem}/${word}`);
  }
  return (dict.zh as any)[subItem][word] as string;
}

export function isEastAsian() {
  return [langEnum.zh].includes(state.global.lang);
}
