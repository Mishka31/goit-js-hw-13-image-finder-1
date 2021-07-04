import ImagesApiService from "./apiService";
import imagesTemplate from "./images.hbs";

const refs = {
    searchForm: document.querySelector('#search-form'),
    imagesList: document.querySelector('.gallery')
}

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', handleInput);

function handleInput(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(apppendMarkup);
}

function apppendMarkup(images) {
    refs.imagesList.insertAdjacentHTML('beforeend', imagesTemplate(images));
}
