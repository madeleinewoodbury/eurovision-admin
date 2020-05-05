import React from 'react';
import InfoItem from './InfoItem';

const FeatureTop = ({ image, altText, infoList }) => {
  return (
    <div className="top">
      <div className="img-container">
        <img src={image} alt={altText} />
      </div>
      <div className="info">
        {infoList.map((item, i) => (
          <InfoItem
            key={i}
            title={item.title}
            text={item.text}
            image={item.image}
            alt={item.alt}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureTop;
