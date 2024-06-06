const API_KEY = '44258731-7daca7e4db35e40c882241eb9';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 20) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return data.hits;
}
