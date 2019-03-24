import {EventEmitter} from "events";

export enum ev {
  menuButtonClick = "menuButtonClick",
}

export const ec = new EventEmitter(); // ec stands for event center

export default ec;
