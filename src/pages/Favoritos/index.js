import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(minhaLista) || [])
    }, [])


    function deleteMovie(id) {
        let moviesFiltered = movies.filter( (item) => {
            return (item.id !== id)
        })
        setMovies(moviesFiltered)
        localStorage.setItem("@primeflix", JSON.stringify(moviesFiltered));
        toast.error("Filme deletado com sucesso!");
    }

    return(
        <div className='my-movies'>
            <h1>Meus filmes</h1>
            {movies.length === 0 && <span>Você não possui nenhum filme salvo ):</span>}
            <ul>
                {movies.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link className='button' to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button className='button' onClick={() => deleteMovie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos