import React, { useReducer } from 'react'
import axios from 'axios'
import EscContext from './escContext'
import EscReducer from './escReducer'
import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_EVENTS,
  GET_EVENT,
  GET_PARTICIPANTS,
  GET_PARTICIPANT,
  SET_MESSAGE,
  SET_ERROR,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  CLEAR_ESC,
} from '../types'

// const api = 'http://localhost:5000/api/v1';
const api = 'https://eurovision-song-contest-api.herokuapp.com/api/v1'
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.token}`,
  },
}

const authConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
}

const EscState = (props) => {
  const initialState = {
    countries: [],
    country: null,
    events: [],
    event: null,
    participants: [],
    participant: null,
    loading: true,
    error: null,
    message: null,
  }

  const [state, dispatch] = useReducer(EscReducer, initialState)

  // Get all countries
  const getCountries = async () => {
    clearEsc()
    try {
      const res = await axios.get(`${api}/countries`)
      dispatch({
        type: GET_COUNTRIES,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong trying to retrive countries',
      })
    }
  }

  // Get country by id
  const getCountry = async (id) => {
    try {
      const res = await axios.get(`${api}/countries/${id}?sort=name`)
      dispatch({
        type: GET_COUNTRY,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not get country',
      })
    }
  }

  // Add a new country
  const addCountry = async (formData) => {
    try {
      const res = await axios.post(`${api}/countries`, formData, config)
      dispatch({
        type: SET_MESSAGE,
        payload: `${res.data.data.name} has been added`,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not add country',
      })
    }
  }

  // Edit country
  const editCountry = async (id, formData) => {
    try {
      const res = await axios.put(`${api}/countries/${id}`, formData, config)
      dispatch({
        type: SET_MESSAGE,
        payload: `${res.data.data.name} has been updated`,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not edit country',
      })
    }
  }

  // Delete country
  const deleteCountry = async (id) => {
    try {
      await axios.delete(`${api}/countries/${id}`, authConfig)

      dispatch({
        type: SET_MESSAGE,
        payload: 'Country deleted',
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not delete country',
      })
    }
  }

  // Get all events
  const getEvents = async () => {
    clearEsc()

    try {
      const res = await axios.get(`${api}/events?sort=year`)
      dispatch({
        type: GET_EVENTS,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong trying to retrieve events',
      })
    }
  }

  // Get event by id
  const getEvent = async (id) => {
    try {
      const res = await axios.get(`${api}/events/${id}`)
      dispatch({
        type: GET_EVENT,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not get event',
      })
    }
  }

  // Get events by country id
  const getEventsByCountry = async (id, sort) => {
    try {
      const res = await axios.get(`${api}/countries/${id}/events?sort=${sort}`)
      dispatch({
        type: GET_EVENTS,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong trying to retrieve events',
      })
    }
  }

  // Add a new event
  const addEvent = async (formData) => {
    try {
      const res = await axios.post(`${api}/events`, formData, config)
      dispatch({
        type: SET_MESSAGE,
        payload: `${res.data.data.year} event has been added`,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not add event',
      })
    }
  }

  // Edit event
  const editEvent = async (id, formData) => {
    try {
      const res = await axios.put(`${api}/events/${id}`, formData, config)
      dispatch({
        type: SET_MESSAGE,
        payload: `${res.data.data.year} event has been updated`,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not edit event',
      })
    }
  }

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${api}/events/${id}`, authConfig)

      dispatch({
        type: SET_MESSAGE,
        payload: 'Event deleted',
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not delete event',
      })
    }
  }

  // Get all participants
  const getParticipants = async () => {
    clearEsc()

    try {
      const res = await axios.get(`${api}/participants`)
      dispatch({
        type: GET_PARTICIPANTS,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong trying to retrieve participants',
      })
    }
  }

  // Get all participants by artist
  const getParticipantsByArtist = async (artist) => {
    try {
      const res = await axios.get(`${api}/participants?artist=${artist}`)

      dispatch({
        type: GET_PARTICIPANTS,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong trying to retrieve participants',
      })
    }
  }

  // Get participant by id
  const getParticipant = async (id) => {
    clearEsc()
    try {
      const res = await axios.get(`${api}/participants/${id}`)
      dispatch({
        type: GET_PARTICIPANT,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not get participant',
      })
    }
  }

  // Get participants by country id
  const getParticipantsByCountry = async (id, sort) => {
    try {
      const res = await axios.get(
        `${api}/countries/${id}/participants?sort=${sort}`
      )
      dispatch({
        type: GET_PARTICIPANTS,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong trying to retrieve participants',
      })
    }
  }

  // Get participants by event id
  const getParticipantsByEvent = async (id, sort) => {
    try {
      const res = await axios.get(
        `${api}/events/${id}/participants?sort=${sort}`
      )
      dispatch({
        type: GET_PARTICIPANTS,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Something went wrong trying to retrieve participants',
      })
    }
  }

  // Add a new particopant
  const addParticipant = async (formData) => {
    try {
      const res = await axios.post(`${api}/participants`, formData, config)
      dispatch({
        type: SET_MESSAGE,
        payload: `${res.data.data.artist} has been added`,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not add participant',
      })
    }
  }

  // Edit participant
  const editParticipant = async (id, formData) => {
    try {
      const res = await axios.put(`${api}/participants/${id}`, formData, config)
      dispatch({
        type: SET_MESSAGE,
        payload: `${res.data.data.artist} has been updated`,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not edit participant',
      })
    }
  }

  // Delete participant
  const deleteParticipant = async (id) => {
    try {
      await axios.delete(`${api}/participants/${id}`, authConfig)

      dispatch({
        type: SET_MESSAGE,
        payload: 'Participant deleted',
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not delete participant',
      })
    }
  }

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  // Clear errors
  const clearMessage = () => dispatch({ type: CLEAR_MESSAGE })

  // Clear all
  const clearEsc = () => dispatch({ type: CLEAR_ESC })

  return (
    <EscContext.Provider
      value={{
        countries: state.countries,
        country: state.country,
        events: state.events,
        event: state.event,
        participants: state.participants,
        participant: state.participant,
        loading: state.loading,
        error: state.error,
        message: state.message,
        getCountries,
        getCountry,
        addCountry,
        editCountry,
        deleteCountry,
        getEvents,
        getEvent,
        getEventsByCountry,
        addEvent,
        editEvent,
        deleteEvent,
        getParticipants,
        getParticipant,
        getParticipantsByArtist,
        getParticipantsByCountry,
        getParticipantsByEvent,
        addParticipant,
        editParticipant,
        deleteParticipant,
        clearErrors,
        clearMessage,
      }}
    >
      {props.children}
    </EscContext.Provider>
  )
}

export default EscState
