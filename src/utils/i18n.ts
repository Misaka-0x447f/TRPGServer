import {state, langEnum} from "@/utils/state";

export const dict = {
  zh: {
    dashboard: "Dashboard",
    of: "of",
    projectName: "TRPG Server Project",
    internalError: "内部错误。",
    internalErrorDetail: "程序发生内部错误。如果错误持续，请联系Misaka。",

    createCharacter: "创建角色",
    importCharacter: "导入角色",
    characterEditor: "角色卡编辑器",
    viewOnlineGames: "搜索线上游戏",
    unknownRoute: "未知路由错误。将返回主选单。",

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
  }
};

export default function say(word: keyof typeof dict.zh) {
  return dict.zh[word];
}

export function isEastAsian() {
  return [langEnum.zh].includes(state.global.lang);
}
