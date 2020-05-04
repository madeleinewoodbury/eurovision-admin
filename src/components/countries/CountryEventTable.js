import React, { useState } from 'react';

const CountryEventTable = ({ events, handleSort }) => {
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
          {events.map((e) => (
            <tr key={e._id}>
              <td>{e.year}</td>
              <td>{e.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryEventTable;
