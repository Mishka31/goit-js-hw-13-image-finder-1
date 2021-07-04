export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {

        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22353623-6201980fc547853fa44be7702`;

        return fetch(url)
            .then(r => r.json())
            .then(data => {
                this.incrementPage()
                return data.hits;
            });
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}