import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscHandler);
  }

  onEscHandler = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClickHandler = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClickHandler}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
