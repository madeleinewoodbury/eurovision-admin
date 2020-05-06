import React, { useState } from 'react';

const CountryEventTable = ({ events, handleSort, history }) => {
  const [yearSort, setYearSort] = useState('asc');
  const [citySort, setCitySort] = useState('asc');

  const sortYear = (e) => {
    yearSort === 'asc' ? handleSort('-year') : handleSort('year');
    setYearSort(yearSort === 'asc' ? 'desc' : 'asc');
  };

  const sortCity = (e) => {
    citySort === 'asc' ? handleSort('-city') : handleSort('city');
    setCitySort(citySort === 'asc' ? 'desc' : 'asc');
  };

  const handleRedirect = (id) => {
    history.push(`/events/${id}`);
  };

  return (
    <div className="table">
      <h2 className="section-title">Events</h2>
      <table>
        <thead>
          <tr>
            <th>
              Year<i onClick={sortYear} className="fas fa-sort"></i>
            </th>
            <th>
              City<i onClick={sortCity} className="fas fa-sort"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} onClick={(e) => handleRedirect(event._id)}>
              <td>{event.year}</td>
              <td>{event.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryEventTable;
