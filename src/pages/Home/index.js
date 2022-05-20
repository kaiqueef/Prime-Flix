import { useEffect, useState } from "react"
import api from '../../services/api'
import { Link } from "react-router-dom";
import './home.css'

// https://api.themoviedb.org/3/movie/popular?api_key=7a8e988df0c98a78f5908610d79cf071&language=pt-BR

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovies() {
            const response = await api.get("/movie/top_rated", {
                params: {
                    api_key: "7a8e988df0c98a78f5908610d79cf071",
                    language: "pt-BR",
                    page: 1,   
                }
            })
            // console.log(response.data.results.slice(0,10))
            setMovies(response.data.results.slice(0,10));
            setLoading(false);
        }
        loadMovies();
    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes..</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="lista-filmes">
                {movies.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}></img>
                            <Link to={`/filme/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home