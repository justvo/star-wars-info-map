import React from 'react';

const ItemInformation = ({ image, name, description, imageClass }) => {
  return (
    <div className="item-main-information">
      <div className="item-img-container">
        <img className={imageClass} src={image} alt={name} />
      </div>
      <div className="item-description">
        <div className="item-name">
          <h1>{name}</h1>
        </div>
        <div className="item-info">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ItemInformation;