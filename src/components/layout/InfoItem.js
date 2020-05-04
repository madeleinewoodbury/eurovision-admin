import React from 'react';

const InfoItem = ({ title, text, image }) => {
  return (
    <div className="info-item">
      <h3>{title}</h3>
      <span>
        {image && (
          <img
            src={`https://www.countryflags.io/${image}/flat/24.png`}
            alt="bah"
          />
        )}{' '}
        {text}
      </span>
    </div>
  );
};

export default InfoItem;
