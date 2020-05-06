import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EscContext from '../../context/esc/escContext';
import InfoItem from '../layout/InfoItem';
import CountryEventTable from './CountryEventTable';
import CountryParticipantTable from './CountryParticipantTable';

const Country = ({ match, history }) => {
  const escContext = useContext(EscContext);
  const {
    getCountry,
    country,
    deleteCountry,
    getEventsByCountry,
    events,
    getParticipantsByCountry,
    participants,
    loading,
  } = escContext;

  useEffect(() => {
    getCountry(match.params.id);
    getEventsByCountry(match.params.id, 'year');
    getParticipantsByCountry(match.params.id, 'event');

    // eslint-disable-next-line
  }, []);

  const calcWinners = () => {
    if (participants.length > 0) {
      const winners = participants.filter((participant) => participant.winner);
      if (winners.length > 0) {
        if (winners.length === 1) {
          return '1 victory';
        } else {
          return winners.length + ' victories';
        }
      } else {
        return 'Never won';
      }
    }
  };

  const calcEvents = () => {
    if (events.length > 0) {
      if (events.length === 1) {
        return '1 time';
      } else {
        return events.length + ' times';
      }
    } else {
      return 'Never hosted';
    }
  };

  const handleParticipantSort = (sort) => {
    getParticipantsByCountry(match.params.id, sort);
  };

  const handleEventSort = (sort) => {
    getEventsByCountry(match.params.id, sort);
  };

  const handleDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you wish to delete ${country.name}? This action can not be undone`
      )
    ) {
      deleteCountry(country._id);
      history.push('/');
    }
  };

  return (
    <div className="container">
      {!loading && country !== null ? (
        <div className="feature">
          <div className="action-buttons">
            <Link to={`/edit-country/${country._id}`} className="btn btn-dark">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <h1 className="title">
            <img src={country.flag} alt={`${country.name} flag`} />
            {country.name}
          </h1>
          <div className="content">
            <div className="top">
              <div className="img-container">
                <img src={country.image} alt={`${country.name} in the ESC`} />
              </div>
              <div className="info">
                <InfoItem title="Capital" text={country.capital} />
                <InfoItem
                  title="First Participation"
                  text={country.firstParticipation}
                />
                <InfoItem title="Victories" text={calcWinners()} />
                <InfoItem title="Hosted" text={calcEvents()} />
              </div>
            </div>

            <section className="bottom">
              {country.bio && <p className="bio">{country.bio}</p>}
              <div className="tables">
                <CountryEventTable
                  events={events}
                  handleSort={handleEventSort}
                  history={history}
                />
                <CountryParticipantTable
                  participants={participants}
                  handleSort={handleParticipantSort}
                  history={history}
                />
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

export default Country;
