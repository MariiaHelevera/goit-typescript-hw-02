import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'
import { Image, ModalData } from '../../types';

interface ImageGalleryProps {
  images: Image[];
  openModal: (info: ModalData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.imagesList}>
      {images.map(image => (
        <li className={css.imagesItem} key={image.id}>
          <ImageCard image={image} onOpen={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;