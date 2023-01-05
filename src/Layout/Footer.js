import { AiFillGithub } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";

const creation = 2022;
const currentYear = (new Date()).getFullYear();

const Footer = () => {

    const { theme } = useOutletContext() || {};
    
    return <footer className={`footer footer--theme footer--theme__${theme}`}>
        <div className="footer__copy">
            <span className="footer__item">&copy; {creation} { currentYear > creation && `- ${currentYear}` }</span>
            {"|"}
            <span className="footer__item">The Projects Manager</span>
            {"|"}
            <a 
                href="https://github.com/wellspr/projects-manager" 
                target="_blank" 
                rel="noreferrer"
                className="footer__item footer__github__link"
                >
                <span className="footer__github__label">Github</span><AiFillGithub />
            </a>
        </div>
    </footer>;
};

export default Footer;