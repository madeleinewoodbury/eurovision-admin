import React, { useContext, useEffect } from 'react';
import EscContext from '../../context/esc/escContext';
import FeatureTop from '../layout/FeatureTop';
import EventTable from './EventTable';

const Event = ({ match }) => {
  const escContext = useContext(EscContext);
  const {
    getEvent,
    event,
    getParticipantsByEvent,
    participants,
    loading,
  } = escContext;

  useEffect(() => {
    getEvent(match.params.id);
    getParticipantsByEvent(match.params.id, 'startNr');

    // eslint-disable-next-line
  }, []);

  const calcParticipants = () => {
    if (participants.length > 0) {
      return participants.length;
    } else {
      return 0;
    }
  };

  const getWinner = () => {
    if (participants.length > 0) {
      const winner = participants.find((participant) => participant.winner);
      if (winner) {
        return winner.country.name;
      } else {
        return 'TBA';
      }
    }
  };

  const handleSort = (sort) => {
    getParticipantsByEvent(match.params.id, sort);
  };

  return (
    <div className="container">
      {!loading && event !== null ? (
        <div className="feature">
          <h1 className="title">
            {event.year}
            <img className="logo" src={event.logo} alt={`${event.year} logo`} />
          </h1>
          <div className="content">
            <FeatureTop
              image={event.image}
              altText={`Eurovision Song Contest ${event.year}`}
              infoList={[
                {
                  title: 'Host Country',
                  text: event.country.name,
                  image: event.country.code,
                },
                {
                  title: 'City',
                  text: event.city,
                },
                {
                  title: 'Participants',
                  text: calcParticipants(),
                },
                { title: 'Winner', text: getWinner() },
              ]}
            />
            <section className="bottom">
              {event.bio && <p className="bio">{event.bio}</p>}
              <div className="tables">
                {participants.length > 0 && (
                  <EventTable
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
