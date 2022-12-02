import axios from 'axios';

const KEY = '31704253-3506fb69b26df966a85a65283';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (value, page) => {
  const response =
    await axios.get(`${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&
safesearch=true&page=${page}&per_page=40`);
  return response.data;
};

