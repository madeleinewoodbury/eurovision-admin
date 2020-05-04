import { GET_COUNTRIES, SET_ERROR, CLEAR_ERRORS } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
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
