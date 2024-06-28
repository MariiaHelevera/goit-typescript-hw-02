import css from './ImageCard.module.css'

export default function ImageCard({ image, onOpen }) {
    return (
        <div>
            <img className={css.image} onClick={() =>
                onOpen({
                    isModalOpen: true,
                    bigImg: image.urls.regular,
                    imgAltDescription: image.alt_description,
                    imgLikes: image.likes,
                })
                }
                src={image.urls.small} alt={image.alt_description}
            />
        </div>
    );
}