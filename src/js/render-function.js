

let gallery = new SimpleLightbox('.gallery a');

export function renderImages(images) {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = images.map(image => createImageCard(image)).join('');
  gallery.refresh();
}

function createImageCard(image) {
  return `
    <a href="${image.largeImageURL}" class="gallery__item">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>
  `;
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
