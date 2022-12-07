import { AiFillGithub } from "react-icons/ai";

const creation = 2022;
const currentYear = (new Date()).getFullYear();

const Footer = () => {
    return <footer className="footer">
        <div className="footer__copy">
            <span className="footer__item">&copy; {creation} { currentYear > creation && `- ${currentYear}` }</span>
            {"|"}
            <span className="footer__item">The Projects Manager</span>
            {"|"}
            <a 
                href="https://github.com/wellspr" 
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