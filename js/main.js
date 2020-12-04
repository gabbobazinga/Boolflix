/*
Milestone 3
In questa milestone come prima cosa aggiungiamo la copertina del film 
o della serie al nostro elenco. 

Milestone 4:
Creare un layout completo simil-Netflix:
Un header che contiene logo e search bar
Dopo aver ricercato qualcosa nella searchbar, 
i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato 
dall’immagine di copertina

Andando con il mouse sopra una card (on hover), 
appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview
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