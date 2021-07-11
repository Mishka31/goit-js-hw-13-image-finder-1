import ImagesApiService from "./apiService";
import imagesTemplate from "./images.hbs";

const refs = {
    searchForm: document.querySelector('#search-form'),
    imagesList: document.querySelector('.gallery'),
    anchor: document.querySelector('#anchor'),
    spinner: document.querySelector('#spinner')
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

    refs.spinner.classList.remove('visually-hidden');
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(images => {
        clearGallery();
        apppendMarkup(images);
        refs.spinner.classList.add('visually-hidden');
        observer.observe(refs.anchor);
    });
}

function apppendMarkup(images) {
    refs.imagesList.insertAdjacentHTML('beforeend', imagesTemplate(images));
}

function clearGallery() {
    refs.imagesList.innerHTML = '';
}

function loadMore([entrie]) {
    if (!entrie.isIntersecting) return;
    refs.spinner.classList.remove('visually-hidden');
    imagesApiService.fetchImages().then(images => {
        refs.spinner.classList.add('visually-hidden');
        apppendMarkup(images);
    });
}