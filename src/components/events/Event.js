import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EscContext from '../../context/esc/escContext';
import AlertContext from '../../context/alert/alertContext';
import InfoItem from '../layout/InfoItem';
import EventTable from './EventTable';
import placeholder from '../../img/placeholder.jpg';

const Event = ({ match, history }) => {
  const escContext = useContext(EscContext);
  const alertContext = useContext(AlertContext);

  const {
    getEvent,
    event,
    getParticipantsByEvent,
    participants,
    loading,
    deleteEvent,
    message,
    clearMessage,
  } = escContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (message !== null) {
      setAlert(message, 'success');
      clearMessage();
    }
    getEvent(match.params.id);
    getParticipantsByEvent(match.params.id, 'startNr');

    // eslint-disable-next-line
  }, [message]);

  const calcParticipants = () => {
    if (participants.length > 0) {
      return participants.length;
    } else {
      return 0;
    }
  };

  const getWinner = () => {
    if (participants.length > 0) {
      const winners = participants.filter((p) => p.winner);
      if (winners.length > 0) {
        let winningCountries = winners.map((winner, i) =>
          i > 0 ? ' ' + winner.country.name : winner.country.name
        );
        return winningCountries.toString();
      } else {
        return 'TBA';
      }
    }
  };

  const getImage = () => {
    if (event.country.altIcon) return event.country.altIcon;
    else return `https://www.countryflags.io/${event.country.code}/flat/16.png`;
  };

  const handleSort = (sort) => {
    getParticipantsByEvent(match.params.id, sort);
  };

  const handleDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you wish to delete ${event.year} event? This action can not be undone`
      )
    ) {
      deleteEvent(event._id);
      history.push('/');
    }
  };

  return (
    <div className="container">
      {!loading && event !== null ? (
        <div className="feature">
          <div className="action-buttons">
            <Link to={`/edit-event/${event._id}`} className="btn btn-dark">
              Edit
            </Link>
            <Link
              to={`/add-participant/${event._id}`}
              className="btn btn-secondary"
            >
              Add Participant
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <h1 className="title">
            {event.year}
            <img className="logo" src={event.logo} alt={`${event.year} logo`} />
          </h1>
          <div className="content">
            <div className="top">
              <div className="img-container">
                <img
                  src={event.image}
                  onError={(e) => (e.target.src = placeholder)}
                  alt={`Eurovision Song Contest ${event.year}`}
                />
              </div>
              <div className="info">
                <InfoItem
                  title="Host Country"
                  text={event.country.name}
                  image={getImage()}
                  alt={`${event.country.name} flag`}
                  link={`/countries/${event.country._id}`}
                />
                <InfoItem title="City" text={event.city} />
                <InfoItem title="Participants" text={calcParticipants()} />
                <InfoItem title="Winner" text={getWinner()} />
              </div>
            </div>

            <section className="bottom">
              {event.bio.length > 0 &&
                event.bio.map((text, i) => (
                  <p key={i} className="bio">
                    {i === 0 ? <strong>{text}</strong> : text}
                  </p>
                ))}
              <div className="tables">
                {participants.length > 0 && (
                  <EventTable
                    history={history}
                    participants={participants}
                    handleSort={handleSort}
                  />
                )}{' '}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Event;
