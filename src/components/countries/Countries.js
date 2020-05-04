import React, { useEffect, useContext } from 'react';
import EscContext from '../../context/esc/escContext';
import CountryItem from './CountryItem';

const Countries = () => {
  const escContext = useContext(EscContext);
  const { getCountries, loading, countries, error, clearErrors } = escContext;

  useEffect(() => {
    getCountries();
  }, []);
  return (
    !loading && (
      <div className="container">
        <h1 className="text-center my-1">Countries</h1>
        <div className="list">
          {countries.map((country) => (
            <CountryItem key={country._id} country={country} />
          ))}
        </div>
      </div>
    )
  );
};

export default Countries;
