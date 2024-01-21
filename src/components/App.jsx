import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './api';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(false);

  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        if (currentPage !== 1 || searchQuery !== '') {
          setIsLoading(true);
          const { images: fetchedImages, hasMoreImages: fetchedHasMoreImages } =
            await fetchImages(searchQuery, currentPage);
          setImages(prevImages => [...prevImages, ...fetchedImages]);
          setHasMoreImages(fetchedHasMoreImages);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesData();
  }, [currentPage, searchQuery]);

  const handleSearchSubmit = query => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setImages([]);
      setCurrentPage(1);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {searchQuery && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && (
            <Button onLoadMore={handleLoadMore} hasMoreImages={hasMoreImages} />
          )}
        </>
      )}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
