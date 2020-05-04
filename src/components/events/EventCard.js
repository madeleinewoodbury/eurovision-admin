import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="card">
      <Link to={`/events/${event._id}`} className="img-link">
        <img src={event.logo} alt={`${event.year} logo`} className="square" />
        <span>
          {event.city} {event.year}
        </span>
      </Link>
    </div>
  );
};

export default EventCard;
