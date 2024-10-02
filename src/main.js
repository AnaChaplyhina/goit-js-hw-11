import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox'; 
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  clearGallery();
   loader.style.display = 'block';

  try {
    const data = await fetchImages(searchQuery);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query.',
      });
    } else {
      renderGallery(data.hits);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none'; 
    refreshSearchForm(); 
  }
});

function refreshSearchForm() {
  form.reset(); 
}


