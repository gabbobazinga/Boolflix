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
        tvSeries:[],
        languages: [
            {
              name: "Italian",
              code: "it"
            },{
              name: "English",
              code: "en"
            },{
              name: "Espanish",
              code: "es"
            },{
              name: "German",
              code: "de"
            },{
              name: "Japanese",
              code: "ja"
            },{
              name: "Portuguese",
              code: "pt"
            },{
              name: "Korean",
              code: "ko"
            },{
              name: "Czech",
              code: "cs"
            },{
            name: "French",
            code: "fr"
            }
          ],
        searchMovie: '',
        page: 1,
        totalPages: '',
        imgSrc: 'https://image.tmdb.org/t/p/w500/',
    },
    methods: {
        search(){
            axios
            .get('https://api.themoviedb.org/3/search/multi',{
                params: {
                    'api_key': API_KEY,
                    query: this.searchMovie,
                    page: this.page,
                }
            })
            .then(response => {
                this.movies = response.data;
                this.totalPages = response.data.total_pages;
                // this.searchMovie = '';
            })
        },
        voteInStar(index,vote){
            return index <= Math.floor(vote / 2) ? 'fas fa-star' : 'far fa-star';
        },
        checkFlag(index) {
            for (let i = 0; i < this.languages.length; i++) {
                if(this.languages[i].code == this.movies.results[index].original_language){
                    return true;
                }
            }
        },
        langInFlag(index){
            return 'img/' + this.movies.results[index].original_language + '.svg'
        },
        selectedPage(page){
          return this.page = page;
        }
    }
})