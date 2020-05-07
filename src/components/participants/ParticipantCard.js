import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../../img/placeholder.jpg';

const ParticipantCard = ({ participant }) => {
  const getImage = () => {
    if (participant.country.altIcon) return participant.country.altIcon;
    else
      return `https://www.countryflags.io/${participant.country.code}/flat/16.png`;
  };
  return (
    <div className="card participant-card">
      <Link to={`/participants/${participant._id}`} className="img-link">
        <img
          src={participant.image}
          onError={(e) => (e.target.src = placeholder)}
          alt={`${participant.artist} profile`}
        />
        <div>
          <img src={getImage()} alt={`${participant.country.name} flag`} />
          <span>{participant.artist}</span>
        </div>
      </Link>
    </div>
  );
};

export default ParticipantCard;
