// Name: Harini Manohar
// Date: 29 Nov 2024
// Description: React App for Dog Image Gallery

import React from 'react';

const ImageGallery = ({ images, addToFavorites }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt="Dog" className="image" />
          <button onClick={() => addToFavorites(image)}>❤️ Favorite</button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;