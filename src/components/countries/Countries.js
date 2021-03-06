import React, { useEffect, useContext } from 'react';
import EscContext from '../../context/esc/escContext';
import CountryCard from './CountryCard';

const Countries = () => {
  const escContext = useContext(EscContext);
  const { getCountries, loading, countries } = escContext;

  useEffect(() => {
    getCountries();

    // eslint-disable-next-line
  }, []);
  return (
    !loading && (
      <div className="container">
        <h1 className="text-center my-1">Countries</h1>
        <div className="card-container">
          {countries.map((country) => (
            <CountryCard key={country._id} country={country} />
          ))}
        </div>
      </div>
    )
  );
};

export default Countries;
