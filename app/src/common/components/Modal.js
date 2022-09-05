import React from 'react';
import {Modal as NBModal} from 'native-base';

const Modal = ({
  isOpen,
  onClose,
  hasCloseButton = true,
  title = '',
  body,
  footer = <></>,
}) => {
  return (
    <NBModal isOpen={isOpen} onClose={onClose}>
      <NBModal.Content>
        {hasCloseButton ? <NBModal.CloseButton /> : <></>}
        {title ? <NBModal.Header>Create Order</NBModal.Header> : <></>}
        <NBModal.Body>{body}</NBModal.Body>
        {footer ? <NBModal.Footer>{footer}</NBModal.Footer> : <></>}
      </NBModal.Content>
    </NBModal>
  );
};

export default Modal;
