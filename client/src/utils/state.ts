export enum langEnum {
  zh = "zh-CN"
}

class FiniteStateManager {
  public global: {
    lang: langEnum
  } = {
    lang: langEnum.zh
  };

  public editor = {
    storage: {
      definition: [] as object[]
    }
  };

  // public update(namespace: keyof this, value: object) {
  //   console.log(`updating ${namespace} <<<<< state`);
  //   console.log(this[namespace]);
  //   console.log(`===== input`);
  //   console.log(value);
  //   console.log(`>>>>> output`);
  //   assign(this[namespace], value);
  //   console.log(this[namespace]);
  // }
}

export const state = new FiniteStateManager();

export default state;
