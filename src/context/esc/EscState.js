import React, { useReducer } from 'react';
import axios from 'axios';
import EscContext from './escContext';
import EscReducer from './escReducer';
import { GET_COUNTRIES, GET_EVENTS, SET_ERROR, CLEAR_ERRORS } from '../types';

const api = 'http://localhost:5000/api/v1';

const EscState = (props) => {
  const initialState = {
    countries: [],
    events: [],
    participants: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(EscReducer, initialState);

  // Get all countries
  const getCountries = async () => {
    try {
      const res = await axios.get(`${api}/countries`);
      dispatch({
        type: GET_COUNTRIES,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong',
      });
    }
  };

  // Get all events
  const getEvents = async () => {
    try {
      const res = await axios.get(`${api}/events`);
      dispatch({
        type: GET_EVENTS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong',
      });
    }
  };

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <EscContext.Provider
      value={{
        countries: state.countries,
        events: state.events,
        loading: state.loading,
        error: state.error,
        getCountries,
        getEvents,
        clearErrors,
      }}
    >
      {props.children}
    </EscContext.Provider>
  );
};

export default EscState;
