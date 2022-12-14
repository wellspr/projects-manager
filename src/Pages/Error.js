// React Router Dom
import { useNavigate, useRouteError } from "react-router-dom";

// Components
import Button from "../components/Button";


const Error = () => {

    const error = useRouteError();

    const navigate = useNavigate();

    console.log(error);
    
    const renderErrorMesage = () => {
        if (error.status) {
            return <p className="error__message">{ error.status } - { error.statusText }</p>;
        }

        if (error.response) {
            return <p className="error__message">{ error.response.status } - { error.response.statusText }</p>;
        }

        if (error.message) {
            return <p className="error__message">{ error.message }</p>
        }
    }

    return (
        <div className="error">
            <h2 className="error__header">Oops... an error occured.</h2>
            { renderErrorMesage() }

            <Button className="button button--action" onClick={() => navigate("/")}>
                Try again
            </Button>
        </div>
    );
};

export default Error;