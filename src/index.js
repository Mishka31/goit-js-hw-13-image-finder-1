import ImagesApiService from "./apiService";
import imagesTemplate from "./images.hbs";

const refs = {
    searchForm: document.querySelector('#search-form'),
    imagesList: document.querySelector('.gallery'),
    anchor: document.querySelector('.anchor')
}

const imagesApiService = new ImagesApiService();
const observer = new IntersectionObserver(loadMore, {
    threshold: 0,
});



refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value;
    if (imagesApiService.query === '') {
        return alert('Enter query to search');
    }
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(images => {
        clearGallery();
        apppendMarkup(images);
        observer.observe(refs.anchor);
    });
}

function apppendMarkup(images) {
    refs.imagesList.insertAdjacentHTML('beforeend', imagesTemplate(images));
}

function clearGallery() {
    refs.imagesList.innerHTML = '';
}

function loadMore() {
    imagesApiService.fetchImages().then(apppendMarkup);
}