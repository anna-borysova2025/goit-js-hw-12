import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const formElem = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
let totalHits = 0;

formElem.addEventListener('submit', async e => {
 e.preventDefault();
 const formData = new FormData(formElem);
query = (formData.get('search-text') || '').trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight', });
return; 
}

  showLoader();
  clearGallery();
  hideLoadMoreButton();
  page = 1;

try {
    const data = await getImagesByQuery(query, page);
const { hits = [], totalHits: total = 0 } = data;
totalHits = total; 
   
if (hits.length === 0) {
      iziToast.error({
        message: 'No images found. Try another query.',
        position: 'topRight',
      });
      return;
    }
    createGallery(hits);
    if (totalHits > 15) {
showLoadMoreButton();
    }
 } catch (error) {
      iziToast.error({
        message: 'Request failed',
        position: 'topRight',
      });
    } finally {
      hideLoader();
      formElem.reset();
    }
}); 
loadMoreBtn.addEventListener('click', async () => { 
    page += 1; 
    hideLoadMoreButton();
    showLoader();
    try {
       const data = await getImagesByQuery(query, page);
       const { hits = [] } = data;
       createGallery(hits);
       const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
       window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
       });
       if (page * 15 < totalHits) {
        showLoadMoreButton();
       } else {
iziToast.info({
    message: "We're sorry, but you've reached the end of search results",
    position: "topRight",
});
       }
    } catch (error) {
    iziToast.error ({
        message: 'Request failed',
        position: 'topRight',
      });
      showLoadMoreButton();
    } finally {
        hideLoader();
    }
});