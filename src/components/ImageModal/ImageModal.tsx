import Modal from 'react-modal';
import React from 'react';
import css from './ImageModal.module.css'
import { BsFillHeartFill } from "react-icons/bs";
import { ModalData } from '../../types';

Modal.setAppElement('#root');

interface ImageModalProps {
  isModalOpen: boolean;
  modalData: ModalData;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isModalOpen, modalData, closeModal }) => {
  const { bigImg, imgAltDescription, imgLikes } = modalData;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      <div>
        <img className={css.modalImage} src={bigImg} alt={imgAltDescription} />
        <div className={css.modalInfo}>
          <p>{imgAltDescription}</p>
          <div className={css.imageLikesContainer}>
            <BsFillHeartFill color="white" size={16} />
            <p><b>{imgLikes}</b></p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;