import { useEffect, useState } from "react"
import api from '../../services/api'
import { Link } from "react-router-dom";
import './home.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";

// https://api.themoviedb.org/3/movie/popular?api_key=7a8e988df0c98a78f5908610d79cf071&language=pt-BR

function Home() {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setpopularMovies] = useState([]);
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
                    setTopRatedMovies(response.data.results.slice(0,20));
                    setLoading(false);
                case 'popular':
                    setpopularMovies(response.data.results);
                    setLoading(false);
            }
        }
        loadMovies("top_rated");
        loadMovies("popular");
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
            <div className="lista-filmes top-rated">
                <h2>Top rated</h2>
                <div className="carousel-button left" onClick={() => moveToLeft('top-rated')}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </div>
                <ul>
                    {topRatedMovies.map((movie) => {
                        return (
                            <li>
                                <article key={movie.id}>
                                    <div>
                                        <Link to={`/filme/${movie.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}></img>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </Link>
                                        <h3>{movie.title}</h3>
                                        <div>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <h4>IMDb: {movie.vote_average} / 10</h4>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
                <div className="carousel-button right" onClick={() => moveToRight('top-rated')}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </div>


            <div className="lista-filmes popular">
                <ul>
                    {popularMovies.map((movie) => {
                        return (
                            <li>
                                <article key={movie.id}>
                                    <strong>{movie.title}</strong>
                                    {/* <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}></img> */}
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}></img>
                                    <Link to={`/filme/${movie.id}`}>Acessar</Link>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Home