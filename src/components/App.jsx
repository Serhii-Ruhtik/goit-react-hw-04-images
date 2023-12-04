import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findImages } from './services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Finish } from './Finish/Finish';

import { AppContainer } from './App.styled';

const App = () => {
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '' && page === 1) {
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responseWithTotal = await findImages(searchQuery, page);
        const totalResults = responseWithTotal.totalHits;

        const response = responseWithTotal.hits;

        if (response.length === 0) {
          toast.error('Nothing found for your request', { autoClose: 3000 });
          return;
        }
        if (page === 1) {
          positiveResponse();
        }

        const imagesData = response.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return {
              id,
              tags,
              webformatURL,
              largeImageURL,
            };
          }
        );

        setImages(prevImages => [...prevImages, ...imagesData]);
        setTotalResults(totalResults);
      } catch (error) {
        setSearchError(error);
        console.log(searchError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, page, searchError]);

  const addSearchQuery = query => {
    if (!query) {
      toast.warn('Sorry, search field if empty :(', { autoClose: 3000 });
      setImages([]);
      setPage(1);
      setSearchQuery('');
      return;
    }
    setSearchQuery(query);
    setPage(1);
  };

  const pageIncrement = () => {
    setPage(prevState => prevState + 1);
  };

  const countTotalPages = totalResults => {
    const totalPages = Math.ceil(totalResults / 12);
    return totalPages;
  };

  const positiveResponse = () => {
    toast.success(`Hooray! We found ${totalResults} images.`, {
      autoClose: 3000,
    });
  };
  return (
    <AppContainer>
      <Searchbar onSubmit={addSearchQuery} />
      <ImageGallery images={images} />
      {images.length > 0 && countTotalPages(totalResults) !== page && (
        <LoadMoreBtn onClick={pageIncrement} />
      )}
      {isLoading && <Loader />}
      <ToastContainer />
      {page === countTotalPages(totalResults) && <Finish />}
    </AppContainer>
  );
};

export default App;
