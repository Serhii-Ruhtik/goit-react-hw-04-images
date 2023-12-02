import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';

import {
  ImageGalleryListItem,
  ImageGalleryImage,
  ImageLarge,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ id, tags, webformatURL, largeImageURL }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  return (
    <ImageGalleryListItem id={id}>
      <ImageGalleryImage onClick={openModal} src={webformatURL} alt={tags} />
      {modalOpen && (
        <Modal onClose={closeModal}>
          <ImageLarge src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </ImageGalleryListItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
