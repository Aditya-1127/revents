import { CLEAR_COMMENTS, CREATE_EVENT, DELETE_EVENT, FETCH_EVENT, LISTEN_TO_EVENTS_CHAT, UPDATE_EVENT } from "./eventConstants";

const initialState = {
  events: [],
  comments: []
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload)],
      };
      case FETCH_EVENT:
        return{
          ...state,
          events: payload
        }
        case LISTEN_TO_EVENTS_CHAT:
          return {
            ...state,
            comments: payload
          }
          case CLEAR_COMMENTS:
            return{
              ...state,
              comments: []
            }
    default:
      return state;
  }
}
