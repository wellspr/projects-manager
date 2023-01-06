import { githubAuth } from "../api";
import AlertBox from "./AlertBox";
import Button from "./Button";

const AuthRequiredBox = ({ show, setShow }) => {

	if (show) {
		return <AlertBox show={show} setShow={setShow}>
			<h2>Authentication required</h2>

			<Button 
				className="alert__btn"
				type="action"
				onClick={
					() => githubAuth.githubLogin()
						.then(r => window.location.assign(r.data))
						.catch(err => console.log(err))
				}>
				Login
			</Button>
		</AlertBox>;
	}
};

export default AuthRequiredBox;