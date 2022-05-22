import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './filme-info.css';
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

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
                    toast.warn("Filme não encontrado.");
                    navigate("/", { replace: false });
                    return
                })
        }

        loadMovie();

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let storedMovies = JSON.parse(minhaLista) || [];

        const hasMovie = storedMovies.some((storedMovie) => storedMovie.id === movie.id);

        if (hasMovie){
            toast.warn("Esse filme já está na sua lista");
            return;
        }

        storedMovies.push(movie);
        localStorage.setItem("@primeflix", JSON.stringify(storedMovies));
        toast.success("Filme salvo com sucesso.")

    }

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
            <img className="desktop" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}></img>
            <img className="mobile" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}></img>
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>

            <div className="area-buttons">
                <button className="button" onClick={salvarFilme}>Salvar</button>
                <button className="button">
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title}+Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme