import React, { useContext, useEffect } from 'react';
import EscContext from '../../context/esc/escContext';
import FeatureTop from '../layout/FeatureTop';
import CountryEventTable from './CountryEventTable';
import CountryParticipantTable from './CountryParticipantTable';

const Country = ({ match }) => {
  const escContext = useContext(EscContext);
  const {
    getCountry,
    country,
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

  return (
    <div className="container">
      {!loading && country !== null ? (
        <div className="feature">
          <h1 className="title">
            <img src={country.flag} alt={`${country.name} flag`} />
            {country.name}
          </h1>
          <div className="content">
            <FeatureTop
              image={country.image}
              altText={`${country.name} in the ESC`}
              infoList={[
                { title: 'Capital', text: country.capital },
                {
                  title: 'First Participation',
                  text: country.firstParticipation,
                },
                { title: 'Victories', text: calcWinners() },
                { title: 'Hosted', text: calcEvents() },
              ]}
            />
            <section className="bottom">
              {country.bio && <p className="bio">{country.bio}</p>}
              <div className="tables">
                <CountryEventTable
                  events={events}
                  handleSort={handleEventSort}
                />
                <CountryParticipantTable
                  participants={participants}
                  handleSort={handleParticipantSort}
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
