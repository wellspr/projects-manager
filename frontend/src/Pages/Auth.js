// React Router Dom
import { useOutletContext } from "react-router-dom";

// Icons
import { ImGithub } from "react-icons/im";

// Components
import Brand from "../components/Brand";
import Button from "../components/Button";

// API
import { githubAuth } from "../api";

// SVG Image
import svgImage from "../images/programmer.svg";


const Auth = () => {

	const { theme } = useOutletContext();

	const githubLogin = (window) => {
        githubAuth.githubLogin()
        .then(r => {
			console.log("Redirect: ", r.data);
			window.location.assign(r.data);
		})
        .catch(err => console.log(err));
    };

	return <div className={`auth auth--theme__${theme}`}>
		<Image svg={svgImage} />
		<Brand size="large" />
		<Button 
			className="auth__button"
			size="large" 
			type="action" 
			theme={theme}
			onClick={() => githubLogin(window)} 
			>
			<Content />
		</Button>
	</div>;
};

const Image = ({ svg }) => {
	return <div style={{ marginBottom: "3rem" }}>
		<img src={svg} alt={"svg"} height={200} />
	</div>
};

const Content = () => {
	return <div className="auth__button__content">
		<ImGithub />
		<span className="auth__button__content__label">Continue with Github</span>
	</div>;
};

export default Auth;
