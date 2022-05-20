import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './filme-info.css';
import api from "../../services/api";

function Filme() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "7a8e988df0c98a78f5908610d79cf071",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setMovie(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    console.log("Filme não encontrado")
                })
        }

        loadMovie();

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [])


    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes..</h1>
            </div>
        )
    }
    return (
        <div className="filme-info">
            <h1>{movie.title}</h1>
            <strong>Avaliação: {movie.vote_average} / 10</strong>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}></img>
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>

            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href="#">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme