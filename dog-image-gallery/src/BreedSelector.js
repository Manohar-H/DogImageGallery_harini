// Name: Harini Manohar
// Date: 29 Nov 2024
// Description: React App for Dog Image Gallery

import React from 'react';

const BreedSelector = ({ breeds, searchQuery, setBreed, setImageCount, fetchImages }) => {
  // Filter the breeds based on the search query
  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission to fetch images
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedBreed = e.target.breed.value;
    const count = e.target.imageCount.value;
  
    // Update parent states
    setBreed(selectedBreed);
    setImageCount(count);
  
    // Call fetchImages with the values directly
    fetchImages(selectedBreed, count);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="breed">
        {filteredBreeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="imageCount"
        min="1"
        max="100"
        defaultValue="5"
        placeholder="Number of images"
      />
      <button type="submit">Fetch Images</button>
    </form>
  );
};

export default BreedSelector;