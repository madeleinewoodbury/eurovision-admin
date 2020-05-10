import React, { useState } from 'react';

const EventTable = ({ history, participants, handleSort }) => {
  const [startSort, setStartSort] = useState('asc');
  const [countrySort, setCountrySort] = useState('desc');
  const [artistSort, setArtistSort] = useState('desc');
  const [songSort, setSongSort] = useState('desc');
  const [pointsSort, setPointsSort] = useState('asc');

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

  const handleRedirect = (id) => {
    history.push(`/participants/${id}`);
  };

  const getImage = (p) => {
    if (p.country.altIcon) return p.country.altIcon;
    else return `https://www.countryflags.io/${p.country.code}/flat/24.png`;
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
            <th className="hide-xs">
              Artist<i onClick={sortArtist} className="fas fa-sort"></i>
            </th>
            <th className="hide-sm">
              Song<i onClick={sortSong} className="fas fa-sort"></i>
            </th>
            <th>
              Points<i onClick={sortPoints} className="fas fa-sort"></i>
            </th>
            <th className="hide-md">Place</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr
              key={p._id}
              onClick={(e) => handleRedirect(p._id)}
              className={p.winner ? 'winner' : null}
            >
              <td>{p.startNr}</td>
              <td className="country-td">
                <img src={getImage(p)} alt={`${p.country.name} flag`} />{' '}
                {p.country.name}
              </td>
              <td className="hide-xs">{p.artist}</td>
              <td className="hide-sm">{p.song}</td>
              <td>{p.points}</td>
              <td className="hide-md">{p.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
