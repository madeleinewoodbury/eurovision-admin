import React from 'react';
import { Link } from 'react-router-dom';

const InfoItem = ({ title, text, image, alt, link }) => {
  return (
    <div className="info-item">
      <h3>{title}</h3>
      {link ? (
        <Link to={link}>
          <span>
            {image && <img src={image} alt={alt} />} {text}
          </span>
        </Link>
      ) : (
        <span>
          {image && <img src={image} alt={alt} />} {text}
        </span>
      )}
    </div>
  );
};

export default InfoItem;
