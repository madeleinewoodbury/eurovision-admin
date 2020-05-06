import React, { useState } from 'react';

const CountryParticipantTable = ({ participants, handleSort, history }) => {
  const [artistSort, setArtistSort] = useState('desc');
  const [songSort, setSongSort] = useState('desc');
  const [yearSort, setYearSort] = useState('asc');

  const sortArtist = (e) => {
    artistSort === 'asc' ? handleSort('-artist') : handleSort('artist');
    setArtistSort(artistSort === 'asc' ? 'desc' : 'asc');
  };

  const sortSong = (e) => {
    songSort === 'asc' ? handleSort('-song') : handleSort('song');
    setSongSort(songSort === 'asc' ? 'desc' : 'asc');
  };

  const sortYear = (e) => {
    yearSort === 'asc' ? handleSort('-event') : handleSort('event');
    setYearSort(yearSort === 'asc' ? 'desc' : 'asc');
  };

  const handleRedirect = (id) => {
    history.push(`/participants/${id}`);
  };

  return (
    <div className="table">
      <h2 className="section-title">Participants</h2>
      <table>
        <thead>
          <tr>
            <th>
              Artist<i onClick={sortArtist} className="fas fa-sort"></i>
            </th>
            <th>
              Song<i onClick={sortSong} className="fas fa-sort"></i>
            </th>
            <th>
              Year<i onClick={sortYear} className="fas fa-sort"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p._id} onClick={(e) => handleRedirect(p._id)}>
              <td>{p.artist}</td>
              <td>{p.song}</td>
              <td>{p.event.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryParticipantTable;
