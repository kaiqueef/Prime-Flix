import { Link } from 'react-router-dom';
import './movieList.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";

function MovieList(props) {

    function moveToRight(item){
        document.querySelector(`.${item} ul`).scrollBy({top: 0, left: 900, behavior: 'smooth' })
    }
    
    function moveToLeft(item){
        document.querySelector(`.${item} ul`).scrollBy({top: 0, left: -900, behavior: 'smooth' })
    }

    return(
        <div className={`lista-filmes ${props.class}`}>
            <h2>{props.title}</h2>
            <div className="carousel-button left" onClick={() => moveToLeft(`${props.class}`)}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </div>
            <ul>
                {props.movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <article >
                                <div>
                                    <Link to={`/filme/${movie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}></img>
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
            <div className="carousel-button right" onClick={() => moveToRight(`${props.class}`)}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </div>
        </div>
    )
}

export default MovieList;