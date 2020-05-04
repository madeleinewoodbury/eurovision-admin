import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <div className="card">
      <Link to={`/countries/${country._id}`} className="img-link">
        <img src={country.flag} alt={`${country.name} flag`} />
        <span>{country.name}</span>
      </Link>
    </div>
  );
};

export default CountryCard;
