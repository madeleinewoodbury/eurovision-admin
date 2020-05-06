import React from 'react';
import { Link } from 'react-router-dom';

const ParticipantCard = ({ participant }) => {
  return (
    <div className="card participant-card">
      <Link to={`/participants/${participant._id}`} className="img-link">
        <img src={participant.image} alt={`${participant.artist} profile`} />
        {/* <span>{participant.artist}</span> */}
        <div>
          <img
            src={`https://www.countryflags.io/${participant.country.code}/flat/16.png`}
            alt={`${participant.country.name} flag`}
          />
          <span>{participant.artist}</span>
        </div>
      </Link>
    </div>
  );
};

export default ParticipantCard;
