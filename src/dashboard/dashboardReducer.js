import {
  MESSAGE_ADD
} from './constants';

const initialState = {
  messages: new Set()
};

const dashboardReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case MESSAGE_ADD:
      const messages = new Set(previousState.messages);
      messages.add(action.message);      
      return { messages };
    default:
      return previousState;
  }
}

export default dashboardReducer;