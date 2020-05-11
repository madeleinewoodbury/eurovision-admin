import React from 'react';

const ParticipantTable = ({ participants, history, getParticipant }) => {
  const handleRedirect = (id) => {
    history.push(`/participants/${id}`);
    // getParticipant(id);
  };

  return (
    <div className="table">
      <h2 className="section-title">All Participations</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>City</th>
            <th>Song</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p._id} onClick={(e) => handleRedirect(p._id)}>
              <td>{p.event.year}</td>
              <td>{p.event.city}</td>
              <td>{p.song}</td>
              <td>{p.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantTable;
