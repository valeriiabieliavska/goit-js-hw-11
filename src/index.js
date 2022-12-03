import { fetchImages } from './fetch-images';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
loadMoreBtn.style.display = 'none';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', event => {
  event.preventDefault();
  cleanGallery();
  const trim = searchInput.value.trim();
  if (trim !== '') {
    fetchImages(trim, page).then(data => {
      if (data.hits.length === 0) {
        invalidQuery();
        return;
      }
      renderImg(data.hits);
      page < Math.ceil(data.totalHits / 40)
        ? (loadMoreBtn.style.display = 'block')
        : (loadMoreBtn.style.display = 'none');
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    });
  }
});

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  const trim = searchInput.value.trim();
  fetchImages(trim, page).then(data => {
    page > Math.ceil(data.totalHits / 40)
      ? Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        )((loadMoreBtn.style.display = 'none'))
      : (loadMoreBtn.style.display = 'block');
    if (data.hits.length === 0) {
      invalidQuery();
    } else {
      renderImg(data.hits);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.style.display = 'none';
    }
    smoothScroll();
  });
});

function invalidQuery() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  loadMoreBtn.style.display = 'none';
}

// плавне прокручування

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// розмітка

function renderImg(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
        <a class="link" href="${image.largeImageURL}">
  <img class="image" src="${image.webformatURL}" alt="${image.tags}"   loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-amount">${image.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="info-amount">${image.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="info-amount">${image.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="info-amount">${image.downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function cleanGallery() {
  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.style.display = 'none';
}

// Метод Math.ceil() - округление вверх. Округляет аргумент до ближайшего большего целого.
//  Метод trim() удаляет пробельные символы с начала и конца строки.

// плавний скрол
// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

// function onLoadMoreBtn() {
//   page += 1
//   fetchImages()
//     .then(({ data }) => {
//       renderGallery(data.hits)

//       const totalPages = Math.ceil(data.totalHits / 40)

//       if (page > totalPages) {

//          Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
//          refs.LoadMoreBtn.classList.add('is-hidden')
//       }
//     })
//     .catch(error => console.log(error))
// }
