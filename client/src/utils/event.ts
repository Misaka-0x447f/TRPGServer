import {EventEmitter} from "events";

export enum EventType {
  menuButtonClick = "menuButtonClick",
}

export const EventManager = new EventEmitter();

export default EventManager;
