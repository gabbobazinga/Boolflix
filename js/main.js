/*
Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, 
così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5.

Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione 
corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API

Allarghiamo poi la ricerca anche alle serie tv. 

*/

const API_KEY = 'ede7fb5e58667f60723d8fe5658849f4';

const app = new Vue ({
    el: '#root',
    data: {
        movies: [],
        searchMovie: '',
        pageSelected: 1,
        imgSrc: 'https://image.tmdb.org/t/p/w500/',
    },
    methods: {
        search(){
            axios
            .get('https://api.themoviedb.org/3/search/movie?',{
                params: {
                    'api_key': API_KEY,
                    language: 'en-US',
                    query: this.searchMovie,
                    page: this.pageSelected,
                }
            })
            .then(response => {
                this.movies = response.data;
                this.searchMovie = '';
            })
        },
        voteInStar(index,vote){
            return index <= Math.ceil(vote / 2) ? 'fas fa-star' : 'far fa-star';
        }
    }
})