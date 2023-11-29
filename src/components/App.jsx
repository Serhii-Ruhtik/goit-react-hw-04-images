import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { findImages } from './services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Finish } from './Finish/Finish';

import { AppContainer } from './App.styled';

class App extends Component {
  state = {
    error: false,
    page: 1,
    totalResults: null,
    searchQuery: '',
    images: [],
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (page !== prevState.page || searchQuery !== prevState.searchQuery) {
      try {
        this.setState({ isLoading: true });
        const responseWithTotal = await findImages(searchQuery, page);
        const totalResults = responseWithTotal.totalHits;

        const response = responseWithTotal.hits;

        if (response.length === 0) {
          toast.error('Nothing found for your request', { autoClose: 3000 });
          return;
        }

        if (this.state.page === 1) {
          this.positiveResponse();
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

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imagesData],
            totalResults,
          };
        });
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setSearchQuery = query => {
    if (!query) {
      toast.warn('Sorry, search field if empty :(', { autoClose: 3000 });
      return;
    }

    this.setState({ images: [], page: 1, searchQuery: query });
  };

  pageIncrement = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  countTotalPages = () => {
    const totalPages = Math.ceil(this.state.totalResults / 12);
    return totalPages;
  };

  positiveResponse = () => {
    toast.success(`Hooray! We found ${this.state.totalResults} images.`, {
      autoClose: 3000,
    });
  };

  render() {
    const { page, images, totalResults, isLoading } = this.state;
    const totalPages = this.countTotalPages();
    return (
      <AppContainer>
        <Searchbar onSubmit={this.setSearchQuery} />
        <ImageGallery images={images} />
        {images.length > 0 && totalPages !== page && (
          <LoadMoreBtn onClick={this.pageIncrement} />
        )}
        {isLoading && <Loader />}
        <ToastContainer />
        {page === this.countTotalPages(totalResults) && <Finish />}
      </AppContainer>
    );
  }
}
export default App;
