import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <>
      <button className={css.loadMoreBtn} type="button" onClick={onLoadMore}>
        Load more
      </button>
    </>
  );
}

export default LoadMoreBtn;