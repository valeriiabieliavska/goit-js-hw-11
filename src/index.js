import './styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');



// function renderImg(images) {
//     const markup = images.map(image => {
//         return `<div class="photo-card">
//         <a href="${image.largeImageURL}">
//   <img class="image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//   </a>
//   <div class="info">
//     <p class="info-item"><span>${image.likes}</span>
//       <b>Likes</b>
//     </p>
//     <p class="info-item"><span>${image.views}</span>
//       <b>Views</b>
//     </p>
//     <p class="info-item"><span>${image.comments}</span>
//       <b>Comments</b>
//     </p>
//     <p class="info-item"><span>${image.downloads}</span>
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`
//     }).join('');
//     gallery.insertAdjacentHTML('beforeend', markup);
//     console.log(markup);
// }


