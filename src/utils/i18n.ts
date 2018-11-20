const dict = {
  zh: {
    intro: "Misaka is here to help.",
    createCharacter: "创建角色",
    importCharacter: "导入角色"
  }
};

export default function say(word: keyof typeof dict.zh) {
  return dict.zh[word];
}
