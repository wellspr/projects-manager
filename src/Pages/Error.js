// React Router Dom
import { Link, useNavigate, useRouteError } from "react-router-dom";

// Components
import Button from "../components/Button";

import { 
    lost as error404_default,
    spaceVoid as error404_project,
    abduction as error500,
    stars as errorDefault
} from "../images";


const errorMessages = {
    error_404: { 
        default: "The page could not be found",
        project: "Project not found"
    },
    error_500: {
        default: "Something's out of place around here!",
    },
    error_generic: {
        default: "Oh, boy!"
    },
}

const Error = () => {

    const error = useRouteError();
    const navigate = useNavigate();

    const renderErrorMesage = () => {

        const Image = ({ svg }) => {
            return <div className="error__image">
                <img src={svg} alt="404 error" height={220} />
            </div>;
        }

        const ErrorInstance = ({ error, image, message }) => {
            return <div className="error__message">    
                <Image svg={image}/>
                <div>
                    <div className="error__message error__message--primary">{ error.status } - { error.statusText }</div>
                    <p className="error__message error__message--secondary">{ message }</p>
                </div>
            </div>;
        };

        const messageByStatus = (error) => {
            if (error.status === 404) {
                const image = error.data ? error404_project : error404_default;
                const message = errorMessages.error_404[error.data] || errorMessages.error_404.default;
                return <ErrorInstance  error={error} image={image} message={message} />
            }

            if (error.status === 500) {
                const image = error500;
                const message = errorMessages.error_500.default
                return <ErrorInstance  error={error} image={image} message={message} />
            }
            
            return <ErrorInstance  error={error} image={errorDefault} message={errorMessages.error_generic.default} />
        };

        if (error.status) {
            return messageByStatus(error);            
        }

        if (error.response) {
            return messageByStatus(error.response);
        }
    };

    const renderButton = () => {

        if (error.status === 500 || (error.response && error.response.status === 500)) {
            return <div className="error__message--action">
                We are working on this issue, please
                {" "}
                <Link to={"/"} style={{ textDecoration: "underline" }} >try again</Link>
                {" "}
                a bit later.
            </div>;
        }

        return (
            <Button 
                className="button button--action button--action__light"
                size="large"
                onClick={() => navigate("/")}
                >
                Go to homepage
            </Button>
        );
    };

    return (
        <div className={`error`}>
            <h2 className="error__header">Oops... Something went wrong...</h2>

            { renderErrorMesage() }

            { renderButton() }

        </div>
    );
};

export default Error;