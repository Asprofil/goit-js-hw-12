import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-function.js';

let query = '';
let page = 1;
const perPage = 15;
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

document.querySelector('#search-form').addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', loadMoreImages);

async function onSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Search field cannot be empty!',
    });
    return;
  }

  page = 1;
  clearGallery();
  loadMoreButton.classList.add('hidden');
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    renderImages(data.hits);
    if (data.totalHits > perPage) {
      loadMoreButton.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images',
    });
  } finally {
    hideLoader();
  }
}

async function loadMoreImages() {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    renderImages(data.hits);
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if ((page * perPage) >= data.totalHits) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreButton.classList.add('hidden');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images',
    });
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}