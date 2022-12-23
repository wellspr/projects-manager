// React Router Dom
import { Link, useNavigate, useRouteError } from "react-router-dom";

// Components
import Button from "../components/Button";

import { 
    lost as error404_default,
    spaceVoid as error404_project_not_found,
    abduction as error500,
    stars as errorDefault
} from "../images";


const errorMessages = {
    error_404: { 
        headline: "Uh-oh... Not that route...",
        default: "Please double check the url",
        project_not_found: "Please double check the project id"
    },
    error_500: {
        headline: "Oops... Something's not quite right...",
        default: "Rest assured we're putting things in place around here!",
    },
    error_generic: {
        headline: "Oh boy...",
        default: "Really, we didn't expect that..."
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

        const ErrorInstance = ({ error, image, message, headline }) => {
            return <>
                <h2 className="error__header">{ headline }</h2>
                <div className="error__message">
                    <Image svg={image}/>
                    <div>
                        <div className="error__message error__message--primary">
                            { error.status } - { error.statusText }
                        </div>
                        <p className="error__message error__message--secondary">
                            { message }
                        </p>
                    </div>
                </div>
            </>;
        };

        const messageByStatus = (error) => {

            if (!error.data) {
                error.data = "default";
            }
            
            if (error.status === 404 && error.data === "default") {
                error.statusText = "Page Not Found";
            }

            console.log("ERROR: ", error);
            
            if (error.status === 404) {
                /** 
                 * error.data specifies where the error comes from
                */
                const image = error.data === "project_not_found" 
                ? error404_project_not_found
                : error404_default;
                const message = errorMessages.error_404[error.data];
                const headline = errorMessages.error_404.headline;
                return <ErrorInstance  error={error} image={image} message={message} headline={headline} />
            }

            if (error.status === 500) {
                const image = error500;
                const message = errorMessages.error_500.default
                const headline = errorMessages.error_500.headline;
                return <ErrorInstance  error={error} image={image} message={message} headline={headline} />
            }
            
            return <ErrorInstance  
                error={error} 
                image={errorDefault} 
                message={errorMessages.error_generic.default} 
                headline={errorMessages.error_generic.headline}    
            />
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

            { renderErrorMesage() }

            { renderButton() }

        </div>
    );
};

export default Error;