import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_EVENTS,
  GET_EVENT,
  GET_PARTICIPANTS,
  GET_PARTICIPANT,
  SET_ERROR,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
        loading: false,
      };
    case GET_COUNTRY:
      return {
        ...state,
        country: payload,
        loading: false,
      };
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
      };
    case GET_PARTICIPANTS:
      return {
        ...state,
        participants: payload,
        loading: false,
      };
    case GET_PARTICIPANT:
      return {
        ...state,
        participant: payload,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
