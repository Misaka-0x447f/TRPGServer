import {langEnum, state} from "@/utils/state";

export const dict = {
  zh: {
    // general
    launcherTitle: "TRPG Server Project Launcher",
    internalError: "内部错误。",
    internalErrorDetail: "程序发生内部错误。如果错误持续，请联系Misaka。",
    unknownRoute: "未知路由错误。将返回主选单。",
    nextStep: "下一步",
    // main menu
    characterEditor: "角色卡编辑器",
    viewOnlineGames: "搜索线上游戏",
    // side menu names
    editMenu: "编辑",
    aboutMenu: "关于",
    // global side menu text
    version: "TRPG Server Project (continuous delivery build)",
    about: "此程序正在开发中，尚未开始alpha测试。" +
      "\n目前多人游戏按钮不可用，只有属性编辑器能用。" +
      "" +
      "\n如遇问题，请回报给Misaka" +
      "\nTelegram: @Misaka_0x447f" +
      "\n447f.misaka@outlook.com",
    undoDeleteLine: "撤销 删除行",
    // editor
    editorSaveWarning: "保存数据将导致被标记为并非由内建生成器所生成。\n" +
      "建议使用生成器来生成您的人物。",
    identifier: "标识符",
    value: "值",
    text: "文本",
    propertyEditorContentEmpty: "属性编辑器中没有数据。按 Enter 添加一行数据。",
    propertyEditorContentEmptyWhileRO: "属性编辑器中没有数据。",
    propertyEditorIsReadOnly: "写保护",
    // NechronicaDataGen
    nechronicaDataGenTitle: "Nechronica数据生成向导",
    nechronicaDataGenDescription: "本向导将帮助您生成一名Nechronica角色。" +
      "本向导使用的规则来自这里的基础规则，但不包含扩充规则:",
    nechronicaDataGenGetCharacterName: "键入您的角色名称。如果想把这一步骤留到最后，请点击下一步。"
  }
};

export default function say(word: keyof typeof dict.zh) {
  if (!dict.zh.hasOwnProperty(word)) {
    // in some circumstance typescript type check does not works
    throw new Error(`unexpected i18n index: ${word}`);
  }
  return dict.zh[word];
}

export function isEastAsian() {
  return [langEnum.zh].includes(state.global.lang);
}
