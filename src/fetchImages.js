// import axios from 'axios';
export { fetchImages };

const KEY = '31704253-3506fb69b26df966a85a65283';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(value, page) {
  return await fetch(`${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&
    safesearch=true&page=${page}&per_page=40`)
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
