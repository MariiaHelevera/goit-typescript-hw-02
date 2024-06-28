import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

export default function ImageGallery({ images, openModal }) {
    return (
        <ul className={css.imagesList}>
            {images.map(image => (
                <li className={css.imagesItem}  key={image.id}>
                    <ImageCard image={image} onOpen={openModal}/>
                </li>
            ))}
        </ul>
    );
}