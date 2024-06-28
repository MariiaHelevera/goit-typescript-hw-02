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

import { Image, ModalData } from '../../types';

function App() {
  const [gallery, setGallery] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    bigImg: '',
    imgAltDescription: '',
    imgLikes: 0,
  });
  

 useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchGallery(): Promise<void> {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImagesByQuery(searchQuery, page);
        if (!data.results.length) {
          toast('Sorry, no images found. Try another search.', {
            icon: <BsExclamationLg color="blue" size={22} />,
            style: {
              background: 'light',
              color: 'dark',
            },
            position: 'top-left',
          });
        }
        setGallery((prevState) => [...prevState, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGallery();
  }, [page, searchQuery]);


  const handleSearch = async (keyword: string) => {
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

  function openModal(info: ModalData): void {
    setIsModalOpen(true);
    setModalData(info);
  }

  function closeModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage message="Oops! Something went wrong. Try reloading." />}

      {gallery.length > 0 && <ImageGallery images={gallery} openModal={openModal}/>}

      {isLoading && <Loader />}
      
      <ImageModal isModalOpen={isModalOpen} modalData={modalData} closeModal={closeModal} />

      {gallery.length > 0 && !isLoading && totalPages > page && (
        <LoadMoreBtn onLoadMore={handleLoadMore}/>
      )}
          
      <Toaster />
    </div>

    
  );
}

export default App
