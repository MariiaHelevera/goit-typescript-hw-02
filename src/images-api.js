import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = 'KOYOjjrUIwg7o3LyElieSGXiiJO3Rk4khICWSRN745k';

export const getImagesByQuery = async (searchQuery, currentPage) => {
    const response = await axios.get("/search/photos", {
        params: {
        client_id: API_KEY,
        query: searchQuery,
        page: currentPage,
        per_page: 12,
        orientation: 'landscape',
      },
  });
  return response;
}