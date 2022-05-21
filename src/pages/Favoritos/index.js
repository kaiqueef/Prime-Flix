import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom';

function Favoritos(){

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(minhaLista) || [])
    }, [])


    return(
        <div className='my-movies'>
            <h1>TELA FAVORITOS</h1>
            <ul>
                {movies.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos