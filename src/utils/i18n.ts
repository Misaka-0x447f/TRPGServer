import {langEnum, state} from "@/utils/state";

export const dict = {
  zh: {
    // general
    launcherTitle: "TRPG Server Project Launcher",
    internalError: "内部错误。",
    internalErrorDetail: "程序发生内部错误。如果错误持续，请联系Misaka。",
    unknownRoute: "未知路由错误。将返回主选单。",
    // main menu
    characterEditor: "角色卡编辑器",
    viewOnlineGames: "搜索线上游戏",
    // side menu
    fileMenu: "文件",
    newFile: "新建",
    openFile: "打开",
    saveFile: "保存",
    closeFile: "关闭",
    exit: "退出",
    viewMenu: "视图",
    aboutMenu: "关于",
    version: "TRPG Server Project (development build)",
    about: "如遇问题，请回报给Misaka\nTelegram: @Misaka_0x447f\n447f.misaka@outlook.com",
    // editor
    editorSaveWarning: "保存数据将导致被标记为并非由内建生成器所生成。\n" +
      "建议使用生成器来生成您的人物。",
    identifier: "标识符",
    value: "值",
    text: "文本",
    propertyEditorContentEmpty: "属性查看器中没有数据。"
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
