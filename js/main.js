/*
Milestone 1: 
Creare un layout base con una searchbar (una input e un button) 
in cui possiamo scrivere completamente o parzialmente il nome di un film. 
Possiamo, cliccando il bottone, cercare sull’API tutti i film 
che contengono ciò che ha scritto l’utente. 
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori 
per ogni film trovato: 
Titolo Titolo Originale Lingua Voto 
nome repo: vue-boolflix
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
        }
    }
})

/*
axios
    .get('https://flynn.boolean.careers/exercises/api/array/music')
    .then(result => {
            this.disks.push(result.data.response[i]);
        if(!this.genres.includes(result.data.response[i].genre)){
            this.genres.push(result.data.response[i].genre)
        }
    });
*/