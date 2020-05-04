import React, { useState } from 'react';

const EventTable = ({ participants, handleSort }) => {
  const [startSort, setStartSort] = useState('asc');
  const [countrySort, setCountrySort] = useState('desc');
  const [artistSort, setArtistSort] = useState('desc');
  const [songSort, setSongSort] = useState('desc');
  const [pointsSort, setPointsSort] = useState('desc');

  const sortStartNr = (e) => {
    startSort === 'asc' ? handleSort('-startNr') : handleSort('startNr');
    setStartSort(startSort === 'asc' ? 'desc' : 'asc');
  };

  const sortCountry = (e) => {
    countrySort === 'asc' ? handleSort('-country') : handleSort('country');
    setCountrySort(countrySort === 'asc' ? 'desc' : 'asc');
  };

  const sortArtist = (e) => {
    artistSort === 'asc' ? handleSort('-artist') : handleSort('artist');
    setArtistSort(artistSort === 'asc' ? 'desc' : 'asc');
  };

  const sortSong = (e) => {
    songSort === 'asc' ? handleSort('-song') : handleSort('song');
    setSongSort(songSort === 'asc' ? 'desc' : 'asc');
  };

  const sortPoints = (e) => {
    pointsSort === 'asc' ? handleSort('-points') : handleSort('points');
    setPointsSort(pointsSort === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="table">
      <h2 className="section-title">Participants</h2>
      <table>
        <thead>
          <tr>
            <th>
              R/O<i onClick={sortStartNr} className="fas fa-sort"></i>
            </th>
            <th>
              Country<i onClick={sortCountry} className="fas fa-sort"></i>
            </th>
            <th>
              Artist<i onClick={sortArtist} className="fas fa-sort"></i>
            </th>
            <th>
              Song<i onClick={sortSong} className="fas fa-sort"></i>
            </th>
            <th>
              Points<i onClick={sortPoints} className="fas fa-sort"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p._id}>
              <td>{p.startNr}</td>
              <td className="country-td">
                <img
                  src={`https://www.countryflags.io/${p.country.code}/flat/24.png`}
                  alt="bah"
                />{' '}
                {p.country.name}
              </td>
              <td>{p.artist}</td>
              <td>{p.song}</td>
              <td>{p.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
