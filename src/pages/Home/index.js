import { useEffect, useState } from "react"
import api from '../../services/api'
import { Link } from "react-router-dom";
import './home.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import MovieList from "../../components/MovieList";

// https://api.themoviedb.org/3/movie/popular?api_key=7a8e988df0c98a78f5908610d79cf071&language=pt-BR

function Home() {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setpopularMovies] = useState([]);
    const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true);

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

    function moveToRight(item){
        document.querySelector(`.${item} ul`).scrollBy({top: 0, left: 900, behavior: 'smooth' })
    }
    
    function moveToLeft(item){
        document.querySelector(`.${item} ul`).scrollBy({top: 0, left: -900, behavior: 'smooth' })
    }

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes..</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <MovieList title='Top Rated' class="top-rated" movies={topRatedMovies}></MovieList>
            <MovieList title='Agora no cinema' class="now_playing" movies={nowPlayingMovies}></MovieList>
            <MovieList title='Está por vir' class="upcoming" movies={upcomingMovies}></MovieList>
            <MovieList title='Populares' class="popular" movies={popularMovies}></MovieList>
        </div>
    )
}

export default Home