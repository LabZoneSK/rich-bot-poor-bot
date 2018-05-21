import {
  MESSAGE_ADD
} from './constants';

export function addMessage(messageJSX) {
  return {
    type: MESSAGE_ADD,
    message: messageJSX
  };
}
