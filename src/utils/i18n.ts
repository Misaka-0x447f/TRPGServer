const dict = {
  zh: {
    dashboard: "Dashboard",
    of: "of",
    projectName: "TRPG Server Project",
    misaka: "Misaka is here to help.",
    createCharacter: "创建角色",
    importCharacter: "导入角色",
    characterEditor: "角色卡编辑器",
    viewOnlineGames: "搜索线上游戏",
    unknownRoute: "出现错误！访问的内存地址未经授权。将返回主选单。",
    fileMenu: "文件",
    viewMenu: "视图",
  }
};

export default function say(word: keyof typeof dict.zh) {
  if (!dict.zh.hasOwnProperty(word)) {
    // in some circumstance typescript type check does not works
    throw new Error("requested translate does not exist.");
  }
  return dict.zh[word];
}

export type lang = "zh-CN" | "en-US";
