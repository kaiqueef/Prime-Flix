import { useEffect, useState } from "react"
import api from '../../services/api'
import './home.css'

import MovieList from "../../components/MovieList";

// https://api.themoviedb.org/3/movie/popular?api_key=7a8e988df0c98a78f5908610d79cf071&language=pt-BR

function Home() {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setpopularMovies] = useState([]);
    const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [favoriteMovies, setfavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasFavoriteMovies = localStorage.getItem("@primeflix") != null && localStorage.getItem("@primeflix").length>2;

    useEffect(() => {
        async function loadMovies(movieType) {
            const response = await api.get(`/movie/${movieType}`, {
                params: {
                    api_key: "7a8e988df0c98a78f5908610d79cf071",
                    language: "pt-BR",
                    page: 1,   
                }
            })
            switch(movieType) {
                case 'top_rated':
                    setTopRatedMovies(response.data.results);
                case 'popular':
                    setpopularMovies(response.data.results);
                case 'now_playing':
                    setnowPlayingMovies(response.data.results);
                case 'upcoming':
                    setUpcomingMovies(response.data.results);
                case 'favorites':
                    if(hasFavoriteMovies)
                        setfavoriteMovies(JSON.parse(localStorage.getItem("@primeflix")))
                }
            }
        async function loadAllMovies(){
            await loadMovies("top_rated");
            await loadMovies("popular");
            await loadMovies("now_playing");
            await loadMovies("upcoming");
            setLoading(false);
        }
        loadAllMovies()
    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes..</h2>
            </div>
        )
    }
    const a = 1;
    return(
        <div className="container">
            {hasFavoriteMovies && 
            <MovieList title='Seus favoritos' class="favorites" movies={favoriteMovies}></MovieList>}
            <MovieList title='Top Rated' class="top-rated" movies={topRatedMovies}></MovieList>
            <MovieList title='Agora no cinema' class="now_playing" movies={nowPlayingMovies}></MovieList>
            <MovieList title='Está por vir' class="upcoming" movies={upcomingMovies}></MovieList>
            <MovieList title='Populares' class="popular" movies={popularMovies}></MovieList>
        </div>
    )
}

export default Home