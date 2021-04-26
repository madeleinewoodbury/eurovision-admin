import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EscContext from '../../context/esc/escContext'
import AlertContext from '../../context/alert/alertContext'
import InfoItem from '../layout/InfoItem'
import EventTable from './EventTable'
import placeholder from '../../img/placeholder.jpg'
import { getIcon } from '../../icons'

const Event = ({ match, history }) => {
  const escContext = useContext(EscContext)
  const alertContext = useContext(AlertContext)

  const {
    getEvent,
    event,
    loading,
    deleteEvent,
    message,
    clearMessage,
  } = escContext
  const { setAlert } = alertContext
  const [viewTable, setViewTable] = useState('Grand Final')

  useEffect(() => {
    if (message !== null) {
      setAlert(message, 'success')
      clearMessage()
    }
    getEvent(match.params.id)

    // eslint-disable-next-line
  }, [message, match.params.id])

  const calcParticipants = () => {
    if (event.participants.length > 0) {
      return event.participants.length
    } else {
      return 0
    }
  }

  const getWinner = () => {
    if (event.participants.length > 0) {
      const winners = event.participants.filter((p) => p.winner)
      if (winners.length > 0) {
        let winningCountries = winners.map((winner, i) =>
          i > 0 ? ' ' + winner.country.name : winner.country.name
        )
        return winningCountries.toString()
      } else {
        return 'TBA'
      }
    }
  }

  const handleDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you wish to delete ${event.event.year} event? This action can not be undone`
      )
    ) {
      deleteEvent(event.event._id)
      history.push('/')
    }
  }

  const getParticipants = () => {
    if (viewTable === 'Grand Final') {
      return event.participants.sort((a, b) => (a.startNr > b.startNr ? 1 : -1))
    } else {
      return event.participants.sort((a, b) =>
        a.semiStartNr > b.semiStartNr ? 1 : -1
      )
    }
  }

  return (
    <div className='container'>
      {!loading && event !== null ? (
        <div className='feature'>
          <div className='action-buttons'>
            <Link
              to={`/edit-event/${event.event._id}`}
              className='btn btn-dark'
            >
              Edit
            </Link>
            <Link
              to={`/add-participant/${event.event._id}`}
              className='btn btn-secondary'
            >
              Add Participant
            </Link>
            <button className='btn btn-danger' onClick={handleDelete}>
              Delete
            </button>
          </div>
          <h1 className='title'>
            {event.event.year}
            <img
              className='logo'
              src={event.event.logo}
              alt={`${event.event.year} logo`}
            />
          </h1>
          <div className='content'>
            <div className='top'>
              <div className='img-container'>
                <img
                  src={event.event.image}
                  onError={(e) => (e.target.src = placeholder)}
                  alt={`Eurovision Song Contest ${event.event.year}`}
                />
              </div>
              <div className='info'>
                <InfoItem
                  title='Host Country'
                  text={event.event.country.name}
                  image={getIcon(event.event.country.code)}
                  alt={`${event.event.country.name} flag`}
                  link={`/countries/${event.event.country._id}`}
                />
                <InfoItem title='City' text={event.event.city} />
                <InfoItem title='Participants' text={calcParticipants()} />
                <InfoItem title='Winner' text={getWinner()} />
              </div>
            </div>

            <section className='bottom'>
              {event.event.bio.length > 0 &&
                event.event.bio.map((text, i) => (
                  <p key={i} className='bio'>
                    {i === 0 ? <strong>{text}</strong> : text}
                  </p>
                ))}
              <div className='tables'>
                <div>
                  <button
                    onClick={(e) => setViewTable('First Semifinal')}
                    className='btn'
                  >
                    First Semifinal
                  </button>
                  <button
                    onClick={(e) => setViewTable('Second Semifinal')}
                    className='btn'
                  >
                    Second Semifinal
                  </button>
                  <button
                    onClick={(e) => setViewTable('Grand Final')}
                    className='btn'
                  >
                    Grand Final
                  </button>
                </div>
                {event.participants.length > 0 && (
                  <EventTable
                    history={history}
                    participants={getParticipants()}
                    viewTable={viewTable}
                  />
                )}{' '}
              </div>
              {event.event.video && (
                <div className='video'>
                  <iframe
                    title={`Eurovision ${event.event.year}`}
                    src={`https://www.youtube.com/embed/${event.event.video}`}
                    frameBorder='0'
                    allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </section>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Event
