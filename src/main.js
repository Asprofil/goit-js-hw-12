
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-function.js';


document.querySelector('#search-form').addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.searchQuery.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Search field cannot be empty!',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    renderImages(images);
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
  document.querySelector('.loader').classList.remove('hidden');
}

function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}
