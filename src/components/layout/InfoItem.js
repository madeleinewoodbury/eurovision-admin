import React from 'react';

const InfoItem = ({ title, text, image, alt }) => {
  return (
    <div className="info-item">
      <h3>{title}</h3>
      <span>
        {image && (
          <img
            src={`https://www.countryflags.io/${image}/flat/24.png`}
            alt={alt}
          />
        )}{' '}
        {text}
      </span>
    </div>
  );
};

export default InfoItem;
