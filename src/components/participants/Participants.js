import React, { useEffect, useContext, useState } from 'react';
import EscContext from '../../context/esc/escContext';
import ParticipantCard from './ParticipantCard';

const Participants = () => {
  const escContext = useContext(EscContext);
  const {
    getEvents,
    loading,
    events,
    getParticipantsByEvent,
    participants,
  } = escContext;
  const [eventYear, setEventYear] = useState('');

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setEventYear(e.target.value);
    getParticipantsByEvent(e.target.value, 'artist');
  };

  const getParticipantCards = (e) => {
    const cards = participants.map((p) => (
      <ParticipantCard key={p._id} participant={p} />
    ));

    if (eventYear === '') {
      return (
        <p className="text-center lead">
          Please select a year to view participants
        </p>
      );
    }
    return <div className="card-container">{cards}</div>;
  };

  return (
    !loading && (
      <div className="container">
        <h1 className="text-center my-1">Participants</h1>
        {events && (
          <div className="year-form">
            <select name="eventYear" value={eventYear} onChange={handleChange}>
              <option value="0">* Select a year</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.year}
                </option>
              ))}
            </select>
          </div>
        )}
        {getParticipantCards()}
      </div>
    )
  );
};

export default Participants;
