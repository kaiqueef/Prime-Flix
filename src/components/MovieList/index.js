import { Link } from 'react-router-dom';
import './movieList.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';

function MovieList(props) {
    const mobileBannerWidth = 300;
    const carouselButtonWidth = 50;
    const [scrollWidth, setScrollWidth] = useState(900);
    
    function calculateScrollSize() {
        const { innerWidth: windowWidth } = window;
        return Math.floor((windowWidth - carouselButtonWidth*2)/mobileBannerWidth)*mobileBannerWidth || mobileBannerWidth;
    }

    useEffect (() => {
        const scrollSize = calculateScrollSize()
        setScrollWidth(scrollSize);
    })

    function moveToRight(item){
        document.querySelector(`.${item} ul`).scrollBy({top: 0, left: scrollWidth, behavior: 'smooth' })
    }
    
    function moveToLeft(item){
        document.querySelector(`.${item} ul`).scrollBy({top: 0, left: -scrollWidth, behavior: 'smooth' })
    }

    function checkPosition(event) {
        const mousePosition = event.nativeEvent.clientX;
        if (mousePosition < mobileBannerWidth+carouselButtonWidth){
            event.currentTarget.parentNode.style.left = 0;
            return
        }
        const elementRightPosition = event.currentTarget.parentElement.getBoundingClientRect().right;
        const { innerWidth: windowWidth } = window;
        const elementWidthOutsideScreen = windowWidth - elementRightPosition;
        if ( elementWidthOutsideScreen < 20) {
            event.currentTarget.parentNode.style.left = `calc(${elementWidthOutsideScreen}px - 76px)`
        }
    }
    function restorePosition(event) {
        event.currentTarget.parentNode.style.removeProperty('left')
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
                                    <Link onMouseEnter={(event) => {checkPosition(event)}} onMouseLeave={(event) => restorePosition(event)} to={`/filme/${movie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}></img>
                                    </Link>
                                    <div>
                                        <h3>{movie.title}</h3>
                                        <div>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <h4>IMDb: {movie.vote_average} / 10</h4>
                                        </div>
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