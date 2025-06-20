import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const fetchMovieByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${title}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    return null;
  }
};