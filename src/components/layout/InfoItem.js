import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const InfoItem = ({ title, text, image, alt, link, videoLink }) => {
  return (
    <div className="info-item">
      {videoLink ? (
        <a href={videoLink} className="btn btn-primary">
          Watch Show
        </a>
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </div>
  );
};

export default InfoItem;
