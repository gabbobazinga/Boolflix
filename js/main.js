const API_KEY = 'ede7fb5e58667f60723d8fe5658849f4';

const app = new Vue ({
    el: '#root',
    data: {
        movies: [],
        genres: [],
        genresMovie: [],
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
        isActive: true,
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
                this.isActive = false;
            })
        },
        voteInStar(index,vote){
            return index <= Math.floor(vote / 2) ? 'fas fa-star' : 'far fa-star';
        },
        checkFlag(movie) {
            for (let i = 0; i < this.languages.length; i++) {
                if(this.languages[i].code == movie){
                    return true;
                }
            }
        },
        checkFlagGenres(movie) {
          for (let i = 0; i < this.languages.length; i++) {
              if(this.languages[i].code == movie){
                  return true;
              }
          }
        },
        langInFlag(movie){
            return 'img/' + movie + '.svg'
        },
        langInFlagGenres(movie){
          return 'img/' + movie + '.svg'
        },
        selectedPage(page){
          return this.page = page;
        },
        scrollToTop() {
          let windowsMovie = document.getElementsByClassName('scroll-item')[0];
          windowsMovie.scrollTo(0,0);
        }
    },
    mounted: function() {
      axios
        .get('https://api.themoviedb.org/3/genre/movie/list?', {
          params: {
            'api_key': API_KEY,
          }
        })
        .then(response => {
          this.genres = response.data.genres;

            for(let i = 0; i < this.genres.length; i++){
              axios
                .get('https://api.themoviedb.org/3/discover/movie?', {
                  params: {
                    'api_key': API_KEY,
                    'sort_by': 'popularity.desc',
                    page: this.page,
                    'with_genres': this.genres[i].id,
                  }
                })
                  .then(genre => {
                    this.genresMovie.push(genre.data.results);
                })
            }
        })
    }
})