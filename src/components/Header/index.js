import { Link } from 'react-router-dom';
import './header.css'

function Header() {
    return(
        <header>
            <Link className="logo glitch" to="/" data-text="Prime Flix">Prime Flix</Link>
            <Link className="favoritos" to="/favoritos">Meus Filmes</Link>
        </header>
    )
}

export default Header;