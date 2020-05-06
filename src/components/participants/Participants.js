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

  return (
    !loading && (
      <div className="container">
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
        <h1 className="text-center my-1">Participants</h1>

        <div className="card-container">
          {participants.map((p) => (
            <ParticipantCard key={p._id} participant={p} />
          ))}
        </div>
      </div>
    )
  );
};

export default Participants;
