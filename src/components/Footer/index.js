import { Link } from 'react-router-dom';
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faReact, faJs, faHtml5, faCss3Alt } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';


function Footer() {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return(
        <footer>
            <div>
                <div className='logo'>
                    <Link to="/" onClick={scrollToTop} data-text="Prime" onMouseEnter={toggleHover} onMouseLeave={toggleHover} className={hovered ? 'glitch': ''}> Prime</Link>
                </div>
                <div className='tecnologies'>
                    <h3>Tecnologias usadas:</h3>
                    <div className='list'>
                        <i className='react'><FontAwesomeIcon icon={faReact} /></i>
                        <i className='js'><FontAwesomeIcon icon={faJs} /></i>
                        <i className='html'><FontAwesomeIcon icon={faHtml5} /></i>
                        <i className='css'><FontAwesomeIcon icon={faCss3Alt} /></i>
                    </div>
                </div>
                <div className='contact-info'>
                    <h3>Kaique Ferreira</h3>
                    <div className='list'>
                        <a className="linkedin" href="https://www.linkedin.com/in/kaique-ferreira-854a75139/" target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                        <a className="github" href="https://github.com/kaiqueef" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;