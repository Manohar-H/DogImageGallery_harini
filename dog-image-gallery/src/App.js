// Name: Harini Manohar
// Date: 29 Nov 2024
// Description: React App for Dog Image Gallery


import React, { useState, useEffect } from 'react';
import BreedSelector from './BreedSelector';
import ImageGallery from './ImageGallery';
import './index.css';

const App = () => {
  const [breed, setBreed] = useState('husky'); // Default breed
  const [imageCount, setImageCount] = useState(5); // Default image count
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]); // Favorites state
  const [loading, setLoading] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false); // Slideshow toggle
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const imagesPerPage = 5; // Number of images per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [breeds, setBreeds] = useState([]); // List of all breeds

  // Fetch the list of breeds when the app loads
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        if (data.status === 'success') {
          setBreeds(Object.keys(data.message)); // Convert object to array of breed names
        } else {
          alert('Failed to load breeds.');
        }
      } catch (error) {
        alert('Something went wrong while fetching breeds.');
      }
    };

    fetchBreeds();
  }, []); // Runs only once when the component mounts

  // Fetch images for the selected breed and count
  const fetchImages = async (selectedBreed, count) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random/${count}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setImages(data.message);
        setCurrentPage(1); // Reset pagination to the first page
      } else {
        alert('Could not find the breed. Please try another.');
      }
    } catch (error) {
      alert('Something went wrong! Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Add to Favorites
  const addToFavorites = (image) => {
    if (!favorites.includes(image)) {
      setFavorites([...favorites, image]);
    }
  };

  // Paginated Images
  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  // Slideshow Effect
  useEffect(() => {
    if (isSlideshow && images.length > 0) {
      const interval = setInterval(() => {
        setImages((prev) => [...prev.slice(1), prev[0]]);
      }, 3000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [isSlideshow, images]);

  return (
    <div className="app">
      <h1>🐶 Dog Image Gallery 🐶</h1>
      <h1>🐾 🐾 🐾 🐾</h1>
      <p>Fetching <strong>{imageCount}</strong> image(s) for breed: <strong>{breed}</strong>.</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search breeds..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        className="search-bar"
      />

      {/* Breed Selector */}
      <BreedSelector
        breeds={breeds}
        searchQuery={searchQuery}
        setBreed={setBreed}
        setImageCount={setImageCount}
        fetchImages={fetchImages}
      />

      {/* Slideshow Toggle */}
      <div className="slideshow-toggle">
        <label>
          <input
            type="checkbox"
            checked={isSlideshow}
            onChange={(e) => setIsSlideshow(e.target.checked)}
          />
          Enable Slideshow
        </label>
      </div>

      {/* Gallery or Slideshow */}
      {loading ? (
        <p>Loading...</p>
      ) : isSlideshow ? (
        <div className="slideshow">
          {images.slice(0, 1).map((image, index) => (
            <img key={index} src={image} alt="Dog" className="slideshow-image" />
          ))}
        </div>
      ) : (
        <ImageGallery images={paginatedImages} addToFavorites={addToFavorites} />
      )}

      {/* Pagination Controls */}
      {images.length > 0 && !isSlideshow && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev * imagesPerPage < images.length ? prev + 1 : prev
              )
            }
            disabled={currentPage * imagesPerPage >= images.length}
          >
            Next
          </button>
        </div>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div>
          <h2>Your Favorites</h2>
          <div className="gallery">
            {favorites.map((image, index) => (
              <img key={index} src={image} alt="Favorite Dog" className="image" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;