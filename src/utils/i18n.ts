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
    unknownRoute: "出现错误！访问的内存地址未经授权。将返回主选单。",

    fileMenu: "文件",
    viewMenu: "视图",
    templateMenu: "模板",
      currentTemplate: "当前模板:",
        nechronica: "后日谈",
      changeTemplate: "更改模板",
    aboutMenu: "关于",
      version: "TRPG Server Project (development build)",
      about: "如遇问题，请回报给Misaka\nTelegram: @Misaka_0x447f"
  }
};

export default function say(word: keyof typeof dict.zh) {
  return dict.zh[word];
}

export type lang = "zh-CN";
