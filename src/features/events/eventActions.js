import { fetchSampleData } from "../../app/api/mockApi";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
  LISTEN_TO_EVENTS_CHAT,
  UPDATE_EVENT,
} from "./eventConstants";

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
}

export function listenToEvents(events){
  return {
    type: FETCH_EVENT,
    payload: events

  }
}
export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(eventId) {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
}

export function loadEvents() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENT, payload: events });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToEventsChat(comments) {
  return {
    type: LISTEN_TO_EVENTS_CHAT,
    payload: comments
  }
}
