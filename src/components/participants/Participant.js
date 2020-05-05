import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EscContext from '../../context/esc/escContext';
import FeatureTop from '../layout/FeatureTop';

const Participant = ({ match }) => {
  const escContext = useContext(EscContext);
  const { getParticipant, participant, getEvent, event, loading } = escContext;

  useEffect(() => {
    getParticipant(match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    !loading && (
      <div className="container">
        {participant !== null && (
          <div className="feature">
            <h1 className="title">{participant.artist}</h1>
            <div className="content">
              <FeatureTop
                image={participant.image}
                altText={participant.artist}
                infoList={[
                  {
                    title: 'Contest',
                    text: `${participant.event.city} ${participant.event.year}`,
                  },
                  {
                    title: 'Country',
                    text: participant.country.name,
                    image: participant.country.code,
                    alt: `${participant.country.name} flag`,
                  },
                  {
                    title: 'Song',
                    text: participant.song,
                  },
                  {
                    title: 'Place',
                    text: participant.place,
                  },
                ]}
              />
              <section className="bottom">
                {participant.bio && <p className="bio">{participant.bio}</p>}
              </section>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Participant;
