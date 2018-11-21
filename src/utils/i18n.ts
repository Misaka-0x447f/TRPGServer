const dict = {
  zh: {
    dashboard: "Dashboard",
    of: "of",
    projectName: "TRPG Server Project",
    misaka: "Misaka is here to help.",
    createCharacter: "创建角色",
    importCharacter: "导入角色",
    characterEditor: "角色卡编辑器",
    viewOnlineGames: "搜索线上游戏"
  }
};

export default function say(word: keyof typeof dict.zh) {
  return dict.zh[word];
}
