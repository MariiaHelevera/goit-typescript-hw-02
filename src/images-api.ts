import axios from "axios";
import { ApiResponse } from "./types";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = 'KOYOjjrUIwg7o3LyElieSGXiiJO3Rk4khICWSRN745k';

export const getImagesByQuery = async (searchQuery: string, currentPage: number): Promise<ApiResponse> => {
  const response = await axios.get("/search/photos", {
      params: {
      client_id: API_KEY,
      query: searchQuery,
      page: currentPage,
      per_page: 12,
      orientation: 'landscape',
    },
  });

  const apiResponse: ApiResponse = {
  results: response.data.results,
  total: response.data.total,
  total_pages: response.data.total_pages,
  };

  return apiResponse;
}