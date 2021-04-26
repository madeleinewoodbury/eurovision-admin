import React from 'react'
import { Link } from 'react-router-dom'
import placeholder from '../../img/placeholder.jpg'
import { getIcon } from '../../icons'

const ParticipantCard = ({ participant }) => {
  return (
    <div className='card participant-card'>
      <Link to={`/participants/${participant._id}`} className='img-link'>
        <img
          src={participant.image}
          onError={(e) => (e.target.src = placeholder)}
          alt={`${participant.artist} profile`}
        />
        <div>
          <img
            src={getIcon(participant.country.code)}
            alt={`${participant.country.name} flag`}
          />
          <span>{participant.artist}</span>
        </div>
      </Link>
    </div>
  )
}

export default ParticipantCard
