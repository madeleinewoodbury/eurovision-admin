import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EscContext from '../../context/esc/escContext';
import InfoItem from '../layout/InfoItem';

const Participant = ({ match }) => {
  const escContext = useContext(EscContext);
  const { getParticipant, participant, loading } = escContext;

  useEffect(() => {
    getParticipant(match.params.id);

    // eslint-disable-next-line
  }, []);

  const handleDelete = (e) => {
    console.log('Delete');
  };

  return (
    !loading && (
      <div className="container">
        {participant !== null && (
          <div className="feature">
            <div className="action-buttons">
              <Link
                to={`/edit-participant/${participant._id}`}
                className="btn btn-dark"
              >
                Edit
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
            <h1 className="title">{participant.artist}</h1>
            <div className="content">
              <div className="top">
                <div className="img-container">
                  <img src={participant.image} alt={participant.artist} />
                </div>
                <div className="info">
                  <InfoItem
                    title="Contest"
                    text={`${participant.event.city} ${participant.event.year}`}
                  />
                  <InfoItem
                    title="Country"
                    text={participant.country.name}
                    image={participant.country.code}
                    alt={`${participant.country.name} flag`}
                    link={`/countries/${participant.country._id}`}
                  />
                  <InfoItem title="Song" text={participant.song} />
                  <InfoItem title="Place" text={participant.place} />
                </div>
              </div>

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
