import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImagesByQuery } from '../../images-api';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { BsExclamationLg } from "react-icons/bs";
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';

function App() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState({
    isModalOpen: false,
    bigImg: '',
    imgAltDescription: '',
    imgLikes: 0,
  });
  

 useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchGallery() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImagesByQuery(searchQuery, page);
        if (!data.data.results.length) {
          toast('Sorry, no images found. Try another search.', {
            icon: <BsExclamationLg color="blue" size={22} />,
            style: {
              background: 'light',
              color: 'dark',
            },
            position: 'top-left',
          });
        }
        setGallery((prevState) => [...prevState, ...data.data.results]);
        setTotalPages(data.data.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGallery();
  }, [page, searchQuery]);


  const handleSearch = async (keyword) => {
    setSearchQuery(keyword);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  useEffect(() => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      left: 0,
      behavior: "smooth"
    });
  }, [gallery]);

  function openModal(info) {
    setIsOpen(info);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage message="Oops! Something went wrong. Try reloading." />}

      {gallery.length > 0 && <ImageGallery images={gallery} openModal={openModal}/>}

      {isLoading && <Loader />}
      
      <ImageModal isOpen={isOpen} closeModal={closeModal} />

      {gallery.length > 0 && !isLoading && totalPages > page && (
        <LoadMoreBtn onLoadMore={handleLoadMore}/>
      )}
          
      <Toaster />
    </div>

    
  );
}

export default App
