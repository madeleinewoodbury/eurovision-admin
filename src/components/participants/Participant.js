import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EscContext from '../../context/esc/escContext'
import InfoItem from '../layout/InfoItem'
import placeholder from '../../img/placeholder.jpg'
import ParticipantTable from './ParticipantTable'
import { getIcon } from '../../icons'

const Participant = ({ match, history }) => {
  const escContext = useContext(EscContext)
  const {
    getParticipant,
    getParticipantsByArtist,
    participant,
    participants,
    deleteParticipant,
    loading,
  } = escContext

  useEffect(() => {
    if (participant !== null) {
      participant._id !== match.params.id && getParticipant(match.params.id)
    } else {
      participant === null && getParticipant(match.params.id)
    }

    participants.length < 1 && getAllParticipations()

    // eslint-disable-next-line
  }, [participant, match.params.id])

  const handleDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you wish to delete ${participant.artist}? This action can not be undone`
      )
    ) {
      deleteParticipant(participant._id)
      history.push('/')
    }
  }

  const getAllParticipations = () => {
    if (participant !== null) {
      getParticipantsByArtist(participant.artist)
    }
  }

  return (
    !loading && (
      <div className='container'>
        {participant !== null && (
          <div className='feature'>
            <div className='action-buttons'>
              <Link
                to={`/edit-participant/${participant._id}`}
                className='btn btn-dark'
              >
                Edit
              </Link>
              <button className='btn btn-danger' onClick={handleDelete}>
                Delete
              </button>
            </div>
            <h1 className='title'>{participant.artist}</h1>
            <div className='content'>
              <div className='top'>
                <div className='img-container'>
                  <img
                    src={participant.image}
                    onError={(e) => (e.target.src = placeholder)}
                    alt={participant.artist}
                  />
                </div>
                <div className='info'>
                  <InfoItem
                    title='Contest'
                    text={`${participant.event.city} ${participant.event.year}`}
                  />
                  <InfoItem
                    title='Country'
                    text={participant.country.name}
                    image={getIcon(participant.country.code)}
                    alt={`${participant.country.name} flag`}
                    link={`/countries/${participant.country._id}`}
                  />
                  <InfoItem title='Song' text={participant.song} />
                  <InfoItem title='Place' text={participant.place} />
                </div>
              </div>

              <section className='bottom'>
                {participant.bio.length > 0 &&
                  participant.bio.map((text, i) => (
                    <p key={i} className='bio'>
                      {i === 0 ? <strong>{text}</strong> : text}
                    </p>
                  ))}
                <div className='tables'>
                  {participants.length > 0 && (
                    <ParticipantTable
                      history={history}
                      participants={participants}
                      getParticipant={getParticipant}
                    />
                  )}
                </div>
                {participant.video && (
                  <div className='video'>
                    <iframe
                      title={`${participant.artist} ${participant.song}`}
                      src={`https://www.youtube.com/embed/${participant.video}`}
                      frameBorder='0'
                      allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    )
  )
}

export default Participant
