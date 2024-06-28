import css from './ImageCard.module.css'
import { Image, ModalData } from '../../types';

interface ImageCardProps {
  image: Image;
  onOpen: (info: ModalData) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onOpen }) => {
  return (
    <div>
      <img
        className={css.image}
        onClick={() =>
          onOpen({
            bigImg: image.urls.regular,
            imgAltDescription: image.alt_description,
            imgLikes: image.likes,
          })
        }
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;