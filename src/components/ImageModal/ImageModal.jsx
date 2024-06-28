import Modal from 'react-modal';
import css from './ImageModal.module.css'
import { BsFillHeartFill } from "react-icons/bs";

Modal.setAppElement('#root');

export default function ImageModal({
  isOpen: { isModalOpen, bigImg, imgAltDescription, imgLikes },
  closeModal,
}) {
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
