// Icons
import { ImGithub } from "react-icons/im";

// Components
import Brand from "../components/Brand";
import Button from "../components/Button";

// API
import { githubAuth } from "../api";


const Auth = () => {

	const githubLogin = (window) => {
        githubAuth.githubLogin()
        .then(r => {
			window.location.assign(r.data)
		})
        .catch(err => console.log(err));
    };

	return <div className="auth">
		<Brand size="large" />
		<Button 
			className="auth__button"
			size="large" 
			type="action" 
			onClick={() => githubLogin(window)} 
			>
			<Content />
		</Button>
	</div>;
};

const Content = () => {
	return <div className="auth__button__content">
		<ImGithub />
		<span className="auth__button__content__label">Continue with Github</span>
	</div>;
};

export default Auth;
