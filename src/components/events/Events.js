import React, { useEffect, useContext } from 'react';
import EscContext from '../../context/esc/escContext';
import EventCard from './EventCard';

const Events = () => {
  const escContext = useContext(EscContext);
  const { getEvents, loading, events } = escContext;

  useEffect(() => {
    getEvents();

    // eslint-disable-next-line
  }, []);
  return (
    !loading && (
      <div className="container">
        <h1 className="text-center my-1">Events</h1>
        <div className="card-container">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    )
  );
};

export default Events;
