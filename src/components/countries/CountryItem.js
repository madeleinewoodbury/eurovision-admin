import React from 'react';
import { Link } from 'react-router-dom';

const CountryItem = ({ country }) => {
  return (
    <div className="list-item">
      <Link to={`/countries/${country._id}`} className="info">
        <img src={`https://www.countryflags.io/${country.code}/flat/64.png`} />
        {country.name}
      </Link>
      <div className="actions">
        <Link to={`/countries/edit/${country._id}`} className="btn">
          <i className="fas fa-edit"></i>Edit
        </Link>
        <button
          onClick={(e) => console.log('Delete')}
          className="btn btn-danger"
        >
          <i className="fas fa-trash-alt"></i>Delete
        </button>
      </div>
    </div>
  );
};

export default CountryItem;
